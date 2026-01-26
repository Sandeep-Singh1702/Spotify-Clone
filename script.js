console.log("lets start javascript part");

async function getSongs() {
    let a = await fetch("http://127.0.0.1:3000/Spotify_CLone/songs/");
    let respones = await a.text();
    console.log(respones);

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

async function main() {
    // Get the list of all songs
    let songs = await getSongs();
    console.log(songs);

    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0];
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li> ${song.replaceAll("%5CSpotify_CLone%5Csongs%5C"," ")} </li>`;
    }

    // play the songs one by one
    var audio = new Audio(songs[0]);
    audio.play();

    audio.addEventListener("loadeddata",()=>{
        console.log(audio.duration, audio.currentSrc, audio.currentTime)
    });
}
main()

