// ===========main navbar==========
var navbar_id = "main-navbar";
var navbar;
var navbar_menu;
var menu_toggler;
var li_list;

// The DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  navbar = document.getElementById(navbar_id);
  navbar_menu = navbar.querySelector(".menu");
  menu_toggler = navbar.querySelector("#menu-toggler");
  li_list = navbar.querySelectorAll(".menu li");

  // Insert 'fa-angle-down' icon to LI's which have children UL
  li_list.forEach(function (li) {
    if (li.children.length === 2) {
      li.children[0].innerHTML += "<i class='fa fa-angle-down'></i>";
      li.classList.add("has-dropdown");
    }
  });

  var mediaQuery = window.matchMedia("(min-width: 860px)");
  navFunctionality(mediaQuery);
  // Optional (Only for testing purposes)
  mediaQuery.addListener(navFunctionality);

  function navFunctionality(mediaQuery) {
    // Initially remove all the event listeners from LI if any
    li_list.forEach(function (li) {
      li.removeEventListener("mouseleave", toggleActive);
      li.removeEventListener("mouseenter", toggleActive);
      li.removeEventListener("click", toggleActive);
    });

    if (mediaQuery.matches) {
      // Toggle dropdown on hover
      li_list.forEach(function (li) {
        li.addEventListener("mouseleave", toggleActive);
        li.addEventListener("mouseenter", toggleActive);
      });
    } else {
      // Toggle dropdown on click
      li_list.forEach(function (li) {
        li.addEventListener("click", toggleActive);
      });

      // Hamburger operations
      menu_toggler.addEventListener("click", function (e) {
        if (e.currentTarget.classList.contains("active")) {
          li_list.forEach(function (li) {
            li.classList.remove("active");
          });
        }

        navbar_menu.classList.toggle("active");
        e.currentTarget.classList.toggle("active");
      });
    }
  }

  // function to toggle 'active' class from LI
  function toggleActive(e) {
    e.stopPropagation();
    if (e.type === "click") {
      if (e.currentTarget.classList.contains("has-dropdown")) {
        e.preventDefault();
      }
      if (
        !e.currentTarget.classList.contains("active") &&
        e.currentTarget.parentElement.classList.contains("menu")
      ) {
        li_list.forEach(function (li) {
          li.classList.remove("active");
        });
      }
    }
    e.currentTarget.classList.toggle("active");
  }
});

// ===========main carousel============
$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    items: 1, // Shows one slide at a time
    loop: true, // Enables infinite loop
    nav: true, // Adds navigation buttons
    navText: [,],
    dots: true,
    autoplay: true, // Enables autoplay
    autoplayTimeout: 3000, // Sets autoplay interval to 3 seconds
    autoplayHoverPause: true, // Pauses autoplay on hover
  });
});

// ===================Notice tab section=================
const tabs1 = document.querySelector(".alltab_tab1");
const tabButton1 = document.querySelectorAll(".alltab_tab1 button");
const contents1 = document.querySelectorAll(".alltab_tab1 .content");

tabs1.onclick = (e) => {
  const id = e.target.dataset.id;
  if (id) {
    tabButton1.forEach((btn) => {
      btn.classList.remove("active");
    });
    e.target.classList.add("active");

    contents1.forEach((content) => {
      content.classList.remove("active");
    });
    const element = document.getElementById(id);
    element.classList.add("active");
  }
};
// =========number card=============
// ==============number cards============

// Function to start counter animation
const startCounters = () => {
  const counters = document.querySelectorAll(".number_cards .counter");
  counters.forEach((counter) => {
    counter.innerText = "0";
    const updateCounter = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;
      const increment = target / 200;
      if (count < target) {
        counter.innerText = `${Math.ceil(count + increment)}`;
        setTimeout(updateCounter, counter.getAttribute("data-target2"));
      } else counter.innerText = target;
    };
    updateCounter();
  });
};
// Create an Intersection Observer for the parent div
const parentObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Start the counters when the parent div is visible
      startCounters();
    }
  });
}, {
  threshold: 0.1 // Adjust this threshold as needed
});
// Observe the parent div
const parentDiv = document.querySelector(".number_cards"); // Adjust selector to the actual parent div
if (parentDiv) {
  parentObserver.observe(parentDiv);
}
