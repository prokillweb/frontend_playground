const calc_btn = document.querySelector("#calc-btn");
const errors = document.querySelectorAll(".error");
const inputs = document.querySelectorAll("input");
const outputs = document.querySelectorAll(".out");
let final_time = new Date();
function validate_inputs(){
	let all_valid = true;
	const leap_year = (Number(inputs[2].value) % 4 === 0 && Number(inputs[2].value) % 100 !== 0) || (Number(inputs[2].value) % 400 === 0);
	let allowed_days = [31, leap_year ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	const valid_year = (Number(inputs[2].value) < final_time.getFullYear());
	const valid_month = (Number(inputs[1].value) >= 1 && Number(inputs[1].value) <= 12);
	const valid_day = (Number(inputs[0].value) <= allowed_days[Number(inputs[1].value.slice(0, 2)) - 1] && Number(inputs[0].value) >= 1);
	const valid_arr = [valid_day, valid_month, valid_year];
	errors.forEach(e => e.textContent = "");
	for(let i = 0; i < inputs.length; i++){
		if(inputs[i].value === ""){
			all_valid = false;
			errors[i].textContent = "This field is required";
		}
		else {
			errors[i].textContent = valid_arr[i] ? "" : "Must be valid!";
			if(!valid_arr[i]){
				outputs.forEach(o => o.textContent = "--");
			}
			all_valid = valid_day && valid_month && valid_year;
		}
	}
	return all_valid;
}
calc_btn.addEventListener("click", function(){
	console.log(calculate_age());
});
let initial_time = Date.now();
function calculate_age(){
	const valid = validate_inputs();
	if(!valid){
		return;
	}
	else {
		const input_date = new Date(Number(inputs[2].value), Number(inputs[1].value) - 1, Number(inputs[0].value));
		const current_date = new Date();
		let years = current_date.getFullYear() - input_date.getFullYear();
		let months = current_date.getMonth() - input_date.getMonth();
		let days = current_date.getDate() - input_date.getDate();
		if(days < 0){
			months--;
			days += new Date(current_date.getFullYear(), current_date.getMonth(), 0).getDate();
		}
		if(months < 0){
			years--;
			months += 12;
		}
		outputs[0].textContent = years;
		outputs[1].textContent = months;
		outputs[2].textContent = days;
	}
}