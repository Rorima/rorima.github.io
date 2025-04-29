// Version 0.1
// Only the first counter works
// Can create new counters, however, they don't work

var counters = 0;
var counterNumber1 = 0;
var step1 = 1;

function createCounter() {
    var htmlCode = `
    <div id="counter-box-${counters+1}" class="counter-box">
        <p id="c-title-${counters+1}" class="counter-title">Counter ${counters+1}</p>
        <p id="c-number-${counters+1}" class="counter-number">0</p>
        <div class="control-panel">
            <div class="control-buttons">
                <input id="c-reset-btn-${counters+1}" class="reset-button" type="button" value="Reset">
                <input id="c-delete-btn-${counters+1}" class="delete-button" type="button" value="Delete">
                <input id="c-edit-btn-${counters+1}" class="edit-button" type="button" value="Edit">
            </div>
                <div class="step">
                    <p>Step:</p>
                    <input id="c-step-input-${counters+1}" class="step-input" type="number" step="1" value="1" max="999999" min="-999999">
                </div>
        </div>
        <div class="button-container">
            <input id="c-minus-btn-${counters+1}" class="minus-button" type="button" value="-">
            <input id="c-plus-btn-${counters+1}" class="plus-button" type="button" value="+">
        </div>
    </div>
    `;
    $('#counters-container').append(htmlCode);
    counters++;
    
    // Scrolling to the top of the newly created counter
    $('html, body').animate({
        scrollTop: $(`#c-title-${counters}`).offset().top
    }, 500); // Duration in milliseconds
}

$(document).ready(function() {
    createCounter();
    
    // step1 variable stores the value of step as soon as the step input is modified
    $('#c-step-input-1').on('input', function() {
        step1 = Number($('#c-step-input-1').val());
    });
    
    function checkValues() {
        let counterTitle1 = $("#c-title-1").text();
        let warningMessage = `You have reached the maximum value for the counter: ${counterTitle1}.`;
        
        if (counterNumber1 >= 999999999999) {
            alert(warningMessage);
            counterNumber1 = 999999999999;
        } else if (counterNumber1 <= -999999999999) {
            alert(warningMessage);
            counterNumber1 = -999999999999;
        }
        
        updateHtml();
    }
    
    function formatNumber(number){
        // Format the number to be displayed in the xxx.xxx.xxx format
        return new Intl.NumberFormat('de-DE').format(number);
    }
    
    function updateHtml(){
        $('#c-number-1').html(formatNumber(counterNumber1));
    }
    
    $('#c-plus-btn-1').click(function() {
        counterNumber1 += 1 * step1;
        updateHtml();
        checkValues();
    });
    
    $('#c-minus-btn-1').click(function() {
        counterNumber1 -= (1 * step1);
        updateHtml();
        checkValues();
    });
    
    $('#c-reset-btn-1').click(function() {
        let counterTitle1 = $("#c-title-1").text();
        let userConfirm = confirm(`Are you sure you want to reset the following counter: ${counterTitle1}?`);
        
        if (userConfirm) {
            counterNumber1 = 0;
            updateHtml();
        }
    });
    
    $('#more-counters').click(function() {
        createCounter();
    });
});