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
            <p>Phone No: {{contact.phone}}</p>
            <p>Email: {{contact.email}}</p>
            <p>City: {{contact.location}}</p>
            <button @click="deleteContact(contact)">Delete</button>
            <div v-if="contact.message" class="success-message">{{ contact.message }}</div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import AdminNavigation from '../views/NavigationAdminView.vue'
import Swal from 'sweetalert2';


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
                    // add a 'message' field to each contact
                    this.contacts = response.data.map(contact => {
                        contact.message = '';
                        return contact;
                    });
                })
        },
        deleteContact(contact) {
    Swal.fire({
      title: 'Delete Contact',
      text: 'Are you sure you want to delete this contact?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8000/api/contacts/${contact.id}`)
          .then(response => {
            // find the deleted contact in the contacts array
            const contactIndex = this.contacts.findIndex(c => c.id === contact.id);
            // if found, set its message field
            if (contactIndex > -1) {
              this.contacts[contactIndex].message = response.data.message;
            }
            this.getContacts();
            Swal.fire({
              title: 'Contact Deleted',
              text: 'The contact has been deleted successfully!',
              icon: 'success',
              confirmButtonText: 'OK',
            });
          })
          .catch(error => {
            console.error(error);
          });
      }
    });
  },
        clearMessage() {
            setTimeout(() => {
                this.errors = {};
                this.message = '';
                this.contacts.forEach(contact => contact.message = '');
            }, 3000);
        }
    },
    created() {
        this.getContacts()
    },
    beforeMount() {
        const userId = localStorage.getItem('user_id');
            console.log('User ID:', userId);  // Print user ID to console

            if (!userId) {
                // Redirect to login page if user id is not present
                this.$router.push('/login');
            }
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
