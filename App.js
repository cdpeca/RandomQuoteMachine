let quotes, currentQuote, currentAuthor;

// Make an asynchronous API call to fetch bulk quotes
const fetchQuotes = async () => {
    try {
        const quoteAPI = `https://type.fit/api/quotes`;
        const response = await fetch(quoteAPI);
        quotes = await response.json();
        console.log(`fetchQuotes()`);
        console.log(quotes);
    } catch (err) {
        console.log(err);
    }
};

// Pick a random quote from the quotes datastore
const getRandomQuote = () => {
    const min = 0;
    const max = quotes.length - 1;
    const index = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(`getRandomQuote()`);
    console.log(`randomIndex: ${index}`);
    currentQuote = quotes[index].text;
    currentAuthor = quotes[index].author;
    console.log(`currentQuote: ${currentQuote}`);
    console.log(`currentAuthor: ${currentAuthor}`);
};

// Dynamically update all elements with new quote data
const updateElements = () => {
    console.log(`updateElements()`);

    // Dynamically update displayed quote in card
    $('#text').text(currentQuote);

    // Dynamically update displayed author in card
    $('#author').text(currentAuthor);

    // Dynamically update Twitter tweet API call to include the quote and author

    const tweetQuote = `${currentQuote} - ${currentAuthor}`;
    $('#tweet-quote').attr(
        `href`,
        `https://twitter.com/intent/tweet?text=${tweetQuote}`
    );

    // Dynamically update Tumblr share API call to include the quote and author

    const tumblrURI = `https://www.tumblr.com/widgets/share/tool?canonicalUrl=&url=https%3A%2F%2Fcdpn.io%2F`;
    const tumblrPostType = `quote`;

    // Use href for new tab behavior
    $('#tumblr-quote').attr(
        `href`,
        `${tumblrURI}&posttype=${tumblrPostType}&content=${currentQuote}&caption=${currentAuthor}`
    );

    // ! Not playing well on a mobile device with the app installed
    // TODO: Figure out why mobile device with app installed not working when website works fine
    /*
    // Use onclick for popup behavior
    $('#tumblr-quote').attr(
        `onclick`,
        `window.open("${tumblrURI}&posttype=${tumblrPostType}&content=${currentQuote}&caption=${currentAuthor}","popup","width=600,height=600");return false;`
    );
    */
};

const initialRender = async () => {
    await fetchQuotes();
    getRandomQuote();
    updateElements();
};

// jQuery document wrapper function
$(document).ready(() => {
    // Construct the initial page content
    initialRender();

    // When "New Quote" button is pressed get a new random quote and update all elements
    $('#new-quote').click(() => {
        getRandomQuote();
        updateElements();
    });
});
