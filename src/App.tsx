import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const constraints = {
  video: {
    width: {
      min: 1280,
      ideal: 1920,
      max: 2560,
    },
    height: {
      min: 720,
      ideal: 1080,
      max: 1440,
    },
  },
};

function App() {
  let isMediaAvailable = ":( Media features are not available";
  if ("mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices) {
    isMediaAvailable = ":) Media Capabilities are available";
    // Requesting for Permission
    navigator.mediaDevices.getUserMedia({ video: true });

    const initCamera = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      debugger;
      const videoCam = devices[1];
      const updatedConstraints = {
        ...constraints,
        deviceId: {
          exact: videoCam.deviceId,
        },
      };
      //Get the Stream Object
      const videoStream = await navigator.mediaDevices.getUserMedia(
        updatedConstraints
      );
      //Set the stream to the video element on the page
      setTimeout(function () {
        alert("Setting video stream");
        const videoElement: any = document.querySelector("video");
        videoElement.srcObject = videoStream;
      }, 1500);
    };
    initCamera();
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>PWA Application</h1>
      <video style={{ width: 1280, height: 720 }} autoPlay></video>
    </>
  );
}

export default App;
