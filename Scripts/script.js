console.log('hai sa scriem java');


async function getSongs(){
    let a = fetch("http://127.0.0.1:3000/songs/");
    let response = await a.text();
    let div = document.createElement('div')
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    let songs = []

    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split("/songs/")[1]);
        }
    }
    return songs
}

const playMusic = (track) =>{
    currentSong.src = "/Cantece/" + track
    currentSong.play()
    play.src = "pause.svg"
    document.querySelector(".songinfo").innerHTML = track
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
}
async function main()
{
    let songs = await getSongs()
    console.log(songs);

    let songUl = document.querySelector('.songList').getElementsByTagName("ul")[0]
    for(const song of songs) {
        songUl.innerHTML = songUl.innerHTML + '<li> ${song.replaceALL("%20%", " ")} </li>';
    }
    var audio = new Audio(songs[0])
    audio.play()


    audio.addEventListener('loadeddata', () => {
        console.log(audio.duration, audio.currentSrc, audio.currentTime);
    })

    /*
    plsy.addEventListener("click",() =>{
        if(currentSong.paused){
            currentSong.play()
            play.src="img\\pause.svg"
        }
        else[
            currentSong.pause()
            play.src="img\\play.svg"
        ]
    })
    */

    currentSong.addEventListener("timeupdate", () => {
        console.log(currentSong.currentTime, currentSong.duration);
    })

    document.querySelector(".seekbar").addEventListener("click", e => {
        let percet = (e.offseX/e.target.getBoundingClientRect().width)*100;
        document.querySelector(".circle").style.left = percet + "%";
        currentSong.currentTime = ((currentSong.duration)*percet)/100
    })
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".hamburger").style.left = "0"
    })

    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".hamburger").style.left = "-120%"
    })
}



main()
