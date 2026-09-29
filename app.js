const ISSApi = "http://api.open-notify.org/iss-now.json";

const latitude = document.getElementById("latitude");

const longitude = document.getElementById("longitude");

function reloadLocation() {
  fetch(ISSApi)
    .then((res) => res.json())
    .then((data) => {
      const lat = Number(data.iss_position.latitude);

      const long = Number(data.iss_position.longitude);

      latitude.innerText = lat;
      longitude.innerText = long;

      const map = L.map("map").setView([lat, long], 3);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      var myIcon = L.icon({
        iconUrl: "images/spaceship.png",
        iconSize: [80, 80],
        iconAnchor: [40, 40],
      });

      L.marker([lat, long], { icon: myIcon }).addTo(map);

      var circle = L.circle([lat, long], {
        color: "red",
        fillColor: "rgb(11, 154, 243)",
        fillOpacity: 0.5,
        radius: 1000000,
      }).addTo(map);
    });
}

reloadLocation();

setInterval(reloadLocation, 3000);
