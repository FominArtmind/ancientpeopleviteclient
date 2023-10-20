import { createApp } from "vue";
import "./style.css";
import App from "./app.vue";

import "@mdi/font/css/materialdesignicons.css";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import PrimeVue from "primevue/config";
import Tooltip from "primevue/tooltip";

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App).use(PrimeVue).use(vuetify);
app.directive("tooltip", Tooltip);
app.mount('#app');
