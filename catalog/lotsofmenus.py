from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from database_setup import Hobby, Base, HobbyItem, User

engine = create_engine('sqlite:///hobbywithusers.db')
# Bind the engine to the metadata of the Base class so that the
# declaratives can be accessed through a DBSession instance
Base.metadata.bind = engine

DBSession = sessionmaker(bind=engine)
# A DBSession() instance establishes all conversations with the database
# and represents a "staging zone" for all the objects loaded into the
# database session object. Any change made against the objects in the
# session won't be persisted into the database until you call
# session.commit(). If you're not happy about the changes, you can
# revert all of them back to the last commit by calling
# session.rollback()
session = DBSession()


# Create dummy user
User1 = User(name="Jack boritger", email="jack broth@email.com",
             picture='https://pbs.twimg.com/profile_images/2671170543/18debd694829ed78203a5a36dd364160_400x400.png')
session.add(User1)
session.commit()

# Adding in Hobby, the items needed for those hobbies, as well as price
hobby1 = Hobby(user_id=1, name="Hiking")

session.add(hobby1)
session.commit()


hobbyItem1 = HobbyItem(user_id=1, name="Bakcpack", description="hold supplies for camping",
                     price="$2.99", hobby=hobby1)

session.add(hobbyItem1)
session.commit()

hobbyItem2 = HobbyItem(user_id=1, name="Rope", description="Might need it to get out or a spot",
                     price="$5.50", hobby=hobby1)

session.add(hobbyItem2)
session.commit()

hobby2 = Hobby(user_id=1, name="Drawing")

session.add(hobby2)
session.commit()


hobbyItem1 = HobbyItem(user_id=1, name="Sketch Book", description="Stuff to draw on",
                     price="$2.99", hobby=hobby2)

session.add(hobbyItem1)
session.commit()

hobbyItem2 = HobbyItem(user_id=1, name="Sketching pencils", description="Need to draw with",
                     price="$5.50", hobby=hobby2)

session.add(hobbyItem2)
session.commit()

hobby3 = Hobby(user_id=1, name="Home Brew")

session.add(hobby3)
session.commit()


hobbyItem1 = HobbyItem(user_id=1, name="Kettle", description="Brew beer in",
                     price="$2.99", hobby=hobby3)

session.add(hobbyItem1)
session.commit()

hobbyItem2 = HobbyItem(user_id=1, name="Over Flow Stopper", description="Stops beer from overflowing kettle",
                     price="$5.50", hobby=hobby3)

session.add(hobbyItem2)
session.commit()


hobby4 = Hobby(user_id=1, name="Fishing")

session.add(hobby4)
session.commit()


hobbyItem1 = HobbyItem(user_id=1, name="License", description="Need to fish in some places",
                     price="$2.99", hobby=hobby4)

session.add(hobbyItem1)
session.commit()

hobbyItem2 = HobbyItem(user_id=1, name="Fishing Pole", description="Use to catch fish",
                     price="$5.50", hobby=hobby4)

session.add(hobbyItem2)
session.commit()


print "added menu items!"
