// Tests
// Test cookie name: c-number-1 (test if this type of number is possible)
// setJsonCookie: Test if the program sets all sorts of cookies correctly
// String to json: test if you can parse a string into json successfully, even if the string is very long

// ==============================
// Section 1: Cookie setting code
// ==============================

function setJsonCookie(name, jsonObject, days) {
    const jsonString = JSON.stringify(jsonObject); // Convert JSON object to string
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Convert days to milliseconds
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (jsonString || "") + expires + "; path=/";
}

function getJsonCookie(name) {
    const nameEQ = name + "="; // Create a string to search for
    const ca = document.cookie.split(';'); // Split cookies into an array
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i]; // Get each cookie
        while (c.charAt(0) === ' ') c = c.substring(1, c.length); // Trim leading spaces
        if (c.indexOf(nameEQ) === 0) {
            const jsonString = c.substring(nameEQ.length, c.length); // Return cookie value  
            return JSON.parse(jsonString);
        } 
    }
    return null; // Return null if cookie not found
}

function deleteCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;'; // Set cookie expiration to a past date
}

//=================================
// Section 2: Code for the counters
//=================================

// This object will store all counters
const counterObjects = {
    "uniqueID":3,
    "counter-box-1":{
       "counterNumberID":"c-number-1",
       "counterNumber":4,
       "counterTitle":"Flexões",
       "counterTitleID":"c-title-1",
       "counterStep":1
    },
    "counter-box-2":{
       "counterNumberID":"c-number-2",
       "counterNumber":7,
       "counterTitle":"Agachamentos",
       "counterTitleID":"c-title-2",
       "counterStep":2
    },
    "counter-box-3":{
       "counterNumberID":"c-number-3",
       "counterNumber":332,
       "counterTitle":"Abdominais",
       "counterTitleID":"c-title-3",
       "counterStep":3
    }
};

function updateHtml(counterID) {
    // Storing the value of the counter
    let number = counterObjects[counterID].counterNumber;
    // Storing the ID of the value, so that I can change it
    let numberID = counterObjects[counterID].counterNumberID;
    // Changing the displayed value
    $(`#${numberID}`).text(number);
}

function retrieveCounters() {
    //console.log(Object.keys(counterObjects));
    let keys = Object.keys(counterObjects);

    for (let i = 1; i < keys.length; i++) {
        let boxID = keys[i];
        //console.log(counterObjects[boxID]);

        const htmlCode = `
            <div id="${boxID}" class="counter-box">
                <p id="${counterObjects[boxID].counterTitleID}" class="counter-title">${counterObjects[boxID].counterTitle}</p>
                <p id="${counterObjects[boxID].counterNumberID}" class="counter-number">0</p>
                <div class="control-panel">
                    <div class="control-buttons">
                        <input class="reset-button" type="button" value="Reset">
                        <input class="delete-button" type="button" value="Delete">
                        <input class="edit-button" type="button" value="Edit">
                    </div>
                        <div class="step">
                            <p>Step:</p>
                            <input id="c-input-${i}" class="step-input" type="number" step="1" value="${counterObjects[boxID].counterStep}" max="999999" min="-999999">
                        </div>
                </div>
                <div class="button-container">
                    <input class="minus-button" type="button" value="-">
                    <input class="plus-button" type="button" value="+">
                </div>
            </div>
            `;

        $('#counters-container').append(htmlCode);
        updateHtml(boxID);
    }
}

/**
 * Create the html code for the counter and append it to
 * the html document. Create an object with the counter
 * properties and add this object to counterObjects
 */
function createCounters() {
    
    counterObjects.uniqueID++;
    const id = counterObjects.uniqueID;

    function createCounterObj() {
        const counterName = `counter-box-${id}`;
        const numberID = `c-number-${id}`;
        const title = `Counter ${id}`;
        const titleID = `c-title-${id}`;

        const counter = {
                counterNumberID: numberID,
                counterNumber: 0,
                counterTitle: title,
                counterTitleID: titleID,
                counterStep: 1
            };

        counterObjects[counterName] = counter;
    }

    // Creating the intern counter
    // This has to be done earlier than the creation of the appearance of the counter
    createCounterObj();

    // In the future, see if it's adequate to change this to const instead of var
    const htmlCode = `
    <div id="counter-box-${id}" class="counter-box">
        <p id="c-title-${id}" class="counter-title">Counter ${id}</p>
        <p id="c-number-${id}" class="counter-number">0</p>
        <div class="control-panel">
            <div class="control-buttons">
                <input id="c-reset-btn-${id}" class="reset-button" type="button" value="Reset">
                <input id="c-delete-btn-${id}" class="delete-button" type="button" value="Delete">
                <input id="c-edit-btn-${id}" class="edit-button" type="button" value="Edit">
            </div>
                <div class="step">
                    <p>Step:</p>
                    <input id="c-step-input-${id}" class="step-input" type="number" step="1" value="1" max="999999" min="-999999">
                </div>
        </div>
        <div class="button-container">
            <input id="c-minus-btn-${id}" class="minus-button" type="button" value="-">
            <input id="c-plus-btn-${id}" class="plus-button" type="button" value="+">
        </div>
    </div>
    `;

    // Creating the visible counter
    $('#counters-container').append(htmlCode);

    // Scrolling to the top of the newly created counter
    $('html, body').animate({
        scrollTop: $(`#c-title-${id}`).offset().top
    }, 500); // Duration in milliseconds
}

$(document).ready(function() {
    if (document.cookie) {
        retrieveCounters();
    } else {
        createCounters();
    }
});