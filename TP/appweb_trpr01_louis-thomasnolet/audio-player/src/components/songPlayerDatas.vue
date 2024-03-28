<template>
<div>
    <div id="songPlayerDatas" class="col-12">
        <p id="songName" class="bg-secondary text-white p-2 border border-3 border-dark">
            {{ songs[currentSongIndex - 1]?.songName ?? 'Nom de la chanson'}} 
            
        </p>
        <p id="artistName" class="bg-secondary text-white p-2 border border-3 border-dark">
            {{ artists[songs[currentSongIndex - 1]?.artistId - 1]?.name ?? 'Nom de l\'artiste'}}
            
        </p>
    </div>
</div>
</template>

<script lang="ts">
import {
    defineComponent,
    onMounted,
    ref
  } from 'vue';
  import SongsService from '../scripts/SongsService';

  interface Song {
    id: number;
    songName: string;
    artistId: number;
  }


  interface Artist {
    id: number;
    name: string;
  }

  export default defineComponent({
    props: {
      currentSongIndex: Number
    },
    setup() {
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

      return {
        songs,
        artists,
      };
    },
  });
</script>
