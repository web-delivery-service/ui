import { createApp } from 'vue'
import { createPinia } from 'pinia'

import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

import router from './router'
import './style.css'
import App from './App.vue'

const pinia = createPinia()

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'light'
    }
});

createApp(App).use(router).use(pinia).use(vuetify).use(autoAnimatePlugin).mount('#app')
