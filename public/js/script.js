const socket = io();


if(navigator.geolocation){
    navigator.geolocation.watchPosition((position)=>{
 const {latitude,longitude} = position.coords ;
 socket.emit("send-location", {latitude,longitude})
    },
    (error)=>{
        console.error(error);
    },
{
    enableHighAccuracy : true,
    timeout : 5000,
    maximumAge : 0,
})
};

 const map = L.map("map").setView([0,0],10)

L.tileLayer("https://{}.tile.openStreetmap-org/{z}/{x}/{y}.png",{
    attribution : "Krihsna THaKur"
}).addTo(map);


const markers = {};

socket.on("receive-location", (data)=>{
    const {id ,latitude,longitude} = data;
    map.setView([latitude,longitude],16);
    if(markers[id]){
        markers[id] .setLatLng([latitude,longitude]);
    }
    else{
        markers[id] = Location.marker([latitude,longitude]).addTo(map);
    }
})