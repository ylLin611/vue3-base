<template>
  <div class="h-full">
    <iframe :id="iframeId" style="width: 100%; height: 100%" :src="src" frameborder="no"></iframe>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  src: {
    type: String,
    default: '/',
  },
  iframeId: {
    type: String,
  },
})
</script>
