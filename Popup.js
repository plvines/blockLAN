// JavaScript associated with popup page
document.addEventListener('DOMContentLoaded', function () {
    var button = document.getElementById("tempdisable");
    button.addEventListener('click', function() {
            chrome.extension.sendRequest({type: 'tempDisable'});
            location.reload(true);
	});
});

