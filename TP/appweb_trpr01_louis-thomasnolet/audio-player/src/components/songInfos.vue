<template>
    <div id="songInfos" class="p-3">
      <div class="container p-3 bg-dark text-light shadow border border-5 border-primary song-zone">
        <div class="row">
          <div class="col">
            <h2>Informations de la chanson</h2>
            <h5>Description de la chanson</h5>
            <p id="songDesc">{{ songs[currentSongIndex - 1]?.desc ?? '' }}</p>
            <h5>Description de l'artiste</h5>
            <p id="artistDesc">{{ artists[songs[currentSongIndex - 1]?.artistId - 1]?.desc ?? ''}}</p>
          </div>
        </div>
      </div>
    </div>
</template>
<script lang="ts">
import {
    onMounted,
    ref
  } from 'vue';
  import SongsService from '../scripts/SongsService';

  var currentSongIndex: number = 1;

  interface Song {
    id: number;
    desc: string;
    artistId: number;
  }


  interface Artist {
    id: number;
    desc: string;
  }

  export default{
    props: {
      currentSongIndex: Number
    },
    setup() {
        const songsService = new SongsService();
        const songs = ref<Song[]>([]);
        const artists = ref<Artist[]>([]);

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

        return {
          songs,
          artists,
        }
    }
  }
  </script>
