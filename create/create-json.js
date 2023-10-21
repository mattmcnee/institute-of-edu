  



   var slideDataArray = [];



    function logSlideURL() {
        var slideLinkValue = document.getElementById('slideLinkInput').value;
        console.log('Slide URL: ' + slideLinkValue);


        var slideData = {
            presentationId: presentationId,
            slideId: slideId,
            slideUrl: slideLinkValue
        };

        // Add the slide data object to the JSON array
        slideDataArray.push(slideData);
    }

    // Add an event listener to the button to call the logSlideURL function when the button is clicked
    // document.getElementById('logButton').addEventListener('click', logSlideURL);


// Example URL
var url = "https://docs.google.com/presentation/d/1jW-o2eporbr_gB3exTZfoeE6KebDhGuV/edit#slide=id.g291a95c2b38_12_0";

function parseGoogleSlidesURL(url) {
    var regex = /\/d\/([a-zA-Z0-9_-]+)\/edit#slide=id\.([a-zA-Z0-9_]+)_(\d+)_(\d+)/;
    var match = url.match(regex);
    if (match) {
        var presentationId = match[1];
        var slideId = match[2] + '_' + match[3] + '_' + match[4];
        return {
            presentationId: presentationId,
            slideId: slideId
        };
    } else {
        return null; // Invalid URL format
    }
}

var parsedData = parseGoogleSlidesURL(url);
if (parsedData) {
    console.log('Presentation ID:', parsedData.presentationId);
    console.log('Slide ID:', parsedData.slideId);
} else {
    console.log('Invalid Google Slides URL format.');
}

url = "https://docs.google.com/presentation/d/"+parsedData.presentationId+"/embed?start=false&slide=id."+parsedData.slideId;

// document.getElementById('slide1').src = url;


// Create a new iframe element
// var iframe = document.createElement('iframe');

// iframe.src = url;
// iframe.style.border = "none";
// iframe.height = "100px";

// var box = document.getElementById("main-box")

// // Append the iframe to the document body or any other desired element
// box.appendChild(iframe);
