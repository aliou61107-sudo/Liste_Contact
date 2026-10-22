<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="app-shell">
    <header class="topbar">
      <RouterLink class="brand" to="/contacts" aria-label="Retour à la liste des contacts">
        <span class="brand-mark">✦</span>
        <span>Mon carnet</span>
      </RouterLink>
      <span class="topbar-label">Contacts personnels</span>
    </header>
    <main class="page">
      <RouterView />
    </main>
  </div>
</template>
