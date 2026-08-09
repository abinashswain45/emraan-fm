const songs = [
  { title: "Zara Sa", movie: "Jannat", id: "zv-tbc4F818" },
  { title: "Pee Loon", movie: "Once Upon A Time In Mumbaai", id: "WCTro3qabjE" },
  { title: "Maahi", movie: "Raaz: The Mystery Continues", id: "G-CBwdL4pZU" },
  { title: "Tu Hi Meri Shab Hai", movie: "Gangster", id: "mqZQSrCAnrk" }
];

let index = 0;
let player;
let started = false;
let timer;

const title = document.getElementById("title");
const movie = document.getElementById("movie");
const nextTitle = document.getElementById("nextTitle");
const playBtn = document.getElementById("play");
const status = document.getElementById("status");
const progressBar = document.getElementById("progressBar");
const elapsed = document.getElementById("elapsed");
const duration = document.getElementById("duration");

function fmt(sec) {
  sec = Math.max(0, Math.floor(sec || 0));
  return `${Math.floor(sec/60)}:${String(sec%60).padStart(2,"0")}`;
}

function updateUI() {
  const s = songs[index];
  const n = songs[(index + 1) % songs.length];
  title.textContent = s.title;
  movie.textContent = `${s.movie} · Emraan Hashmi`;
  nextTitle.textContent = n.title;
}

function loadYouTubeAPI() {
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  document.head.appendChild(tag);
}
window.onYouTubeIframeAPIReady = function() {
  player = new YT.Player("player", {
    width: "1", height: "1",
    videoId: songs[0].id,
    playerVars: { autoplay: 0, controls: 0, playsinline: 1, rel: 0 },
    events: {
      onReady: () => updateUI(),
      onStateChange: onStateChange
    }
  });
};

function onStateChange(e) {
  if (e.data === YT.PlayerState.PLAYING) {
    started = true;
    status.textContent = "ON AIR";
    playBtn.textContent = "Ⅱ";
    clearInterval(timer);
    timer = setInterval(updateProgress, 500);
  } else if (e.data === YT.PlayerState.PAUSED) {
    playBtn.textContent = "▶";
  } else if (e.data === YT.PlayerState.ENDED) {
    next();
  }
}

function updateProgress() {
  if (!player || !player.getDuration) return;
  const d = player.getDuration();
  const c = player.getCurrentTime();
  if (d) progressBar.style.width = `${(c/d)*100}%`;
  elapsed.textContent = fmt(c);
  duration.textContent = fmt(d);
}

playBtn.addEventListener("click", () => {
  if (!player) return;
  if (player.getPlayerState() === YT.PlayerState.PLAYING) player.pauseVideo();
  else player.playVideo();
});

document.getElementById("next").addEventListener("click", next);
document.getElementById("back").addEventListener("click", () => {
  index = (index - 1 + songs.length) % songs.length;
  loadSong();
});

function next() {
  index = (index + 1) % songs.length;
  loadSong();
}

function loadSong() {
  updateUI();
  progressBar.style.width = "0%";
  elapsed.textContent = "0:00";
  duration.textContent = "--:--";
  player.loadVideoById(songs[index].id);
}

updateUI();
loadYouTubeAPI();
