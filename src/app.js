"use strict";

import InterviewHome from './views/pages/interviews/Home.js'
import InterviewShow from './views/pages/interviews/Show.js'
import InterviewUpdate from './views/pages/interviews/Update.js'
import InterviewNew from './views/pages/interviews/New.js'

import InterviewerHome from './views/pages/interviewers/Home.js'
import InterviewerShow from './views/pages/interviewers/Show.js'
import InterviewerUpdate from './views/pages/interviewers/Update.js'
import InterviewerNew from './views/pages/interviewers/New.js'

import IntervieweeHome from './views/pages/interviewees/Home.js'
import IntervieweeShow from './views/pages/interviewees/Show.js'
import IntervieweeUpdate from './views/pages/interviewees/Update.js'
import IntervieweeNew from './views/pages/interviewees/New.js'

import About from './views/pages/About.js'
import Error404 from './views/pages/Error404.js'

import Navbar from './views/components/Navbar.js'

import Utils from './services/Utils.js'

// List of supported routes. Any url other than these routes will throw a 404 error

const routes = {
    // '/about': About,

    'interview/': InterviewHome,
    'interview/new': InterviewNew,
    'interview/p/:id': InterviewShow,
    'interview/edit/:id': InterviewUpdate,

    'interviewer/': InterviewerHome,
    'interviewer/new': InterviewerNew,
    'interviewer/p/:id': InterviewerShow,
    'interviewer/edit/:id': InterviewerUpdate,

    'interviewee/': IntervieweeHome,
    'interviewee/new': IntervieweeNew,
    'interviewee/p/:id': IntervieweeShow,
    'interviewee/edit/:id': IntervieweeUpdate,
};

// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
const router = async() => {

    // Lazy load view element:
    const header = null || document.getElementById('header_container');
    const content = null || document.getElementById('page_container');

    // Render the Header and footer of the page
    header.innerHTML = await Navbar.render();
    await Navbar.after_render();


    // Get the parsed URl from the addressbar
    let request = Utils.parseRequestURL()

    // Parse the URL and if it has an id part, change it with the string ":id"
    let parsedURL = (request.entity) + (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')
    console.log(parsedURL)
        // Get the page from our hash of supported routes.
        // If the parsed URL is not in our list of supported routes, select the 404 page instead
    let page = routes[parsedURL] ? routes[parsedURL] : Error404
    content.innerHTML = await page.render();
    await page.after_render(request.id);

}

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);