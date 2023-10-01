function clamp(number, min, max){
    return Math.max(min, Math.min(number, max));
}
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
// VARIABLE
var mobileMode = false;
const refAboutme = document.getElementsByClassName("refAboutme")[0];
const refAboutme_Background = document.getElementsByClassName("refAboutme-background")[0];
const homeTextBox = document.getElementsByClassName("home-text-box")[0];
const navLinks = document.getElementById("navLinks");
const idNavRaruu_img = document.getElementById("idNavRaruu_img");
const idNavRaruu_link = document.getElementById("idNavRaruu_link");
const parallax_container = document.getElementsByClassName("parallax")[0];
const navSocialLinks = document.getElementById("nav-social-links");
const toast_notification = document.getElementsByClassName("toast-notification")[0];
const toast_msg_h1 = document.getElementById("toast-msg-h1");
const aboutme_General = document.getElementsByClassName("aboutme-general")[0];
const flipCard = document.getElementsByClassName("flip-card")[0];
const flipCard_Inner = document.getElementsByClassName("flip-card-inner")[0];

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

// Toast
var toast_RemainingTime = 0;
var toast_Interval;
function toast_Show(toast_msg_H1 = ""){
    clearInterval(toast_Interval);
    toast_msg_h1.textContent = toast_msg_H1;
    toast_notification.style.bottom = "0";
    toast_RemainingTime = 3
    toast_Interval = setInterval(function (){
        if (toast_RemainingTime > 0) toast_RemainingTime--;
        else{
            clearInterval(toast_Interval);
            toast_Hide();
        }
    }, 1000);
}
function toast_Hide(){
    //toast_msg_h1.textContent = "";
    toast_notification.style.bottom = "-20%";
}

// CTRL-zoom Warning
document.body.addEventListener("wheel", e=>{
    if(e.ctrlKey){
        function fetchdata(callback){
            setTimeout(()=>{callback(Math.round(100 * window.devicePixelRatio));}, 10);
        }
        fetchdata(result =>{
            toast_Show(`The Best scale is 100. Now is ${result}`);
        });     
    }
});

// Scroll
var idNavRaruu_link_fontsize = parseInt(window.getComputedStyle(idNavRaruu_link).fontSize);
var idNavRaruu_img_width = idNavRaruu_img.getBoundingClientRect().width;
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
        if(window.scrollY >= 1000){$(this).css("background-color", "#051e3f");}
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
    for(var i = 0; i < 2; i++){
        var img = document.createElement('img');
        img.src = "Img/short_cloud.png";
        if(rotated){
            img.style.rotate = "180deg";
            img.style.transform = "scale(-1, 1) translate(0px, 10px)";
            rotated = false;
        }else {rotated = true;}
        parallax_container.appendChild(img);
    } 
}
parallax_cloud_array();

// Parallax-Scroll
var aboutme_ShowAtPosition = !mobileMode ? 850 / window.devicePixelRatio : 600;
console.log(window.devicePixelRatio);
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
    var scrollPosition = clamp(window.scrollY, 0, aboutme_ShowAtPosition)
    homeTextBox.style.marginTop = scrollPosition+'px';
    var refAboutme_showAt;
    if(mobileMode){
        refAboutme_showAt = '-'+clamp(window.scrollY, 0, 700)+'px';
    }
    else {refAboutme_showAt = '-'+clamp(window.scrollY, 0, 800 - (1000-aboutme_ShowAtPosition))+'px';}
    refAboutme.style.marginTop = refAboutme_showAt;
    console.log(scrollPosition);
}

// Aboutme
var aboutme_ScrollYValue;
refAboutme_Background.addEventListener('transitionend', () => {
    if(aboutme_ScrollYValue < aboutme_ShowAtPosition){
        refAboutme.style.pointerEvents = "none";
        refAboutme.style.opacity = "0%"; 
    }
    if(aboutme_ScrollYValue >= aboutme_ShowAtPosition){  
        //video_arisu_dance.muted = false;
    }
});
window.addEventListener('scroll', () => {
    aboutme_ScrollYValue = window.scrollY;
    if(aboutme_ScrollYValue >= aboutme_ShowAtPosition){
        homeTextBox.style.transition = "0.5s";
        homeTextBox.style.opacity = "0%"; 
        refAboutme.style.pointerEvents = "all";
        refAboutme.style.opacity = "100%"; 
        refAboutme_Background.style.backdropFilter = "blur(32px)";
        refAboutme_Background.style.boxShadow = "0px 0px 15px black";
        refAboutme_Background.style.width = "40%";
        setSelectedNav(2);
        navSocialLinks.style.zIndex = 1;
        navSocialLinks.style.opacity = "100%";        
    }
    else if (aboutme_ScrollYValue< aboutme_ShowAtPosition){
        homeTextBox.style.transition = "";
        refAboutme_Background.style.backdropFilter = "blur(0px)";
        refAboutme_Background.style.width = "0%";
        refAboutme_Background.style.boxShadow = "0px 0px 0px black";        
        homeTextBox.style.opacity = "100%";
        setSelectedNav(1);
        navSocialLinks.style.zIndex = -1;
        navSocialLinks.style.opacity = "0%";
        //video_arisu_dance.muted = true;
    }
});

// Aboutme-card
const aboutme_General_textOrigin = [aboutme_General.children[0].textContent, aboutme_General.children[1].textContent];
const aboutme_General_textAlternate = ["Widi", "Polynema student"];
var flipCard_isFinish = true;

async function setText_Typing(interval = 100, originText ="", nextText="", callback){ 
    let sumLength = originText.length + nextText.length;
    let timeDel = (nextText.length / sumLength) * interval;
    let timeType = (originText.length / sumLength) * interval;
    for(var i = -1; i > -1*originText.length; i--){
        callback(originText.slice(0, i));        
        await sleep(timeDel);
    }
    for(var i = 1; i <= nextText.length; i++){
        callback(nextText.slice(0, i));
        await sleep(timeType);
    }    
}

function flipCard_onClick(){
    if(!flipCard_isFinish){
        event.preventDefault();
        return;
    }
    flipCard_isFinish = false;
    const interval = 50;
    if(flipCard_Inner.style.transform != ``){
        flipCard_Inner.style.transform = ``;
        // H1
        setText_Typing(interval, aboutme_General_textAlternate[0],aboutme_General_textOrigin[0], result => {aboutme_General.children[0].textContent = result;});        
        // H2
        setText_Typing(interval, aboutme_General_textAlternate[1],aboutme_General_textOrigin[1], result => {aboutme_General.children[1].textContent = result;});

    } else{
        flipCard_Inner.style.transform = `rotateY(180deg)`;
        // H1
        setText_Typing(interval,aboutme_General_textOrigin[0], aboutme_General_textAlternate[0], result => {aboutme_General.children[0].textContent = result;});        
        // H2
        setText_Typing(interval,aboutme_General_textOrigin[1], aboutme_General_textAlternate[1], result => {aboutme_General.children[1].textContent = result;});
        
    }
    flipCard_isFinish = true;
}

// setTimeout(()=>{
//     for(i = 0; i<10;){
//         {console.log("a");
//     }
//     }}, 4000);
