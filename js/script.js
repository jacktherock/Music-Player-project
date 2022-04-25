const music = document.querySelector('audio');
const img = document.querySelector('img')
const artist = document.getElementById('artist');
const title = document.getElementById('title');
const play = document.getElementById('play');
const next = document.getElementById('next');
const prev = document.getElementById('prev');

let progress = document.getElementById("progress")
let total_duration = document.getElementById("duration")
let current_time = document.getElementById("current-time")
const progress_div = document.getElementById("progress_div")

/* SONGS ARRAY */
const songs = [
    {
        img: "img-1",
        name: "Blinding Lights",
        title: "Blinding Lights",
        artist: "The Weeknd",
    },
    {
        img: "img-2",
        name: "How Do I Make You Love Me",
        title: "How Do I Make You Love Me",
        artist: "The Weeknd",
    },
    {
        img: "img-3",
        name: "Moth To A Flame",
        title: "Moth To A Flame",
        artist: "The Weeknd",
    },
]

let isPlaying = false; // initially isPlaying is false 

/* for play music function */
const playMusic = () => {
    isPlaying = true;
    music.play(); // play music
    play.classList.replace('fa-play', 'fa-pause') // when song plays replace class 'fa-play' to 'fa-pause' for icons change
    img.classList.add('anime') // when song plays add class 'anime' which starts image animation
}

/* for pause music function */
const pauseMusic = () => {
    isPlaying = false;
    music.pause(); // pause music
    play.classList.replace('fa-pause', 'fa-play') // when song plays replace class fa-pause to fa-play for icons change
    img.classList.remove('anime') // when song plays remove class 'anime' which stops image animation
}

play.addEventListener('click', () => {
    isPlaying ? pauseMusic() : playMusic(); // if 'isPlaying' is 'true' call 'pauseMusic()' else 'playMusic()'
})

/* changing music data */
const loadSong = (songs) => {
    title.textContent = songs.title // change title of song
    artist.textContent = songs.artist // change artist of song
    music.src = `music/${songs.name}.mp3` // change song
    img.src = `img/${songs.img}.jpg` // change img
}

/* change to next song */
songIndex = 0; // initially song index is 0
const nextSong = () => {
    songIndex = (songIndex + 1) % songs.length; // changes song to next index & also if we get to the end of an array then it'll show song of 0 index. 
    loadSong(songs[songIndex]); // passing index of song to 'songs' array to 'loadSong' function
    playMusic(); // when go to next song continuously play music
}

/* change to previous song */
const prevSong = () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length; // changes song to previous index & also if we get to the start of an array then it'll show song of end index
    loadSong(songs[songIndex]);
    playMusic(); // when go to prev song continuously play music
}


/* progress bar */
const progress_bar_update = (event) => {
    // console.log(event) // have all event properties
    const { currentTime, duration } = event.srcElement; // array destructuring
    // console.log(currentTime); // current time pf song 
    // console.log(duration); // total duration time of song

    let progress_time = (currentTime / duration) * 100; // finds progress time of song in percentage
    // console.log(progress_time);
    progress.style.width = `${progress_time}%`; // increses width/progress of song dynamically by percentage 

    /* music total duration update */
    let min_duration = Math.floor(duration / 60); // changes total duration song into minutes
    let sec_duration = Math.floor(duration % 60); // changes total duration song into seconds

    if (duration) {
        total_duration.textContent = `${min_duration}:${sec_duration}`; // passing total duration time of song dynamically to html
    }

    /* music current duration update */
    let min_currentTime = Math.floor(currentTime / 60); // changes current time song into minutes
    let sec_currentTime = Math.floor(currentTime % 60); // changes current time song into seconds

    if (sec_currentTime < 10) {
        sec_currentTime = `0${sec_currentTime}`; // if song current time is less than 10 sec then show '0' before current time
    } // else
    current_time.textContent = `${min_currentTime}:${sec_currentTime}`; // passing current time of song dynamically to html
}

/* changes progress of song on click on the progress bar */
const progress_update = (event) => {
    // console.log(event);

    const { duration } = music; // object destructuring of music 
    // console.log(duration);

    let move_progress = (event.offsetX / event.srcElement.clientWidth) * duration; // changes progress of song percentagely by clicking on progress bar
    // console.log(move_progress);

    music.currentTime = move_progress; // changes value of current time to progressed time of song where clicked on baar
}

// automatic next song plays when current song ends
music.addEventListener('ended', nextSong)

// next song 
next.addEventListener('click', nextSong)

// previous song
prev.addEventListener('click', prevSong)

// song time updates like current time & song duration
music.addEventListener('timeupdate', progress_bar_update)

// song progress changes
progress_div.addEventListener('click', progress_update)