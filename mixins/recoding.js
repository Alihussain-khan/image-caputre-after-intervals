export default function usecounter() {
  let mediaRecorder = "";
  let globalstream = "";
  let intervalId;
  let counter = 1;
  function startvid() {
    var mediaDevices = navigator.mediaDevices;
    mediaDevices.getUserMedia({ video: true }).then((stream) => {
      mediaRecorder = new MediaRecorder(stream);
      globalstream = stream;
      mediaRecorder.start();
      console.log(mediaRecorder.state);
      console.log("recorder started");
      const recordedChunks = [];
      mediaRecorder.ondataavailable = function (e) {
        console.log(e.data);
        recordedChunks.push(e.data);
      };
      mediaRecorder.onstop = function () {
        var blob = new Blob(recordedChunks, {
          type: "video/mp4",
        });
        console.log(blob);
        // var url = URL.createObjectURL(blob);
        // var a = document.createElement("a");
        // document.body.appendChild(a);
        // a.setAttribute("style", "display: none");
        // a.href = url;
        // a.download = "test.webm";
        // a.click();
        // window.URL.revokeObjectURL(url);
      };
    });
  }
  function stopvid() {
    mediaRecorder.stop();
    globalstream.getTracks().forEach((track) => track.stop());
  }
  return {
    startvid,
    stopvid,
  };
}
