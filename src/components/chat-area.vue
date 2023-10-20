<template>
  <div class="scrollable-div overflow-y-auto font-light" @contextmenu="$event.preventDefault()">
    <div ref="chatElement" class="scrollable-div-inside">
      <ChatItem v-for="event in events" :event="event"/>
    </div>
  </div>
</template>

<style scoped>
.scrollable-div {
  direction: rtl;
}
.scrollable-div-inside {
  direction: ltr;
}
.scrollable-div::-webkit-scrollbar {
  width: 4px; /* Set the width of the scrollbar */
  position: absolute;
  right: 0; /* Position the scrollbar on the right of the element*/
}
::-webkit-scrollbar-track {
  background: #ffffff;
}
.scrollable-div::-webkit-scrollbar-thumb {
  background: #9ebdc5;
  border-radius: 5px;
}
::-webkit-scrollbar-thumb:hover {
  background: #7b9da5;
}
</style>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { events } from "../composables/state";
import ChatItem from "./chat-item.vue";

const chatElement = ref<HTMLDivElement>();

onMounted(() => {
  scrollToLastChatItem();
});

watch(events, () => {
  console.log("trying to scroll chat");
  scrollToLastChatItem();
});

function scrollToLastChatItem() {
  const lastChildElement = chatElement.value?.lastElementChild;
  lastChildElement?.scrollIntoView({
    behavior: "smooth"
  });
}
</script>