<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import ContactCard from '../components/ContactCard.vue'
import { useContacts } from '../stores/contacts'

const { contacts, count } = useContacts()
const search = ref('')
const filteredContacts = computed(() => {
  const query = search.value.trim().toLowerCase()
  if (!query) return contacts.value
  return contacts.value.filter((contact) =>
    `${contact.prenom} ${contact.nom} ${contact.telephone} ${contact.email}`.toLowerCase().includes(query),
  )
})
</script>

<template>
  <section class="list-page">
    <div class="page-heading">
      <div>
        <p class="eyebrow">MON CARNET</p>
        <h1>Mes contacts</h1>
        <p class="subtitle">{{ count }} contact{{ count > 1 ? 's' : '' }} enregistré{{ count > 1 ? 's' : '' }}</p>
      </div>
      <RouterLink class="primary-button" to="/contacts/nouveau">＋ Ajouter un contact</RouterLink>
    </div>

    <label class="search-box">
      <span aria-hidden="true">⌕</span>
      <input v-model="search" type="search" placeholder="Rechercher un contact..." aria-label="Rechercher un contact" />
    </label>

    <div v-if="filteredContacts.length" class="contacts-grid">
      <ContactCard v-for="contact in filteredContacts" :key="contact.id" :contact="contact" />
    </div>
    <div v-else class="empty-state">
      <span>⌕</span>
      <h2>Aucun contact trouvé</h2>
      <p>Essayez une autre recherche.</p>
    </div>
  </section>
</template>
