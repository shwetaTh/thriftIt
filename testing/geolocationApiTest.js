import dotenv from "dotenv"
dotenv.config({
    path:'./env'
})
import { geoApiKey } from './testConstants.js';
async function getLocationData(ipList, apiKey) {
    const fetchLocation = async (ip) => {
        const url = `https://api.ip2location.io/?key=${apiKey}&ip=${ip}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return { ip, latitude: data.latitude, longitude: data.longitude };
    };

    const locations = await Promise.all(ipList.map(fetchLocation));
    return locations;
}

function haversineDistance(lat1, lon1, lat2, lon2) {
    const toRad = (value) => value * Math.PI / 180;
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
}

function clarkeWrightSavings(locations, hub) {
    const n = locations.length;
    const savings = [];

    // Calculate savings for each pair of locations
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            const hubToI = haversineDistance(hub.latitude, hub.longitude, locations[i].latitude, locations[i].longitude);
            const hubToJ = haversineDistance(hub.latitude, hub.longitude, locations[j].latitude, locations[j].longitude);
            const iToJ = haversineDistance(locations[i].latitude, locations[i].longitude, locations[j].latitude, locations[j].longitude);
            const saving = hubToI + hubToJ - iToJ;
            savings.push({ i, j, saving });
        }
    }

    // Sort savings in descending order
    savings.sort((a, b) => b.saving - a.saving);

    // Initialize routes
    const routes = locations.map((_, i) => [i]);

    // Merge routes based on savings
    for (const { i, j, saving } of savings) {
        let routeI, routeJ;
        for (const route of routes) {
            if (route.includes(i)) routeI = route;
            if (route.includes(j)) routeJ = route;
        }
        if (routeI && routeJ && routeI !== routeJ) {
            // Merge routes if it doesn't exceed vehicle capacity
            const newRoute = [...routeI, ...routeJ];
            routes.push(newRoute);
            routes.splice(routes.indexOf(routeI), 1);
            routes.splice(routes.indexOf(routeJ), 1);
        }
    }

    return routes.filter(route => route.length > 0);
}

//test using dummy data
const apikey = geoApiKey;
const ipList = ["8.8.8.8", "8.8.4.4", "1.1.1.1", "1.0.0.1", "208.67.222.222"];
const hubLocation = { latitude: 37.7749, longitude: -122.4194 };

getLocationData(ipList, apikey).then(locations => {
    const routes = clarkeWrightSavings(locations, hubLocation);
    console.log('Optimal Routes:', routes);
}).catch(error => console.error('Error:', error));


// const apiKey = geoApiKey;
// const ip = "8.8.8.8"; // Example IP address
// const url = `https://api.ip2location.io/?key=${apiKey}&ip=${ip}`;

// fetch(url)
//     .then(response => {
//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json();
//     })
//     .then(data => {
//         const latitude = data.latitude;
//         const longitude = data.longitude;
//         console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
//     })
//     .catch(error => console.error('Error:', error));
