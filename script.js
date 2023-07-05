//testing

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Get Quotes From API
let apiQuotes = [];

//Show Loading and hide the quote
function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide loading and show quote container
function removeLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//Show New Quote
function newQuote(){
    removeLoadingSpinner();
    //Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    //Check if "Author" field is blank and replace it with "Unknown"
    if (!quote.author) {
        author.textContent = "-Unknown"
    } else {
        authorText.textContent = "-" + quote.author;
    }

    //Check Quote length to determine styling
    if (quote.text.length > 80) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    //Set quote and hide loader
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}

//Get Quote
async function getQuotes() {
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        //fetch request
        const reponse = await fetch(apiUrl);
        apiQuotes = await reponse.json();
        newQuote(); //fetch quotes using the API
        
        // throw new Error('Oops');
    } catch(error) {
        //Catch error here
        console.log("A WHOOPSIE has occurred!", error);        
    }
}

//Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.textContent} ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Get Quotes (Locally from javscript file)
function newQuote_Local(){
    //Pick a random quote from apiQuotes array
    const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
    console.log(quote);
}

//Event Listener
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//**On Load (as soon as the page loads)**
getQuotes();
//newQuote_Local(); //fetch quote locally from quotes.js file