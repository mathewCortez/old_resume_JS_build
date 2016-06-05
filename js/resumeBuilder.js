/*
This is empty on purpose! Your code to build the resume will go here.
 */
var bio = {
    "name": "Mathew Cortez",
    "role": "Web Developer",
    "contacts": {
        "mobile": "973-970-0931",
        "email": "mcortez121@gmail.com",
        "github": "mathezCortez",
        "twitter": "none",
        "location": "Randolph, NJ"
    },
    "welcomeMessage": "Current IT intern for DSV Air & Sea and learning more about front-end web development.  Looking for work experience in this field.",
    "skills": ["HTML", "CSS", "JavaScript", "3DS MAX"],
    "biopic": "images/author.png",
    "display": function() {
        var formattedName = HTMLheaderName.replace("%data%", bio.name);
        var formattedRole = HTMLheaderRole.replace("%data%", bio.role);
        var formattedMobile = HTMLmobile.replace("%data%", bio.contacts.mobile);
        var formattedEmail = HTMLemail.replace("%data%", bio.contacts.email);
        var formattedGithub = HTMLgithub.replace("%data%", bio.contacts.github);
        var formattedTwitter = HTMLtwitter.replace("%data%", bio.contacts.twitter);
        var formattedLocation = HTMLlocation.replace("%data%", bio.contacts.location);
        var formattedWelcomeMsg = HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage);
        var formattedBioPic = HTMLbioPic.replace("%data%", bio.biopic);


        $("#header").prepend(formattedBioPic, formattedWelcomeMsg);
        $("#topContacts").prepend(formattedMobile, formattedLocation, formattedTwitter, formattedGithub, formattedEmail);
        $("#header").prepend(formattedName, formattedRole);

        $("#footerContacts").prepend(formattedLocation, formattedTwitter, formattedGithub, formattedEmail, formattedMobile);

        if (bio.skills.length > 0) {
            $("#header").append(HTMLskillsStart);
            var formattedSkill = HTMLskills.replace("%data%", bio.skills[0]);
            $("#skills").append(formattedSkill);
            formattedSkill = HTMLskills.replace("%data%", bio.skills[1]);
            $("#skills").append(formattedSkill);
            formattedSkill = HTMLskills.replace("%data%", bio.skills[2]);
            $("#skills").append(formattedSkill);
            formattedSkill = HTMLskills.replace("%data%", bio.skills[3]);
            $("#skills").append(formattedSkill);
        }
    }

};


var work = {
    "jobs": [{
            "employer": "DSV AIR & SEA",
            "title": "IT Intern",
            "location": "Clark, NJ, US",
            "dates": "May 2016 - present",
            "description": "Designed a digital signage to present on the TV’s around the building.  Created user profiles for the company's prefered software (CargoWise One). Resolved technical problems using Cherwell (hardware malfunctions, system password resets, connectivity problems).  Migrated users from a recently acquired company to the DSV network and programs."
        }, {
            "employer": "Groupe SEB",
            "title": "IT Intern",
            "location": "West Orange, NJ, US",
            "dates": "May 2015 - August 2015",
            "description": "Managed help desk request in a timely matter.  Maintained PC’s to keep there perfromance high and functional."
        }, {
            "employer": "Kurt Devonshire Films",
            "title": "Production Assistant",
            "location": "New Brunswick, NJ, US",
            "dates": "October 2015-November 2015",
            "description": "I managed extras durning shoots, setting up the lighting and props for the sets, distributed scripts/forms, and oranized transportation."
        }, {
            "employer": "Conroy's Florist",
            "title": "Flower Shop delivery & set up",
            "location": "Morris Plains, NJ, US",
            "dates": "January 2013-August 2013",
            "description": "My responsibilities included putting together center pieces, decorating venues, and delivery flowers."
        }

    ],
    "display": function() {
        for (var job in work.jobs) {
            if (work.jobs.hasOwnProperty(job)) {
                $("#workExperience").append(HTMLworkStart);
                var formattedEmployer = HTMLworkEmployer.replace("%data%", work.jobs[job].employer);
                var formattedTitle = HTMLworkTitle.replace("%data%", work.jobs[job].title);
                var formattedEmployerTitle = formattedEmployer + formattedTitle;

                $(".work-entry:last").append(formattedEmployerTitle);

                var formattedDates = HTMLworkDates.replace("%data%", work.jobs[job].dates);
                $(".work-entry:last").append(formattedDates);

                var formattedLocation = HTMLworkLocation.replace("%data%", work.jobs[job].location);
                $(".work-entry:last").append(formattedLocation);

                var formattedDescription = HTMLworkDescription.replace("%data%", work.jobs[job].description);
                $(".work-entry:last").append(formattedDescription);
            }

        }
    }
};

