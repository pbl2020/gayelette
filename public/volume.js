function controlVolume(node,value){
	const localVideo = document.getElementById(node);
	if(localVideo === null) return;
	localVideo.volume = value; 
}

const calcVolume = (user1, user2) =>{
	const dx = user1.x - user2.x;
	const dy = user1.y - user2.y;
	let a = Math.abs(((degrees(Math.atan2(dy, dx)) + 360) % 360) - user2.angle);
	a = min(a, 360 - a);
	const x = Math.sqrt(dx * dx + dy * dy) * 2;
	let res = 0;

	for(let i = 0;i < config.volumeAngle.length; i++){
		const va = config.volumeAngle[i];
		console.log(va);
		if(va.angle > a){
			// res = max(res, 1 - (1 / (1 + Math.pow(Math.E, -(1 / (va.len * 0.5)) * (x - va.len * 1.5)))));
			if(x < va.len) res = 1;
			else res = max(res, 1 - ((x - va.len) / va.len));
		}
	}
	console.log("atan2 =", a, ", range =", x, ", result = ", res);
	return res;
}