$(document).ready(function() {
	
const apiKey = "";   //api key <=

let placesNames;

$("body").on("click", "li", (e) => {
	console.log(e.target.innerHTML);
	loadPlaces(e.target.innerHTML).then((data) => {
		placesNames = data.results;
		console.log(data);
		placesNames.forEach((each) => {
			let domString = `<p>${each.name}</p>`;
		$("#placeName").append(domString);
		})
	}).catch((error) => {
		console.log(error);
	});
});



const loadPlaces = (dropdownType) => {
		return new Promise((resolve, reject) => {
			$.ajax(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=36.1627,-86.7816&radius=50000&type=${dropdownType}&key=${apiKey}`)
		.done((data) => resolve(data))
		.fail((error) => reject(error));

		});
		
	};


});