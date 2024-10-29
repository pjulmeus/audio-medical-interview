import { ref, getDownloadURL, uploadString } from "firebase/storage";
import {storage} from "./firebaseConfig"

const uploadTextFile = async (question, text, fileName) => {
    try {
        const storageRef = ref(storage, fileName);

        // Get current content of the file (if it exists)
        let currentContent = '';
        try {
            const fileUrl = await getDownloadURL(storageRef);
            const response = await fetch(fileUrl);
            currentContent = await response.text();
        } catch (error) {
            console.log("File not found, creating a new one.");
        }

        // Append the new text to the current content
        const updateText = `${currentContent}\n${question}: ${text}`;

        // Upload the updated text content back to Firebase Storage
        await uploadString(storageRef, updateText, 'raw', { contentType: 'text/plain' });

        console.log("Text file uploaded and updated successfully!");
    } catch (error) {
        console.error("Error uploading text file:", error);
        
    }
};

export default uploadTextFile;
