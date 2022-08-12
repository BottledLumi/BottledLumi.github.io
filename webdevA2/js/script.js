// navigation
let responsiveNav = document.body.querySelector(".nav-menu");
let responsiveNavOptions = document.body.querySelector(".responsive-nav-options");
responsiveNav.addEventListener("click", ()=>{
    if (window.getComputedStyle(responsiveNavOptions).display == "none")
        responsiveNavOptions.style.display = "grid";
    else
        responsiveNavOptions.style.display = "none";
});

// index
const sidebar = document.body.querySelectorAll(".index .sidebar p");
const responsiveBar = document.body.querySelectorAll(".index .responsive p");
const info = document.body.querySelectorAll(".index .info >div");

function addChangeDesc(bar){
    for (let i = 0; i < bar.length; i++)
    {
        bar[i].addEventListener("click", () => {
            for (let j = 0; j < info.length; j++) {
                if (i != j) {
                    bar[j].classList.remove("selected");
                    bar[j].classList.add("hover");
                    info[j].style.display = "none";
                }
                else {
                    bar[j].classList.remove("hover");
                    bar[j].classList.add("selected");
                    info[j].style.display = "block";
                }
            }
        });
    }
}
addChangeDesc(sidebar); // add eventlisteners to both nav bars
addChangeDesc(responsiveBar);

// basics
const scrollOffset = 75; 
let scrollElement;
 
const elementInView = (el, offset = 0) => {
  const elementTop = el.getBoundingClientRect().top;
 
  return (
    elementTop <= 
    ((window.innerHeight || document.documentElement.clientHeight) - offset)
  );
};

for (let i = 0; i< document.querySelectorAll(".scroll").length; i++)
{
    window.addEventListener('scroll', () => { // if in view, make visible
    scrollElement = document.querySelectorAll(".scroll")[i];
    if (elementInView(scrollElement, scrollOffset)) {
        scrollElement.classList.add('scrolled');
      } 
      else {
        scrollElement.classList.remove('scrolled');
      }
    })
}

// psychology
if (document.URL.includes("psychology"))
{
function getHue(red, green, blue) { // calculate hue from rgb

    let min = Math.min(Math.min(red, green), blue);
    let max = Math.max(Math.max(red, green), blue);

    if (min == max) {
        return 0;
    }

    let hue = 0.0;
    if (max == red) {
        hue = (green - blue) / (max - min);

    } else if (max == green) {
        hue = 2.0 + (blue - red) / (max - min);

    } else {
        hue = 4.0 + (red - green) / (max - min);
    }

    hue = hue * 60;
    if (hue < 0) hue = hue + 360;

    return Math.round(hue);
}


let ball = document.body.querySelector("#ball");
let colourPicker = document.body.querySelector("#colour-picker");

var r,g,b;
colourPicker.addEventListener("change", ()=>{
    ball.style.backgroundColor = colourPicker.value;
        
    r = parseInt(colourPicker.value.substr(1,2), 16); // rgb from hexademical
    g = parseInt(colourPicker.value.substr(3,2), 16);
    b = parseInt(colourPicker.value.substr(5,2), 16);

    let newBackground = "hsl("+ getHue(r,g,b) + ", 33%, 74%";
    document.body.style.backgroundColor = newBackground;
    let newFontColour = "hsl("+ getHue(r,g,b) + ", 14%, 27%";
    document.body.style.color = newFontColour;

    let navBar = document.body.querySelectorAll("li a ");
    for (let i = 0; i < navBar.length; i++)
    {
        if (navBar[i].id != "home" && navBar[i].id != "basics" && navBar[i].id != "psychology" &&
            navBar[i].id != "res-home" && navBar[i].id != "res-basics" && navBar[i].id != "res-psychology")
        {
            navBar[i].style.color = newFontColour;
            navBar[i].addEventListener('mouseenter', ()=>
            {
                navBar[i].style.backgroundColor = "hsl("+ getHue(r,g,b) + ", 43%, 92%";
            });
            navBar[i].addEventListener('mouseleave', ()=>
            {
                navBar[i].style.backgroundColor = "white";
            });
        }
        else
            navBar[i].style.backgroundColor = newFontColour;
    }

    let shownDesc;
    if (r == g && g == b)
    {
        if (r == 0)
            shownDesc = document.body.querySelector("#black");
        else if (r == 255)
            shownDesc = document.body.querySelector("#white");
        else
            shownDesc = document.body.querySelector("#grey");
    }
    else
    {
        if ((getHue(r,g,b) >= 0 && getHue(r,g,b) <= 30)||(getHue(r,g,b) > 350 && getHue(r,g,b) < 360))
            shownDesc = document.body.querySelector("#red");
        else if (getHue(r,g,b) > 30 && getHue(r,g,b) <= 70)
            shownDesc = document.body.querySelector("#yellow");
        else if (getHue(r,g,b) > 70 && getHue(r,g,b) <= 150)
            shownDesc = document.body.querySelector("#green");
        else if (getHue(r,g,b) > 150 && getHue(r,g,b) <= 230)
            shownDesc = document.body.querySelector("#blue");
        else if (getHue(r,g,b) > 230 && getHue(r,g,b) <= 270)
            shownDesc = document.body.querySelector("#purple");
        else if (getHue(r,g,b) > 270 && getHue(r,g,b) <= 350)
            shownDesc = document.body.querySelector("#pink");
    }

    let colourDesc = document.body.querySelectorAll(".picker-left >div");
    for (let i = 0; i < colourDesc.length; i++)
    {
        if (colourDesc[i] != shownDesc)
            colourDesc[i].style.display = "none";
        else
            colourDesc[i].style.display = "block";
    }
});
}
