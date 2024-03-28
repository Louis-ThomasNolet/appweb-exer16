<script setup lang="ts">
import { ref, onMounted, defineEmits } from "vue";
import SongService from "../scripts/dataSongs";

interface Songs {
  id: number;
  fileName: string;
  songName: string;
  desc: string;
  infosUrl: string;
  artistId: number;
}

interface Artists {
  id: number;
  name: string;
  desc: string;
}

const songs = ref<Songs[]>([]);
const artists = ref<Artists[]>([]);
const currentSongIndex = ref<number>(0);
const emit = defineEmits(["selectSong"]);
const songService = new SongService();

onMounted(async () => {
  try {
    const response = await songService.getSongs();
    songs.value = response as Songs[];

    const artistResponse = await songService.getArtists();
    artists.value = artistResponse as Artists[];
  } catch (error) {
    console.error("Error fetching songs:", error);
  }
});

const selectSong = (song: Songs) => {
  emit("selectSong", song);
};

const shuffle = () => {
  songs.value = [...songs.value].sort(() => Math.random() - 0.5);
  currentSongIndex.value = 0;
  selectSong(songs.value[currentSongIndex.value]);
};

const nextSong = () => {
  if (currentSongIndex.value + 1 <= songs.value.length + 1) {
    currentSongIndex.value = currentSongIndex.value + 1;
    selectSong(songs.value[currentSongIndex.value]);
  }
};

const prevSong = () => {
  console.log("prev");
  if (currentSongIndex.value - 1 > 0) {
    currentSongIndex.value = (currentSongIndex.value - 1) % songs.value.length;
    selectSong(songs.value[currentSongIndex.value]);
  }
};
</script>

<template>
  <div id="songsList" class="p-3">
    <div
      class="container p-3 bg-dark text-light shadow border border-5 border-primary song-zone"
    >
      <div class="row">
        <div class="col">
          <h2>Contrôles de la liste</h2>
          <button
            id="btnShuffle"
            type="button"
            class="btn btn-primary"
            @click="shuffle()"
          >
            <i class="bi bi-shuffle"></i> Au hasard!
          </button>
          <button
            id="btnPrevious"
            type="button"
            class="btn btn-primary"
            @click="prevSong()"
          >
            <i class="bi bi-arrow-left-square"></i> Chanson précédente
          </button>
          <button
            id="btnNext"
            type="button"
            class="btn btn-primary"
            @click="nextSong()"
          >
            Chanson suivante <i class="bi bi-arrow-right-square"></i>
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <h2>Liste des chansons</h2>
          <ul>
            <li v-for="song in songs" :key="song.id" @click="selectSong(song)">
              {{ song.songName }} - {{ artists[song.artistId - 1]?.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
