from flask import Flask, render_template, request, redirect, jsonify, url_for, flash
from sqlalchemy import create_engine, asc
from sqlalchemy.orm import sessionmaker
from database_setup import Base, Hobby, HobbyItem, User
from flask import session as login_session
import random
import string
from oauth2client.client import flow_from_clientsecrets
from oauth2client.client import FlowExchangeError
import httplib2
import json
from flask import make_response
import requests

app = Flask(__name__)

CLIENT_ID = json.loads(
    open('client_secrets.json', 'r').read())['web']['client_id']
APPLICATION_NAME = "Hobby App"


# Connect to Database and create database session
engine = create_engine('sqlite:///hobbywithusers.db')
Base.metadata.bind = engine

DBSession = sessionmaker(bind=engine)
session = DBSession()


# Create anti-forgery state token
@app.route('/login')
def showLogin():
    state = ''.join(
        random.choice(string.ascii_uppercase + string.digits) for x in range(32))
    login_session['state'] = state
    # return "The current session state is %s" % login_session['state']
    return render_template('login.html', STATE=state)


@app.route('/gconnect', methods=['POST'])
def gconnect():
    # Validate state token
    if request.args.get('state') != login_session['state']:
        response = make_response(json.dumps('Invalid state parameter.'), 401)
        response.headers['Content-Type'] = 'application/json'
        return response
    # Obtain authorization code, now compatible with Python3
    request.get_data()
    code = request.data.decode('utf-8')

    try:
        # Upgrade the authorization code into a credentials object
        oauth_flow = flow_from_clientsecrets('client_secrets.json', scope='')
        oauth_flow.redirect_uri = 'postmessage'
        credentials = oauth_flow.step2_exchange(code)
    except FlowExchangeError:
        response = make_response(
            json.dumps('Failed to upgrade the authorization code.'), 401)
        response.headers['Content-Type'] = 'application/json'
        return response

    # Check that the access token is valid.
    access_token = credentials.access_token
    url = ('https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=%s'
           % access_token)
    # Submit request, parse response - Python3 compatible
    h = httplib2.Http()
    response = h.request(url, 'GET')[1]
    str_response = response.decode('utf-8')
    result = json.loads(str_response)

    # If there was an error in the access token info, abort.
    if result.get('error') is not None:
        response = make_response(json.dumps(result.get('error')), 500)
        response.headers['Content-Type'] = 'application/json'
        return response

    # Verify that the access token is used for the intended user.
    gplus_id = credentials.id_token['sub']
    if result['user_id'] != gplus_id:
        response = make_response(
            json.dumps("Token's user ID doesn't match given user ID."), 401)
        response.headers['Content-Type'] = 'application/json'
        return response

    # Verify that the access token is valid for this app.
    if result['issued_to'] != CLIENT_ID:
        response = make_response(
            json.dumps("Token's client ID does not match app's."), 401)
        response.headers['Content-Type'] = 'application/json'
        return response

    stored_access_token = login_session.get('access_token')
    stored_gplus_id = login_session.get('gplus_id')
    if stored_access_token is not None and gplus_id == stored_gplus_id:
        response = make_response(json.dumps('Current user is already connected.'),
                                 200)
        response.headers['Content-Type'] = 'application/json'
        return response

    # Store the access token in the session for later use.
    login_session['access_token'] = access_token
    login_session['gplus_id'] = gplus_id

    # Get user info
    userinfo_url = "https://www.googleapis.com/oauth2/v1/userinfo"
    params = {'access_token': access_token, 'alt': 'json'}
    answer = requests.get(userinfo_url, params=params)

    data = answer.json()

    login_session['username'] = data['name']
    login_session['picture'] = data['picture']
    login_session['email'] = data['email']

    # see if user exists, if it doesn't make a new one
    user_id = getUserID(login_session['email'])
    if not user_id:
        user_id = createUser(login_session)
    login_session['user_id'] = user_id

    output = ''
    output += '<h1>Welcome, '
    output += login_session['username']
    output += '!</h1>'
    output += '<img src="'
    output += login_session['picture']
    output += ' " style = "width: 300px; height: 300px;border-radius: 150px;-webkit-border-radius: 150px;-moz-border-radius: 150px;"> '
    flash("you are now logged in as %s" % login_session['username'])
    return output

# User Helper Functions


