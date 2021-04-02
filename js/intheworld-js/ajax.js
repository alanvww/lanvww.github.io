// Junhao Ren
// ajax.js

function downloadFile(url, type, callbackRef) {
    let xhr = new XMLHttpRequest();

    // 1. set "onerror" handler
    xhr.onerror = (e) => console.log("error");

    // 2. set "onload" handler
    xhr.onload = (e) => {
        if (type === 1) {
            const headers = e.target.getAllResponseHeaders();
            const jsonString = e.target.response;
            //console.log(`headers = ${headers}`);
            //console.log(`jsonString = ${jsonString}`);
            callbackRef(jsonString);
        } else if (type === 2) {
            const obj = JSON.parse(xhr.responseText);
            //console.log(obj);
            callbackRef(obj);
        }
    };

    // pen the connection using the HTTP GET method
    xhr.open("GET", url);

    // finally, send the request
    xhr.send();
}

export {
    downloadFile,
}