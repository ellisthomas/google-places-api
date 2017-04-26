$(document).ready(function() {
	
const apiKey = "";   //api key <=



	$("body").on("click", "li", (e) => {
		console.log(e.target.innerHTML);
		loadPlaces(e.target.innerHTML).then((results) => {
			// console.log(data);
			writePlaceToDom(results);
		}).catch((error) => {
			console.log(error);
		});
	});

	$("body").on("click", ".place", (e) => {
		let place_id = e.target.id;
		loadDetails(place_id).then((result) => {
			console.log("result", result);
			writeAddressToDom(result.formatted_address);
		});

	});


	const loadDetails = (place_id) => {
		return new Promise((resolve, reject) => {
			$.ajax(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${place_id}&key=${apiKey}`)
			.done((data) => resolve(data.result))
			.fail((error) => reject(error));
		});
	};

	const loadPlaces = (dropdownType) => {
			return new Promise((resolve, reject) => {
				$.ajax(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=36.1627,-86.7816&radius=50000&type=${dropdownType}&key=${apiKey}`)
			.done((data) => resolve(data.results))
			.fail((error) => reject(error));
			});
			
		};

	const writeAddressToDom = (address) => {
		let outputString = `<div>${address}</div>`;
		$("#addresses").append(outputString);
	};	

	const writePlaceToDom = (results) => {
		let outputString = "";
		for(let i = 0; i < results.length; i++) {
			outputString += `<a href"#"><div id="${results[i].place_id}" class="place">${results[i].name}</div></a>`;
		}
		$("#input").html(outputString);
	};	



}); //close of document.ready




