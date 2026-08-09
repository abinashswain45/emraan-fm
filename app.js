// EMRAAN FM
// The website uses your YouTube playlist directly.
// You only need to change PLAYLIST_ID if you ever want a different playlist.

const PLAYLIST_ID = "PLujiMJ2lrmpApijmxx2JY1lP582H63KNg";

let player;
let timer;

const title = document.getElementById("title");
const movie = document.getElementById("movie");
const playBtn = document.getElementById("play");
const status = document.getElementById("status");
const progressBar = document.getElementById("progressBar");
const elapsed = document.getElementById("elapsed");
const duration = document.getElementById("duration");

function fmt(seconds) {
  seconds = Math.max(0, Math.floor(seconds || 0));
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

function updateProgress() {
  if (!player || !player.getDuration) return;

  const total = player.getDuration();
  const current = player.getCurrentTime();

  if (total) {
    progressBar.style.width = `${(current / total) * 100}%`;
  }

  elapsed.textContent = fmt(current);
  duration.textContent = fmt(total);
}

function updateSongInfo() {
  if (!player) return;

  const data = player.getVideoData ? player.getVideoData() : null;

  if (data && data.title) {
    title.textContent = data.title;
    movie.textContent = "Emraan Hashmi Radio";
  } else {
    title.textContent = "Emraan Hashmi Radio";
    movie.textContent = "Now playing";
  }
}

window.onYouTubeIframeAPIReady = function () {
  player = new YT.Player("player", {
    width: "1",
    height: "1",

    playerVars: {
      autoplay: 0,
      controls: 0,
      playsinline: 1,
      rel: 0
    },

    events: {
      onReady: function () {
        player.cuePlaylist({
          listType: "playlist",
          list: PLAYLIST_ID,
          index: 0
        });

        status.textContent = "READY";
        title.textContent = "Emraan Hashmi Radio";
        movie.textContent = "Press play to start";
      },

      onStateChange: function (event) {
        if (event.data === YT.PlayerState.PLAYING) {
          status.textContent = "ON AIR";
          playBtn.textContent = "Ⅱ";

          updateSongInfo();

          clearInterval(timer);
          timer = setInterval(updateProgress, 500);
        }

        if (event.data === YT.PlayerState.PAUSED) {
          status.textContent = "PAUSED";
          playBtn.textContent = "▶";
        }

        if (event.data === YT.PlayerState.ENDED) {
          playBtn.textContent = "▶";
        }

        if (event.data === YT.PlayerState.CUED) {
          updateSongInfo();
        }
      }
    }
  });
};

playBtn.addEventListener("click", function () {
  if (!player) return;

  const state = player.getPlayerState();

  if (state === YT.PlayerState.PLAYING) {
    player.pauseVideo();
  } else {
    player.playVideo();
  }
});

document.getElementById("next").addEventListener("click", function () {
  if (player) player.nextVideo();
});

document.getElementById("back").addEventListener("click", function () {
  if (player) player.previousVideo();
});

const youtubeApi = document.createElement("script");
youtubeApi.src = "https://www.youtube.com/iframe_api";
document.head.appendChild(youtubeApi);
