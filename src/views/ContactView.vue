<template>
    <AdminNavigation/>
    <div>
        <h1>Create Contact</h1>
        <form @submit.prevent="submitForm">
            <input v-model="newContact.name" placeholder="Name" required>
            <input v-model="newContact.phone" placeholder="Phone" required>
            <input v-model="newContact.email" placeholder="Email" required>
            <input v-model="newContact.location" placeholder="Location" required>
            <button type="submit">Create</button>
        </form>

        <h1>Contacts</h1>
        <div v-for="contact in contacts" :key="contact.id">
            <h2>{{contact.name}}</h2>
            <p>{{contact.phone}}</p>
            <p>{{contact.email}}</p>
            <p>{{contact.location}}</p>
            <button @click="updateContact(contact)">Update</button>
            <button @click="deleteContact(contact)">Delete</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import AdminNavigation from '../views/NavigationAdminView.vue'

export default {
    data() {
        return {
            contacts: [],
            newContact: {
                name: '',
                phone: '',
                email: '',
                location: ''
            }
        }
    },
    methods: {
        submitForm() {
            axios.post('http://localhost:8000/api/contacts', this.newContact)
                .then(response => {
                    this.contacts.push(response.data);
                    this.newContact = { name: '', phone: '', email: '', location: '' };
                })
        },
        getContacts() {
            const userId = localStorage.getItem('user_id');
            if (!userId) {
                alert('You must be logged in to view contacts.');
                return;
            }
            axios.get('http://localhost:8000/api/contacts')
                .then(response => {
                    this.contacts = response.data;
                })
        },
        updateContact(contact) {
            axios.put(`http://localhost:8000/api/contacts/${contact.id}`, contact)
                .then(response => {
                    this.getContacts();
                })
        },
        deleteContact(contact) {
            axios.delete(`http://localhost:8000/api/contacts/${contact.id}`)
                .then(response => {
                    this.getContacts();
                })
        }
    },
    created() {
        this.getContacts()
    },
    components: {
        AdminNavigation,
    },
}
</script>
