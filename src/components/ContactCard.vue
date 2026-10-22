<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { Contact } from '../types'

defineProps<{ contact: Contact }>()
</script>

<template>
  <article class="contact-card">
    <img class="contact-avatar" :src="contact.photo" :alt="`Photo de ${contact.prenom} ${contact.nom}`" />
    <div class="contact-info">
      <h2>{{ contact.prenom }} {{ contact.nom }}</h2>
      <a class="phone-link" :href="`tel:${contact.telephone.replaceAll(' ', '')}`">☎ {{ contact.telephone }}</a>
      <p>{{ contact.email }}</p>
    </div>
    <RouterLink class="edit-button" :to="`/contacts/${contact.id}`">Modifier</RouterLink>
  </article>
</template>
