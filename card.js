const all_inputs = document.querySelectorAll(".commons-inputs");
const all_data = document.querySelectorAll(".modify");
const all_notifs = document.querySelectorAll(".common-spans");
const form = document.querySelector("form");
const complete = document.querySelector(".complete");
const allowed_lengths = [20, 22, 2, 2, 3];
const initial_card = ["Jane Appleseed", "0000 0000 0000 0000", "00", "00", "000"];
const reset_btn = document.querySelector(".complete-btn");
let date = new Date();
function check_all_inputs(){
	let all_valid = false;
	const valid_month = 1 <= Number(all_inputs[2].value) && Number(all_inputs[2].value) <= 12 && Number(all_inputs[2].value) >= date.getMonth() + 1 && Number(`20${all_inputs[3].value}`) === date.getFullYear();
	const valid_year = Number(`20${all_inputs[3].value}`) >= date.getFullYear();
	const valid_number_length = all_inputs[1].value.length === 22;
	const card_name = all_inputs[0].value.trim();
	const valid_name = card_name !== "" && !/\d/.test(card_name);
	all_notifs[0].textContent = valid_name ? "" : "Can't be empty or contain numbers";
	all_notifs[1].textContent = (valid_number_length) ? "" : "Wrong format, try again";
	all_notifs[2].textContent = valid_month ? "" : "invalid!";
	all_notifs[3].textContent = valid_year ? "" : "past!";
	all_valid = valid_name && valid_number_length && valid_month && valid_year;
	return all_valid;
}
function show_thanks(){
	form.classList.add("hidden");
	complete.classList.remove("hidden");
	for(let i = 0; i < all_notifs.length; i++){
		all_notifs[i].textContent = initial_card[i];
	}
}
function cut_inputs(event){
	const input = event.target;
	const index = Array.from(all_inputs).indexOf(input);
	let input_value = input.value;
	if(index !== -1){
		if(index === 1 || index === 2 || index === 3 || index === 4){
			input_value = input_value.replace(/\D/gi, "");
			if(index === 1){
				let formatted_value = "";
				for(let i = 0; i < input_value.length; i++){
					if(i > 0 && i % 4 === 0){
						formatted_value += "  ";
					}
					formatted_value += input_value[i];
				}
				input_value = formatted_value;
			}
		}
		else if(index === 0){
			input_value = input_value.replace(/[0-9]+/g, "");
		}
		if(input_value.length > allowed_lengths[index]){
			input_value = input_value.slice(0, allowed_lengths[index]);
		}
		input.value = input_value;
	}
	display_data(event);
}
function display_data(event){
	const input = event.target;
	const index = Array.from(all_inputs).indexOf(input);
	if(index === 1){
		all_data[0].textContent = input.value === "" ? initial_card[0] : input.value;
	}
	else if(index === 0){
		all_data[1].textContent = input.value === "" ? initial_card[1] : input.value.toUpperCase();
	}
	else {
		all_data[index].textContent = input.value === "" ? initial_card[index] : input.value;
	}
}
all_inputs.forEach((input) =>{
	input.addEventListener("input", cut_inputs);
});
form.addEventListener("submit",(e) => {
	e.preventDefault();
	const result_form = check_all_inputs();
	if(result_form){
		show_thanks();
	}
});
reset_btn.addEventListener("click", function(){
	form.classList.remove("hidden");
	form.reset();
	complete.classList.add("hidden");
});