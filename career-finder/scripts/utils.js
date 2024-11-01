const currentYearElement = document.querySelector("#currentyear");
const lastModified = document.querySelector("#last-modified");

const today = new Date();
const year = today.getFullYear();

currentYearElement.innerHTML = year;
lastModified.innerHTML = document.lastModified;

const mainNav = document.querySelector('.navigation')
const hamburgerBtn = document.querySelector('#menu');

hamburgerBtn.addEventListener('click', () => {
	mainNav.classList.toggle('open');
	hamburgerBtn.classList.toggle('open');
});