"use strict";
initialize();

// 10.*
// 192.168.*
// *.local
const re = /(^.*:\/\/((192\.168\.\d+\.\d+)|(10\.\d+\.\d+\.\d+)|(\.local[\.,\/])|(\.local$)))($|\/.*|:\d+\/.*)/;
var existingTimer = null;
function initialize() {
    addBlockerListener();
    chrome.extension.onRequest.addListener(tempDisableListener);
}

function addBlockerListener() {
    chrome.webRequest.onBeforeRequest.addListener(onBeforeRequest,
                                                  { urls: ["<all_urls>"] },
                                                  ["blocking"]);
}

function tempDisableListener(request) {
    if (request.type == 'tempDisable') {
        chrome.webRequest.onBeforeRequest.removeListener(onBeforeRequest);

        if (existingTimer !== null) {
            clearTimeout(existingTimer);
        }
        existingTimer = setTimeout(addBlockerListener, 300*1000);
    }
}

function onBeforeRequest(requestDetails) {
    var url = requestDetails.url;
    if (re.test(url)){
        console.log("BLOCKING: " + url);
        var notification = new Notification("Blocked a weird request", {
            body: 'Tried to connect to local IP:\n' + url.split(re)[1],
        });
        
        return {'cancel': true};
    }

    return {'cancel': false};
}

