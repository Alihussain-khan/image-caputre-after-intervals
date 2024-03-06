<template>
  <div>
    <button @click="startCapture">Start Capture</button>
    <button @click="stopCapture">Stop Capture</button>
  </div>
</template>

<script setup>
let intervalId;
let counter = 1;
let imagearray = [];
function startCapture() {
  captureImage();
  intervalId = setInterval(captureImage, 10000); // Set interval to 5000 milliseconds (5 seconds)
}

function stopCapture() {
  clearInterval(intervalId);
  console.log(imagearray);
}
async function captureImage() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const video = document.createElement("video");

    // Set the video stream as the source of the video element
    video.srcObject = stream;

    // Wait for the video to be loaded
    video.onloadedmetadata = () => {
      // Create a canvas element to draw the video frames
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");

      // Draw the current video frame on the canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert the canvas content to a data URL representing a JPEG image
      const imageDataURL = canvas.toDataURL("image/jpeg");
      // console.log(imageDataURL);
      imagearray.push(imageDataURL);
      // Create a link element to download the image
      // const link = document.createElement("a");
      // link.href = imageDataURL;
      // link.download = `captured_image_${counter}.jpg`;
      // link.click();

      // Increase the counter for the next image
      counter++;

      // Stop the video stream
      stream.getTracks().forEach((track) => track.stop());
    };

    // Start playing the video to trigger the onloadedmetadata event
    video.play();
  } catch (error) {
    console.error("Error capturing image:", error);
  }
}
</script>

<style lang="scss" scoped></style>
