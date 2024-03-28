<script setup lang="ts">
import { ref, defineEmits } from "vue";

const controlsRef = ref(null);
const emit = defineEmits();
const isPlaying = ref(false);

const play = () => {
  emit("play");
  isPlaying.value = true;
};

const pause = () => {
  emit("pause");
  isPlaying.value = false;
};

const stop = () => {
  emit("stop");
  isPlaying.value = false;
};
</script>

<template>
  <div id="songPlayerControls" class="col-6" ref="controlsRef">
    <button
      id="btnPlay"
      type="button"
      class="btn btn-primary"
      @click="play"
      v-show="!isPlaying"
    >
      <i class="bi bi-play-fill"></i> Jouer
    </button>
    <button
      id="btnPause"
      type="button"
      class="btn btn-primary"
      @click="pause"
      v-show="isPlaying"
    >
      <i class="bi bi-pause-fill"></i> Pause
    </button>
    <button
      id="btnStop"
      type="button"
      class="btn btn-primary"
      @click="stop"
      v-show="isPlaying"
    >
      <i class="bi bi-stop-fill"></i> Stop
    </button>
  </div>
</template>
<style></style>
