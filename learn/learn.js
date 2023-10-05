const testAPI_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const testVideoId = 'iTRxuBxttj8'; // Replace 'VIDEO_ID' with the ID of the YouTube video you want to fetch details for

// Function to load YouTube video details
function loadVideoDetails(videoId, API_KEY) {
  // Fetch video details including snippet and contentDetails
  fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API_KEY}&part=snippet,contentDetails`)
    .then(response => response.json())
    .then(videoData => {
      const videoDetails = videoData.items[0].snippet;
      const title = videoDetails.title;
      const description = videoDetails.description;
      const duration = parseDuration(videoData.items[0].contentDetails.duration);

      console.log(description.substring(0, 200));

      // Display video details, description, and subtitles on the webpage
      const videoDetailsDiv = document.getElementById('video-details');
      videoDetailsDiv.innerHTML = `
        <h2>${title}</h2>
        <p>Description: ${description.substring(0, 200)}</p>
        <p>Duration: ${duration}</p>
      `;
  });
}

function parseDuration(duration) {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

  const hours = (match[1] || 0) && parseInt(match[1], 10);
  const minutes = (match[2] || 0) && parseInt(match[2], 10);
  const seconds = (match[3] || 0) && parseInt(match[3], 10);

  return `${hours ? hours + 'h ' : ''}${minutes ? minutes + 'm ' : ''}${seconds ? seconds + 's' : ''}`;
}

loadVideoDetails(testVideoId, testAPI_KEY);

console.log("hello")

if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
    // Code is running on localhost
    console.log("Running on localhost");
} else {
    // Code is not running on localhost
    console.log("Not running on localhost");
}
