const domain = "https://localhost:3001/";

function onResister(){
	const mail = $("#input-mail").val();
	const username = $("#input-username").val();
	const password = $("#input-password").val();

	const option = {
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json'
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: JSON.stringify({
			mail: mail,
			username: username,
			password: password
		})
	}

	const url = domain + "user";
	console.log(url, option);

	fetch(url, option).then(res =>{
		window.location.href = "rooms.html"
	}).catch(error => {
		console.log("error: ", error);
	})
}