// Function to cut descriptions longer than 500 words to "..."

function cutOffText(sentence) {
    if (sentence.length < 500) {
        return sentence;
    } else {
        return sentence.substring(0, 500) + "...";
    }
};

export default cutOffText;
