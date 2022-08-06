// All game quotes
const quotes = [
    'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
    'There is nothing more deceptive than an obvious fact.',
    'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
    'I never make exceptions. An exception disproves the rule.',
    'What one man can invent another can discover.',
    'Nothing clears up a case so much as stating it to another person.',
    'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
];

// store the list of words and the index of the word the player is currently typing

let words = [];
let wordIndex = 0;

// Take note of the starting time
let startTime = Date.now();

// Page elements

const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');

// Listen for the start button 
document.getElementById('start').addEventListener('click', () => {
    // Get a quote
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[quoteIndex];

    // Add the quote into an array of words
    words = quote.split(' ');

    // Reset the word index
    wordIndex = 0;

    //Ui Updates
    // Create an array of span elements so we can set a class
    const spanWords = words.map(function(word) {return `<span>${word} </span>`});

    // Convert into a string and set as the innerHtml on the quote display
    quoteElement.innerHTML = spanWords.join('');

    // Highlight the first word
    quoteElement.childNodes[0].className = 'highlight';

    // Clear any prior messages

    messageElement.innerText = '';

    // Setup the textbox and clear it

    typedValueElement.value = '';

    //set focus
    typedValueElement.focus();

    // Start the timer

    startTime = new Date().getTime();

});

typedValueElement.addEventListener('input', (e) => {
    // Get the current word
    const currentWord = words[wordIndex];
    
    // Get the current value
    const typedValue = typedValueElement.value;

    if (typedValue === currentWord && wordIndex === words.length - 1) {
        // it's the end of the sentence, display success
        const elapsedTime = new Date().getTime() - startTime;
        const message = `CONGRATULATIONS, that's some typing.You finished in ${elapsedTime / 1000} seconds.`;
        messageElement.innerText = message;
    } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
        
        // the end of the word ,clear the typedValueElement for the new word
        typedValueElement.value = '';
        
        // Move to the next word
        wordIndex++;

        //reset the class name for all elements in quote

        for (const wordElement of quoteElement.childNodes) {
           wordElement.className = '';
            
        }
        // Highlight the new word
        quoteElement.childNodes[wordIndex].className = 'highlight';
    } else if (currentWord.startsWith(typedValue)) {
        //it is currently correct, highlight the next word
        typedValueElement.className = '';
    } else {
        // error state
        typedValueElement.className = 'error';
    }
});