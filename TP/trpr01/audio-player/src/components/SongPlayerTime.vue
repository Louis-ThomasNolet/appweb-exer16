<script setup lang="ts">
import { ref, onMounted, watch } from "vue";

interface Props {
  currentTime: number;
  duration: number;
}

const props = defineProps<Props>();

const formatCurrentTime = ref("00:00");
const formatDuration = ref("00:00");

const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");
  return `${formattedMinutes}:${formattedSeconds}`;
};

onMounted(() => {
  formatCurrentTime.value = formatTime(props.currentTime);
  formatDuration.value = formatTime(props.duration);
});

watch(
  () => props.currentTime,
  (newTime) => {
    formatCurrentTime.value = formatTime(newTime);
    formatDuration.value = formatTime(props.duration);
  }
);
</script>
<template>
  <div id="songPlayerTime" class="col-3 offset-3 text-white">
    <p class="p-2 bg-secondary text-center">
      Temps courant: <span id="currentTime">{{ formatCurrentTime }}</span
      ><br />
      Durée: <span id="duration">{{ formatDuration }}</span>
    </p>
  </div>
</template>
<style></style>
