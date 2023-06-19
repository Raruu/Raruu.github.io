function clamp(number, min, max){
    return Math.max(min, Math.min(number, max));
}

var mobileMode = false;

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

window.addEventListener('scroll', () =>{
    var scrollPosition = window.scrollY;
    console.log('Vertical scroll position: ' + scrollPosition + 'px');
    var navScrolled = clamp(window.scrollY / 800, 0, 1);
    if(!mobileMode){
        var nav_background_tint = clamp(window.scrollY / 800, 0, 0.5);
        navLinks.style.background = `rgba(24, 24, 24, ${nav_background_tint})`;
    }
    
    idNavRaruu_link.style.opacity = (1 - navScrolled) / 1;
    idNavRaruu_link.style.fontSize = idNavRaruu_link_fontsize - (idNavRaruu_link_fontsize * navScrolled)+'px';
    idNavRaruu_img.style.width = idNavRaruu_img_width - idNavRaruu_img_width *  navScrolled +'px';
});

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
