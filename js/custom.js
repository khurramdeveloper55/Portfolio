// Navigation Scroll

const header = document.querySelector(".header-block-top");
const sectionOne = document.querySelector(".banner");

const sectionOneOptions = {

    rootMargin: "-400px 0px 0px 0px"
};

const sectionOneObserver = new IntersectionObserver
(function(
    entries,
    sectionOneObserver
){
entries.forEach(entry => {
    if(!entry.isIntersecting){
        header.classList.add("nav-scrolled");
    } else {
        header.classList.remove("nav-scrolled")
    }
})
}, sectionOneOptions);

sectionOneObserver.observe(sectionOne);

// Fades

const faders = document.querySelectorAll('.fade-in')

const appearOptions = {
    threshold:.3
};


const appearOnScroll = new IntersectionObserver
(function(
    entries,
    appearOnScroll
){
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }  else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        })
    },
appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});


// Navigation Collapse

$(document).ready(function() {
    $("#sidebarCollapse").on("click", function() {
      $("#sidebar").toggleClass("active");
      $(this).toggleClass("active");
    });


  });

// Active Class



  $(document).ready(function(){

    $('ul li').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
      });

});