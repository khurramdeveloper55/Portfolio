// Strict Mode
(function ($) {
    "use strict"; // Start of use strict

    $(function () {
        // Aos animations
        AOS.init({
            offset: 250,
            duration: 800,
        });

        // Skills Section Animation
        const skillsSection = $("#skill");
        const skills = skillsSection.find(".skills__data");
        const animationDelay = 2000;
        let skillsAnimated = false;

        $(window).on("scroll", function () {
            if (!skillsAnimated && isElementInView(skillsSection)) {
                skills.each(function () {
                    const skillNumber = $(this).find(".skills__number");
                    const skillText = parseInt(skillNumber.text());
                    const skillPercent = $(this).find(".skills__percentage");

                    skillPercent.animate(
                        { width: skillText + "%" },
                        animationDelay
                    );
                });

                skillsAnimated = true;
            }
        });

        // Helper function to check if an element is in the viewport
        function isElementInView(element) {
            const windowHeight = $(window).height();
            const elementOffset = element.offset().top + 300;
            const scrollPos = $(window).scrollTop();

            return elementOffset < scrollPos + windowHeight;
        }
    });
})(jQuery); // End of use strict

// Navigation Toggle
const navMenu = document.getElementById("nav-menu"),
    navToggle = document.getElementById("nav-toggle"),
    navClose = document.getElementById("nav-close");

if (navToggle) {
    navToggle.addEventListener("click", () => {
        navMenu.classList.add("show-menu");
    });
}

if (navClose) {
    navClose.addEventListener("click", () => {
        navMenu.classList.remove("show-menu");
    });
}

const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
    const navMenu = document.getElementById("nav-menu");
    navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

// Navigation Scroll
document.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (window.scrollY > 30) {
        header.classList.add("scroll-header");
    } else {
        header.classList.remove("scroll-header");
    }
});

// Scroll Section Active Link
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 60;
        sectionId = current.getAttribute("id");

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document
                .querySelector(".nav__menu a[href *=" + sectionId + "]")
                .classList.add("active-link");
        } else {
            document
                .querySelector(".nav__menu a[href *=" + sectionId + "]")
                .classList.remove("active-link");
        }
    });
}

// Button Style
$(".button_su_inner").mouseenter(function (e) {
    var parentOffset = $(this).offset();

    var relX = e.pageX - parentOffset.left;
    var relY = e.pageY - parentOffset.top;
    $(this).prev(".su_button_circle").css({ left: relX, top: relY });
    $(this).prev(".su_button_circle").removeClass("desplode-circle");
    $(this).prev(".su_button_circle").addClass("explode-circle");
});

$(".button_su_inner").mouseleave(function (e) {
    var parentOffset = $(this).offset();

    var relX = e.pageX - parentOffset.left;
    var relY = e.pageY - parentOffset.top;
    $(this).prev(".su_button_circle").css({ left: relX, top: relY });
    $(this).prev(".su_button_circle").removeClass("explode-circle");
    $(this).prev(".su_button_circle").addClass("desplode-circle");
});

// Dark Theme
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

// Previously seleced Topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
    document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () => {
    themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";
};

// We validate if the user previously chose a topic
if (selectedTheme) {
    // If the validation fulfilled, we ask what the issue was to know if we activated or deactivated the dark theme
    document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
        darkTheme
    );
    themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](
        iconTheme
    );
}

// Activate / Deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);

    console.log(selectedTheme, darkTheme);
    // We save the theme and the current icon that the user chose
    localStorage.setItem("selected-theme", getCurrentTheme());
    localStorage.setItem("selected-icon", getCurrentIcon());
});

// Portfolio Carousel
let swiper = new Swiper(".portfolio__container", {
    cssMode: true,
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        // el: ".swiper-pagination",
        clickable: true,
    },
    mousewheel: true,
    keyboard: true,
});

window.addEventListener("scroll", scrollActive);

// Form Validation
jQuery("#form-valid").validate({
    rules: {
        name: "required",
        email: {
            required: true,
            email: true,
        },
        subject: {
            required: true,
            minlength: 10,
        },
    },
    messages: {
        name: "Please enter your name",
        email: {
            required: "Please enter your email",
            email: "Please enter valid email",
        },
        subject: {
            required: "Please enter your subject",
            minlength: "Must be 10 characters long",
        },
    },
    submitHandler: function (form) {
        form.submit();
    },
});

// // Scroll Up
const toTop = document.querySelector(".scrollup");

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
        toTop.classList.add("appear");
    } else {
        toTop.classList.remove("appear");
    }
});
