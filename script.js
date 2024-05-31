document.addEventListener('DOMContentLoaded', function() {
    // Flip card functionality
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            card.querySelector('.card-inner').classList.toggle('is-flipped');
        });
    });

    // Create the map
    var map = L.map('map', {
        perspective: true,
        center: [42.5, 12.5], // Coordinates for Italy
        zoom: 5
    });

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Define the coordinates of Marine Protected Areas
    var amPList = [
        { coords: [38.9, 17.2], name: 'A.M.P. Capo Rizzuto' },
        { coords: [44.3, 9.2], name: 'A.M.P. Portofino' },
        { coords: [44.1, 9.7], name: 'A.M.P. 5 Terre' }
    ];

    // Add markers for Marine Protected Areas
    amPList.forEach(function(amp) {
        L.marker(amp.coords).addTo(map)
            .bindPopup(amp.name);
    });

    // Switch to 2D top-down view when clicking on the map
    map.on('click', function() {
        map.perspective(false);
    });

    // Add button to return to 3D view
    var btn = L.control({position: 'topright'});
    btn.onAdd = function() {
        var div = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
        div.innerHTML = '3D View';
        div.style.backgroundColor = 'white';
        div.style.padding = '5px';
        div.style.cursor = 'pointer';
        div.onclick = function() {
            map.perspective(true);
        };
        return div;
    };
    btn.addTo(map);
});
