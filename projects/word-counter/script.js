document.getElementById('textBox').addEventListener('input', function() {
    // Get the textarea element
    const textarea = document.getElementById('textBox');

    // Get the value of the textarea
    const text = textarea.value;

    // Define words
    const wordRegex = /\s./g;
    const wordMatches = text.match(wordRegex);
    const words = (wordMatches ? wordMatches.length : 0) + 1;

    // Define characters
    const characters = text.length;

    // Define paragraphs
    const paragraphRegex = /\n./g;
    const paragraphMatches = text.match(paragraphRegex);
    const paragraphs = (paragraphMatches ? paragraphMatches.length : 0) + 1; // The first paragraph is not counted, so I add 1

    // Define sentences
    const sentenceRegex = /[a-zA-Z]\./g;
    const sentenceMatches = text.match(sentenceRegex);
    const sentences = (sentenceMatches ? sentenceMatches.length : 0);

    // Define reading time
    const totalSeconds = Math.floor(characters / 15);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60);
    const readingTime = `${minutes} m ${seconds} s`;

    // Display the amount of words
    document.getElementById('wordQuantity').innerHTML = words;
    // Display the amount of characters in the text
    document.getElementById('characterQuantity').innerText = characters;
    // Display the amount of paragraphs
    document.getElementById('paragraphQuantity').innerHTML = paragraphs;
    // Display the amount of sentences
    document.getElementById('sentenceQuantity').innerHTML = sentences;
    // Display the reading time
    document.getElementById('readingTime').innerText = readingTime;

    // Clearing everything when the textarea is empty
    if (!text) {
        document.getElementById('wordQuantity').innerHTML = 0;
        document.getElementById('characterQuantity').innerText = 0;
        document.getElementById('paragraphQuantity').innerHTML = 0;
        document.getElementById('sentenceQuantity').innerHTML = 0;
        document.getElementById('readingTime').innerText = '0 m 0 s';
    }
});
