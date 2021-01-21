const domain = "https://localhost:3001/";

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

async function fetchRooms(){
	return new Promise((resolve, reject) =>{
		setTimeout(() =>{
			resolve([{
				id: "PBL2020-Team6",
				skywayKey: "aiueo",
				name: "PBL2020-Team6",
				admin: "g031q062"
			}, {
				id: "PBL2020-Team6",
				skywayKey: "aiueo",
				name: "test",
				admin: "g031q062"
			}])
		}, 5000)
	})
}

let rooms = [];

function renderRoom(){
	const nodeRoomList = document.getElementById("room-list");
	nodeRoomList.innerHTML = "";
	for(let i = 0;i < rooms.length; i++){
		nodeRoomList.innerHTML += createRoomTag(rooms[i]);
	}
	nodeRoomList.innerHTML += `
		<button class="button-create-room">
			+
		</button>
	`;
}

function onJoinRoom(id){
	writeCookie("roomId", id);
	window.location.href = domain + "index.html";
}

function createRoomTag(room){
	return `
		<div class="room-container">
			<div class="room-name">
				${room.name}
			</div>
			<div class="room-members">
			</div>
			<div class="button-container">
				<button class="button" onclick="onJoinRoom('${room.id}')">
					JOIN!!
				</button>
			</div>
		</div>
	`;
}

async function reloadRooms(){
	rooms = await fetchRooms();
	renderRoom();
}