let peer = null;
let localStream = null;
let existingCall = null;

function initRoom(){
	let audioSelect = $('#audioSource');
	let videoSelect = $('#videoSource');

	navigator.mediaDevices.enumerateDevices()
		.then(function(deviceInfos) {
			for (let i = 0; i !== deviceInfos.length; ++i) {
				let deviceInfo = deviceInfos[i];
				let option = $('<option>');
				option.val(deviceInfo.deviceId);
				if (deviceInfo.kind === 'audioinput') {
					option.text(deviceInfo.label);
					audioSelect.append(option);
				} else if (deviceInfo.kind === 'videoinput') {
					option.text(deviceInfo.label);
					videoSelect.append(option);
				}
			}
			videoSelect.on('change', setupGetUserMedia);
			audioSelect.on('change', setupGetUserMedia);
			setupGetUserMedia();
		}).catch(function (error) {
			console.error('mediaDevices.enumerateDevices() error:', error);
			return;
		});

	peer = new Peer({
		key: '04b37624-0465-443b-9a67-867469528255',
		debug: 3
	});

	peer.on('open', function(){
		$('#my-id').text(peer.id);
		config.skywayId = peer.id;
	});

	peer.on('error', function(err){
		alert(err.message);
	});

	$('#make-call').submit(function(e){
		e.preventDefault();
		let roomName = $('#join-room').val();
		if (!roomName) {
			return;
		}
		const　call = peer.joinRoom(roomId, {mode: 'sfu', stream: localStream});
		setupCallEventHandlers(call);
	});

	$('#end-call').click(function(){
		existingCall.close();
	});
}
	
function addVideo(stream){
	const videoDom = $('<video autoplay>');
	videoDom.attr('id',stream.peerId);
	videoDom.get(0).srcObject = stream;
	$('.videosContainer').append(videoDom);
}

function removeVideo(peerId){
	$('#'+peerId).remove();
}

function removeAllRemoteVideos(){
	$('.videosContainer').empty();
}

function setupMakeCallUI(){
	$('#make-call').show();
	$('#end-call').hide();
}

function setupEndCallUI() {
	$('#make-call').hide();
	$('#end-call').show();
}

function setupGetUserMedia() {
		let audioSource = $('#audioSource').val();
		let videoSource = $('#videoSource').val();
		let constraints = {
			audio: {deviceId: {exact: audioSource}},
			video: {deviceId: {exact: videoSource}}
		};
		if(localStream){
			localStream = null;
		}

		navigator.mediaDevices.getUserMedia(constraints)
			.then(function (stream) {
				$('#myStream').get(0).srcObject = stream;
				localStream = stream;

				if(existingCall){
					existingCall.replaceStream(stream);
				}

			}).catch(function (error) {
				console.error('mediaDevice.getUserMedia() error:', error);
				return;
			});
	}


function setupCallEventHandlers(call){
	if (existingCall) {
		existingCall.close();
	};

	existingCall = call;
	setupEndCallUI();
	$('#room-id').text(call.name);

	call.on('stream', function(stream){
		addVideo(stream);
	});

	call.on('removeStream', function(stream){
		removeVideo(stream.peerId);
	});

	call.on('peerLeave', function(peerId){
		removeVideo(peerId);
	});

	call.on('close', function(){
		removeAllRemoteVideos();
		setupMakeCallUI();
	});
}

const calcVolume = (user1, user2) =>{
	const dx = user1.x - user2.x;
	const dy = user1.y - user2.y;
	const a = Math.atan2(dx, dy);
	const x = Math.sqrt(dx * dx + dy * dy) / 20 - 5;
	const res = 1 - (1 / (1 + Math.pow(Math.E, -x)))
	console.log("atan2 =", a, ", range =", x, ", result = ", res);
	return res;
}

function connectRoom(){
	let roomName = config.room.skywayKey;
		if (!roomName) {
			return;
		}
	const call = peer.joinRoom(roomName, {mode: 'sfu', stream: localStream});
	setupCallEventHandlers(call);
}

function readCookie(key) {
	const cookieValue = document.cookie
	.split('; ')
	.find(row => row.startsWith(key))
	.split('=')[1];
	return cookieValue;
}

const sendPosture = async(x, y, angle, role = "", roomId, userId) =>{
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
			x, y, angle, 
			role, 
			roomId: config.room.id, 
			userId: config.user.id, 
			skywayId: config.skywayId
		})
	}

	const url = config.serverUrl + "participant";
	console.log(url);

	fetch(url, option).then(res =>{
	}).catch(error => {
		console.log("error: ", error);
	})
}

const getPosture = async(roomId) =>{
	const option = {
		method: 'GET', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*'
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
	}

	const url = config.serverUrl + "participant?roomId=" + roomId;
	console.log(url);

	return fetch(url, option).then(res => res.json());
}

const getUser = async () => {
	const option = {
		method: 'GET', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*'
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
	}

	const url = config.serverUrl + "user?userId=" + readCookie("userId");
	console.log(url);

	return await fetch(url, option).then(res => res.json()).catch(error => {
		console.log("error: ", error);
	})
}

const getRoom = async() => {
	const option = {
		method: 'GET', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*'
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
	}

	const url = config.serverUrl + "room?roomId=" + readCookie("roomId");
	console.log(url);

	return await fetch(url, option).then(res => res.json()).catch(error => {
		console.log("error: ", error);
	})
}

const init = async() =>{
	config.user = (await getUser())[0];
	config.room = (await getRoom())[0];
	initRoom();
	setTimeout(() =>{
		connectRoom(config.room.skywayKey);
	}, 5000)
};
init();