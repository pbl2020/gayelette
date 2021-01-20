function connectRoom(roomId){
	let localStream = null;
	let peer = null;
	let existingCall = null;
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
		key: '10f66b8b-fbb8-449e-9492-a1871b23286e',
		debug: 3
	});

	peer.on('open', function(){
		$('#my-id').text(peer.id);
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

	function setupGetUserMedia() {
		let audioSource = $('#audioSource').val();
		let videoSource = $('#videoSource').val();
		let constraints = {
			audio: {deviceId: {exact: audioSource}},
			video: {deviceId: {exact: videoSource}}
		};
		constraints.video.width = {
			min: 320,
			max: 320
		};
		constraints.video.height = {
			min: 240,
			max: 240
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
}

function readCookie(key) {
	var tmp = document.cookie;
	var reg = new RegExp("/(?:(?:^|.*;\s*)" + key + "\\s*\=\s*([^;]*).*$)|^.*$/")
	var cookieValue = document.cookie.replace(reg, "$1");
	return cookieValue;
}

const sendPosture = async(x, y, angle, roomId, userId) =>{
	console.log(roomId, userId);
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
			x, y, angle, roomId, userId
		})
	}

	const url = config.serverUrl + "participant";
	console.log(url, option);

	fetch(url, option).then(res =>{
	}).catch(error => {
		console.log("error: ", error);
	})
}

const getPosture = async(x, y, angle, roomId, userId) =>{
	const option = {
		method: 'GET', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json'
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
	}

	const url = config.serverUrl + "participant";
	console.log(url, option);

	return await fetch(url, option).then(res => res).catch(error => {
		console.log("error: ", error);
	})
}

const getUser = async () => {
	const option = {
		method: 'GET', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json'
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
	}

	const url = config.serverUrl + "user&userId=" + readCookie("userId");
	console.log(url, option);

	return await fetch(url, option).then(res => res).catch(error => {
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
			'Content-Type': 'application/json'
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
	}

	const url = config.serverUrl + "room&roomId=" + readCookie("roomId");
	console.log(url, option);

	return await fetch(url, option).then(res => res).catch(error => {
		console.log("error: ", error);
	})
}

const init = () =>{
	config.user = await getUser();
	config.room = await getRoom();
	connectRoom(config.room.id);
};