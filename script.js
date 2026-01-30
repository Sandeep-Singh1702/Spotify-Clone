console.log("lets start javascript part");

let currentSong = new Audio();

function SecondsToMinutes(seconds) {
    if (isNaN(seconds) && seconds < 0) {
        return "Invalid Input";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formatedMinutes = String(minutes).padStart(2, '0');
    const formatedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formatedMinutes}:${formatedSeconds}`;
}

async function getSongs() {
    let a = await fetch("http://127.0.0.1:3000/Spotify_CLone/songs/");
    let respones = await a.text();
    // console.log(respones);

    let div = document.createElement("div");
    div.innerHTML = respones;

    let as = div.getElementsByTagName("a");

    let songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/Spotify_CLone/")[1]);
        }
    }
    return songs;
}

const playMusic = (track, pause=false) => {
    // let audio = new Audio("/Spotify_CLone/Songs/" + track);

    currentSong.src = "/Spotify_CLone/Songs/" + track
    if(!pause){
        currentSong.play();
    play.src = "pause.svg";
    }
    document.querySelector(".songinfo").innerHTML = track.replaceAll("%5CSpotify_CLone%5Csongs%5C", " ");
    document.querySelector(".songTime").innerHTML = "00:00/00:00";
}

async function main() {

    // Get the list of all songs
    let songs = await getSongs();
    playMusic(songs[0],true);
    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0];
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li> 
            <img class="invert" src="Music.svg" alt="">
                            <div class="info">
                                <div>${song.replaceAll("%5CSpotify_CLone%5Csongs%5C", " ")}</div>
                                <div>Sandy </div>
                            </div>
                            <div class="playnow">   
                                <span>Play Now</span>
                                <img class="invert" src="PlayNow.svg" alt="" >
                            </div>
         </li>`;
    }

    // attach an event listner

    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            console.log(e.querySelector(".info").firstElementChild.innerHTML);
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
        })
    })

    // Attach an event listener to play,next and previous

    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "pause.svg";
        }
        else {
            currentSong.pause();
            play.src = "PlayNow.svg"
        }
    })

    // Listen for Time update on songs and upadte seekbar
    currentSong.addEventListener("timeupdate", () => {
        console.log(currentSong.currentTime, currentSong.duration);
        document.querySelector(".songTime").innerHTML = `${SecondsToMinutes(currentSong.currentTime)}/${SecondsToMinutes(currentSong.duration)}`
        document.querySelector(".circle").style.left=(currentSong.currentTime/currentSong.duration)*100 + "%";
    });
    // update the seek bar movement

    document.querySelector(".seekbar").addEventListener("click",e=>{
        let percent = (e.offsetX/e.target.getBoundingClientRect().width) *100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) /100
    })
    // event listener for hamburger
    document.querySelector(".Hamburger").addEventListener("click",()=>{
        document.querySelector(".left").style.left = "0";
    })

    // event listener for close button
    document.querySelector(".close").addEventListener("click",()=>{
        document.querySelector(".left").style.left = "-120%";
    })
}
main()

