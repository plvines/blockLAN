"use strict";
initialize();

// 10.*
// 192.168.*
// *.local
const re = /(^.*:\/\/((192\.168\.\d+\.\d+)|(10\.\d+\.\d+\.\d+)|(\.local[\.,\/])|(\.local$)))($|\/.*|:\d+\/.*)/;
function initialize() {
    chrome.webRequest.onBeforeRequest.addListener(onBeforeRequest,
                                                     { urls: ["<all_urls>"] },
                                                       ["blocking"]);
}

function onBeforeRequest(requestDetails) {
    var url = requestDetails.url;
    if (re.test(url)){
        console.log("BLOCKING: " + url);

        new Notification("Blocked a weird request", {
            body: 'Tried to connect to local IP:\n' + url.split(re)[1] 
            });
        
        return {'cancel': true};
    }

    return {'cancel': false};
}

