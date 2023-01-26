console.log("Welcome to spotify");
let songIndex=0;
let audioElement=new Audio('songs/1.mp3');
let masterPlay=document.getElementById('masterplay');
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let songItems=Array.from(document.getElementsByClassName('songItem'));//ye krne se saare songItem ka ek array bn gya
let masterSongName=document.getElementById('masterSongName');
let setTime=Array.from(document.getElementsByClassName('timestamp'));

let songs=[
    {songName:"Warriyo - Mortals", filePath:"songs/1.mp3", coverPath: "https://i.ytimg.com/vi/zFXl1sjTdms/maxresdefault.jpg"},
    {songName:"Royalty - Maestro Chives", filePath:"songs/2.mp3", coverPath: "https://i.ytimg.com/vi/oOi3oJmfz4o/maxresdefault.jpg"},
    {songName:"Unstoppable - Sia", filePath:"songs/3.mp3", coverPath: "https://i.ytimg.com/vi/h3h035Eyz5A/maxresdefault.jpg"},
    {songName:"Playdate - Melanie Martinez", filePath:"songs/4.mp3", coverPath: "https://i.ytimg.com/vi/rYnU-EHyZQU/maxresdefault.jpg"},
    {songName:"Arcade - Duncan Laurence", filePath:"songs/5.mp3", coverPath: "https://i.ytimg.com/vi/GYuelKjcyPs/maxresdefault.jpg"},
    {songName:"Middle of the night", filePath:"songs/6.mp3", coverPath: "https://i.ytimg.com/vi/pyWWrHuyk-A/maxresdefault.jpg"},
    {songName:"Athma rama - Brodha V", filePath:"songs/7.mp3", coverPath: "https://i.ytimg.com/vi/SdxSQlk4Bws/maxresdefault.jpg"},
    {songName:"Gangsta's Paradise - Coolio", filePath:"songs/8.mp3", coverPath: "https://i.ytimg.com/vi/naLHsfqe0M8/maxresdefault.jpg"},
    {songName:"Changes - XXXTENTACION", filePath:"songs/9.mp3", coverPath: "https://lyricsnary.com/wp-content/uploads/2020/11/Changes-Song-Lyrics2B.jpg"},
    {songName:"Into your Arms - Wit lowry", filePath:"songs/10.mp3", coverPath: "https://i.ytimg.com/vi/Gwg_KYNgu6Y/sddefault.jpg"}
]


songItems.forEach((element,i) => {
    console.log(element,i);
    element.getElementsByTagName('img')[0].src=songs[i].coverPath;//iska mtlb hai ki songItems array mei ith index par jo songItem hai usme jo pehli image hai uska src vo kr do jo song array mei ith object ka coverPath hai
    element.getElementsByTagName('span')[0].innerText=songs[i].songName;
    // element.getElementsByTagName('span')[1].innerText=songs[i].filePath.duration;
});
// Handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime==0){
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        gif.style.opacity=0;
    }
})

// Listen to Events
audioElement.addEventListener('timeupdate',()=>{
    // console.log("time");
    // update seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    // console.log(progress);
    myProgressBar.value=progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=(myProgressBar.value*audioElement.duration)/100;
})

const makeAllPlay=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove("fa-circle-pause");
        element.classList.add("fa-circle-play");
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{//yhan songItem wale sbhi ka(Jo chhote wale play buttons hain unka) array bna gaya hai aggr maine usme se kisi par bh click kiya toh sbse pehle makeallplay vhal jayega jo kya karega ki sbke pause remove krke whan play lga dega aur uske aage ki do line kya krengi vo ye krengi ki jis element ke liye click kiya hai uss element ke liye play ko remove krke pause lga dengi. Isse sbse uss gane ke liye pause ka option dikhega aur baaki sab ke liye play ka.Yhan par e mujhe uss element ka pointer de rha hai jisse maine click kiya hai aur e.target vo element hi de deta hai
        makeAllPlay();
        if(audioElement.paused || audioElement.currentTime<=0){
            songIndex=parseInt(e.target.id);
            audioElement.src=`songs/${songIndex+1}.mp3`;
            audioElement.play();
            e.target.classList.remove("fa-circle-play");
            e.target.classList.add("fa-circle-pause");
            masterPlay.classList.remove("fa-circle-play");
            masterPlay.classList.add("fa-circle-pause");
            gif.style.opacity=1;
        }
        else if(audioElement.currentTime>0){
            songIndex=parseInt(e.target.id);
            audioElement.src=`songs/${songIndex+1}.mp3`;
            audioElement.pause();
            e.target.classList.remove("fa-circle-pause");
            e.target.classList.add("fa-circle-play");
            masterPlay.classList.remove("fa-circle-pause");
            masterPlay.classList.add("fa-circle-play");
            gif.style.opacity=0;
        }
        // else{
        //     audioElement.currentTime=0;
        //     songIndex=parseInt(e.target.id);
        //     audioElement.src=`songs/${songIndex+1}.mp3`;
        //     audioElement.play();
        //     e.target.classList.remove("fa-circle-play");
        //     e.target.classList.add("fa-circle-pause");
        //     masterPlay.classList.remove("fa-circle-play");
        //     masterPlay.classList.add("fa-circle-pause");
        //     gif.style.opacity=1;
        // }

        // e.target.classList.remove("fa-circle-play");
        // e.target.classList.add("fa-circle-pause");
        // audioElement.src=`songs/${songIndex+1}.mp3`;
        // audioElement.currentTime=0;
        // audioElement.play();
        // gif.style.opacity=1;
        // masterPlay.classList.remove("fa-circle-play");
        // masterPlay.classList.add("fa-circle-pause");
        masterSongName.innerText=songs[songIndex].songName;
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=9){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    audioElement.src=`songs/${songIndex+1}.mp3`;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");

    // This logic is written by me this is for when we tap on forward in masterplay then also in songitemplay the play button should be remove and pause should be add
    makeAllPlay();
    Array.from(document.getElementsByClassName('songItemPlay'))[songIndex].classList.remove("fa-circle-play");
    Array.from(document.getElementsByClassName('songItemPlay'))[songIndex].classList.add("fa-circle-pause");


    masterSongName.innerText=songs[songIndex].songName;
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=9;
    }
    else{
        songIndex-=1;
    }
    audioElement.src=`songs/${songIndex+1}.mp3`;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");

    makeAllPlay();
    Array.from(document.getElementsByClassName('songItemPlay'))[songIndex].classList.remove("fa-circle-play");
    Array.from(document.getElementsByClassName('songItemPlay'))[songIndex].classList.add("fa-circle-pause");

    masterSongName.innerText=songs[songIndex].songName;
})

// I was trying this to update time but it is not working
// setTime.forEach((element,i) => {
//     let a=new Audio(songs[i].filePath);
//     element.innerText=a.duration;
// });