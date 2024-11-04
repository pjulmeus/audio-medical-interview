import 'bootstrap/dist/css/bootstrap.min.css';
import RecordingSection from './RecordingSection/RecordingSection';
import "./App.css"
import Image from 'react-bootstrap/Image';



function App() {
  return (
    <div className="App montserrat">
      <Image src="AdobeStock_274238083_Preview.jpeg" alt='header'></Image>
      <h1>Audio Medical Transcribing Assistant</h1>
      <h3>Use speech to answer your everyday medical problems</h3>
      <RecordingSection/>
    </div>
  );
}

export default App;
