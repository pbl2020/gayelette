const domain = "https://localhost:3001/";

async function onChangePage(page){
	const nodeResister = $("#wrapperResister");
	const nodeLogin = $("#wrapperLogin");
	if(page === "resister"){
		await closeWrapper(nodeLogin);
		await showWrapper(nodeResister);
	}else{
		await closeWrapper(nodeResister);
		await showWrapper(nodeLogin);
	}
}

async function closeWrapper(node){
	return new Promise((resolve, reject) =>{
		node.hide("clip", {direction: "horizontal"}, 500, () => resolve());
	})
}

async function showWrapper(node){
	return new Promise((resolve, reject) =>{
		node.show("clip", {direction: "horizontal"}, 500, () => resolve());
	})
}

function writeCookie(key, value) {
	document.cookie = key + "=" + value;
}

// 読み込み
function readCookie(key) {
	const cookieValue = document.cookie
  .split('; ')
  .find(row => row.startsWith(key))
  .split('=')[1];
	return cookieValue;
}

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
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*'
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: JSON.stringify({
			mail: mail,
			name: username,
			pass: password
		})
	}

	const url = "user";
	console.log(url, option);

	fetch(url, option).then(res => res.json()).then(json =>{
		console.log(json);
		writeCookie("userId", json.id);
		window.location.href = "rooms.html";
	}).catch(error => {
		console.log("error: ", error);
	})
}

function onLogin(){
	const mail = $("#input-mail-login").val();
	const password = $("#input-password-login").val();

	const option = {
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*'
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: JSON.stringify({
			mail: mail,
			pass: password
		})
	}

	const url = "login";
	console.log(url, option);

	fetch(url, option).then(res => res.json()).then(json =>{
		writeCookie("userId", json.id);
		window.location.href = "rooms.html";
	}).catch(error => {
		console.log("error: ", error);
	})
}

$("#wrapperLogin").hide();