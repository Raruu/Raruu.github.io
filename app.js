function clamp(number, min, max){
    return Math.max(min, Math.min(number, max));
}
// VARIABLE
var mobileMode = false;
let refAboutme = document.getElementById("refAboutme");
let homeTextBox = document.getElementById("home-text-box");
let navLinks = document.getElementById("navLinks");
let idNavRaruu_img = document.getElementById("idNavRaruu_img");
let idNavRaruu_link = document.getElementById("idNavRaruu_link");
let parallax_container = document.getElementsByClassName("parallax")[0];

// NavMenu
function showMenu(){
    navLinks.style.right = "0";
}   
function hideMenu(){
    navLinks.style.right = "-200px";
}

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


var idNavRaruu_link_fontsize = parseInt(window.getComputedStyle(idNavRaruu_link).fontSize);
var idNavRaruu_img_width = idNavRaruu_img.getBoundingClientRect().width;
// Scroll
window.addEventListener('scroll', () =>{
    var navScrolled = clamp(window.scrollY / 800, 0, 1);
    if(!mobileMode){
        if(window.scrollY > 800){
            navLinks.style.backdropFilter = `blur(32px)`;
            navLinks.style.boxShadow = `0px 0px 20px rgba(27, 26, 26, 0.2)`;
        }
        else {
            navLinks.style.backdropFilter = ``;
            navLinks.style.boxShadow = ``;
        }      
    }
    idNavRaruu_link.style.opacity = (1 - navScrolled) / 1;
    idNavRaruu_link.style.fontSize = idNavRaruu_link_fontsize - (idNavRaruu_link_fontsize * navScrolled)+'px';
    idNavRaruu_img.style.width = idNavRaruu_img_width - idNavRaruu_img_width *  navScrolled +'px';
});

// Nav Hover
var last_Nav_background;
$('.nav-links').on("mouseenter",function() {
    if(!mobileMode){
        last_Nav_background = navLinks.style.getPropertyValue("background-color");
        if(window.scrollY >= 1000){$(this).css("background-color", "black");}
    }    
});
$('.nav-links').on("mouseleave",function() {if(!mobileMode)$(this).css("background-color", last_Nav_background)});

var lastSelectedNav = 0;
function setSelectedNav(index = 1){
    if(index == lastSelectedNav) return;
    $(`.nav-links ul li:nth-child(${lastSelectedNav}) a`).css('color', '');
    $(`.nav-links ul li:nth-child(${index}) a`).css('color', 'pink');
    lastSelectedNav = index;
}
setSelectedNav();

// Parallax
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
window.addEventListener('scroll', homeTextBox_Scroll);
function homeTextBox_Scroll(param = '0'){
    if(param == '1'){
        event.preventDefault(); 
        window.scrollTo(0, 0);
        return;
    }
    if(param == '2'){
        event.preventDefault(); 
        window.scrollTo(0, 1000);      
        return;
    }
    var scrollPosition = clamp(window.scrollY, 0, 1000)
    homeTextBox.style.marginTop = scrollPosition+'px';
    var refAboutme_showAt;
    if(mobileMode){
        refAboutme_showAt = '-'+clamp(window.scrollY, 0, 700)+'px';
    }
    else {refAboutme_showAt = '-'+clamp(window.scrollY, 0, 800)+'px';}
    refAboutme.style.marginTop = refAboutme_showAt;
    console.log(scrollPosition);
}

// Aboutme
window.addEventListener('scroll', () => {
    if(window.scrollY >= 1000){
        homeTextBox.style.transition = "0.5s";
        homeTextBox.style.opacity = "0%"; 
        refAboutme.style.pointerEvents = "all";
        refAboutme.style.opacity = "100%"; 
        setSelectedNav(2);
    }
    else if (window.screenY < 1000){
        homeTextBox.style.transition = "";
        refAboutme.style.pointerEvents = "none";
        refAboutme.style.opacity = "0%";
        homeTextBox.style.opacity = "100%";
        setSelectedNav(1);
    }
});