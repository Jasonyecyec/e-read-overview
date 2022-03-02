const menu = document.querySelector(".burger");
const nav = document.querySelector(".nav-links");
const closeMenu = document.querySelector(".close-menu");
const links = document.querySelectorAll(".nav-links li a");
const operationButton = document.querySelectorAll(".button-operation");
const operationContainer = document.querySelector(".button-container");

const operationTitle = document.querySelector(".operation-title");
const operationDescription = document.querySelector(".operation-description");

const learnMore = document.querySelector(".learn-more");
const navigationParent = document.querySelector(".nav-link2");
const navbar = document.querySelector(".navbar");
const header = document.querySelector("header")

//if menu(burger) is clicked, it will toggle and show nav
menu.addEventListener('click', function () {
    nav.classList.toggle("nav-active")
})

//if x is clicked, will close nav
closeMenu.addEventListener('click', function () {
    nav.classList.remove("nav-active")
    // menu.style.opacity = 100;
})

//if any of the link is clicked,  will close nav
links.forEach((link) => {
    link.addEventListener('click', () => {
        nav.classList.remove("nav-active")
    })
})

//make all button operation go down
const removeTranslate = function () {
    operationButton.forEach((button) => {
        button.style.transform = `translateY(0)`;
    })
}

//object for operation description
const operationOption = {
    1: ["Tranfser money to anyone, instantly! No fees, no BS.",
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."],
    2: ["Buy a home or make your dreams come true, with instant loans.", "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."],
    3: ["No longer need your account? No problem! Close it instantly.", "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."],
}

//tabbed component
operationContainer.addEventListener('click', function (e) {
    // return parent element not child 
    const clicked = e.target.closest(".button-operation");

    // if any button is clickec run, if not return;
    if (!clicked) return
    removeTranslate()
    clicked.style.transform = `translateY(-10px)`;
    operationDescription.innerHTML = operationOption[clicked.dataset.tab][1];
    operationTitle.innerHTML = operationOption[clicked.dataset.tab][0]

})

//button smooth scroll function 
learnMore.addEventListener('click', function (e) {
    e.preventDefault()
    document.querySelector('#section-1').scrollIntoView({ behavior: 'smooth' });
})

//Page navigation smooth scroll
navigationParent.addEventListener('click', function (e) {
    e.preventDefault();

    //check if clicked target has nav-link
    if (e.target.classList.contains("nav-link")) {
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
    }
})

//  Menu fade animation, use "this" keyword to set the provided value
const handleHover = function(e){

    // Matching strategy
    if (e.target.classList.contains("nav-link")) {
        const link = e.target;

        //go to parent element
        const siblings = link.closest(".navbar").querySelectorAll(".nav-link");

        //loop and change all siblings opacity
        siblings.forEach(e => {
            if(e !== link){
                e.style.opacity = this;
            }
         })

        document.querySelector(".logo").style.opacity = this;
    }
}

// use bind to return new function and pass an object/value 
navbar.addEventListener("mouseover",handleHover.bind(0.5))
navbar.addEventListener("mouseout", handleHover.bind(1))

// sticky navigation using Intersection Oberver API
const navbarHeight = navbar.getBoundingClientRect().height;

//callback function for headerObserver
const observerCallback = function(entry) {
    const header = entry[0]
    console.log(header);
    if(header.isIntersecting !== true){
        navbar.classList.add("sticky-navbar")
    }else{
        navbar.classList.remove("sticky-navbar")
    }
}

// option for headerObserver
const observerOption = {
    root: null,
    threshold : 0,
    rootMargin: `${navbarHeight}px`,
}

const headerObserver = new IntersectionObserver(observerCallback,observerOption)
headerObserver.observe(header)