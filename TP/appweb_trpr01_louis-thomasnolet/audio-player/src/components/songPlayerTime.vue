<template>
    <div id="songPlayerTime" class="col-3 offset-3 text-white">
      <p class="p-2 bg-secondary text-center">
        Temps courant: <span id="currentTime">{{ formatTime(currentTime) ?? '0:00' }}</span><br />
        Durée: <span id="duration">{{ formatTime(duration) ?? '0:00'}}</span>
      </p>
    </div>
</template>
<script lang="ts">

  export default {
    props: {
      currentTime: Number,
      duration: Number
    },
    setup() {
      const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
      };
  
      return {
        formatTime
      };
    }
  };

</script>