

const messageData={
    message_1:{
        subject:"Flipkart Delivery",
        body:"Your order is on the way!"
    },
    message_2: {
        subject: "Order Delayed - Flipkart",
        body: "Due to some unforeseen circumstances, your order has been delayed"
    },
    message_3:{
        subject:"Return Processing - Flipkart",
        body:"We have received your return and are processing it."
    },
    message_4:{
        subject:"Product Not Available - Flipkart",
        body:"The product you were looking for is not available. Please try again later or contact us."
    },
    message_5:{
        subject:"Payment Successful - Flipkart",
        body:"Congratulations! Your payment was successful. Enjoy your purchase."
    }
}

var city="erode"
var weatherData;
async function getWeather(){
    const data= await fetch(`
    https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=87cfbc9449359a5449b017e2d4c55013`)

   
  weatherData= await data.json();
const iconId=weatherData.weather[0].icon
const iconUrl=`http://openweathermap.org/img/w/${iconId}.png`
document.querySelector(".weatherIcon").src=iconUrl;
}

getWeather();




function updateTime() {
    const currentTimeElements = document.querySelectorAll(".header_time");
    const currentDay=document.querySelector(".dayName");
    var dayOfWeek;
    currentTimeElements.forEach((element) => {
        const currentTime =  new Date();
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
         dayOfWeek = daysOfWeek[currentTime.getDay()];
        const hours = currentTime.getHours().toString().padStart(2, '0');
        const minutes = currentTime.getMinutes().toString().padStart(2, '0');
        const seconds = currentTime.getSeconds().toString().padStart(2, '0');

        element.innerHTML = `${hours}:${minutes}:${seconds}`;
    });
    if(currentDay){
        currentDay.innerHTML=dayOfWeek;
    }
 

    setTimeout(updateTime, 1000);
}
updateTime();


var timer;
var seconds = 0;
var running = false;
var stoppedTime = 0;

function updateStopwatch() {
    const stopwatchElement = document.querySelector(".stopwatch");
    const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const remainingSeconds = (seconds % 60).toString().padStart(2, '0');
    stopwatchElement.innerHTML = `${hours}:${minutes}:${remainingSeconds}`;
    seconds++;
}

function displayStoppedTime() {
    const stoppedTimeElement = document.querySelector(".stoppedTime");
    const hours = Math.floor(stoppedTime / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((stoppedTime % 3600) / 60).toString().padStart(2, '0');
    const remainingSeconds = (stoppedTime % 60).toString().padStart(2, '0');
    stoppedTimeElement.innerHTML = `${hours}:${minutes}:${stoppedTime===0?remainingSeconds:remainingSeconds-1}`;
}

function startPause() {
    if (!running) {
        timer = setInterval(updateStopwatch, 1000);
        running = true;
    } else {
        clearInterval(timer);
        running = false;
    }
}

function stop() {
    clearInterval(timer);
    running = false;
    updateStopwatch(); 
    stoppedTime = seconds;
    displayStoppedTime();
}

function reset() {
    clearInterval(timer);
    running = false;
    seconds = 0;
    stoppedTime = 0;
    updateStopwatch();
    displayStoppedTime(); 
}

const messageSub = document.querySelector('.message_sub');


for (const messageId in messageData) {
    const subject = messageData[messageId].subject;
    const body = messageData[messageId].body;

    const subjectElement = document.createElement('p');
    subjectElement.classList.add('sub_list')
    subjectElement.textContent = subject;
    messageSub.appendChild(subjectElement);
  
}

document.addEventListener('DOMContentLoaded', function () {
    const homePage = document.querySelector('.home_page');
    const messagePage = document.querySelector('.message_page');
    const musicPage = document.querySelector('.music_page');
    const timerPage = document.querySelector('.timer_page'); 

    function showHomePage() {
        homePage.style.display = 'block';
        messagePage.style.display = 'none';
        musicPage.style.display = 'none';
        timerPage.style.display = 'none';
    }

    function showMessagePage() {
        homePage.style.display = 'none';
        messagePage.style.display = 'block';
        musicPage.style.display = 'none';
        timerPage.style.display = 'none';
    }

    function showMusicPage() {
        homePage.style.display = 'none';
        messagePage.style.display = 'none';
        musicPage.style.display = 'block';
        timerPage.style.display = 'none';
    }

    function showTimerPage() {
        homePage.style.display = 'none';
        messagePage.style.display = 'none';
        musicPage.style.display = 'none';
        timerPage.style.display = 'block';
    }

    showHomePage();

    document.querySelector('.far.fa-comment-dots').addEventListener('click', showMessagePage);
    document.querySelector('.fas.fa-music').addEventListener('click', showMusicPage);
    document.querySelector('.far.fa-clock').addEventListener('click', showTimerPage);
    document.querySelector('.header').addEventListener('click', showHomePage);
});


