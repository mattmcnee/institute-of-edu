import './style.css'

import OpenAI from 'openai';


const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

async function main() {
  const chatCompletion = await openai.chat.completions.create({
    messages: 
      [
          {"role": "system", "content": "You answer user questions about a video. The transcript of the relevant part of the video is"+captions},
          {"role": "user", "content": "Without exceeding 50 words, answer"+question}
      ],
    model: 'gpt-3.5-turbo',
  });
  var response = chatCompletion['choices'][0]['message']['content']


  console.log(chatCompletion.choices);
  console.log(response);
}

var captions = `So in the early 20th century,
physicists were bamboozled because light,
which we thought was a wave,
started to behave in certain experiments
as if it were a particle.
So, for instance, there was an experiment done
called the photoelectric effect,
where, if you shine light at a metal,
it'll knock electrons out of the metal
if that light has sufficient energy,
but if you tried to explain this using wave mechanics,
you get the wrong result.`;

var question = `why were physiscists bamboozled?`

// main();


// Replace 'YOUR_API_KEY' with your actual YouTube Data API key
const testAPI_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const testVideoId = 'iTRxuBxttj8'; // Replace 'VIDEO_ID' with the ID of the YouTube video you want to fetch details for

// Function to load YouTube video details
function loadVideoDetails(videoId, API_KEY) {
  // Fetch video details
  fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API_KEY}&part=snippet,contentDetails`)
    .then(response => response.json())
    .then(videoData => {
      const videoDetails = videoData.items[0].snippet;
      const title = videoDetails.title;
      const duration = parseDuration(videoData.items[0].contentDetails.duration);

      // Display video details and subtitles on the webpage
      const videoDetailsDiv = document.getElementById('video-details');
      videoDetailsDiv.innerHTML = `
        <h2>${title}</h2>
        <p>Duration: ${duration}</p>
      `;
  });
}



// // Could be useful later but only works on back end

// import { YoutubeTranscript } from 'youtube-transcript';
// YoutubeTranscript.fetchTranscript('videoId or URL').then(console.log);




// Function to parse YouTube video duration from ISO 8601 format
function parseDuration(duration) {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

  const hours = (match[1] || 0) && parseInt(match[1], 10);
  const minutes = (match[2] || 0) && parseInt(match[2], 10);
  const seconds = (match[3] || 0) && parseInt(match[3], 10);

  return `${hours ? hours + 'h ' : ''}${minutes ? minutes + 'm ' : ''}${seconds ? seconds + 's' : ''}`;
}

// Call the function to load video details when the page loads
window.onload = loadVideoDetails(testVideoId, testAPI_KEY);



import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "https://institute-of-edu.web.app/",
  databaseURL: 'https://institute-of-edu-default-rtdb.europe-west1.firebasedatabase.app/',
  projectId: '930511161290'
};


const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

const dbRef = ref(database, 'users/user1');
const data = {
  name: 'John Brown',
  email: 'johndoe@example.com'
};


function writeUserData(userId, name, email) {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    username: name,
    email: email
  });
}



import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
const auth = getAuth();

var email = "mattrmcnee@gmail.com";
var password = "hkjsahkjdhaskjd";

// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed up successfully
//     const user = userCredential.user;
//     console.log("User created:", user);
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     console.log(errorMessage);
//   });




signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;

    writeUserData(user.uid, data.name, data.email);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });







