console.log("lets start javascript part");

let currentSong = new Audio();

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

const playMusic=(track)=>{
    // let audio = new Audio("/Spotify_CLone/Songs/" + track);

    currentSong.src = "/Spotify_CLone/Songs/" + track
    currentSong.play();
    play.src = "pause.svg";
    document.querySelector(".songinfo").innerHTML = track;
    document.querySelector(".songTime").innerHTML = "00:00/00:00";
}

async function main() {

    // Get the list of all songs
    let songs = await getSongs();

    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0];
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li> 
            <img class="invert" src="Music.svg" alt="">
                            <div class="info">
                                <div>${song.replaceAll("%5CSpotify_CLone%5Csongs%5C"," ")}</div>
                                <div>Sandy </div>
                            </div>
                            <div class="playnow">   
                                <span>Play Now</span>
                                <img class="invert" src="PlayNow.svg" alt="" >
                            </div>
         </li>`;
    }

    // attach an event listner

    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click",element=>{
            console.log(e.querySelector(".info").firstElementChild.innerHTML);
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
        })
    })

    // Attach an event listener to play,next and previous

    play.addEventListener("click",()=>{
        if(currentSong.paused){
            currentSong.play();
            play.src = "pause.svg";
        }
        else{
            currentSong.pause();
            play.src = "PlayNow.svg"
        }
    })
    
}
main()

