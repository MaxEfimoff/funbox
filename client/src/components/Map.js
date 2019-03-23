import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../App.css";
import { fetchPosts } from "../actions/postActions";

class Map extends Component {
  async componentDidUpdate() {
    fetchPosts();
    await this.renderMap();
  }

  renderMap = () => {
    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAeCx093jj_WmHJ56ExlL_jMi7h86W3wHc&callback=initMap"
    );
    window.initMap = this.initMap;
  };

  //Инициализируем Гугл-карту
  initMap = () => {
    var map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 40.73061, lng: -73.935242 },
      zoom: 10
    });

    //Массив точек маршрута
    var destination = this.props.items.map(item => {
      return {
        location: new window.google.maps.LatLng(40.73061, -73.935242)
      };
    });

    //Массив промежуточных остановок
    var wayps = destination.slice(1, -1);

    //Проверяем, есть ли точки маршрута
    if (destination.length > 1) {
      var begin = destination[0].location;
      var end = destination[destination.length - 1].location;
    } else {
      var begin = null;
    }

    var directionsService = new window.google.maps.DirectionsService();
    var directionsDisplay = new window.google.maps.DirectionsRenderer({
      draggable: true,
      map: map
    });

    //Добавляем маршрут на карту
    displayRoute(begin, end, directionsService, directionsDisplay);

    function displayRoute(origin, destination, service, display) {
      service.route(
        {
          origin: origin,
          destination: destination,
          waypoints: wayps,
          travelMode: "DRIVING"
        },
        function(response, status) {
          if (status === "OK") {
            display.setDirections(response);
          } else {
            alert("Could not display directions due to: " + status);
          }
        }
      );
    }

    //Пытаемся навесить обработчики на все точки. НЕ РАБОТАЕТ
    // for (var i = 0; i < destination.length; i++) {
    //   window.google.maps.event.addListener(i, "position_changed", update);

    //   i.setMap(map);
    // }

    // function update() {
    //   var path = i.getPosition();
    //   var lat = path.lat();
    //   var lng = path.lng();
    //   console.log("Lat: " + lat + "\nLon: " + lng);
    // }
  };

  render() {
    return (
      <main id="mapdiv">
        <div id="map" />
      </main>
    );
  }
}

//Создаем функцию для загрузки скрипта Гугл-карты
function loadScript(src) {
  //Выбираем первый элемент с тэгом <script>
  const index = window.document.getElementsByTagName("script")[0];
  //создаем элемент с тэгом <script>
  const script = window.document.createElement("script");
  //Адрес скрипта Гугл-карт src="https://maps.googleapis.com/maps/api/....
  script.src = src;
  script.async = true;
  script.defer = true;
  //Вставляем наш скрипт
  index.parentNode.insertBefore(script, index);
}

Map.propTypes = {
  items: PropTypes.array
};

const mapStateToProps = state => ({
  items: state.posts.items
});

export default connect(
  mapStateToProps,
  { fetchPosts }
)(Map);
