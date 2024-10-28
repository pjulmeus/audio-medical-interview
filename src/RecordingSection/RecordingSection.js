import React, {useState} from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import QuestionFinder from "../QuestionFunction /QuestionDecipher";
import MedicalAnswers from "./MedicalAnswers";

const RecordingSection = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable
  } = useSpeechRecognition();

  const [script, setTranscript] = useState('')
  const [error, setError] = useState(null);

  if (!browserSupportsSpeechRecognition) {
    setError("Browser doesn't support speech recognition")
  }
  if(!isMicrophoneAvailable){
    setError("Microphone is not available")
  }

const stopTranscript = () =>{
    SpeechRecognition.stopListening()
    setTranscript(QuestionFinder(transcript))
  }


  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={stopTranscript}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{error}</p>
      <p>{transcript}</p>
      <h3>Detected Questions</h3>
      <h4>Question : {script}</h4>
      <MedicalAnswers question={script}/>
    </div>
  );
};
export default RecordingSection;