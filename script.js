const image=document.querySelector('img');
const title=document.getElementById('title');
const artist=document.getElementById('artist');
const music=document.querySelector('audio');
const currentTime1=document.getElementById('current-time');
const duration1=document.getElementById('duration');
const progress =document.getElementById('process');
const progressContainer=document.getElementById('progress-container');
 
const prevbtn=document.getElementById('prev');
const playbtn=document.getElementById('play');
const nextbtn=document.getElementById('next');



// Music
const songs=[
  {
    name:'Angaro ka Ambar sa',
    artist:"Monu"
  },
  {
    name:'O Mahi',
    artist:"nigaam"
  },
  {
    name:'O Sajni Re',
    artist:"ritika"
  },
  {
    name:'Pehle Bhi Main',
    artist:"Raja"
  }
];


// check
let isPlaying=false;

//Play
function playSong(){
  isPlaying=true;
  playbtn.classList.replace('fa-play','fa-pause');
  playbtn.setAttribute('title','pause');

  music.play();
}

// pause
function pauseSong(){
  isPlaying=false;
  playbtn.classList.replace('fa-pause','fa-play');
  playbtn.setAttribute('title','play');
  music.pause();
}



// play or pause Event listener
playbtn.addEventListener('click',()=>{
  return isPlaying?pauseSong():playSong();
}
);



// updating 
function loadSong(song){
  title.textContent=song.name;
  artist.textContent=song.artist;
  music.src=`./Musics/${song.name}.mp3`;
  image.src=`./Music_pics/${song.name}.jpg`;
}


// current song
let songIndex=0;


// prev song
function prevSong(){
  songIndex--;
  if(songIndex<0){
    songIndex=songs.length-1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// next song
 function nextSong(){
  songIndex++;
  if(songIndex >= songs.length){
    songIndex=0;
  }
  loadSong(songs[songIndex]);
  playSong();
 }

 // onloading selecting first song;
 loadSong(songs[songIndex]);

 // update progress bar & time

 function updateProgressBar(e){
  if(isPlaying){
    const {duration,currentTime}=e.srcElement; // to check
    // update progress bar and width;
    const progressPercent=(currentTime/duration)*100;
    progress.style.width=`${progressPercent}%`;

    // calculate display or duration
    const durationMinutes=Math.floor(duration/60);
    let durationSeconds=Math.floor(duration%60);
    if(durationSeconds<10){
      durationSeconds=`0${durationSeconds}`;
    }


    
    if(durationSeconds){
      duration1.textContent=`${durationMinutes}:${durationSeconds}`;
    }

    // display or current time
    const currentMinutes=Math.floor(currentTime/60);
    let currentSeconds=Math.floor(currentTime%60);
    if(currentSeconds<10){
      currentSeconds=`0${currentSeconds}`;
    }

    currentTime1.textContent=`${currentMinutes}:${currentSeconds}`;
  }
 }

 // set progress bar
 function setProgressBar(e){
  const width=this.clientWidth;
  const clickX=e.offsetX;
  const {duration}=music;
  music.currentTime=(clickX/width)*duration;
 }






 prevbtn.addEventListener('click',prevSong);
 nextbtn.addEventListener('click',nextSong);

 music.addEventListener('timeupdate',updateProgressBar);
 progressContainer.addEventListener('click',setProgressBar);