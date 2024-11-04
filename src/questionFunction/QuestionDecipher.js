// Accept a transcript and check if their is a question 
function QuestionFinder(transcript) {
    try {
        // Check if the transcript is empty
        if (!transcript || transcript.length <= 0) {
            return ("No transcript was provided.");
            // return [];
        }

        // Array with words that signify a question
        const questionWords = ["who", "what", "when", "where", "why", "how", "should", "do", "can"];

        // Split transcript into sentences and filter out any empty elements
        const sentences = transcript.split(/[.?!]\s*/).filter(Boolean);

        // Identify questions
        const questions = sentences.filter(sentence => {
            const trimmedSentence = sentence.trim();

            // Check if the first word is a question word
            const firstWord = trimmedSentence.split(" ")[0].toLowerCase();
            return questionWords.includes(firstWord);
        });

        // If no questions are found, log a message and return an empty array
        if (questions.length === 0) {
            return ("No question found");
         
        }

        console.log("Questions found:", questions);
        return questions[0];
        
    } catch (error) {
        console.error("An error occurred:", error.message);
        return false;
    }
}
export default QuestionFinder