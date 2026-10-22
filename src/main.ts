import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import ListeContacts from './views/ListeContacts.vue'
import DetailContact from './views/DetailContact.vue'
import './style.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/contacts' },
    { path: '/contacts', component: ListeContacts },
    { path: '/contacts/nouveau', component: DetailContact },
    { path: '/contacts/:id', component: DetailContact },
  ],
})

createApp(App).use(router).mount('#app')
