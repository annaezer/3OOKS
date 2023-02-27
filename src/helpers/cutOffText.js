// Functie om lange teksten met meer dan 300 tekens af te breken met '...'.

function cutOffText(sentence) {
    if (sentence.length < 300) {
        return sentence;
    } else {
        return sentence.substring(0, 300) + "...";
    }
}

export default cutOffText;