var education = {
    "schools": [{
        "name": "Rutgers University",
        "location": "New Brunswick, NJ, US",
        "degree": "BA",
        "majors": ["Information Technology and Informatics"],
        "dates": "2014-2016",
        "url": "http://www.rutgers.edu/"
    }, {
        "name": "Stevens Institute of Technology",
        "location": "Hoboken, NJ, US",
        "degree": "none",
        "majors": ["CS"],
        "dates": "2014",
        "url": "https://www.stevens.edu/"
    }],
    "onlineCourses": [{
        "title": "Front-End Web Development",
        "school": "Udacity",
        "date": "2016",
        "url": "https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001"

    }],
    "display": function() {
        for (var school in education.schools) {
            if (education.schools.hasOwnProperty(school)) {
                $("#education").append(HTMLschoolStart);
                var formattedSchool = HTMLschoolName.replace("%data%", education.schools[school].name);
                var formattedDegree = HTMLschoolDegree.replace("%data%", education.schools[school].degree);
                var formattedNameDegree = formattedSchool+formattedDegree;
                $(".education-entry:last").append(formattedNameDegree);
                var formattedDate = HTMLschoolDates.replace("%data%", education.schools[school].dates);
                $(".education-entry:last").append(formattedDate);
                var formattedCity = HTMLschoolLocation.replace("%data%", education.schools[school].location);
                $(".education-entry:last").append(formattedCity);
                var formattedMajor = HTMLschoolMajor.replace("%data%", education.schools[school].majors);
                $(".education-entry:last").append(formattedMajor);

            }

        }
        $("#education").append(HTMLonlineClasses);
        for (var school in education.onlineCourses) {
            if (education.onlineCourses.hasOwnProperty(school)) {
                $("#education").append(HTMLschoolStart);
                var formattedOnlineTitle = HTMLonlineTitle.replace("%data%", education.onlineCourses[school].title);
                var formattedOnlineSchool = HTMLonlineSchool.replace("%data%", education.onlineCourses[school].school);
                var formattedOnlineSchoolTitle = formattedOnlineTitle + formattedOnlineSchool;
                $(".education-entry:last").append(formattedOnlineSchoolTitle);
                var formattedDate = HTMLonlineDates.replace("%data%", education.onlineCourses[school].date);
                $(".education-entry:last").append(formattedDate);
                var formattedUrl = HTMLonlineURL.replace("%data%", education.onlineCourses[school].url);
                $(".education-entry:last").append(formattedUrl);
            }
        }
    }
};

var projects = {
    "projects": [{
        "title": "Frontend-nanodegree-arcade-game",
        "dates": "MAY 2016",
        "description": "Clone of the classic game, Frogger.  Udacity provided the art assets and game engine.  Coded player, enemies, and other game entities in JavaScript's object-oriented pseudo-classical style.  Created enemy subclasses with different movement patterns and sprites (edited art assets in GIMP).",
        "images": [
            "images/arcade game.PNG",
            
        ]
    }],
    "display": function() {
        for (var project in projects.projects) {
            if (projects.projects.hasOwnProperty(project)) {
                $("#projects").append(HTMLprojectStart);

                var formattedTitle = HTMLprojectTitle.replace("%data%", projects.projects[project].title);
                $(".project-entry:last").append(formattedTitle);

                var formattedDates = HTMLprojectDates.replace("%data%", projects.projects[project].dates);
                $(".project-entry:last").append(formattedDates);

                var formattedDescription = HTMLprojectDescription.replace("%data%", projects.projects[project].description);
                $(".project-entry:last").append(formattedDescription);

                if (projects.projects[project].images.length > 0) {
                    for (var image in projects.projects[project].images) {
                        if (projects.projects[project].images.hasOwnProperty(image)) {
                            var formattedImage = HTMLprojectImage.replace("%data%", projects.projects[project].images[image]);
                            $(".project-entry:last").append(formattedImage);
                        }

                    }
                }
            }
        }
    }
};

bio.display();

work.display();

projects.display();

education.display();

$(document).click(function(loc) {
    var x = loc.pageX;
    var y = loc.pageY;
    logClicks(x, y);
});

function locationizer(work_obj) {
    var locationArray = [];

    for (var job in work_obj.jobs) {
        if (work_obj.jobs.hasOwnProperty(job)) {
            var newLocation = work_obj.jobs[job].location;
            locationArray.push(newLocation);
        }

    }
    return locationArray;
}
console.log(locationizer(work));

$('#mapDiv').append(googleMap);

function inName(name) {
    name = name.trim().split(" ");
    console.log(name);
    name[1] = name[1].toUpperCase();
    name[0] = name[0].slice(0, 1).toUpperCase() + name[0].slice(1).toLowerCase();

    return name[0] + " " + name[1];
}

var elem = document.createElement("img");
elem.src = "images/photoshop.png";
elem.setAttribute("width", "90px");
elem.setAttribute("max-width", "100%");
elem.setAttribute("alt", "Adobe Photoshop");
document.getElementById("photoshop").appendChild(elem);
var softcap = document.createElement("div");
softcap.className = "softName";
softcap.innerHTML = "Adobe Photoshop";
document.getElementById("photoshop").appendChild(softcap);

var elem1 = document.createElement("img");
elem1.setAttribute("width", "90px");
elem1.setAttribute("max-width", "100%");
elem1.src = "images/illustrator.png";
elem1.setAttribute("alt", "Adobe Illustrator");
document.getElementById("Illustrator").appendChild(elem1);
var softcap1 = document.createElement("div");
softcap1.className = "softName";
softcap1.innerHTML = "Adobe Illustrator";
document.getElementById("Illustrator").appendChild(softcap1);

