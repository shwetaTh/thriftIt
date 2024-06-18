const apiKey = "F968B50F27D4EF3132A74DFA622C50DD";
const ip = "8.8.8.8"; // Example IP address
const url = `https://api.ip2location.io/?key=${apiKey}&ip=${ip}`;

fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const latitude = data.latitude;
        const longitude = data.longitude;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    })
    .catch(error => console.error('Error:', error));