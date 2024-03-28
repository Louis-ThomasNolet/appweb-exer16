<script setup lang="ts">
import { defineProps, ref, onMounted, watch } from "vue";
import SongService from "../scripts/dataSongs";

interface Songs {
  id: number;
  songName: string;
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
  <div id="songPlayerDatas" class="col-12">
    <p
      id="songName"
      class="bg-secondary text-white p-2 border border-3 border-dark"
    >
      {{ selectedSong ? selectedSong.songName : "No song selected" }}
    </p>
    <p
      id="artistName"
      class="bg-secondary text-white p-2 border border-3 border-dark"
    >
      {{ songArtist ? songArtist.name : "Nom de l'artiste" }}
    </p>
  </div>
</template>

<style></style>
