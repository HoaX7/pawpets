// DOM Elements
const time = document.getElementById('time'),
  greeting = document.getElementById('greeting'),
  name = document.getElementById('name'),
  food = document.getElementById('food'),
  dine = document.getElementById('dine');
  para = document.getElementById('para');

// Options
const showAmPm = true;

// Show Time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  // Set AM or PM
  const amPm = hour >= 12 ? 'PM' : 'AM';

  // 12hr Format
  hour = hour % 12 || 12;

  // Output Time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    sec
  )} ${showAmPm ? amPm : ''}`;

  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// food


// Set Background and Greeting
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();

  if (hour >= 6 && hour < 13) {
    // Morning
    document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1554904747-2e90c703fac5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80')";
    greeting.textContent = 'Good Morning, ';
    dine.textContent = 'Have a Pawful day!'
    document.body.style.backgroundSize = 'cover';
    greeting.style.color = "white";
    dine.style.color = 'white';
    time.style.color = 'white';
    name.style.color = 'white';
    food.style.color = 'white';
    para.style.color = 'white';
  } else if (hour >= 13 && hour <= 17) {
    // Afternoon
    document.body.style.backgroundImage = "url('https://i.pinimg.com/originals/1d/c9/ca/1dc9caf8c7ede4c33156bbcaa5edbaba.jpg')";
    greeting.textContent = 'Good Afternoon, ';
    document.body.style.color = 'white';
  } else if(hour < 22) {
    // Evening
    document.body.style.backgroundImage = "url('https://i.ibb.co/924T2Wv/night.jpg')";
    greeting.textContent = 'Good Evening, ';
    greeting.style.color = "white";
    dine.style.color = 'white';
    time.style.color = 'white';
    name.style.color = 'white';
    food.style.color = 'white';
    para.style.color = 'white';
  } else {
    document.body.style.backgroundImage = "url('https://i.ibb.co/924T2Wv/night.jpg')";
    greeting.textContent = 'Good Night, ';
    dine.textContent = "Nighty Night Pawers, Sleep tight"
    greeting.style.color = "white";
    dine.style.color = 'white';
    time.style.color = 'white';
    name.style.color = 'white';
    food.style.color = 'white';
    para.style.color = 'white';
  }
}

// Get Name
function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}



// Set Name
function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
  }
}

function getFood() {
  let today = new Date(),
    hour = today.getHours();

  if (hour >= 13 && hour <= 15) {
    food.textContent = "Lunch Time! don't forget to feed your pets!"
  } else if (hour >= 16 && hour <= 18) {
    food.textContent = "Snack Time! Have a treat"
  } else if (hour >= 20 && hour < 22) {
    food.textContent = "Dinner Lounge is now open"
    dine.textContent = 'We hope you had a great day with your pet! '
  } else if (hour >= 7 && hour <= 9 ) {
    food.textContent = "Breakfast in bed!"
    dine.textContent = 'Have a pawful day!'
  }
}


name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);

// Run
showTime();
setBgGreet();
getName();
getFood();
