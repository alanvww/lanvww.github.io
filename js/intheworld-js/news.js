// Junhao Ren
// news.js

const CURRENTS_API = 'https://api.currentsapi.services/v1/';

//APi key
const API_KEY = '&apiKey=NFBX_8UIrrNJOKW54qMkLG7fUWLM01EqAUoYfNJnsvBItN18';

let newsStorage = window.localStorage;
let categoryHistory = newsStorage.getItem("jr7984-category");
let searchtermHistory = newsStorage.getItem("jr7984-searchterm")


// Load Categories
function loadCategories(obj) {
    let categories = obj.categories;
    for (let i = 0; i < categories.length; i++) {
        let category = categories[i];
        let line = `<option value="${category}">${category}</option>`;
        document.querySelector("#category").innerHTML += line;
    }

    if (categoryHistory != undefined) {
        document.querySelector("#category").value = categoryHistory;
    }

    if (searchtermHistory != undefined) {
        document.querySelector("#searchterm").value = searchtermHistory;
    }
}

// Load Search
function loadSearch(obj) {
    if (!obj.news || obj.news.length == 0) {
        document.querySelector("#status").innerHTML = "<b>No Results found for '" + displayTerm + "'</b>";
        return;
    }

    let results = obj.news;
    //console.log("results. length = " + results.length);

    // For loop to lop all the data
    for (let i = 0; i < results.length; i++) {
        let result = results[i];
        let line;
        if (result.image != "None") {
            line = `<div class='result'><img src="${result.image}"><h3><a target='_blank' href='${result.url}'>${result.title}</a></h3>`;
        } else {
            line = `<div class='result'><img src="./images/default.png"><h3><a target='_blank' href='${result.url}'>${result.title}</a></h3>`;
        }
        line += `<address>${result.author}</address></div>`;
        document.querySelector("#content").innerHTML += line;
    }
    document.querySelector("#status").innerHTML = "<b>Success!</b>";
}

// Load News
function loadNews(obj) {
    document.querySelector("#content").innerHTML = "";
    if (!obj.news || obj.news.length == 0) {
        document.querySelector("#status").innerHTML = "<b>No Results found for '" + displayTerm + "'</b>";
        return;
    }

    let results = obj.news;
    //console.log("results. length = " + results.length);

    for (let i = 0; i < results.length; i++) {
        let result = results[i];
        let line;
        if (result.image != "None") {
            line = `<div class='result'><img src="${result.image}"><h3><a target='_blank' href='${result.url}'>${result.title}</a></h3>`;
        } else {
            line = `<div class='result'><img src="./images/default.png"><h3><a target='_blank' href='${result.url}'>${result.title}</a></h3>`;
        }
        line += `<address>${result.author}</address></div>`;
        document.querySelector("#content").innerHTML += line;
    }
}

export {
    loadCategories,
    loadSearch,
    loadNews,
    CURRENTS_API,
    API_KEY,
}