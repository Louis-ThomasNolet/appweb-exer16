<script setup lang="ts">
import songList from './components/songList.vue';
import songInfos from './components/songInfos.vue';
import songPlayer from './components/songPlayer.vue';
import { ref } from 'vue'

const currentSong = ref<number | null>(null);

const onSongClick = (songId: number) => {
  currentSong.value = songId;
}
</script>

<template>
  <header class="container-fluid bg-dark text-light p-4 text-center">
    <h1>Lecteur de musique de Louis-Thomas Nolet</h1>
  </header>
  <main>
    <div>
      <songPlayer :currentSongIndex="Number(currentSong)"/>
    </div>

    <div>
      <songInfos :currentSongIndex="Number(currentSong)"/>
    </div>

    <div>
      <songList :currentSong="Number(currentSong)" :onSongClick="onSongClick" />
    </div>

  </main>
  <footer class="container-fluid bg-secondary text-light p-1">
    <p class="text-center">Copyright Louis-Thomas Nolet</p>
  </footer>
  
</template>

<style scoped>
</style>