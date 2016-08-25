###HTML and CSS Optimization
 
The first thing I did to optimize the HMTL files was to compress all of the images.  Most were a good size for the website but the image from pizza.html needed to be resized and compressed for the mini picture in the index.html and the larger image in pizza.html.  I needed to make a copy of the pizza image and put it in the img folder so I can make it a smaller size than the image that would be used when pizza.html was opened.  The next thing I did to optimize the website was to save all the linked images to the img folder instead of using a URL to access the image, and once I downloaded these images I compressed them like I did the others.  Then I looked at the CSS files and I saw that there were a few calls to tags within tags which needed to be changed.  The way I did this was too go back into the HTML and add classes to all the HTML tags that needed to be called in CSS.  I did this for all of the HTML files and then referenced the classes in the CSS instead of calling tags within tags.  The next step I took towards optimizing the website was to inline both of the CSS files in all of the HTML files because they were both small and did not need to be in there own file.  Naturally I had to delete the lines of code the linked the CSS files I deleted.  After this I looked at the JavaScript file and noticed it was small also, so I minified it and inlined it into the html files.  I also had to take out the Google analytics code from the html files because it was causing problems for me, but I am not sure why.  The website was pretty well optimized at this point but I wanted to make a few more changes.  The first I noticed was a missing </div> tag towards the bottom of the code which I added in.  I am not sure that this helped optimize index.html, but I thought it was a good addition.  Then I minified the html files and moved onto the pizza.html page to fix the JavaScript. 
 
###JAVASCRIPT Optimizaiton
 
To begin optimizing this code I need to record some timelines in chrome dev tools to see where in the code I needed to start my work.  The problems were the on scroll functionality and the pizza size changing slider.  I remembered this was the same problem that the instructors went over during the videos, so I knew what to do.  The first thing I did was to get ride of the determineDx function because I remember it was more complicated than it needed to be.  Then I made it so when the slider was in position 1, 2, or 3 it would change the width of the pizza image which is a simpler way of changing the size of the pizza image.  The change in width would become a change in percent width when I actually changed the style instead of a pixel width change.  To make the changes to all of the pizzas I needed to I needed to call them and the current way was using querySelectorAll but getElementsByClassName was a better way of doing this for this situation, so I made that switch and put that information in a variable outside the loop.  Then I had a loop that cycled though all of the pizzas and make the style changes.  Fixing the slider had a lot of similar problems.  I pulled the variables outside of the so it was not doing difficult calculations every time the loop ran and I made the getElementsByClassName change again.  The big change her was making it so the style change was a translation because that did not affect as many areas of the DOM and would be a performance booster.  This got the frame rate down to where I wanted it but all of the pizzas were too close together so I have to make a change to bottom of the file where the pizzas were being created and placed on the screen.  I changed style.basicLeft to style.left because I did not know what basic left was and this fixed the problem.  The last thing I did was to change the number of pizzas being generated so the pizzas being created were based on the size of the screen the webpage was being viewed on.
 
###Running the Project

If you would like to run my project you could download the files and run it in your browser, or you could go to the index.html file on github, copy the URL and paste it after this: https://htmlpreview.github.io/? or just go to this link https://htmlpreview.github.io/?https://github.com/mathewCortez/frontend-nanodegree-browser-rendering-optimization/blob/master/index.html.  You can then go to dev tools if you are viewing the page on chrome and see how the website preforms in terms of FPS or you could follow the instructions below to see the PageSpeed Scores.

### Getting started

####Part 1: Optimize PageSpeed Insights score for index.html

Some useful tips to help you get started:

1. Check out the repository
1. To inspect the site on your phone, you can run a local server

  ```bash
  $> cd /path/to/your-project-folder
  $> python -m SimpleHTTPServer 8080
  ```

1. Open a browser and visit localhost:8080
1. Download and install [ngrok](https://ngrok.com/) to make your local server accessible remotely.

  ``` bash
  $> cd /path/to/your-project-folder
  $> ngrok http 8080
  ```

1. Copy the public URL ngrok gives you and try running it through PageSpeed Insights! Optional: [More on integrating ngrok, Grunt and PageSpeed.](http://www.jamescryer.com/2014/06/12/grunt-pagespeed-and-ngrok-locally-testing/)

Profile, optimize, measure... and then lather, rinse, and repeat. Good luck!


You might find the FPS Counter/HUD Display useful in Chrome developer tools described here: [Chrome Dev Tools tips-and-tricks](https://developer.chrome.com/devtools/docs/tips-and-tricks).


