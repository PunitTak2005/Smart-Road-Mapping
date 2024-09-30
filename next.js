document.getElementById('search-button').addEventListener('click', function() {
    var location = document.getElementById('location-input').value;

    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                var lat = data[0].lat;
                var lon = data[0].lon;

                map.setView([lat, lon], 14); // Center the map on the searched location
                L.marker([lat, lon]).addTo(map).bindPopup(location).openPopup();
            } else {
                alert('Location not found. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error fetching location:', error);
            alert('An error occurred while searching for the location.');
        });
});

// Initialize the map
var map = L.map('map').setView([40.730610, -73.935242], 14);

// Add a tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Load GNSS data from JSON file
fetch('gnss_data.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(point => {
            L.marker(point).addTo(map);
        });
    })
    .catch(error => console.error('Error loading GNSS data:', error));