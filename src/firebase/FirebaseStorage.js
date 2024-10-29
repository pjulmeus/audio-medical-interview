import { ref, getDownloadURL } from "firebase/storage";
import {storage} from "./firebaseConfig";
 
// Specify your file path in Firebase Storage

// Function to read .txt file from Firebase Storage
async function readTextFileFromFirebase(question, filePath) {
    try {
        // Reference the file in Firebase Storage
        const fileRef = ref(storage, filePath);
        console.log(fileRef)

        // Get the download URL for the file
        const fileUrl = await getDownloadURL(fileRef);

        // Fetch the content of the file
        const response = await fetch(fileUrl);

        console.log(response)

        if (!response.ok) {
            throw new Error(`Error fetching file: ${response.statusText}`);
        }

        // Read the text content of the file
        const textContent = await response.text();
        console.log("File content:", textContent);

        // Split the text content into lines
        const lines = textContent.split('\n');

        // Find the answer that includes the question
        const ans = lines.find(line => line.toLowerCase().includes(question.toLowerCase())) || null;

        return ans;  // Return the answer or a default message
    } catch (error) {
        console.error("Error reading file from Firebase Storage:", error);
        return null;  // Return null in case of an error
}
}
  

export default readTextFileFromFirebase