// Load the YouTube API script asynchronously
function loadYouTubeAPI() {
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// Initialize the YouTube Player API
function onYouTubeIframeAPIReady() {
  // Video ID of the YouTube video you want to load
  var videoId = 'iTRxuBxttj8';

  // Create a new YouTube player instance
  var player = new YT.Player('player', {
    width: '100%',
    height: 'auto',
    videoId: videoId, // Specify the video ID here
    playerVars: {
      start: 22, // Start the video at 22 seconds
      rel: 0, // Hide related videos
      showinfo: 0 // Hide video title and uploader information
    },
    events: {
      'onReady': onPlayerReady
    }
  });

  // Called when the player is ready
  function onPlayerReady(event) {
    // Set the desired playback speed
    player.setPlaybackRate(1);
  }
}

// Load the YouTube API script
loadYouTubeAPI();



const jsonData = {
  "title": "Main Title",
  "content": [
    {
      "section": [
        {
          "paragraph": "hello there",
          "subtitle": "Introduction"
        }
      ]
    },
    {
      "section": [
        {
          "paragraph": "no th",
          "subtitle": "Intro"
        }
      ]
    }
  ]
};

console.log(jsonData); // You can now use the variable jsonData in your JavaScript code

