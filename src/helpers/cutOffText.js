// Function to cut descriptions longer than 200 words to "..."

function cutOffText(sentence) {
    if (sentence.length < 200) {
        return sentence;
    } else {
        return sentence.substring(0, 200) + "...";
    }
};

export default cutOffText;
