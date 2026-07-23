// ==========================================
// ORION GNSS PRO ADVANCED
// Core Engine v0.1
// ==========================================

const dashboard = document.getElementById("dashboard");
const signalMonitor = document.getElementById("signalMonitor");
const compass = document.getElementById("compass");

function updateDashboard(position){

    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const alt = position.coords.altitude ?? "N/A";
    const acc = position.coords.accuracy;
    const speed = position.coords.speed ?? 0;
    const heading = position.coords.heading ?? 0;

    dashboard.innerHTML = `

<b>Latitude:</b> ${lat.toFixed(6)}<br>
<b>Longitude:</b> ${lon.toFixed(6)}<br>
<b>Altitude:</b> ${alt}<br>
<b>Accuracy:</b> ${acc} m<br>
<b>Speed:</b> ${speed} m/s<br>
<b>Heading:</b> ${heading}°

`;

    signalMonitor.innerHTML = `
GNSS receiver active.<br>
Waiting for advanced satellite information...
`;

}

function errorLocation(){

    dashboard.innerHTML =
    "Unable to obtain GNSS location.";

}

if(navigator.geolocation){

    navigator.geolocation.watchPosition(

        updateDashboard,

        errorLocation,

        {

            enableHighAccuracy:true,

            maximumAge:1000,

            timeout:10000

        }

    );

}

if(window.DeviceOrientationEvent){

window.addEventListener("deviceorientation",event=>{

let heading = event.alpha;

if(heading!==null){

compass.innerHTML=`
<b>Compass</b><br><br>
${heading.toFixed(1)}°
`;

}

});

}

const canvas=document.getElementById("skyCanvas");

const ctx=canvas.getContext("2d");

function drawRadar(){

ctx.clearRect(0,0,500,500);

ctx.strokeStyle="#36c2ff";

ctx.lineWidth=2;

ctx.beginPath();

ctx.arc(250,250,200,0,Math.PI*2);

ctx.stroke();

ctx.beginPath();

ctx.arc(250,250,130,0,Math.PI*2);

ctx.stroke();

ctx.beginPath();

ctx.arc(250,250,60,0,Math.PI*2);

ctx.stroke();

ctx.beginPath();

ctx.moveTo(250,50);

ctx.lineTo(250,450);

ctx.stroke();

ctx.beginPath();

ctx.moveTo(50,250);

ctx.lineTo(450,250);

ctx.stroke();

}

drawRadar();
