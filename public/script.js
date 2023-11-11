// Navbar
const nav = document.querySelector("nav");

window.addEventListener("scroll", function(){
  nav.classList.toggle("sticky", window.scrollY > 120);
});

let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');
let icon = menu.querySelector('i');  

menu.onclick = () => {
  icon.classList.toggle('bi-x');

  navlist.classList.toggle('active');
}

window.onscroll = () => {
  icon.classList.remove('bi-x');

  navlist.classList.remove('active');
}

//Get data 
const contactForm = document.querySelector('.contact-form');

let fullName = document.getElementById('name');
let email = document.getElementById('email');
let number = document.getElementById('phone-number');
let message= document.getElementById('message');

// Authenticate Data
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhoneNumber(number) {
  const phoneRegex = /^\+?\d{1,3}?[-.\s]?\(?(\d{1,3}?)?\)?[-.\s]?\d{1,2}[-.\s]?\d{2,4}[-.\s]?\d{2,4}$/;  
  return phoneRegex.test(number);
}

function isValidFullName(fullName) {
    const nameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
    return nameRegex.test(fullName);
  }

function dataAuthentication(formData) {
  if (formData.fullName === '') {
    alert('Please enter your first name.');
    return false;
  } else if (!isValidFullName(formData.fullName)) {
    alert("Please enter a valid full name (first and last name).");
    return false;
  }

  if (formData.email === '') {
    alert('Please enter your email.');
    return false;
  } else if (!isValidEmail(formData.email)){
    alert("The email you entered is not valid.");
    return false;
  }

  if (formData.number === '') {
    alert('Please enter your phone number');
    return false;
  } else if (!isValidPhoneNumber(formData.number)) {
    alert("The phone number you entered is not valid.");
    return false;
  }

  if (formData.message === '') {
    alert('Please enter a message.');
    return false;
  }

  return true;
};

// Send data to server
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let formData = {
    fullName: fullName.value,
    email: email.value,
    number: number.value,
    message: message.value
  }

  if (!dataAuthentication(formData)) {
    return;
  }

  let xhr = new XMLHttpRequest();
  xhr.open('POST', '/.netlify/functions/sendEmail');  
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.onload = function() {
    const response = JSON.parse(xhr.responseText);
    console.log(response);
    if(response.message == 'Email sent successfully'){
      alert('Email sent');
      fullName.value = '';
      email.value = '';
      number.value = '';
      message.value = '';
    }else{
      alert('Something went wrong!');
    }
  };
  xhr.send(JSON.stringify(formData));
});