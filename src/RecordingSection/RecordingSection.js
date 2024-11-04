import React, { useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import QuestionFinder from "../questionFunction/QuestionDecipher";
import OpenAI from "openai";
import readTextFileFromFirebase from "../firebase/FirebaseStorage";
import uploadTextFile from "../firebase/firebaseFunction";
import Button from 'react-bootstrap/Button';
import "./recording.css"

// Initialize OpenAI client with API key directly
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY, 
  dangerouslyAllowBrowser: true
});

const RecordingSection = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable
  } = useSpeechRecognition();

  const [script, setScript] = useState('');
  const [error, setError] = useState(null);
  const [openAiResponse, setOpenAiResponse] = useState('');
  const fileName = process.env.REACT_APP_FIREBASE_FILE_NAME; 

  const fetchOpenAiResponse = async (question) => {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: question }],
        max_tokens: 100,
      });
     
      let resSplit = response.choices[0].message.content.split(".");
      return resSplit[0] + (".")
    } catch (error) {
      if (error.response && error.response.status === 429) {
        setError("Rate limit exceeded. Please wait before trying again.");
        console.warn("Rate limit exceeded. Waiting before retrying...");
        setTimeout(() => fetchOpenAiResponse(question), 60000); // Retry after 1 minute
      } else {
        console.error("Error fetching OpenAI response:", error);
        setError("Could not fetch response from OpenAI");
      }
      return null;
    }
  };

  // Check for browser support and microphone availability
  if (!browserSupportsSpeechRecognition) {
    setError("Browser doesn't support speech recognition");
  }
  if (!isMicrophoneAvailable) {
    setError("Microphone is not available");
  }

  const stopTranscript = async () => {
    SpeechRecognition.stopListening();

    try {
      const question = QuestionFinder(transcript);
      setScript(question);
      // Read the file from Firebase to check for an answer
      const answer = await readTextFileFromFirebase(question, fileName);
      
      if (answer) {
        setOpenAiResponse(answer);
      } else {
        // Fetch from OpenAI and then upload to Firebase
        fetchOpenAiResponse(question)
          .then(openAiAnswer => {
            if (openAiAnswer && question) {
              setOpenAiResponse(openAiAnswer); // Set the OpenAI response
              return uploadTextFile(question, openAiAnswer, fileName); // Upload the response
            }
          })
          .catch(error => {
            console.error("Error during file check or upload:", error);
            setError("Error processing the request.");
          });
      }
    } catch (error) {
      console.error("Error during file read:", error);
      setError("Error reading the file.");
    }
  };

  const restartProgram = () => {
    resetTranscript()
    setScript("")
    setOpenAiResponse("")
    setError("")
  }

  return (
    <div className="left">
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <div className="btn-class">
      <Button onClick={SpeechRecognition.startListening}>Start Microphone</Button>
      <Button variant="danger" onClick={stopTranscript}>Stop Microphone</Button>
      <Button onClick={restartProgram}>Reset</Button>
      </div>
      <h3>{error}</h3>
      <h3>{transcript}</h3>
      <h3>Detected Questions:</h3>
      <h3>Question: {script}</h3>
      <h3>Answer:{openAiResponse}</h3>
    </div>
  );
};

export default RecordingSection;
