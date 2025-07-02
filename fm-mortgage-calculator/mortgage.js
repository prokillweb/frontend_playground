const clear_btn = document.querySelector("#clear");
const theme_btn = document.querySelector("#switch");
const body = document.body;
const form = document.querySelector("form");
const inputs = document.querySelectorAll("input[type='number']");
const errors = document.querySelectorAll(".error"); 
const toggle_divs = document.querySelectorAll(".toggle_div");
const boxes = document.querySelectorAll(".box");
const sections = document.querySelectorAll("section");
const radios = document.querySelectorAll("input[type='radio']");
const loading_div = document.querySelector(".loading");
let repeat_counter = 0;
let success_sound = new Audio('success.mp3');
// credit: success - u_2gxydaiwcd [Pixabay](https://pixabay.com/sound-effects/success-340660/)
let failure_sound = new Audio("failure.mp3");
// credit: Error 011 - Universfield [Pixabay](https://pixabay.com/ru/sound-effects/error-011-352286/)
success_sound.volume = 1;
failure_sound.volume = 1;
let rotation_angle = 0;
function clear_all(){
	inputs.forEach(input => input.value = "");
	radios.forEach(radio => radio.checked = false);
}	
inputs.forEach(input => {
	const initial_placeholder = input.placeholder;
	input.addEventListener("focus", () => input.placeholder = "Type here...");
	input.addEventListener("blur", () => input.placeholder = (input.value === "") ? initial_placeholder : "");
});
const invalid_inputs_msgs = ["Amount must be more than 0", "Term must be at least 1 year", "Rate must be between 0% and 50%"];
function validate(){
	let all_valid = true;
	const valid_amount = parseFloat(inputs[0].value.replace(/\D+\s/gi, "")) > 0;
	const valid_term = parseInt(inputs[1].value) > 0;
	const valid_rate = parseFloat(inputs[2].value) > 0 && parseFloat(inputs[2].value) < 50;
	const valids = [valid_amount, valid_term, valid_rate];
	errors.forEach((error, index) => {
		if(inputs[index].value === ""){
			error.textContent = "This field is required";
			boxes[index].style.border = "1px solid var(--colour-red)";
			sections[index].style.backgroundColor = "var(--colour-red)";
		}
	});
	errors.forEach((error, index) => {
		if(inputs[index].value !== ""){
			if(!valids[index]){
				error.textContent = invalid_inputs_msgs[index];
				boxes[index].style.border = "1px solid var(--colour-red)";
				sections[index].style.backgroundColor = "var(--colour-red)";
			}
			else {
				error.textContent = "";
				boxes[index].style.border = "1px solid black";
				sections[index].style.backgroundColor = "var(--colour-aqua)";
			}
		}
	});
	all_valid = valid_amount && valid_term && valid_rate;
	return all_valid;
}
function calculate_display(){
	let P = Number(inputs[0].value);
	let n = 12 * Number(inputs[1].value);
	let i = Number(inputs[2].value) / 1200;
	let monthly_payment, total_payment;
	if(radios[0].checked){
		monthly_payment = P * ((i * ((1 + i) ** n))/(((1 + i) ** n) - 1));
		total_payment = monthly_payment * n;
	}
	else if(radios[1].checked){
		monthly_payment = P * i;
		total_payment = monthly_payment * n + P;
	}
	document.querySelector(".mnt-rep").textContent = `£ ${monthly_payment.toFixed(2)}`;
	document.querySelector(".rep-term").textContent = `£ ${total_payment.toFixed(2)}`;
}
function toggle_div(){
	toggle_divs.forEach(div => div.classList.add("hidden"));
	loading_div.classList.remove("hidden");
	setTimeout(() => {
		loading_div.classList.add("hidden");
		toggle_divs[0].classList.remove("hidden");
	}, 2000);
}
clear_btn.addEventListener("click", clear_all);
if(localStorage.getItem('theme') === "dark"){
	body.classList.add("dark");
}
theme_btn.addEventListener("click", function(){
	body.classList.toggle("dark");
	const current_theme = body.classList.contains("dark") ? "dark" : "light";
	sections.forEach(section => section.style.color = body.classList.contains("dark") ? "hsl(0, 0%, 85%)" : "black");
	localStorage.setItem("theme", current_theme);
	rotation_angle += 180;
	document.querySelector("#rotate").style.transform = `rotate(${rotation_angle}deg)`;
});
form.addEventListener("submit", (e) => {
	e.preventDefault();
	const valid = validate();
	if(valid){
		toggle_div();
		calculate_display();
		repeat_counter++;
		success_sound.play();
	}
	else {
		failure_sound.play();
	}
});