import { computed, ref } from 'vue'
import type { Contact } from '../types'

const photoFor = (initials: string, color: string) =>
  `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160"><rect width="160" height="160" fill="${color}"/><circle cx="80" cy="62" r="29" fill="#fff" opacity=".92"/><path d="M25 150c5-37 25-55 55-55s50 18 55 55" fill="#fff" opacity=".92"/><text x="80" y="145" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="18" fill="${color}">${initials}</text></svg>`,
  )}`

const initialContacts: Contact[] = [
  { id: '1', prenom: 'Sophie', nom: 'Martin', telephone: '06 12 34 56 78', email: 'sophie.martin@example.com', photo: photoFor('SM', '#e9a6a6') },
  { id: '2', prenom: 'Lucas', nom: 'Bernard', telephone: '06 23 45 67 89', email: 'lucas.bernard@example.com', photo: photoFor('LB', '#9cc4c8') },
  { id: '3', prenom: 'Emma', nom: 'Petit', telephone: '06 34 56 78 90', email: 'emma.petit@example.com', photo: photoFor('EP', '#c6b0db') },
  { id: '4', prenom: 'Thomas', nom: 'Robert', telephone: '06 45 67 89 01', email: 'thomas.robert@example.com', photo: photoFor('TR', '#e7c18c') },
  { id: '5', prenom: 'Camille', nom: 'Richard', telephone: '06 56 78 90 12', email: 'camille.richard@example.com', photo: photoFor('CR', '#9fcfae') },
]

const storageKey = 'mon-carnet-contacts'
const saved = localStorage.getItem(storageKey)
const contacts = ref<Contact[]>(saved ? JSON.parse(saved) : initialContacts)

function persist() {
  localStorage.setItem(storageKey, JSON.stringify(contacts.value))
}

export function useContacts() {
  const count = computed(() => contacts.value.length)

  function getContact(id: string) {
    return contacts.value.find((contact) => contact.id === id)
  }

  function saveContact(contact: Contact) {
    const index = contacts.value.findIndex((item) => item.id === contact.id)
    if (index === -1) contacts.value.push(contact)
    else contacts.value[index] = contact
    persist()
  }

  return { contacts, count, getContact, saveContact }
}
