let map;

function checkStationValid(station){
    return station.latitude && station.longitude;
}

function initiate_all(){

  //Changing color of map
  let styles = [{
    featureType: 'water',
    elementType: 'geometry',
    stylers:[{
      color:'#abcddc'
    }]
  },{
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers:[{
      color:'#fefefe'
    }]
  }]

    //Default map location kondhwa
    let user_latitude = 18.468360, user_longitude = 73.889750,isUserLocationAllow = false;
    // Setting User location on map
    // if ('geolocation' in navigator) {
    //   navigator.geolocation.getCurrentPosition(
    //       position => {
    //         user_latitude = position.coords.latitude;
    //         user_longitude = position.coords.longitude;
    //         isUserLocationAllow = true;
    //         create_map();
    //       },err => {
    //         alert(`Error (${err.code}): ${err.message}`)
    //         create_map();
    //       });
    // } else {
    //   alert('Geolocation is not supported by your browser.');
    //   create_map();
    // }
    create_map();
    function create_map() {
            // console.log("called");

      // Creating Google map
      map = new google.maps.Map(document.getElementById('station_map'), {
        zoom: 13,
        center: new google.maps.LatLng(user_latitude, user_longitude),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false,
        mapTypeControl: false,
        styles: styles
      });
      if(isUserLocationAllow === true){
        //Creating User Location Marker
        let user_marker = new google.maps.Marker({
          position:{
            lat: user_latitude,
            lng: user_longitude
          },
          map: map,
          icon: user_marker_url
        });
        // Creatinng Info window for user marker
        let userInfoWindow = new google.maps.InfoWindow({
          content:'<div class="font-bold font-size-15">Your Location </div>'
        })
        // Opening Info window for user marker on click
        google.maps.event.addListener(user_marker,'click',function(){
          userInfoWindow.open(map,user_marker);
        })
      }

      // Creating Marker for Each Station
      for(let i=0; i< stations.length;i++){
        if(stations[i].coming_soon === 'False'){
          if(checkStationValid(stations[i])){
            stations[i].marker = new google.maps.Marker({
              position:{
                lat: parseFloat(stations[i].latitude),
                lng:parseFloat(stations[i].longitude)
              },
              map: map,
              icon: marker_url
            });
            // Creating info window for each marker
            stations[i].infoWindow = new google.maps.InfoWindow({
              content:'<div>'
                        +'<div class="font-bold font-size-15">'+stations[i].name+'</div>'
                        +'<div class="font-bold font-size-14">'+stations[i].station_code+'</div>'
                        +'<div class="text-center mt-4"><a href="'+stations[i].maplink+'" class="btn infoWindow-btn hover-same">Get Direction</a></div>'
                      +'</div>'
            });
            // Opening Info window for each marker on click
            google.maps.event.addListener(stations[i].marker,'click',function(){
              for(let j=0;j< stations.length;j++){
                if(stations[j].coming_soon === 'False' && checkStationValid(stations[j])) {
                  stations[j].infoWindow.close(map,stations[j].marker);
                }
              }
              stations[i].infoWindow.open(map,stations[i].marker);
            })
            // console.log("Marker created:" +i);
          }else{
            // console.log("Marker not created:" +i);
          }
        }
      }
      // console.log("created");

    }
}

// function onclick to show map info in map
function showMapInfo(station_code){
  for(let i=0; i<stations.length; i++){
    if(stations[i].coming_soon === 'False' && checkStationValid(stations[i])){
      if (stations[i].station_code === station_code) {
        map.setCenter({
          lat: parseFloat(stations[i].latitude),
          lng: parseFloat(stations[i].longitude)
        });
        for (let j = 0; j < stations.length; j++) {
            if(stations[j].coming_soon === 'False' &&  checkStationValid(stations[j])) {
                stations[j].infoWindow.close(map, stations[j].marker);
            }
        }
        stations[i].infoWindow.open(map, stations[i].marker);
        document.querySelector('#station-page-heading').scrollIntoView();
      }
    }else{

    }
  }
}