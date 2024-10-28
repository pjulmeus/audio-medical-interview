import { ref, getDownloadURL } from "firebase/storage";
import {storage} from "./firebaseConfig";
 
// Specify your file path in Firebase Storage

// Function to read .txt file from Firebase Storage
async function readTextFileFromFirebase(filePath) {
    try {
        // Reference the file in Firebase Storage
        const fileRef = ref(storage, filePath);

        // Get the download URL for the file
        const fileUrl = await getDownloadURL(fileRef);

        // Fetch the content of the file
        const response = await fetch(fileUrl);

        if (!response.ok) {
            throw new Error(`Error fetching file: ${response.statusText}`);
        }

        // Read the text content of the file
        const textContent = await response.text();

        console.log("File content:", textContent);
        return textContent;
    } catch (error) {
        console.error("Error reading file from Firebase Storage:", error);
    }
}


export default readTextFileFromFirebase