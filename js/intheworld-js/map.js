// Junhao Ren
// map.js

import {
    Country
} from './Country.js';

let map;
let geojson = {
    type: 'FeatureCollection',
    features: []
};
let courtry;

let countryName;

// initMap()
function initMap() {
    mapboxgl.accessToken =
        'pk.eyJ1IjoibGFudnd3IiwiYSI6ImNrOHl1N3BxZzAyYXEzbW11cjRkMzBrM3UifQ.VboCdwjRTi5tU-VDaijTBg';

    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10?optimize=true',
        center: [180, 35],
        zoom: 2,
    });

    map.on('load', function () {
        // Insert the layer beneath any symbol layer.
        var layers = map.getStyle().layers;

        var labelLayerId;
        for (var i = 0; i < layers.length; i++) {
            if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
                labelLayerId = layers[i].id;
                break;
            }
        }
        map.addControl(new mapboxgl.NavigationControl());
    });
}

// addMarker()
// Param: coordinates, title, description, flag, className,population
function addMarker(coordinates, title, description, flag, className, population) {
    let el = document.createElement('div');
    el.className = className;
    courtry = new Country(title, description, population, flag)

    new mapboxgl.Marker(el)
        .setLngLat(coordinates)
        .setPopup(new mapboxgl.Popup({
                offset: 25
            }) //add popups
            .setHTML(`<h3>${title}</h3><p>${description}</p><img src="${flag}" alt="" height="30" width="45">`))
        .addTo(map);
    el.addEventListener('click', () => {
        let format = title.replace(/\W/g, "&");
        if (format == "UnitedStatesofAmerica") {}
        countryName = format;

        document.querySelector("#searchterm").value = countryName;

        document.querySelector("#search").click();
    });
}

export {
    map,
    initMap,
    addMarker,
    countryName
};