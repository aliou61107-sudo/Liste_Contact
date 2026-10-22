<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useContacts } from '../stores/contacts'
import type { Contact } from '../types'

const route = useRoute()
const router = useRouter()
const { getContact, saveContact } = useContacts()
const isNew = computed(() => route.path.endsWith('/nouveau'))
const source = computed(() => (isNew.value ? undefined : getContact(String(route.params.id))))
const draft = ref<Contact>({
  id: source.value?.id ?? crypto.randomUUID(),
  prenom: source.value?.prenom ?? '',
  nom: source.value?.nom ?? '',
  telephone: source.value?.telephone ?? '',
  email: source.value?.email ?? '',
  photo: source.value?.photo ?? '',
})
const errors = ref<Record<string, string>>({})
const galleryInput = ref<HTMLInputElement>()

function choosePhoto(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  if (!file.type.startsWith('image/')) return
  const reader = new FileReader()
  reader.onload = () => { draft.value.photo = String(reader.result) }
  reader.readAsDataURL(file)
}

function validate() {
  errors.value = {}
  if (!draft.value.prenom.trim()) errors.value.prenom = 'Le prénom est obligatoire.'
  if (!draft.value.nom.trim()) errors.value.nom = 'Le nom est obligatoire.'
  if (!draft.value.telephone.trim()) errors.value.telephone = 'Le téléphone est obligatoire.'
  if (!draft.value.email.trim()) errors.value.email = "L'e-mail est obligatoire."
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.value.email)) errors.value.email = "L'adresse e-mail n'est pas valide."
  return Object.keys(errors.value).length === 0
}

function save() {
  if (!validate()) return
  saveContact({ ...draft.value, prenom: draft.value.prenom.trim(), nom: draft.value.nom.trim() })
  router.push('/contacts')
}
</script>

<template>
  <section class="detail-page">
    <button class="back-button" type="button" @click="router.push('/contacts')">← Retour aux contacts</button>
    <div class="detail-heading">
      <div>
        <p class="eyebrow">{{ isNew ? 'NOUVEAU CONTACT' : 'FICHE CONTACT' }}</p>
        <h1>{{ isNew ? 'Ajouter un contact' : 'Modifier le contact' }}</h1>
      </div>
    </div>

    <form class="contact-form" novalidate @submit.prevent="save">
      <div class="photo-column">
        <div class="photo-preview">
          <img v-if="draft.photo" :src="draft.photo" alt="Aperçu de la photo du contact" />
          <span v-else aria-hidden="true">👤</span>
        </div>
        <div class="photo-actions">
          <button class="secondary-button" type="button" @click="galleryInput?.click()">▣ Galerie</button>
          <label class="secondary-button camera-button">
            ◉ Caméra
            <input type="file" accept="image/*" capture="user" @change="choosePhoto" />
          </label>
          <input ref="galleryInput" class="visually-hidden" type="file" accept="image/*" @change="choosePhoto" />
        </div>
        <p class="photo-hint">JPG, PNG ou HEIC. La photo est prévisualisée immédiatement.</p>
      </div>

      <div class="fields-column">
        <div class="field-row">
          <label>Prénom <input v-model="draft.prenom" type="text" autocomplete="given-name" :class="{ invalid: errors.prenom }" /></label>
          <label>Nom <input v-model="draft.nom" type="text" autocomplete="family-name" :class="{ invalid: errors.nom }" /></label>
        </div>
        <p v-if="errors.prenom" class="error">{{ errors.prenom }}</p>
        <p v-if="errors.nom" class="error">{{ errors.nom }}</p>
        <label>Téléphone <input v-model="draft.telephone" type="tel" autocomplete="tel" placeholder="06 00 00 00 00" :class="{ invalid: errors.telephone }" /></label>
        <p v-if="errors.telephone" class="error">{{ errors.telephone }}</p>
        <label>E-mail <input v-model="draft.email" type="email" autocomplete="email" placeholder="contact@exemple.fr" :class="{ invalid: errors.email }" /></label>
        <p v-if="errors.email" class="error">{{ errors.email }}</p>

        <div class="quick-actions">
          <a class="secondary-button" :href="`tel:${draft.telephone.replaceAll(' ', '')}`">☎ Appeler</a>
          <a class="secondary-button" :href="`mailto:${draft.email}`">✉ E-mail</a>
        </div>
        <div class="form-actions">
          <button class="secondary-button" type="button" @click="router.push('/contacts')">Annuler</button>
          <button class="primary-button" type="submit">Enregistrer</button>
        </div>
      </div>
    </form>
  </section>
</template>
