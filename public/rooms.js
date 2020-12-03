async function fetchRooms(){
	return new Promise((resolve, reject) =>{
		setTimeout(() =>{
			resolve([{
				name: "PBL2020-Team6",
			}, {
				name: "test",
			}, {
				name: "test",
			}, {
				name: "test",
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

function createRoomTag(room){
	return `
		<div class="room-container">
			<div class="room-name">
				${room.name}
			</div>
			<div class="room-members">
			</div>
			<div class="button-container">
				<button class="button" onclick="onResister()">
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