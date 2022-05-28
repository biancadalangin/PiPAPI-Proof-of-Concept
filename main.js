window.addEventListener("load", startup, false);
let video;

function startup() {
	video = document.getElementById("video"); /* video variable */

	/* to check if PiP is available */
	if (document.pictureInPictureEnabled) {

		document
			.querySelector(".no-picture-in-picture") /* if PiP is not supported or disabled then the toggle PiP button will be hidden */
			.remove();

			/* toggle PiP button shows up if PiP is available */
			const togglePipButton = document.createElement('text');
			togglePipButton.innerHTML = 
			'<img src="pip_btn.png" style="width: 25%; display: block; margin-top: 5%; margin-bottom: 5%; margin-left: 36%; margin-right: auto;">'
			togglePipButton.addEventListener("click", togglePictureInPicture, false); /* If there is no element in PiP yet, let’s request Picture-in-Picture for the video, otherwise leave it. */

		document
			.getElementById("button")
			.appendChild(togglePipButton);
	}
}

function togglePictureInPicture() {
	if (document.pictureInPictureElement) {
		document.exitPictureInPicture(); /* for the video in PiP mode to return to its original box */
	} else {
		if (document.pictureInPictureEnabled) {
			video.requestPictureInPicture() 
				.then(pictureInPictureWindow => {
					pictureInPictureWindow.addEventListener("resize", onPictureInPictureResize, false); /* when the video changes size */
				});
		}
	}
}
