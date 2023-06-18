function clamp(number, min, max){
    return Math.max(min, Math.min(number, max));
}

let navLinks = document.getElementById("navLinks");
function showMenu(){
    navLinks.style.right = "0";
}   
function hideMenu(){
    navLinks.style.right = "-200px";
}

let refHeader = document.getElementById("refHeader");
let idNavRaruu_link = document.getElementById("idNavRaruu_link");
let idNavRaruu_link_fontsize = parseInt(window.getComputedStyle(idNavRaruu_link).fontSize);
let idNavRaruu_img = document.getElementById("idNavRaruu_img");
let idNavRaruu_img_width = idNavRaruu_img.getBoundingClientRect().width;
window.addEventListener('scroll', () =>{
    var scrollPosition = window.scrollY;
    console.log('Vertical scroll position: ' + scrollPosition + 'px');
    console.log(idNavRaruu_link_fontsize);
    var navScrolled = clamp(window.scrollY / 800, 0, 1);
    var refHeader_background_tint = navScrolled;
    refHeader.style.backgroundColor = `rgba(255, 192, 203, ${refHeader_background_tint})`;
    idNavRaruu_link.style.opacity = (1 - navScrolled) / 1;
    idNavRaruu_link.style.fontSize = idNavRaruu_link_fontsize - (idNavRaruu_link_fontsize * navScrolled)+'px';
    idNavRaruu_img.style.width = idNavRaruu_img_width - idNavRaruu_img_width *  navScrolled +'px';
});