/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
const navbar = document.querySelector(".navbar__menu");
const navList = document.querySelector("#navbar__list");
const sections = document.querySelectorAll("section");
let scrolling = false;
let cursor;

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

// Find the range of a section, returns object
function findRange(section) {
  const range = {
    top: section.offsetTop - 100,
    end: section.offsetTop + section.offsetHeight - 100,
  };
  return range;
}

// check if current position is in range returns boolean
function inRange(curr, section) {
  const range = findRange(section);
  if (curr >= range.top && curr <= range.end) {
    return true;
  }
  return false;
}

// check if section is active
function isActive(section) {
  if (section.classList.length > 0) {
    return true;
  }
  return false;
}

// checks if nav link active, highlights
function navActive(target) {
  const navLink = document.querySelector(`a[href="#${target}"]`);
  if (document.querySelector(".current") === null) {
    navLink.classList.add("current");
    return;
  } else if (navLink.classList.length > 1) {
    return;
  }
  document.querySelector(".current").classList.remove("current");
  navLink.classList.add("current");
}

// scroll to section
setInterval(function () {
  if (scrolling) {
    addClass(cursor);
    scrolling = false;
  }
}, 200);

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the navigation
const fragment = document.createDocumentFragment();

for (section of sections) {
  const listElement = document.createElement("li");
  listElement.innerHTML = `<a href="#${section.id}" class="menu__link">${section.dataset.nav}</a>`;

  fragment.appendChild(listElement);
}

// Add class 'active' and highlight nav link when section is in viewport
function addClass(cursor) {
  for (section of sections) {
    if (inRange(cursor, section)) {
      navActive(section.id);
      if (isActive(section)) {
        return;
      } else {
        document.querySelector(".now-active").classList.remove("now-active");
        section.classList.add("now-active");
      }
    }
  }
}

// Scroll id using smooth scroll
function smoothScroll(event) {
  event.preventDefault();
  const element = document.querySelector(`section${event.target.hash}`);
  scrollTo({
    top: element.offsetTop,
    left: 0,
    behavior: "smooth",
  });
}

/**
 * End Main Functions
 * Begin Events
 *
 */

// nav menu
document.querySelector("#navbar__list").appendChild(fragment);

// smooth scroll
navbar.addEventListener("click", smoothScroll);

// Set sections as active
document.addEventListener("scroll", function (event) {
  cursor = event.path[1].scrollY;
  scrolling = true;
});
