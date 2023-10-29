import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});

import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(vuetify);

app.mount("#app");
