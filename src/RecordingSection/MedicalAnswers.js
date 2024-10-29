
import React, { useEffect, useState } from "react";
// import readTextFileFromFirebase from '../firebase/FirebaseStorage'


const MedicalAnswers = ({question}) => {
// const filePath = 'gs://fir-medical-assistant-5a32b.appspot.com/medical-info.txt'; 
// const [answer, setAnswer] = useState("");

// useEffect(() => {
//     // Define an async function within useEffect
//     const fetchMedicalText = async () => {
//         try {
//             const text = await readTextFileFromFirebase(filePath);
//              // Split document text into lines
//             const lines = text.split('\n');
    
    
//             const ans = lines.find(line => line.toLowerCase().includes(question.toLowerCase())) || "No answer found.";
//             // throw new Error("No answer found")
//             setAnswer(ans);
//         } catch (error) {
//             console.error("Error fetching medical text:", error);
//         }
//     };

//     // Call the async function
//     fetchMedicalText();
// }, [question]); // Dependency array
    
 return(
    <>
        <h1>Suggested Answers</h1>
        {/* <h3>Answers : {answer}</h3>
        <button onClick={() => setAnswer("")} >Clear Answer</button> */}
    </>
        
 )
}

export default MedicalAnswers