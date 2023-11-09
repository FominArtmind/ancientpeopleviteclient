import { createApp } from "vue";
import "./style.css";
import App from "./app.vue";

import "@mdi/font/css/materialdesignicons.css";

import "vuetify/styles";
import { createVuetify, ThemeDefinition } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const ancientTheme: ThemeDefinition = {
  dark: true,
  colors: {
    background: "#829499",
    surface: "#829499",
    "surface-variant": "#80AEBB",
    "on-surface-variant": "#FFFFFF", 
    primary: "#FFFFFF",
    "primary-darken-1": "#E8EFF1",
    secondary: "#CCF1FC",
    "secondary-darken-1": "#BFE0EA",
    error: "#F893A6",
    info: "#C9A2F7",
    success: "#A2F5A6",
    warning: "#F7C380",
  }
}

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "ancientTheme",
    themes: {
      ancientTheme
    }
  }
})

createApp(App).use(vuetify).mount("#app");
