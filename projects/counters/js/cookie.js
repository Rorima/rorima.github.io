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

// Example usage:
const user = { username: 'JohnDoe', age: 30, preferences: { theme: 'dark' } };
setJsonCookie('user', user, 7); // Create a JSON cookie that expires in 7 days

const retrievedUser = getJsonCookie('user'); // Retrieve the JSON cookie
console.log(retrievedUser); // Outputs: { username: 'JohnDoe', age: 30, preferences: { theme: 'dark' } }

deleteCookie('user'); // Delete the JSON cookie
console.log(getJsonCookie('user')); // Should return null