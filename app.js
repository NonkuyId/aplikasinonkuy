var form = document.querySelector('#urlForm');
var cmnt_name = document.querySelector('.name');
var cmnt_message = document.querySelector('.message');
var winner_sec = document.querySelector('.winner');
var loading = document.querySelector('.loading-screen');
var refresh = document.querySelector('#refresh');
const YOUTUBE_KEY = "AIzaSyBh5hi1HezD9sKNP1plopQHrqKpceVW1Pk"; // USE YOUR API KEY HERE
var RANDOM_NUMBER;
var COMMENTS_DATA;

form.addEventListener("submit", function(e){
    e.preventDefault();
    let url = form.url.value;
    let video_id = url.replace("https://www.youtube.com/watch?v=", "").replace("https://youtu.be/", "");
    let request_url = `https://www.googleapis.com/youtube/v3/commentThreads?key=${YOUTUBE_KEY}&part=snippet&videoId=${video_id}&maxResults=100`;
    showLoading();
    $.get(request_url, function( data ) {
        COMMENTS_DATA = data.items;
        hideLoading();
        winner_sec.style.display = 'flex';
        RANDOM_NUMBER = randomNumber(0, COMMENTS_DATA.length - 1);
        selectionComment();
    });
})

// selection transition 
function selectionComment(){
    let i = 0;
    let interval = setInterval(function(){
        cmnt_name.innerText = COMMENTS_DATA[i].snippet.topLevelComment.snippet.authorDisplayName;
        cmnt_message.innerText = COMMENTS_DATA[i].snippet.topLevelComment.snippet.textOriginal;
        if(i >= COMMENTS_DATA.length - 1) i = 0;
        else i++;
    },100);
    setTimeout(() => {
        clearInterval(interval);
        cmnt_name.innerText = COMMENTS_DATA[RANDOM_NUMBER].snippet.topLevelComment.snippet.authorDisplayName;
        cmnt_message.innerText = COMMENTS_DATA[RANDOM_NUMBER].snippet.topLevelComment.snippet.textOriginal;
    }, 3000);
}

// select again 
refresh.addEventListener('click', function(e){
    RANDOM_NUMBER = randomNumber(0, COMMENTS_DATA.length - 1);
    selectionComment();
})

// select a random number 
function randomNumber(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// show loading screen 
function showLoading(){
    loading.style.display = "flex";
}
// hide loading screen 
function hideLoading(){
    loading.style.display = "none";
}