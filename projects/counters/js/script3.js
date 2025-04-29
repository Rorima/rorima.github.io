/*
 * Version 0.3
*/

// ===============================
// Section 1: Cookie settings code
// ===============================

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

//=========================
// Section 2: Counters code
//=========================

// Object which stores all counters
var counterObjects = {
    uniqueID: 0,
};

/*
 * Format the number to be displayed with a dot between every three digits
 * 
 * @param {number} number - The number that will be formated
 * @returns {number} The number formated to the xxx.xxx.xxx format
 */
function formatNumber(number) {
    // Format the number to be displayed in the xxx.xxx.xxx format
    return new Intl.NumberFormat('de-DE').format(number);
}

/*
 * Update the value of the counter on the HTML document
 * 
 * @param {string} counterID - The ID of the counter box which will have it's value updated
 */
function updateHtml(counterID) {
    // Storing the value of the counter
    let number = counterObjects[counterID].counterNumber;
    // Storing the ID of the value, so that I can change it
    let numberID = counterObjects[counterID].counterNumberID;
    // Changing the displayed value
    $(`#${numberID}`).text(formatNumber(number));
}

/**
 * Check if there are cookies set and if there are, this
 * means there are counters already set. Retrieve these
 * counter and write them in the html document
 */
function retrieveCounters() {
    // Get the objects from the cookies
    counterObjects = getJsonCookie('Session');
    
    // Get the counterObject keys
    let keys = Object.keys(counterObjects);

    // For loop starts with 1 because the element 0 is the uniqueID
    for (let i = 1; i < keys.length; i++) {
        let boxID = keys[i];

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
function createCounter() {
    
    // Setting a max number of counters
    if (Object.keys(counterObjects).length >= 1001) {
        alert('You have reached the maximum amount of counters!');
        return;
    }
    
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
    
    // Saving values as cookies
    setJsonCookie('Session', counterObjects, 100);
}


$(document).ready(function() {
    
    if (document.cookie) {
        retrieveCounters();
    } else {
        createCounter();
    }
    
    /**
     * Get the data from the element that was interacted with
     * and return it
    */
    function elementData(element) {
        // Get the input that was modified
        var modifiedInput = $(element);

        // Initialize an array to hold the IDs
        var parentIds = [];

        // Start with the parent element
        var parentElement = modifiedInput.parent();

        // Loop through the parents until reaching the <html> element
        while (parentElement.length) {
            // Get the ID of the current parent element
            var parentId = parentElement.attr('id');
            if (parentId) {
                parentIds.push(parentId); // Add the ID to the array
            }
            // Move to the next parent
            parentElement = parentElement.parent();
        }
        // Storing the parent's ID (which is the counter box ID)
        let counterBoxID = parentIds[0];
        // Storing the children of the counter box
        let children = $(`#${counterBoxID}`).children();
        // Storing the counter title ID
        let counterTitleID = $(`#${counterBoxID}`).children().eq(0).attr('id');
        // Storing the control panel buttons element
        let counterControlPanel = $(`#${counterBoxID}`).children().eq(2);
        // Storing the step container
        let counterStepContainer = counterControlPanel.children().eq(1);
        // Storing the step ID
        let counterStepID = counterStepContainer.children().eq(1).attr('id');
        // Storing the step value as a number
        let counterStepValue = Number($(`#${counterStepID}`).val());
        
        return {
            counterBoxID,
            counterStepID,
            counterStepValue: Number(counterStepValue),
            counterTitleID
        };
    }
    
    /**
     * Update the counterStep property of the respective counter
     * in counterObject everytime the step is changed by the user
    */
    $('body').on('input', '.step-input', function() {

        let elementInformation = elementData(this);
        let boxID = elementInformation.counterBoxID;
        let stepValue = elementInformation.counterStepValue;
        
        // Updating the object with the new step value
        counterObjects[boxID].counterStep = stepValue;
        
        // Saving values as cookies
        setJsonCookie('Session', counterObjects, 100);
    });
    
    /**
     * Check wether the counter has the maximum or minimum
     * allowed value and show a warning message if the value
     * has been reached. 
     * Prevent the user from changing the value
     * if the maximum or minimum have been reached
     */
    function checkValues(counterID) {
        let counterTitle = counterObjects[counterID].counterTitle;
        let counterNumber = counterObjects[counterID].counterNumber;
        let warningMessage = `You have reached the maximum value for the counter: ${counterTitle}.`;
        
        if (counterNumber >= 999999999999) {
            alert(warningMessage);
            counterObjects[counterID].counterNumber = 999999999999;
        } else if (counterNumber <= -999999999999) {
            alert(warningMessage);
            counterObjects[counterID].counterNumber = -999999999999;
        }
        
        updateHtml(counterID);
    }
    
    
    
    function increase(counterID) {
        // Changing the values in the object
        counterObjects[counterID].counterNumber += 1 * counterObjects[counterID].counterStep;
        updateHtml(counterID);
        checkValues(counterID);
        
        // Saving values as cookies
        setJsonCookie('Session', counterObjects, 100);
    }
    
    function decrease(counterID) {
        // Changing the values in the object
        counterObjects[counterID].counterNumber -= 1 * counterObjects[counterID].counterStep;
        updateHtml(counterID);
        checkValues(counterID);
        
        // Saving values as cookies
        setJsonCookie('Session', counterObjects, 100);
    }
    
    function reset(counterID) {
        let boxTitle = counterObjects[counterID].counterTitle;
        let userConfirm = confirm(`Are you sure you want to reset the following counter: ${boxTitle}?`);
        
        if (userConfirm) {
            counterObjects[counterID].counterNumber = 0;
            updateHtml(counterID);
            
            // Saving values as cookies
            setJsonCookie('Session', counterObjects, 100);
        }
    }
    
    function deleteCounter(counterID) {
        let boxTitle = counterObjects[counterID].counterTitle;
        let userConfirm = confirm(`Are you sure you want to delete the following counter: ${boxTitle}?`);
        
        if (userConfirm) {
            $(`#${counterID}`).remove();
            delete counterObjects[counterID];
            deleteCookie(counterID);
            
            // Saving values as cookies
            setJsonCookie('Session', counterObjects, 100);
        }
    }
    
    $('body').on('click', '.plus-button', function() {
        let elementInformation = elementData(this);
        let boxID = elementInformation.counterBoxID;
        increase(boxID);
    });
    
    $('body').on('click', '.minus-button', function() {
        let elementInformation = elementData(this);
        let boxID = elementInformation.counterBoxID;
        decrease(boxID);
    });
    
    $('body').on('click', '.reset-button', function() {
        let elementInformation = elementData(this);
        let boxID = elementInformation.counterBoxID;
        reset(boxID);
    });
    
    $('body').on('click', '.delete-button', function() {
        let elementInformation = elementData(this);
        let boxID = elementInformation.counterBoxID;
        deleteCounter(boxID);
    });
    
    $('body').on('click', '.edit-button', function() {
        let elementInformation = elementData(this);
        let boxID = elementInformation.counterBoxID;
        let tID = elementInformation.counterTitleID;
        
        $('.edit-box').fadeIn();
        
        $('#counterNameInput').focus();
        
        // Store the current boxID in a variable for later use
        $('.confirm-button').data('boxID', boxID);
        $('.confirm-button').data('titleID', tID);
    });
    
    function confirmButton() {
        $('.edit-box').fadeOut();
        
        // Retrieve the boxID and titleID stored in the confirm button
        let boxID = $('.confirm-button').data('boxID');
        let tID = $('.confirm-button').data('titleID');
        
        // Get user input from the edit box
        let userTitle = $('.counter-name').val();
        let userValue = $('.counter-value').val();

        // Clearing the text input fields
        $('.counter-name').val('');
        $('.counter-value').val('');

        // Update the counter title if the user provided a new title
        if (userTitle) {
            counterObjects[boxID].counterTitle = userTitle;
            $(`#${tID}`).text(userTitle);
        }

        // Update the counter number if the user provided a new value
        if (userValue) {
            counterObjects[boxID].counterNumber = Number(userValue);
        }

        // Update the displayed HTML to reflect the changes
        updateHtml(boxID);
        
        // Saving values as cookies
        setJsonCookie('Session', counterObjects, 100);
    }
    
    $('#counterNameInput').on('keypress', function(event) {
        if (event.which === 13) { // Check if Enter key is pressed
            event.preventDefault(); // Prevent default action
            confirmButton();
        }
    });
    
    $('#counterValueInput').on('keypress', function(event) {
        if (event.which === 13) { // Check if Enter key is pressed
            event.preventDefault(); // Prevent default action
            confirmButton();
        }
    });
    
    $('.confirm-button').click(function() {
        confirmButton();
    });

    $('.close').click(function() {
        $('.edit-box').fadeOut();
    });

    $('.cancel-button').click(function() {
        $('.edit-box').fadeOut();
    });

    $('#more-counters').click(function() {
        createCounter();
    });
});