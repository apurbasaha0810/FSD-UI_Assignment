// Media Player using HTML5's Media API
// Apurba Saha (557649)

// initialising the media player
document.addEventListener("DOMContentLoaded", function() { initialiseMediaPlayer(); }, false);

// Variables to store handles to various required elements
var mediaPlayer;
var playPauseBtn;
var muteBtn;
var progressBar;

function initialiseMediaPlayer() {
	// Get a handle to the player
	mediaPlayer = document.getElementById('media-video');
	
	// Get handles to each of the buttons and required elements
	playPauseBtn = document.getElementById('play-pause-button');
	muteBtn = document.getElementById('mute-button');
	progressBar = document.getElementById('progress-bar');

	// Hide the browser's default controls
	mediaPlayer.controls = false;
	
	// Add a listener for the timeupdate event so we can update the progress bar
	mediaPlayer.addEventListener('timeupdate', updateProgressBar, false);
	
	// Add a listener for the play and pause events so the buttons state can be updated
	mediaPlayer.addEventListener('play', function() {
		// Change the button to be a pause button
		changeButtonType(playPauseBtn, 'pause');
	}, false);
	mediaPlayer.addEventListener('pause', function() {
		// Change the button to be a play button
		changeButtonType(playPauseBtn, 'play');
	}, false);
	
	// need to work on this one more...how to know it's muted?
	mediaPlayer.addEventListener('volumechange', function(e) { 
		// Update the button to be mute/unmute
		if (mediaPlayer.muted) changeButtonType(muteBtn, 'unmute');
		else changeButtonType(muteBtn, 'mute');
	}, false);	
	mediaPlayer.addEventListener('ended', function() { this.pause(); }, false);
	
	localStorage.likeCount = localStorage.getItem("videoId0"+'likeCount');
	if (!localStorage.likeCount || localStorage.likeCount == "NaN" || localStorage.likeCount == "null") {
		localStorage.likeCount = 0;
	}
	document.getElementById("likeResult").innerHTML = localStorage.likeCount;
	
	localStorage.unlikeCount = localStorage.getItem("videoId0"+'unlikeCount');
	if (!localStorage.unlikeCount || localStorage.unlikeCount == "NaN" || localStorage.unlikeCount == "null") {
		localStorage.unlikeCount = 0;
	}
	document.getElementById("unlikeResult").innerHTML = localStorage.unlikeCount;
}

function togglePlayPause() {
	// If the mediaPlayer is currently paused or has ended
	if (mediaPlayer.paused || mediaPlayer.ended) {
		// Change the button to be a pause button
		changeButtonType(playPauseBtn, 'pause');
		// Play the media
		mediaPlayer.play();
	}
	// Otherwise it must currently be playing
	else {
		// Change the button to be a play button
		changeButtonType(playPauseBtn, 'play');
		// Pause the media
		mediaPlayer.pause();
	}
}

// Stop the current media from playing, and return it to the start position
function stopPlayer() {
	mediaPlayer.pause();
	mediaPlayer.currentTime = 0;
}

// Changes the volume on the media player
function changeVolume(direction) {
	if (direction === '+') mediaPlayer.volume += mediaPlayer.volume == 1 ? 0 : 0.1;
	else mediaPlayer.volume -= (mediaPlayer.volume == 0 ? 0 : 0.1);
	mediaPlayer.volume = parseFloat(mediaPlayer.volume).toFixed(1);
}

// Toggles the media player's mute and unmute status
function toggleMute() {
	if (mediaPlayer.muted) {
		// Change the cutton to be a mute button
		changeButtonType(muteBtn, 'mute');
		// Unmute the media player
		mediaPlayer.muted = false;
	}
	else {
		// Change the button to be an unmute button
		changeButtonType(muteBtn, 'unmute');
		// Mute the media player
		mediaPlayer.muted = true;
	}
}

// Replays the media currently loaded in the player
function replayMedia() {
	resetPlayer();
	mediaPlayer.play();
}

// Update the progress bar
function updateProgressBar() {
	// Work out how much of the media has played via the duration and currentTime parameters
	var percentage = Math.floor((100 / mediaPlayer.duration) * mediaPlayer.currentTime);
	// Update the progress bar's value
	progressBar.value = percentage;
	// Update the progress bar's text (for browsers that don't support the progress element)
	progressBar.innerHTML = percentage + '% played';
}

// Updates a button's title, innerHTML and CSS class to a certain value
function changeButtonType(btn, value) {
	btn.title = value;
	btn.innerHTML = value;
	btn.className = value;
}

// Loads a video item into the media player
function loadVideo() {
	for (var i = 0; i < arguments.length; i++) {
		var file = arguments[i].split('.');
		var ext = file[file.length - 1];
		// Check if this media can be played
		if (canPlayVideo(ext)) {
			// Reset the player, change the source file and load it
			resetPlayer();
			mediaPlayer.src = arguments[i];
			mediaPlayer.load();
			break;
		}
	}
}

// Checks if the browser can play this particular type of file or not
function canPlayVideo(ext) {
	var ableToPlay = mediaPlayer.canPlayType('video/' + ext);
	if (ableToPlay == '') return false;
	else return true;
}

// Resets the media player
function resetPlayer() {
	// Reset the progress bar to 0
	progressBar.value = 0;
	// Move the media back to the start
	mediaPlayer.currentTime = 0;
	// Ensure that the play pause button is set as 'play'
	changeButtonType(playPauseBtn, 'play');
}

function likeCounter() {
  if (typeof(Storage) !== "undefined") {
    if (localStorage.likeCount && localStorage.likeCount != "NaN") {
      localStorage.likeCount = Number(localStorage.likeCount)+1;
    } else {
      localStorage.likeCount = 1;
    }
    document.getElementById("likeResult").innerHTML = localStorage.likeCount;
	localStorage.setItem(document.getElementById("videoId").value+'likeCount', localStorage.likeCount);
  } else {
    document.getElementById("likeResult").innerHTML = "Sorry, your browser does not support web storage...";
  }
}

function unlikeCounter() {
  if (typeof(Storage) !== "undefined") {
    if (localStorage.unlikeCount && localStorage.unlikeCount != "NaN") {
      localStorage.unlikeCount = Number(localStorage.unlikeCount)+1;
    } else {
      localStorage.unlikeCount = 1;
    }
    document.getElementById("unlikeResult").innerHTML = localStorage.unlikeCount;
	localStorage.setItem(document.getElementById("videoId").value+'unlikeCount', localStorage.unlikeCount);
  } else {
    document.getElementById("unlikeResult").innerHTML = "Sorry, your browser does not support web storage...";
  }
}

function updateLikeUnlikeCount(videoId) {
	document.getElementById("videoId").value = videoId;
	
	localStorage.likeCount = localStorage.getItem(videoId+'likeCount');
	if (!localStorage.likeCount || localStorage.likeCount == "NaN" || localStorage.likeCount == "null") {
		localStorage.likeCount = 0;
	}
	document.getElementById("likeResult").innerHTML = localStorage.likeCount;
	
	localStorage.unlikeCount = localStorage.getItem(videoId+'unlikeCount');
	if (!localStorage.unlikeCount || localStorage.unlikeCount == "NaN" || localStorage.unlikeCount == "null") {
		localStorage.unlikeCount = 0;
	}
	document.getElementById("unlikeResult").innerHTML = localStorage.unlikeCount;
}