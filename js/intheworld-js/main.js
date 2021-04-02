// Junhao Ren
// main.js

import * as map from "./map.js";
import * as ajax from "./ajax.js";
import * as news from "./news.js";

let poi;
let offset = 0;
let categoryWord;
let language = "en";
let lastestUrl = news.CURRENTS_API + 'latest-news?&language=' + language + news.API_KEY;
let categoryUrl = news.CURRENTS_API + 'available/categories/';
let searchUrl;
let newsStorage = window.localStorage;
let categoryHistory = newsStorage.getItem("jr7984-category");
let searchtermHistory = newsStorage.getItem("jr7984-searchterm")
let req = new Request(lastestUrl);

// init()
function init() {
    map.initMap();
    loadPOI();
    loadNews("category");
    setupUI();
}

// UI Setup
function setupUI() {
    if (categoryHistory == undefined && searchtermHistory == undefined) {
        loadNews("news");
    } else if (categoryHistory && searchtermHistory) {
        lastestUrl = news.CURRENTS_API + 'search?&keywords=' + searchtermHistory + '&category=' + categoryHistory + '&language=' + language + news.API_KEY;
        //console.log(lastestUrl);
        loadNews("news");
    } else if (categoryHistory) {
        lastestUrl = news.CURRENTS_API + 'search?&category=' + categoryHistory + '&language=' + language + news.API_KEY;
        loadNews("news");
    } else {
        lastestUrl = news.CURRENTS_API + 'search?&keywords=' + searchtermHistory + '&language=' + language + news.API_KEY;
        loadNews("news");
    }
    document.querySelector("#loadCategory").onclick = loadCategoryButtonClicked;
    document.querySelector("#clear").onclick = clearButtonClicked;
    document.querySelector("#search").onclick = searchButtonClicked;
}

// searchButtonClicked()
function searchButtonClicked() {
    offset = 0;
    if (document.querySelector("#searchterm").value) {
        document.querySelector("#content").innerHTML = "";
        let keywords = `keywords=`;
        let term = document.querySelector("#searchterm").value;
        newsStorage.setItem("jr7984-searchterm", term);
        // if there's nmot term to search the nbail out of the function (return does this)
        if (term.length < 1) return;
        keywords += term;

        document.querySelector("#status").innerHTML = `<p><img src='./images/spinner.gif' title = 'loading' /></p>`;

        // new URL
        searchUrl = news.CURRENTS_API + 'search?&' + keywords + '&category=' + categoryHistory + '&language=' + language + news.API_KEY;
        //console.log(searchUrl);

        // Request data!
        loadNews("search");
    } else {
        document.querySelector("#searchterm").placeholder = "Please input keyword!"
    }
}

// clearButtonClicked()
function clearButtonClicked() {
    if (categoryHistory || searchtermHistory) {
        categoryHistory = "";
        searchtermHistory = "";
        newsStorage.clear();
        document.querySelector("#category").value = "none";
    }

    offset = 0;

    document.querySelector("#searchterm").value = "";
    lastestUrl = news.CURRENTS_API + 'latest-news?&language=' + language + news.API_KEY;
    document.querySelector("#content").innerHTML = "";
    loadNews("news");
}

// loadCategoryButtonClicked()
function loadCategoryButtonClicked() {
    offset = 0;
    categoryWord = document.querySelector("#category").value;
    newsStorage.setItem("jr7984-category", categoryWord);
    categoryHistory = newsStorage.getItem("jr7984-category");

    if (categoryHistory == 'none') {
        lastestUrl = news.CURRENTS_API + 'latest-news?&language=' + language + news.API_KEY;
    } else {
        lastestUrl = news.CURRENTS_API + 'search?category=' + categoryHistory + '&language=' + language + news.API_KEY;
    }

    let term = document.querySelector("#searchterm").value;
    if (term) {
        lastestUrl = news.CURRENTS_API + 'search?keywords=' + term + '&' + 'category=' + categoryHistory + '&language=' + language + news.API_KEY;
    }

    document.querySelector("#content").innerHTML = "";
    //console.log(lastestUrl);
    loadNews("news");
}


// loadNews
function loadNews(type) {
    switch (type) {
        case "category":
            ajax.downloadFile(categoryUrl, 2, news.loadCategories)
            break;
        case "search":
            ajax.downloadFile(searchUrl, 2, news.loadSearch)
            break;
        case "news":
            ajax.downloadFile(lastestUrl, 2, news.loadNews)
            break;
    }
}

// loadPOI
function loadPOI() {
    const url = "https://restcountries.eu/rest/v2/all";

    function poiLoaded(jsonString) {
        poi = JSON.parse(jsonString);

        for (let p of poi) {
            if (p.latlng[0] && p.latlng[1])
                map.addMarker([p.latlng[1], p.latlng[0]], p.name, `Capital:${p.capital}`, p.flag, "marker", p.population);

        }
    }

    ajax.downloadFile(url, 1, poiLoaded);
}

export {
    init
}