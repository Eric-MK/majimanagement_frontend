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
        <div v-if="message" class="success-message">{{ message }}</div>
        <div v-if="errors" class="error-message">
            <div v-for="(value, key, index) in errors" :key="index">{{ `${key}: ${value}` }}</div>
        </div>
        <h1>Contacts</h1>
        <div v-for="contact in contacts" :key="contact.id">
            <h2>{{contact.name}}</h2>
            <p>{{contact.phone}}</p>
            <p>{{contact.email}}</p>
            <p>{{contact.location}}</p>
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
            },
            errors: {}, // store the validation errors
            message: '' // store the success message
        }
    },
    methods: {
        submitForm() {
            axios.post('http://localhost:8000/api/contacts', this.newContact)
                .then(response => {
                    this.contacts.push(response.data.contact);
                    this.newContact = { name: '', phone: '', email: '', location: '' };
                    this.message = response.data.message; // show success message
                    this.clearMessage();
                })
                .catch(error => {
                    if (error.response && error.response.status === 400) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log(error.response.data);
                        // Here error.response.data contains the validation errors
                        this.errors = error.response.data;
                        this.clearMessage();
                    }
                });
        },
        getContacts() {
            axios.get('http://localhost:8000/api/contacts')
                .then(response => {
                    this.contacts = response.data;
                })
        },
        deleteContact(contact) {
            axios.delete(`http://localhost:8000/api/contacts/${contact.id}`)
                .then(response => {
                    this.getContacts();
                })
        },
        clearMessage() {
            setTimeout(() => {
                this.errors = {};
                this.message = '';
            }, 3000);
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

<style>
.error-message {
    color: red;
}

.success-message {
    color: green;
}
</style>
