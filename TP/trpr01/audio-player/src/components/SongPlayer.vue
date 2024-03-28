<script setup lang="ts">
import { ref, onMounted, defineProps, watch } from "vue";
import SongService from "../scripts/dataSongs";
import SongPlayerControls from "./SongPlayerControls.vue";
import SongPlayerTime from "./SongPlayerTime.vue";
import SongPlayerDatas from "./SongPlayerDatas.vue";

interface Song {
  id: number;
  fileName: string;
  songName: string;
  desc: string;
  infosUrl: string;
  artistId: number;
}

const props = defineProps(["selectedSong"]);

const selectedSong = ref(props.selectedSong);
const songService = new SongService();
const audioElement = ref<HTMLAudioElement | null>(null);
const pausedTime = ref<number>(0);
const currentTime = ref<number>(0);
const duration = ref<number>(0);

const fetchData = async (song: Song | null) => {
  try {
    if (song) {
      const response = await songService.getSong(song.id);
      selectedSong.value = response as Song;
    }
  } catch (error) {
    console.error("Error fetching song details:", error);
  }
};

onMounted(() => {
  fetchData(selectedSong.value);
  audioElement.value = new Audio();
  audioElement.value.addEventListener("timeupdate", updateCurrentTime);
  audioElement.value.addEventListener("loadedmetadata", loadedmetadata);
});

watch(
  () => props.selectedSong,
  (newSong) => {
    fetchData(newSong);
    stop();
  }
);

const play = () => {
  if (audioElement.value && selectedSong.value) {
    audioElement.value.src = `./src/assets/songs/${selectedSong.value.fileName}`;
    audioElement.value.currentTime = pausedTime.value;
    audioElement.value.load();
    audioElement.value.play();
  }
};

const pause = () => {
  if (audioElement.value) {
    pausedTime.value = audioElement.value.currentTime;
    audioElement.value.pause();
  }
};

const stop = () => {
  if (audioElement.value) {
    audioElement.value.load();
    pausedTime.value = 0; // Reset paused time
  }
};
const updateCurrentTime = () => {
  if (audioElement.value) {
    currentTime.value = audioElement.value.currentTime;
  }
};

const loadedmetadata = () => {
  if (audioElement.value) {
    duration.value = audioElement.value.duration;
    console.log("loadedmetadata");
  }
};
</script>
<template>
  <div id="songPlayer" class="p-3">
    <div
      class="container p-3 bg-dark text-light shadow border border-5 border-primary"
    >
      <div class="row p-2">
        <SongPlayerDatas :selectedSong="selectedSong" />
      </div>
      <div class="row p-2">
        <SongPlayerControls
          :selectedSong="selectedSong"
          @play="play"
          @pause="pause"
          @stop="stop"
          ref="controlsRef"
        />
        <div id="songPlayerTime" class="col-3 offset-3 text-white">
          <SongPlayerTime :currentTime="currentTime" :duration="duration" />
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
