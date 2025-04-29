// Tests
// 
// Test cookie name: c-number-1 (test if this type of number is possible)
// 
// setJsonCookie: Test if the program sets all sorts of cookies correctly
// 
// String to json: test if you can parse a string into json successfully, even if the string is very long

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

let myObj = {
    'counter-box-1': {
        counterNumberID: 'c-number-1',
        counterNumber: 4,
        counterTitle: "Yes",
        counterTitleID: 'c-title-1',
        counterStep: 2
    },
    'counter-box-2': {
        counterNumberID: 'c-number-2',
        counterNumber: 6,
        counterTitle: "No",
        counterTitleID: 'c-title-2',
        counterStep: 3
    },
    'counter-box-3': {
        counterNumberID: 'c-number-3',
        counterNumber: 621,
        counterTitle: "Jabr",
        counterTitleID: 'c-title-3',
        counterStep: 1
    },
    'counter-box-4': {
        counterNumberID: 'c-number-4',
        counterNumber: 123,
        counterTitle: "a",
        counterTitleID: 'c-title-4',
        counterStep: 1
    }
};

setJsonCookie('Session', myObj, 7);
console.log(document.cookie);
let c = getJsonCookie('Session');
console.log();
console.log(c);
setJsonCookie('Session', 'jabulamba', 7);
c = getJsonCookie('Session');
console.log();
console.log(c);

/*
 * {
   counter-box-1={
      "uniqueID":2,
      "counter-box-1":{
         "counterNumberID":"c-number-1",
         "counterNumber":4,
         "counterTitle":"Yes",
         "counterTitleID":"c-title-1",
         "counterStep":2
      },
      "counter-box-2":{
         "counterNumberID":"c-number-2",
         "counterNumber":6,
         "counterTitle":"Counter 2",
         "counterTitleID":"c-title-2",
         "counterStep":3
      }
   }; counter-box-2={
      "uniqueID":2,
      "counter-box-1":{
         "counterNumberID":"c-number-1",
         "counterNumber":4,
         "counterTitle":"Yes",
         "counterTitleID":"c-title-1",
         "counterStep":2
      },
      "counter-box-2":{
         "counterNumberID":"c-number-2",
         "counterNumber":6,
         "counterTitle":"No",
         "counterTitleID":"c-title-2",
         "counterStep":3
      }
   }
}
*/