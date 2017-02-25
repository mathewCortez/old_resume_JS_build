function locationizer(a){var b=[];for(var c in a.jobs)if(a.jobs.hasOwnProperty(c)){var d=a.jobs[c].location;b.push(d)}return b}function inName(a){return a=a.trim().split(" "),console.log(a),a[1]=a[1].toUpperCase(),a[0]=a[0].slice(0,1).toUpperCase()+a[0].slice(1).toLowerCase(),a[0]+" "+a[1]}var bio={name:"Mathew Cortez",role:"Web Developer",contacts:{mobile:"973-970-0931",email:"mcortez121@gmail.com",github:"mathezCortez",twitter:"none",location:"Randolph, NJ"},welcomeMessage:"Currently studying abroad in London at City University and learning more about front-end web development.  Looking for work experience in this field.",skills:["HTML","CSS","JavaScript","3DS MAX","JQuery"],biopic:"images/author.png",display:function(){var a=HTMLheaderName.replace("%data%",bio.name),b=HTMLheaderRole.replace("%data%",bio.role),c=HTMLmobile.replace("%data%",bio.contacts.mobile),d=HTMLemail.replace("%data%",bio.contacts.email),e=HTMLgithub.replace("%data%",bio.contacts.github),f=HTMLtwitter.replace("%data%",bio.contacts.twitter),g=HTMLlocation.replace("%data%",bio.contacts.location),h=HTMLwelcomeMsg.replace("%data%",bio.welcomeMessage),i=HTMLbioPic.replace("%data%",bio.biopic);if($("#header").prepend(i,h),$("#topContacts").prepend(c,g,f,e,d),$("#header").prepend(a,b),$("#footerContacts").prepend(g,f,e,d,c),bio.skills.length>0){$("#header").append(HTMLskillsStart);var j=HTMLskills.replace("%data%",bio.skills[0]);$("#skills").append(j),j=HTMLskills.replace("%data%",bio.skills[1]),$("#skills").append(j),j=HTMLskills.replace("%data%",bio.skills[2]),$("#skills").append(j),j=HTMLskills.replace("%data%",bio.skills[3]),$("#skills").append(j),j=HTMLskills.replace("%data%",bio.skills[4]),$("#skills").append(j)}}},work={jobs:[{employer:"DSV AIR & SEA",title:"IT Intern",location:"Clark, NJ, US",dates:"May 2016 - August 2016",description:"Designed a digital signage to present on the TV’s around the building.  Created user profiles for the company's prefered software (CargoWise One). Resolved technical problems using Cherwell (hardware malfunctions, system password resets, connectivity problems).  Migrated users from a recently acquired company to the DSV network and programs."},{employer:"Groupe SEB",title:"IT Intern",location:"West Orange, NJ, US",dates:"May 2015 - August 2015",description:"Managed help desk request in a timely matter.  Maintained PC’s to keep there perfromance high and functional."},{employer:"Kurt Devonshire Films",title:"Production Assistant",location:"New Brunswick, NJ, US",dates:"October 2015-November 2015",description:"I managed extras durning shoots, setting up the lighting and props for the sets, distributed scripts/forms, and oranized transportation."},{employer:"Conroy's Florist",title:"Flower Shop delivery & set up",location:"Morris Plains, NJ, US",dates:"January 2013-August 2013",description:"My responsibilities included putting together center pieces, decorating venues, and delivery flowers."}],display:function(){for(var a in work.jobs)if(work.jobs.hasOwnProperty(a)){$("#workExperience").append(HTMLworkStart);var b=HTMLworkEmployer.replace("%data%",work.jobs[a].employer),c=HTMLworkTitle.replace("%data%",work.jobs[a].title),d=b+c;$(".work-entry:last").append(d);var e=HTMLworkDates.replace("%data%",work.jobs[a].dates);$(".work-entry:last").append(e);var f=HTMLworkLocation.replace("%data%",work.jobs[a].location);$(".work-entry:last").append(f);var g=HTMLworkDescription.replace("%data%",work.jobs[a].description);$(".work-entry:last").append(g)}}},education={schools:[{name:"Rutgers University",location:"New Brunswick, NJ, US",degree:"BA",majors:["Information Technology and Informatics"],dates:"2014-2016",url:"http://www.rutgers.edu/"},{name:"Stevens Institute of Technology",location:"Hoboken, NJ, US",degree:"none",majors:["CS"],dates:"2014",url:"https://www.stevens.edu/"}],onlineCourses:[{title:"Front-End Web Development",school:"Udacity",date:"2016",url:"https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001"},{title:"Full Stack Web Developement",school:"Udacity",date:"2016-2017",url:"https://www.udacity.com/course/full-stack-web-developer-nanodegree--nd004"}],display:function(){for(var a in education.schools)if(education.schools.hasOwnProperty(a)){$("#education").append(HTMLschoolStart);var b=HTMLschoolName.replace("%data%",education.schools[a].name),c=HTMLschoolDegree.replace("%data%",education.schools[a].degree),d=b+c;$(".education-entry:last").append(d);var e=HTMLschoolDates.replace("%data%",education.schools[a].dates);$(".education-entry:last").append(e);var f=HTMLschoolLocation.replace("%data%",education.schools[a].location);$(".education-entry:last").append(f);var g=HTMLschoolMajor.replace("%data%",education.schools[a].majors);$(".education-entry:last").append(g)}$("#education").append(HTMLonlineClasses);for(var a in education.onlineCourses)if(education.onlineCourses.hasOwnProperty(a)){$("#education").append(HTMLschoolStart);var h=HTMLonlineTitle.replace("%data%",education.onlineCourses[a].title),i=HTMLonlineSchool.replace("%data%",education.onlineCourses[a].school),j=h+i;$(".education-entry:last").append(j);var e=HTMLonlineDates.replace("%data%",education.onlineCourses[a].date);$(".education-entry:last").append(e);var k=HTMLonlineURL.replace("%data%",education.onlineCourses[a].url);$(".education-entry:last").append(k)}}},projects={projects:[{title:"<a href='http://blog-158622.appspot.com/' target='_blank'>Multi-User Blog -- Click to view</a>",dates:"FEBRUARY 2017",description:"In this project, I built a multi-user blog where users can sign in and post blog posts as well as 'Like' and 'Comment' on other posts made on the blog. I have hosted this blog on Google App Engine and have created an authentication system for users to be able to register and sign in and then create blog posts. This project was created using python with jnija2. Most of the style is down with Bootstrap.",images:["images/blogfront.png","images/bloglog.png","images/bloglogin.png"]},{title:"<a href='map/index.html' target='_blank'>Frontend-nanodegree-neighborhood-map -- Click to view</a>",dates:"AUGUST 2016",description:"A single-page web application, built using the Knockout framework, that displays a Google Map of an area and various points of interest. The map displays concerts that are happening today in Boston. The search bar can be used to narrow down the concerts by name. The concert information come from Jambase through an AJAX call. If the user clicks on the map marker then the concert information will be displayed. It will show the concert artist, venue, address, and a URL to purchase a ticket if Jambase has a URL for that concert.",images:["images/map-min.PNG","images/map-hide-min.PNG"]},{title:"<a href='game/index.html' target='_blank'>Frontend-nanodegree-arcade-game -- Click to view</a>",dates:"MAY 2016",description:"An HTML5 Canvas powered video game, developed using the best practices in Object Oriented JavaScript. This game is a clone of the classical game frogger. You will be trying to reach the water while avoiding the bugs. The bugs will be scrolling across the screen at a random rate and appearing in a random column. There are five bugs in total that will be cycled. Each time the player reaches the water they will receive one point added to the scoreboard at the top of the page. The goal is to see how many points you can score in your three lives.",images:["images/arcade game.PNG"]},{title:"<a href='webOpt/index.html' target='_blank'>Frontend-nanodegree-mobile-portfolio -- Click to view</a>",dates:"JUNE 2016",description:"Optimized an inefficient web application's JavaScript, CSS and assets delivery, ensuring it runs at 60fps and achieves a PageSpeed score of at least 90. I got the website to a PageSpeed score of 94 on mobile and 96 on desktop. To get these scores I had to compress and resize the images, inline the CSS/JS, minify the files. The site was originally running at under 30fps while scrolling (which is the most used feature of the size) and changing the sizes or the pizza. The loops in each of these function did a lot of unnecessary calculations and poorly constructed. After the fixes were made the sight was running above 60fps.",images:["images/mobileOg-min.png","images/desktopOg-min.png","images/moblieDone-min.png","images/desktopDone-min.png"]}],display:function(){for(var a in projects.projects)if(projects.projects.hasOwnProperty(a)){$("#projects").append(HTMLprojectStart);var b=HTMLprojectTitle.replace("%data%",projects.projects[a].title);$(".project-entry:last").append(b);var c=HTMLprojectDates.replace("%data%",projects.projects[a].dates);$(".project-entry:last").append(c);var d=HTMLprojectDescription.replace("%data%",projects.projects[a].description);if($(".project-entry:last").append(d),projects.projects[a].images.length>0)for(var e in projects.projects[a].images)if(projects.projects[a].images.hasOwnProperty(e)){var f=HTMLprojectImage.replace("%data%",projects.projects[a].images[e]);$(".project-entry:last").append(f)}}}};bio.display(),work.display(),projects.display(),education.display(),$(document).click(function(a){var b=a.pageX,c=a.pageY;logClicks(b,c)}),console.log(locationizer(work)),$("#mapDiv").append(googleMap);var elem=document.createElement("img");elem.src="images/photoshop.png",elem.setAttribute("width","90px"),elem.setAttribute("max-width","100%"),elem.setAttribute("alt","Adobe Photoshop"),document.getElementById("photoshop").appendChild(elem);var softcap=document.createElement("div");softcap.className="softName",softcap.innerHTML="Adobe Photoshop",document.getElementById("photoshop").appendChild(softcap);var elem1=document.createElement("img");elem1.setAttribute("width","90px"),elem1.setAttribute("max-width","100%"),elem1.src="images/illustrator.png",elem1.setAttribute("alt","Adobe Illustrator"),document.getElementById("Illustrator").appendChild(elem1);var softcap1=document.createElement("div");softcap1.className="softName",softcap1.innerHTML="Adobe Illustrator",document.getElementById("Illustrator").appendChild(softcap1);var elem2=document.createElement("img");elem2.src="images/blender.png",elem2.setAttribute("width","90px"),elem2.setAttribute("max-width","100%"),elem2.setAttribute("alt","Blender"),document.getElementById("Blender").appendChild(elem2);var softcap2=document.createElement("div");softcap2.className="softName",softcap2.innerHTML="Blender",document.getElementById("Blender").appendChild(softcap2);var elem3=document.createElement("img");elem3.src="images/brackets.png",elem3.setAttribute("width","90px"),elem3.setAttribute("max-width","100%"),elem3.setAttribute("alt","Brackets"),document.getElementById("Brackets").appendChild(elem3);var softcap3=document.createElement("div");softcap3.className="softName",softcap3.innerHTML="Brackets",document.getElementById("Brackets").appendChild(softcap3);var elem4=document.createElement("img");elem4.src="images/unity.jpeg",elem4.setAttribute("width","90px"),elem4.setAttribute("max-width","100%"),elem4.setAttribute("alt","Unity"),document.getElementById("Unity").appendChild(elem4);var softcap4=document.createElement("div");softcap4.className="softName",softcap4.innerHTML="Unity",document.getElementById("Unity").appendChild(softcap4);var elem5=document.createElement("img");elem5.src="images/github.png",elem5.setAttribute("width","90px"),elem5.setAttribute("max-width","100%"),elem5.setAttribute("alt","Github"),document.getElementById("Github").appendChild(elem5);var softcap5=document.createElement("div");softcap5.className="softName",softcap5.innerHTML="Github",document.getElementById("Github").appendChild(softcap5);var elem6=document.createElement("img");elem6.src="images/studio.png",elem6.setAttribute("width","90px"),elem6.setAttribute("max-width","100%"),elem6.setAttribute("alt","Andriod Studio"),document.getElementById("Studio").appendChild(elem6);var softcap6=document.createElement("div");softcap6.className="softName",softcap6.innerHTML="Android Studio",document.getElementById("Studio").appendChild(softcap6);var lang=document.createElement("img");lang.src="images/HTML5.svg",lang.setAttribute("width","90px"),lang.setAttribute("max-width","100%"),lang.setAttribute("alt","HTML5"),document.getElementById("HTML5").appendChild(lang);var softcap7=document.createElement("div");softcap7.className="softName",softcap7.innerHTML="HTML 5",document.getElementById("HTML5").appendChild(softcap7);var lang1=document.createElement("img");lang1.src="images/css3.svg",lang1.setAttribute("width","90px"),lang1.setAttribute("max-width","100%"),lang1.setAttribute("alt","CSS3"),document.getElementById("CSS3").appendChild(lang1);var softcap8=document.createElement("div");softcap8.className="softName",softcap8.innerHTML="HTML 5",document.getElementById("CSS3").appendChild(softcap8);var lang2=document.createElement("img");lang2.src="images/jquery.svg",lang2.setAttribute("width","90px"),lang2.setAttribute("max-width","100%"),lang2.setAttribute("alt","jquery"),document.getElementById("jquery").appendChild(lang2);var softcap9=document.createElement("div");softcap9.className="softName",softcap9.innerHTML="Jquery",document.getElementById("jquery").appendChild(softcap9);var lang3=document.createElement("img");lang3.src="images/python.svg",lang3.setAttribute("width","90px"),lang3.setAttribute("max-width","100%"),lang3.setAttribute("alt","python"),document.getElementById("python").appendChild(lang3);var softcap10=document.createElement("div");softcap10.className="softName",softcap10.innerHTML="Python",document.getElementById("python").appendChild(softcap10);var lang4=document.createElement("img");lang4.src="images/bootstrap.png",lang4.setAttribute("width","90px"),lang4.setAttribute("max-width","100%"),lang4.setAttribute("alt","bootstrap"),document.getElementById("bootstrap").appendChild(lang4);var softcap11=document.createElement("div");softcap11.className="softName",softcap11.innerHTML="Bootstrap",document.getElementById("bootstrap").appendChild(softcap11);var lang5=document.createElement("img");lang5.src="images/wordpress.svg",lang5.setAttribute("width","90px"),lang5.setAttribute("max-width","100%"),lang5.setAttribute("alt","wordpress"),document.getElementById("wordpress").appendChild(lang5);var softcap12=document.createElement("div");softcap12.className="softName",softcap12.innerHTML="Wordpress",document.getElementById("wordpress").appendChild(softcap12);