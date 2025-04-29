/*
 * Version 0.2
 * The program works perfectly, however, the value
 * of the counters is not stored in the browser, so
 * if the page is refreshed, the user loses all counters
*/

// This object will store all counters
const counterObjects = {
    uniqueID: 0,
};

/**
 * Create the html code for the counter and append it to
 * the html document. Create an object with the counter
 * properties and add this object to counterObjects
 */
function createCounter() {
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
    createCounter();
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
    
    function formatNumber(number){
        // Format the number to be displayed in the xxx.xxx.xxx format
        return new Intl.NumberFormat('de-DE').format(number);
    }
    
    function updateHtml(counterID) {
        // Storing the value of the counter
        let number = counterObjects[counterID].counterNumber;
        // Storing the ID of the value, so that I can change it
        let numberID = counterObjects[counterID].counterNumberID;
        // Changing the displayed value
        $(`#${numberID}`).text(formatNumber(number));
    }
    
    function increase(counterID) {
        // Changing the values in the object
        counterObjects[counterID].counterNumber += 1 * counterObjects[counterID].counterStep;
        updateHtml(counterID);
        checkValues(counterID);
    }
    
    function decrease(counterID) {
        // Changing the values in the object
        counterObjects[counterID].counterNumber -= 1 * counterObjects[counterID].counterStep;
        updateHtml(counterID);
        checkValues(counterID);
    }
    
    function reset(counterID) {
        let boxTitle = counterObjects[counterID].counterTitle;
        let userConfirm = confirm(`Are you sure you want to reset the following counter: ${boxTitle}?`);
        
        if (userConfirm) {
            counterObjects[counterID].counterNumber = 0;
            updateHtml(counterID);
        }
    }
    
    function deleteCounter(counterID) {
        let boxTitle = counterObjects[counterID].counterTitle;
        let userConfirm = confirm(`Are you sure you want to delete the following counter: ${boxTitle}?`);
        
        if (userConfirm) {
            $(`#${counterID}`).remove();
            delete counterObjects[counterID];
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
        
        // Store the current boxID in a variable for later use
        $('.confirm-button').data('boxID', boxID);
        $('.confirm-button').data('titleID', tID);
    });
    
    $('.confirm-button').click(function() {
        $('.edit-box').fadeOut();
        
        // Retrieve the boxID and titleID stored in the confirm button
        let boxID = $(this).data('boxID');
        let tID = $(this).data('titleID');
        
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