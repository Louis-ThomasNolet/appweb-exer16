<template>
  <div id="songsList" class="p-3">
    <div class="container p-3 bg-dark text-light shadow border border-5 border-primary song-zone">
      <div class="row">
        <div class="col">
          <h2>Contrôles de la liste</h2>
          <button id="btnShuffle" type="button" class="btn btn-primary" @click="shuffleSong">
            <i class="bi bi-shuffle"></i> Au hasard!
          </button>
          <button id="btnPrevious" type="button" class="btn btn-primary" @click="previousSong">
            <i class="bi bi-arrow-left-square"></i> Chanson précédente
          </button>
          <button id="btnNext" type="button" class="btn btn-primary" @click="nextSong">
            Chanson suivante <i class="bi bi-arrow-right-square"></i>
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <h2>Liste des chansons</h2>
          <ul>
            <!-- Loop through the songs and display them -->
            <li v-for="song in songs" :key="song.id" :class="{ 'clicked-song': song.id === currentSong }" @click="handleSongClick(song.id)">
              {{ song.songName }} - {{ artists[song.artistId - 1]?.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    onMounted,
    ref
  } from 'vue';
  import SongsService from '../scripts/SongsService'; // Adjust the path accordingly

  interface Song {
    id: number;
    songName: string;
    artistId: number;
  }


  interface Artist {
    id: number;
    name: string;
  }

  var currentSongIndex: number = 0;

  export default defineComponent({
    props: {
      currentSong: {
        type: Number as () => number | null,
        required: true
      },
      onSongClick: {
        type: Function,
        required: true
      }
    },
    setup(props) {
      const songsService = new SongsService();
      const songs = ref < Song[] > ([]);
      const artists = ref < Artist[] > ([]);

      onMounted(async () => {
        // Fetch the list of songs from the backend API
        try {
          const fetchedSongs = await songsService.getSongs();
          const fetchedArtists = await songsService.getArtists();

          // Update the songs and artists data properties with the fetched data
          songs.value = fetchedSongs;
          artists.value = fetchedArtists;
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      });

      const handleSongClick = (songId: number) => {
        currentSongIndex = songId;
        props.onSongClick(songId);
      };

      const shuffleSong = () => {
        const randomIndex = Math.floor(Math.random() * songs.value.length + 1);// + 1 to avoid 0
        currentSongIndex = randomIndex;
        props.onSongClick(songs.value[randomIndex - 1].id);
      };

      const nextSong = () => {
        if(currentSongIndex < songs.value.length)
          currentSongIndex++;
        props.onSongClick(songs.value[currentSongIndex - 1].id);
      };

      const previousSong = () => {
        if(currentSongIndex > 1)
          currentSongIndex--;
        props.onSongClick(songs.value[currentSongIndex - 1].id);
      };

      return {
        songs,
        artists,
        handleSongClick,
        shuffleSong,
        nextSong,
        previousSong
      };
    },
  });
</script>