const options = document.querySelectorAll(".option");
const container_1 = document.querySelector(".container1");
const container_2 = document.querySelector(".container2");
const rank_span = document.querySelector(".rank");
let previous_index = -1;
let recent_index = 0;
options.forEach((button, index) => {
	button.addEventListener("click", function(){
		if(previous_index !== null && previous_index !== index){
			options[index].style.backgroundColor = "white";
			if(previous_index !== -1){
				options[previous_index].style.backgroundColor = "rgba(38,47,56,255)";
			}
		}
		recent_index = index + 1;
		previous_index = index;
	});
});
function showThanks(){
	container_1.classList.toggle("hidden");
	container_2.classList.toggle("hidden");
	rank_span.innerText = `You selected ${recent_index} out of 5`;
}
container_1.addEventListener("submit", (e) => {
	e.preventDefault();
	if(recent_index > 0){
		showThanks();
	}
	else {
		alert("Please select a rating!");
	}
});
