<script setup lang="ts">
import { ref, onMounted } from "vue";
import SongsList from "./components/SongsList.vue";
import SongService from "../src/scripts/dataSongs.ts";
import SongInfos from "./components/SongInfos.vue";
import SongPlayer from "./components/SongPlayer.vue";
//Tout rentre dans SongPLayer component.vue genre SongPlayerControl, SongPlayerTime, SongPlayerDatas

interface Song {
  id: number;
  fileName: string;
  songName: string;
  desc: string;
  infosUrl: string;
  artistId: number;
}

const songs = ref<Song[]>([]);
const selectedSong = ref<Song | null>(null);
const songService = new SongService();

onMounted(async () => {
  try {
    songs.value = await songService.getSongs();
  } catch (error) {
    console.error("Error fetching songs:", error);
  }
});

const selectSong = (song: Song) => {
  selectedSong.value = song;
  console.log(selectedSong.value);
};
</script>

<template>
  <header class="container-fluid bg-dark text-light p-4 text-center">
    <h1>Wishtify</h1>
  </header>
  <main>
    <div>
      <SongPlayer :selectedSong="selectedSong" />
    </div>
    <div>
      <SongInfos :selectedSong="selectedSong" />
    </div>
    <div>
      <SongsList :songs="songs" @selectSong="selectSong" />
    </div>
  </main>
  <footer class="container-fluid bg-secondary text-light p-1">
    <p class="text-center">Copyright Alexis Champoux</p>
  </footer>
</template>

<style scoped></style>