def createUser(login_session):
    newUser = User(name=login_session['username'], email=login_session[
                   'email'], picture=login_session['picture'])
    session.add(newUser)
    session.commit()
    user = session.query(User).filter_by(email=login_session['email']).one()
    return user.id


def getUserInfo(user_id):
    user = session.query(User).filter_by(id=user_id).one()
    return user


def getUserID(email):
    try:
        user = session.query(User).filter_by(email=email).one()
        return user.id
    except:
        return None

# DISCONNECT - Revoke a current user's token and reset their login_session


@app.route('/gdisconnect')
def gdisconnect():
        # Only disconnect a connected user.
    access_token = login_session.get('access_token')
    if access_token is None:
        response = make_response(
            json.dumps('Current user not connected.'), 401)
        response.headers['Content-Type'] = 'application/json'
        return response
    url = 'https://accounts.google.com/o/oauth2/revoke?token=%s' % access_token
    h = httplib2.Http()
    result = h.request(url, 'GET')[0]
    if result['status'] == '200':
        # Reset the user's sesson.
        del login_session['access_token']
        del login_session['gplus_id']
        del login_session['username']
        del login_session['email']
        del login_session['picture']

        response = make_response(json.dumps('Successfully disconnected.'), 200)
        response.headers['Content-Type'] = 'application/json'
        return response
    else:
        # For whatever reason, the given token was invalid.
        response = make_response(
            json.dumps('Failed to revoke token for given user.', 400))
        response.headers['Content-Type'] = 'application/json'
        return response


# JSON APIs to view Restaurant Information
@app.route('/restaurant/<int:restaurant_id>/menu/JSON')
def hobbyMenuJSON(hobby_id):
    hobby = session.query(Hobby).filter_by(id=hobby_id).one()
    items = session.query(HobbyItem).filter_by(
        hobby_id=hobby_id).all()
    return jsonify(MenuItems=[i.serialize for i in items])


@app.route('/hobby/<int:hobby_id>/menu/<int:menu_id>/JSON')
def hobbyItemJSON(hobby_id, menu_id):
    Hobby_Item = session.query(HobbyItem).filter_by(id=menu_id).one()
    return jsonify(Menu_Item=Menu_Item.serialize)


@app.route('/hobby/JSON')
def hobbiesJSON():
    hobbies = session.query(Hobby).all()
    return jsonify(hobbies=[r.serialize for r in hobbies])


# Show all restaurants
@app.route('/')
@app.route('/hobby/')
def showHobbies():
    hobbies = session.query(Hobby).order_by(asc(Hobby.name))
    if 'username' not in login_session:
        return render_template('publichobbies.html', hobbies=hobbies)
    else:
        return render_template('hobbies.html', hobbies=hobbies)

# Create a new restaurant


@app.route('/hobby/new/', methods=['GET', 'POST'])
def newHobby():
    if 'username' not in login_session:
        return redirect('/login')
    if request.method == 'POST':
        newHobby = Hobby(
            name=request.form['name'], user_id=login_session['user_id'])
        session.add(newHobby)
        flash('New Hobby %s Successfully Created' % newHobby.name)
        session.commit()
        return redirect(url_for('showHobby'))
    else:
        return render_template('newHobby.html')

# Edit a restaurant


@app.route('/hobby/<int:hobby_id>/edit/', methods=['GET', 'POST'])
def editHobby(hobby_id):
    editedHobby = session.query(
        Hobby).filter_by(id=hobby_id).one()
    if 'username' not in login_session:
        return redirect('/login')
    if editedHobby.user_id != login_session['user_id']:
        return "<script>function myFunction() {alert('You are not authorized to edit this hobby. Please create your own hobby in order to edit.');}</script><body onload='myFunction()''>"
    if request.method == 'POST':
        if request.form['name']:
            editedHobby.name = request.form['name']
            flash('Hobby Successfully Edited %s' % editedHobby.name)
            return redirect(url_for('showHobbies'))
    else:
        return render_template('editHobby.html', hobby=editedHobby)


