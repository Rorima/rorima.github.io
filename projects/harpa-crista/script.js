/*
 * Treat a string string and return it without special characters, without <br> and without accents
 */
function treatString(s) {
    s = s.toLowerCase();
    s = s.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ''); // remove punctuation
    s = s.replace(/<br>/);
    s = s.normalize('NFD'); // separate diacritics from letters (ex.: é becomes e´)
    s = s.replace(/[\u0300-\u036f]/g, ''); // remove diacritics from string
    s = s.replace(/<br>/g, '');

    return s;
}

/*
 * Search for a hymn and modify the html so that it appears for the user
 */
function searchHymn(desiredHymn) {
    desiredHymn = treatString(desiredHymn);

    fetch("harpa_crista.json")
        .then(response => response.json())
        .then(data => {
            let found = [];
            for (let i = 1; i < 641; i++) {
                let jsonTitle = treatString(data[i].hino);
                let jsonStanzas = treatString(Object.values(data[i].verses).join('\n '));
                let jsonChorus = treatString(data[i].coro);

                if (jsonTitle.includes(desiredHymn) ||
                    jsonChorus.includes(desiredHymn) ||
                    jsonStanzas.includes(desiredHymn)) {
                    found.push(data[i].hino);
                }
            }
            return found;
        })
        .then(found => {
            const pElements = document.querySelectorAll('#listaHinos p');
            for (let i = 0; i < pElements.length; i++) {
                const hymnTitle = pElements[i].textContent; // Get the text content of the paragraph
                if (found.includes(hymnTitle)) {
                    pElements[i].style.display = ''; // Show the paragraph
                } else {
                    pElements[i].style.display = 'none'; // Hide the paragraph
                }
            }
        })
        .catch(error => console.error(error));
}

document.getElementById('inputBusca').addEventListener('input', function() {
    const searchTerm = this.value;
    searchHymn(searchTerm);
});
