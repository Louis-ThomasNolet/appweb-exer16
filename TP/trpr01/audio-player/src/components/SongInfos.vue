<script setup lang="ts">
import { defineProps, ref, onMounted, watch } from "vue";
import SongService from "../scripts/dataSongs";

interface Songs {
  id: number;
  songName: string;
  desc: string;
  artistId: number;
}

interface Artists {
  id: number;
  name: string;
  desc: string;
}

const props = defineProps({
  selectedSong: {
    type: Object as () => Songs | null,
    default: null,
  },
});

const songDetails = ref<Songs | null>(null);
const songArtist = ref<Artists | null>(null);
const songService = new SongService();

const fetchData = async (song: Songs | null) => {
  try {
    if (song) {
      const response = await songService.getSong(song.id);
      songDetails.value = response as Songs;

      const artistResponse = await songService.getArtist(song.artistId);
      songArtist.value = artistResponse as Artists;
    }
  } catch (error) {
    console.error("Error fetching song details:", error);
  }
};

onMounted(async () => {
  fetchData(props.selectedSong);
});

watch(
  () => props.selectedSong,
  (newSong) => {
    fetchData(newSong);
  }
);
</script>
<template>
  <div id="songInfos" class="p-3">
    <div
      class="container p-3 bg-dark text-light shadow border border-5 border-primary song-zone"
    >
      <div class="row">
        <div class="col">
          <h2>Informations de la chanson</h2>
          <p id="songDesc">
            {{ selectedSong ? selectedSong.desc : "Description" }}
          </p>
          <p id="artistDesc">
            {{ songArtist ? songArtist.desc : "Description de l'artiste" }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
