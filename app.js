const hamburger = document.querySelector(".header .nav-bar .nav-list .hamburger");
const mobile_menu = document.querySelector(".header .nav-bar .nav-list ul");
const menu_item = document.querySelectorAll(".header .nav-bar .nav-list ul li a");
const header = document.querySelector(".header.container");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobile_menu.classList.toggle("active");
});

document.addEventListener("scroll", () => {
  var scroll_position = window.scrollY;
  if (scroll_position > 250) {
    header.style.backgroundColor = "#29323c";
  } else {
    header.style.backgroundColor = "transparent";
  }
});

menu_item.forEach((item) => {
  item.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobile_menu.classList.toggle("active");
  });
});

const darkModeToggle = document.querySelector("#dark-mode-toggle");
const body = document.querySelector("body");
let isNegro = false;
const isMobile = navigator.userAgentData.mobile

darkModeToggle.addEventListener("click", function () {
  var darkModeToggleIcon = document.getElementById("dark-mode-toggle-icon");
  if(isNegro){
    darkModeToggleIcon.innerHTML = '<img src="./img/moon.svg"/>';
    isNegro = false;
  }
  else{
    darkModeToggleIcon.innerHTML = '<img src="./img/sun.svg"/>';    
    isNegro = true;
  }
  body.classList.toggle("dark-mode");
  
});

document.addEventListener("DOMContentLoaded", function() {
  if(isMobile){
    var Elements = document.querySelectorAll("#about .col-left .about-img-horizontal")
    for(var i = 0; i<Elements.length; i++){
      Elements[i].style.transform = 'translate(-61.5px, -20px)';
    }
  }
  if(!isMobile){
    var Elements = document.querySelectorAll("#about .col-left .about-img-horizontal")
  }  
});