var elem2 = document.createElement("img");
elem2.src = "images/blender.png";
elem2.setAttribute("width", "90px");
elem2.setAttribute("max-width", "100%");
elem2.setAttribute("alt", "Blender");
document.getElementById("Blender").appendChild(elem2);
var softcap2 = document.createElement("div");
softcap2.className = "softName";
softcap2.innerHTML = "Blender";
document.getElementById("Blender").appendChild(softcap2);

var elem3 = document.createElement("img");
elem3.src = "images/brackets.png";
elem3.setAttribute("width", "90px");
elem3.setAttribute("max-width", "100%");
elem3.setAttribute("alt", "Brackets");
document.getElementById("Brackets").appendChild(elem3);
var softcap3 = document.createElement("div");
softcap3.className = "softName";
softcap3.innerHTML = "Brackets";
document.getElementById("Brackets").appendChild(softcap3);

var elem4 = document.createElement("img");
elem4.src = "images/unity.jpeg";
elem4.setAttribute("width", "90px");
elem4.setAttribute("max-width", "100%");
elem4.setAttribute("alt", "Unity");
document.getElementById("Unity").appendChild(elem4);
var softcap4 = document.createElement("div");
softcap4.className = "softName";
softcap4.innerHTML = "Unity";
document.getElementById("Unity").appendChild(softcap4);

var elem5 = document.createElement("img");
elem5.src = "images/github.png";
elem5.setAttribute("width", "90px");
elem5.setAttribute("max-width", "100%");
elem5.setAttribute("alt", "Github");
document.getElementById("Github").appendChild(elem5);
var softcap5 = document.createElement("div");
softcap5.className = "softName";
softcap5.innerHTML = "Github";
document.getElementById("Github").appendChild(softcap5);

var elem6 = document.createElement("img");
elem6.src = "images/studio.png";
elem6.setAttribute("width", "90px");
elem6.setAttribute("max-width", "100%");
elem6.setAttribute("alt", "Andriod Studio");
document.getElementById("Studio").appendChild(elem6);
var softcap6 = document.createElement("div");
softcap6.className = "softName";
softcap6.innerHTML = "Android Studio";
document.getElementById("Studio").appendChild(softcap6);

var lang = document.createElement("img");
lang.src = "images/HTML5.svg";
lang.setAttribute("width", "90px");
lang.setAttribute("max-width", "100%");
lang.setAttribute("alt", "HTML5");
document.getElementById("HTML5").appendChild(lang);
var softcap7 = document.createElement("div");
softcap7.className = "softName";
softcap7.innerHTML = "HTML 5";
document.getElementById("HTML5").appendChild(softcap7);

var lang1 = document.createElement("img");
lang1.src = "images/css3.svg";
lang1.setAttribute("width", "90px");
lang1.setAttribute("max-width", "100%");
lang1.setAttribute("alt", "CSS3");
document.getElementById("CSS3").appendChild(lang1);
var softcap8 = document.createElement("div");
softcap8.className = "softName";
softcap8.innerHTML = "HTML 5";
document.getElementById("CSS3").appendChild(softcap8);

var lang2 = document.createElement("img");
lang2.src = "images/jquery.svg";
lang2.setAttribute("width", "90px");
lang2.setAttribute("max-width", "100%");
lang2.setAttribute("alt", "jquery");
document.getElementById("jquery").appendChild(lang2);
var softcap9 = document.createElement("div");
softcap9.className = "softName";
softcap9.innerHTML = "Jquery";
document.getElementById("jquery").appendChild(softcap9);

var lang3 = document.createElement("img");
lang3.src = "images/python.svg";
lang3.setAttribute("width", "90px");
lang3.setAttribute("max-width", "100%");
lang3.setAttribute("alt", "python");
document.getElementById("python").appendChild(lang3);
var softcap10 = document.createElement("div");
softcap10.className = "softName";
softcap10.innerHTML = "Python";
document.getElementById("python").appendChild(softcap10);

var lang4 = document.createElement("img");
lang4.src = "images/bootstrap.png";
lang4.setAttribute("width", "90px");
lang4.setAttribute("max-width", "100%");
lang4.setAttribute("alt", "bootstrap");
document.getElementById("bootstrap").appendChild(lang4);
var softcap11 = document.createElement("div");
softcap11.className = "softName";
softcap11.innerHTML = "Bootstrap";
document.getElementById("bootstrap").appendChild(softcap11);

var lang5 = document.createElement("img");
lang5.src = "images/wordpress.svg";
lang5.setAttribute("width", "90px");
lang5.setAttribute("max-width", "100%");
lang5.setAttribute("alt", "wordpress");
document.getElementById("wordpress").appendChild(lang5);
var softcap12 = document.createElement("div");
softcap12.className = "softName";
softcap12.innerHTML = "Wordpress";
document.getElementById("wordpress").appendChild(softcap12);
//$('#main').append(internationalizeButton);
