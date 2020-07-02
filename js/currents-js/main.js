const CURRENTS_API = 'https://api.currentsapi.services/v1/';

const API_KEY = '&apiKey=A7Vxcq9bqmEuxh3dmKyoAXrJ_jmY2p1XRvtWdp4nAJtS5wsc';

let categoryWord;
let language = "en";
let lastestUrl = CURRENTS_API + 'latest-news?&language=' + language + API_KEY;
let categoryUrl = CURRENTS_API + 'available/categories/';
let searchUrl;
let newsStorage = window.localStorage;
let categoryHistory = newsStorage.getItem("category")
let req = new Request(lastestUrl);

// Getting the category list
getData(categoryUrl);

if (categoryHistory == undefined) {
    getData(lastestUrl);

} else {
    lastestUrl = CURRENTS_API + 'search?category=' + categoryHistory + '&language=' + language + API_KEY;
    getData(lastestUrl);
}

window.onload = (e) => {
    document.querySelector("#loadCategory").onclick = loadCategoryButtonClicked;
    document.querySelector("#language").addEventListener("click", languageButtonClicked);
    document.querySelector("#searchTab").addEventListener("click", searchTabClicked);
};

function getData(url) {
    let xhr = new XMLHttpRequest();
    //set the onload handler
    if (url === categoryUrl) {
        xhr.onload = setCategory;
    } else if (url === searchUrl) {
        xhr.onload = searchLoaded;
    } else {
        xhr.onload = dataLoaded;
    }
    // set the onerror handler
    xhr.onerror = dataError;

    // open connection and send the request
    xhr.open("GET", url);
    xhr.send();
}

function searchTabClicked() {
    document.querySelector('.widgets').innerHTML = `<input id="searchterm" type="text" size="20" maxlength="20" autofocus placeholder="keywords" />
    <button type="button" id="search">search</button>
    <div id="status">Ready to Search!</div>`;
    document.querySelector("#content").innerHTML = "";
    document.querySelector("#search").onclick = searchButtonClicked;
}

function searchButtonClicked() {
    let keywords = "keywords=";
    let term = document.querySelector("#searchterm").value;

    // if there's nmot term to search the nbail out of the function (return does this)
    if (term.length < 1) return;
    keywords += term;

    // update the UI
    document.querySelector("#status").innerHTML = `<p><b>Searching for ${term}</b></p><img src='./images/spinner.gif' title = 'loading' />`;

    // new URL
    searchUrl = CURRENTS_API + 'search?&' + keywords + '&language=' + language + API_KEY;
    console.log(searchUrl);

    // Request data!
    getData(searchUrl);
}

function languageButtonClicked() {
    if (language == "en") {
        language = "zh";
        document.querySelector('#language').innerHTML = "中文";
        document.querySelector('h1').innerHTML = "洪流时事";
        document.querySelector('#lastest').innerHTML = "最新新闻";
        document.querySelector('#searchTab').innerHTML = "搜索";
        document.querySelector('#hints').innerHTML = "新闻分类";
    } else {
        language = "en";
        document.querySelector('#language').innerHTML = "English";
        document.querySelector('h1').innerHTML = "Currents Reader";
        document.querySelector('#lastest').innerHTML = "Lastest News";
        document.querySelector('#searchTab').innerHTML = "Search";
        document.querySelector('#hints').innerHTML = "News Categories";
    }
    loadCategoryButtonClicked();
}

function loadCategoryButtonClicked() {
    categoryWord = document.querySelector("#category").value;
    newsStorage.setItem("category", categoryWord);
    categoryHistory = newsStorage.getItem("category");


    if (categoryHistory == 'none') {
        lastestUrl = CURRENTS_API + 'latest-news?&language=' + language + API_KEY;
    } else {
        lastestUrl = CURRENTS_API + 'search?category=' + categoryHistory + '&language=' + language + API_KEY;
    }

    document.querySelector("#content").innerHTML = "";
    getData(lastestUrl);
}

function setCategory(e) {
    let xhr = e.target;
    let obj = JSON.parse(xhr.responseText);
    let categories = obj.categories;
    for (let i = 0; i < categories.length; i++) {
        let category = categories[i];
        let line = `<option value="${category}">${category}</option>`;
        document.querySelector("#category").innerHTML += line;
    }
}

// Call back Functions

function searchLoaded(e) {
    let xhr = e.target;
    console.log(xhr.responseText);
    let obj = JSON.parse(xhr.responseText);

    if (!obj.news || obj.news.length == 0) {
        document.querySelector("#status").innerHTML = "<b>No Results found for '" + displayTerm + "'</b>";
        return;
    }

    let results = obj.news;
    console.log("results. length = " + results.length);

    for (let i = 0; i < results.length; i++) {
        let result = results[i];
        let line = `<div class='result'><h3>${result.title}</h3>`;
        line += `<address>${result.author}</address>`;
        line += `<span><a target='_blank' href='${result.url}'>Link</a></span></div>`;
        document.querySelector("#content").innerHTML += line;

    }
    document.querySelector("#status").innerHTML = "<b>Success!</b>";
}

function dataLoaded(e) {
    if (categoryHistory) {
        document.querySelector("#category").value = categoryHistory;
    }
    let xhr = e.target;
    console.log(xhr.responseText);

    let obj = JSON.parse(xhr.responseText);
    if (!obj.news || obj.news.length == 0) {
        document.querySelector("#status").innerHTML = "<b>No Results found for '" + displayTerm + "'</b>";
        return;
    }

    let results = obj.news;
    console.log("results. length = " + results.length);

    for (let i = 0; i < results.length; i++) {
        let result = results[i];
        let line = `<div class='result'><h3>${result.title}</h3>`;
        line += `<address>${result.author}</address>`;
        line += `<span><a target='_blank' href='${result.url}'>Link</a></span></div>`;
        document.querySelector("#content").innerHTML += line;

    }

}

function dataError(e) {
    console.log("An error occurred");
}
