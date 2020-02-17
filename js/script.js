var key = '1249e33a877128e5af660a8ff33f7f93';

var lippu_AB = 2.80;
var lippu_BC = 2.80;
var lippu_CD = 4.20;
var lippu_D = 2.80;
var lippu_ABC = 4.60;
var lippu_BCD = 5.40;
var lippu_ABCD = 6.40;

document.getElementById('find_button').
    addEventListener('click', button_pressed);

function button_pressed() {
  navigator.geolocation.getCurrentPosition(function(position) {
    console.log(position.coords.latitude, position.coords.longitude);

    var marker = L.marker(
        [position.coords.latitude, position.coords.longitude]).addTo(mymap);
  });
}

function weather(e) {

  var latitude = e.latlng;
  lat = latitude.lat;
  lon = latitude.lng;

  fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' +
      lon + '&appid=' + key).
      then(function(vastaus) {
        return vastaus.json();
      }).
      then(function(json) {
        saaTieto(json);
      }).
      catch(function(error) {
        console.log(error);
      });

}

function saaTieto(sisalto) {
  console.log(sisalto);
  let saa = document.getElementById('saa');
  let teksti = document.getElementById('teksti').style = 'display: block';

  saa.innerText = 'Weather\n Station: ' + sisalto.name + ' ['
      + sisalto.coord.lat + ', ' + sisalto.coord.lon + ']\n' +
      'Weather condition: ' + sisalto.weather[0].main + '\n' +
      'Temperature: ' + (sisalto.main.temp - 273.15).toFixed() + ' celsius.';
}

function vyohykeA_hinnasto() {
  lippu = document.getElementById('lippu');
  lippu.innerText = 'Last selected zone\nZone A ticket prices:\nAB ' +
      lippu_AB.toFixed(2) + '€\nABC ' + lippu_ABC.toFixed(2) + '€\nABCD ' +
      lippu_ABCD.toFixed(2) + '€';
}

function vyohykeB_hinnasto() {
  lippu = document.getElementById('lippu');
  lippu.innerText = 'Last selected zone\nZone B ticket prices:\nAB ja BC ' +
      lippu_AB.toFixed(2) + '€\nABC ' + lippu_ABC.toFixed(2) + '€\nBCD ' +
      lippu_BCD.toFixed(2) + '€\nABCD ' + lippu_ABCD.toFixed(2) + '€';
}

function vyohykeC_hinnasto() {
  lippu = document.getElementById('lippu');
  lippu.innerText = 'Last selected zone\nZone C ticket prices:\nBC ' +
      lippu_BC.toFixed(2) + '€\nABC ' + lippu_ABC.toFixed(2) + '€\nCD ' +
      lippu_CD.toFixed(2) + '€\nABCD ' + lippu_ABCD.toFixed(2) + '€';
}

function vyohykeD_hinnasto() {
  lippu = document.getElementById('lippu');
  lippu.innerText = 'Last selected zone\nZone D ticket prices:\nD ' +
      lippu_D.toFixed(2) + '€\nCD ' + lippu_CD.toFixed(2) + '€\nBCD ' +
      lippu_BCD.toFixed(2) + '€\nABCD ' + lippu_ABCD.toFixed(2) + '€';
}

/* HSL-alueen GEOJSON taulukko*/
fetch(
    'https://data-hslhrt.opendata.arcgis.com/datasets/89b6b5142a9b4bb9a5c5f4404ff28963_0.geojson').
    then(function(vastaus) {
      return vastaus.json();
    }).
    then(function(json) {
      alue(json);
    }).
    catch(function(error) {
      console.log(error);
    });

/*
* Koko alueen funktiot
 */
function alue(alue) {
  console.log(alue);
  /*
  * Alue A funktiot
   */

  var alueA = L.geoJSON(alue.features[0]).addTo(mymap);


  let popup = L.popup();

  function Aalue(e) {
    vyohykeA_hinnasto();
    // weather(e);
    popup.setLatLng(e.latlng).
        setContent('You clicked on A-zone').
        openOn(mymap);
  }

  alueA.addEventListener('click', Aalue);

  /*
  * Alue B funktiot
   */

  var alueB = L.geoJSON(alue.features[1]).addTo(mymap);

  popup = L.popup();

  function Balue(e) {
    vyohykeB_hinnasto();
    // weather(e);
    popup.setLatLng(e.latlng).
        setContent('You clicked on B-zone').
        openOn(mymap);
  }

  alueB.addEventListener('click', Balue);

  /*
  * Alue C funktiot
   */

  var alueC = L.geoJSON(alue.features[2]).addTo(mymap);

  popup = L.popup();

  function Calue(e) {
    vyohykeC_hinnasto();
    // weather(e);
    popup.setLatLng(e.latlng).
        setContent('You clicked on C-zone').
        openOn(mymap);
  }

  alueC.addEventListener('click', Calue);

  /*
 * Alue D funktiot, D alue jaettu D1 ja D2
  */

  var alueD = L.geoJSON(alue.features[3]).addTo(mymap);

  popup = L.popup();

  function Dalue(e) {
    vyohykeD_hinnasto();
    // weather(e);
    popup.setLatLng(e.latlng).
        setContent('You clicked on D-zone').
        openOn(mymap);
  }

  alueD.addEventListener('click', Dalue);

  //SÄÄ TIEDOTUS JOS KLIKKAA HSL ALUEEN ULKOPUOLELLE

  mymap.addEventListener('click', onMapClick);

}

function onMapClick(e) {
  weather(e);
}


