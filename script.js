const greeting  = document.getElementById("greeting");
const lidBot    = document.getElementById("lid-bot");
const lidTop    = document.getElementById("lid-top");
const irisSlit  = document.getElementById("iris-slit");
const pupil     = document.getElementById("pupil");
const eyeSvg = document.getElementById("eye-svg");
const scene = document.querySelector(".scene");

function wait(ms) { return new Promise(r => setTimeout(r, ms)); }
function getGreeting() {
const hour = new Date().getHours();

let timeGreeting;

    if (hour >= 5 && hour < 12) {
    timeGreeting = "Good morning";
        } else if (hour >= 12 && hour < 17) {
        timeGreeting = "Good afternoon";
    } else if (hour >= 17 && hour < 21) {
        timeGreeting = "Good evening";
    } else {
        timeGreeting = "Welcome back";
    }

    const variations = [
        `${timeGreeting}, Surbhi.`,
        "Welcome back, Surbhi.",
        "System ready, Surbhi.",
        "All systems operational.",
        "Ready when you are."
    ];
    return variations[Math.floor(Math.random() * variations.length)];
    }

function setLids(topY, botY, ms) {
    return new Promise(r => {
      lidTop.style.transition = `transform ${ms}ms ease`;
      lidBot.style.transition = `transform ${ms}ms ease`;
      lidTop.style.transform  = `translate(0,${topY}px)`;
      lidBot.style.transform  = `translate(0,${botY}px)`;
      setTimeout(r, ms);
    });
}

function movePupil(x, ms) {
    return new Promise(r => {
      pupil.style.transition    = `cx ${ms}ms ease`;
      irisSlit.style.transition = `cx ${ms}ms ease`;
      pupil.setAttribute("cx", x);
      irisSlit.setAttribute("cx", x);
      setTimeout(r, ms);
    });
}

async function blink() {
    await setLids(0, 0, 220);
    await wait(140);
    await setLids(-72, 72, 220);
    await wait(120);
}
async function run() {
    await wait(500);
    greeting.classList.add("visible");
    eyeSvg.classList.add("visible");
    await wait(1200);
    await setLids(0, 0, 400);
    await wait(500);
    await setLids(-72, 72, 400);
    await wait(500);
    // Look left
    await movePupil(88, 450);
    await wait(600);
    await blink();
    // Look right
    await movePupil(172, 450);
    await wait(600);
    await blink();
    await movePupil(130, 420);
    await wait(1000);
    await setLids(0, 0, 600);
    await wait(300); 
    scene.classList.add("fade-out");
    await wait(800);
    window.close();const { ipcRenderer } = require('electron');
    ipcRenderer.send('close-app');
}
greeting.textContent = getGreeting();
run();