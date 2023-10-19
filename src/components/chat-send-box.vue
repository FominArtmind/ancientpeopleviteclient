<template>
  <div class="p-2 border-t-2 border-white">
    <div class="flex items-center justify-between">
      <input placeholder="message other players" class="w-full text-white bg-ancient-400 placeholder-ancient-100 py-1 px-2 focus:outline-none" v-model="text" />
      <button class="bg-ancient-600 hover:bg-ancient-500 rounded-none text-white ml-2 py-1 px-4 focus:outline-none focus:shadow-outline" type="button" @click="send">
        Send
      </button>
    </div>
  </div>
</template>

<style scoped>
/* #697e85 */
</style>

<script setup lang="ts">
import { ref } from "vue";
import { sendMessage } from "../composables/state";

let text = ref("");

const send = () => {
  sendMessage(text.value);

  text.value = "";
}
</script>