# Delete a restaurant
@app.route('/hobby/<int:hobby_id>/delete/', methods=['GET', 'POST'])
def deleteHobby(hobby_id):
    hobbyToDelete = session.query(
        Hobby).filter_by(id=hobby_id).one()
    if 'username' not in login_session:
        return redirect('/login')
    if hobbyToDelete.user_id != login_session['user_id']:
        return "<script>function myFunction() {alert('You are not authorized to delete this hobby. Please create your own hobby in order to delete.');}</script><body onload='myFunction()''>"
    if request.method == 'POST':
        session.delete(hobbyToDelete)
        flash('%s Successfully Deleted' % hobbyToDelete.name)
        session.commit()
        return redirect(url_for('showHobbies', hobby_id=hobby_id))
    else:
        return render_template('deleteHobby.html', hobby=hobbyToDelete)

# Show a restaurant menu


@app.route('/hobby/<int:hobby_id>/')
@app.route('/hobby/<int:hobby_id>/menu/')
def showMenu(hobby_id):
    hobby = session.query(Hobby).filter_by(id=hobby_id).one()
    creator = getUserInfo(hobby.user_id)
    items = session.query(HobbyItem).filter_by(
        hobby_id=hobby_id).all()
    if 'username' not in login_session or creator.id != login_session['user_id']:
        return render_template('publichobbyitem.html', items=items, hobby=hobby, creator=creator)
    else:
        return render_template('menu.html', items=items, hobby=hobby, creator=creator)


# Create a new menu item
@app.route('/hobby/<int:hobby_id>/menu/new/', methods=['GET', 'POST'])
def newHobbyItem(restaurant_id):
    if 'username' not in login_session:
        return redirect('/login')
    hobby = session.query(Hobby).filter_by(id=hobby_id).one()
    if login_session['user_id'] != hobby.user_id:
        return "<script>function myFunction() {alert('You are not authorized to add hobby items to this hobby. Please create your own hobby in order to add items.');}</script><body onload='myFunction()''>"
    if request.method == 'POST':
        newItem = HobbyItem(name=request.form['name'], description=request.form['description'], price=request.form[
                           'price'], course=request.form['course'], hobby_id=hobby_id, user_id=hobby.user_id)
        session.add(newItem)
        session.commit()
        flash('New Menu %s Item Successfully Created' % (newItem.name))
        return redirect(url_for('showMenu', hobby_id=hobby_id))
    else:
        return render_template('newhobbyitem.html', hobby_id=hobby_id)

# Edit a menu item


@app.route('/hobby/<int:hobby_id>/menu/<int:menu_id>/edit', methods=['GET', 'POST'])
def editHobbyItem(hobby_id, menu_id):
    if 'username' not in login_session:
        return redirect('/login')
    editedItem = session.query(HobbyItem).filter_by(id=menu_id).one()
    hobby = session.query(Hobby).filter_by(id=hobby_id).one()
    if login_session['user_id'] != hobby.user_id:
        return "<script>function myFunction() {alert('You are not authorized to edit hobby items to this hobby. Please create your own hobby in order to edit items.');}</script><body onload='myFunction()''>"
    if request.method == 'POST':
        if request.form['name']:
            editedItem.name = request.form['name']
        if request.form['description']:
            editedItem.description = request.form['description']
        if request.form['price']:
            editedItem.price = request.form['price']
        session.add(editedItem)
        session.commit()
        flash('Hobby Item Successfully Edited')
        return redirect(url_for('showMenu', hobby_id=hobby_id))
    else:
        return render_template('edithobbyitem.html', hobby_id=hobby_id, menu_id=menu_id, item=editedItem)


# Delete a menu item
@app.route('/hobby/<int:hobby_id>/menu/<int:menu_id>/delete', methods=['GET', 'POST'])
def deleteHobbyItem(hobby_id, menu_id):
    if 'username' not in login_session:
        return redirect('/login')
    hobby = session.query(Hobby).filter_by(id=hobby_id).one()
    itemToDelete = session.query(HobbyItem).filter_by(id=menu_id).one()
    if login_session['user_id'] != hobby.user_id:
        return "<script>function myFunction() {alert('You are not authorized to delete hobby items to this hobby. Please create your own hobby in order to delete items.');}</script><body onload='myFunction()''>"
    if request.method == 'POST':
        session.delete(itemToDelete)
        session.commit()
        flash('Hobby Item Successfully Deleted')
        return redirect(url_for('showMenu', hobby_id=hobby_id))
    else:
        return render_template('deleteHobbyItem.html', item=itemToDelete)


if __name__ == '__main__':
    app.secret_key = 'super_secret_key'
    app.debug = True
    app.run(host='0.0.0.0', port=5000)
