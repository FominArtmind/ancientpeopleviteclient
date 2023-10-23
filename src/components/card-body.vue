<template>
  <div class="card-container" :class="{ 'rotated': rotated }">
    <v-tooltip v-if="rotated" activator="parent" location="bottom" max-width="200px" open-delay="1000">Rotated: can't defend raids and raid themselves, can't perform site actions</v-tooltip>
    <div class="w-full h-full card-background">
      <div class="w-full h-full p-1 card text-center" :class="{ 'card-suggested': suggested, 'card-selected': selected }">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-container {
  aspect-ratio: 3/4;
  max-width: 180px;
  width: 100%;
  container-type: inline-size;
}
@media (max-width: 1366px) {
  /* .card-container {
    max-width: 120px;
  } */
}

/* .card-bg-image {
  background-image: url("../assets/card-background.png");
}
.card-bg-image-selected {
  background-size: 152px 232px;
} */
.card-background {
  /* background-color: rgba(154, 182, 189, 0.35); */
  background-color: rgba(118, 139, 144, 0.35);
  font-size: 0.35rem;
  line-height: 100%;
}
@container (min-width: 55px) {
  .card-background {
    font-size: 0.425rem !important;
    line-height: 100%;
  }
}
@container (min-width: 70px) {
  .card-background {
    font-size: 0.5rem !important;
    line-height: 110%;
  }
}
@container (min-width: 85px) {
  .card-background {
    font-size: 0.6rem !important;
    line-height: 110%;
  }
}
@container (min-width: 95px) {
  .card-background {
    font-size: 0.65rem !important;
    line-height: 110%;
  }
}
@container (min-width: 105px) {
  .card-background {
    font-size: 0.7rem !important;
    line-height: 120%;
  }
}
@container (min-width: 115px) {
  .card-background {
    font-size: 0.775rem !important;
    line-height: 120%;
  }
}
@container (min-width: 130px) {
  .card-background {
    font-size: 0.85rem !important;
    line-height: 120%;
  }
}
@container (min-width: 140px) {
  .card-background {
    font-size: 0.925rem !important;
    line-height: 120%;
  }
}
@container (min-width: 150px) {
  .card-background {
    font-size: 1rem !important;
    line-height: 120%;
  }
}
.card {
  border: 2px solid rgb(154, 182, 189);
  opacity: 1;
}
.card-selected {
  border: 2px solid rgb(224, 240, 243);
}
@keyframes blink { 
  50% { border-color: #ffffff; } 
}
.card-suggested {
  animation: blink 1.75s infinite ease;
}

.rotated {
  transform: rotate(15deg) scale(0.75);
}
</style>

<script setup lang="ts">

defineProps<{ selected?: boolean, rotated?: boolean, suggested?: boolean }>();
const emit = defineEmits<{
  clicked: []
}>();

</script>