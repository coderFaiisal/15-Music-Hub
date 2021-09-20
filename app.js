const searchSongs = async () => {
  const songName = document.getElementById("input-text").value;
  const url = `https://api.lyrics.ovh/suggest/${songName}`;
  //   load data here
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayData(data.data);
  } catch (err) {
    console.log(err);
  }
};

const displayData = (songs) => {
  const songContainer = document.getElementById("song-container");
  songContainer.innerHTML = "";
  songs.map((song) => {
    const songDiv = document.createElement("div");
    songDiv.className = "single-result row align-items-center my-3 p-3";
    songDiv.innerHTML = `
            <div class="col-md-9">
              <h3 class="lyrics-name">${song.title}</h3>
              <p class="author lead">Album by <span>${song.artist.name}</span></p>
              <audio controls>
                <source src="${song.preview}"
              </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
              <button onClick="getLyrics('${song.artist.name}' , '${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>`;
    songContainer.appendChild(songDiv);
  });
};

const getLyrics = async (artist, title) => {
  try {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    const res = await fetch(url);
    const data = await res.json();

    const lyricsContainer = (document.getElementById(
      "lyrics-container"
    ).innerText = data.lyrics);
  } catch (err) {
    console.log(err);
  }
};
