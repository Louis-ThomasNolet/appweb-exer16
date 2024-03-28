<script setup lang="ts">
import songPlayerControl from './songPlayerControl.vue';
import songPlayerDatas from './songPlayerDatas.vue';
import songPlayerTime from './songPlayerTime.vue';
import { ref, defineProps } from 'vue'

const currentTime = ref<number | null>(null);


const onTimeUpdate = (time: number) => {
  currentTime.value = time;
}

const duration = ref<number | null>(null);

const updateDuration = (time: number) => {
  duration.value = time;
}


const props = defineProps({
  currentSongIndex: Number,
});

</script>
<template>
    <div id="songPlayer" class="p-3">
      <div class="container p-3 bg-dark text-light shadow border border-5 border-primary">

        <div class="row p-2">
          <songPlayerDatas :currentSongIndex="Number(currentSongIndex)" />
        </div>

        <div class="row p-2">
          <songPlayerControl :currentSongIndex="Number(currentSongIndex)" :currentTime="Number(currentTime)" :duration="Number(duration)" :onTimeUpdate="onTimeUpdate" :updateDuration="updateDuration" />
        </div>
        <div class="row p-2">
          <songPlayerTime :currentTime="Number(currentTime)" :duration="Number(duration)"/>
        </div>
      </div>
    </div>
</template>
