function clamp(number, min, max){
    return Math.max(min, Math.min(number, max));
}

var mobileMode = false;

// NavMenu
let navLinks = document.getElementById("navLinks");
function showMenu(){
    navLinks.style.right = "0";
}   
function hideMenu(){
    navLinks.style.right = "-200px";
}

let idNavRaruu_link = document.getElementById("idNavRaruu_link");
var idNavRaruu_link_fontsize = parseInt(window.getComputedStyle(idNavRaruu_link).fontSize);
let idNavRaruu_img = document.getElementById("idNavRaruu_img");
var idNavRaruu_img_width = idNavRaruu_img.getBoundingClientRect().width;

// Scroll
window.addEventListener('scroll', () =>{
    var navScrolled = clamp(window.scrollY / 800, 0, 1);
    if(!mobileMode){
        var nav_background_tint = clamp(window.scrollY / 800, 0, 0.5);
        navLinks.style.background = `rgba(24, 24, 24, ${nav_background_tint})`;
    }
    
    idNavRaruu_link.style.opacity = (1 - navScrolled) / 1;
    idNavRaruu_link.style.fontSize = idNavRaruu_link_fontsize - (idNavRaruu_link_fontsize * navScrolled)+'px';
    idNavRaruu_img.style.width = idNavRaruu_img_width - idNavRaruu_img_width *  navScrolled +'px';
});


// Screen Width
window.addEventListener('resize', () =>{
    checkScreenWidth();
});

function checkScreenWidth(){
    if(window.innerWidth <= 700){
        mobileMode = true;
        navLinks.style = '';
    }
    else {mobileMode = false;}
}
checkScreenWidth();

// Nav Hover
var last_Nav_background;
$('.nav-links').on("mouseenter",function() {
    last_Nav_background = navLinks.style.getPropertyValue("background-color");
    $(this).css("background-color", "black")
});
$('.nav-links').on("mouseleave",function() {$(this).css("background-color", last_Nav_background)});

// Parallax
let parallax_container = document.getElementsByClassName("parallax")[0];
function parallax_cloud_array(){
    var rotated = false;
    for(var i = 0; i < 4; i++){
        var img = document.createElement('img');
        img.src = "Img/cloud.png";
        if(rotated){
            img.style.rotate = "180deg";
            img.style.transform = "scale(-1, 1)";
            rotated = false;
        }else {rotated = true;}
        parallax_container.appendChild(img);
    } 
}
parallax_cloud_array();

// Parallax-Scroll
let homeTextBox = document.getElementById("home-text-box");
window.addEventListener('scroll', homeTextBox_Scroll);
function homeTextBox_Scroll(param = '0'){
    if(param == '1'){
        window.scrollTo(0, 0);
        event.preventDefault(); 
        return;
    }
    if(param == '2'){
        window.scrollTo(0, 1000);
        event.preventDefault(); 
        return;
    }
    var scrollPosition = clamp(window.scrollY, 0, 1000)
    homeTextBox.style.marginTop = scrollPosition+'px';
    console.log(scrollPosition);
}
// Aboutme
let refAboutme = document.getElementById("refAboutme");
window.addEventListener('scroll', () => {
    if(window.scrollY >= 1000){
        refAboutme.style.pointerEvents = "all";
        refAboutme.style.opacity = "100%";
    }
    else{
        refAboutme.style.pointerEvents = "none";
        refAboutme.style.opacity = "0%";
    }
});