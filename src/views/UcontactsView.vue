<template>
    <UserNavigation/>
    <div class="homepage">
        <h1>Contacts</h1>
        <input v-model="searchTerm" type="text" placeholder="Search by location...">
        <div v-for="contact in filteredContacts" :key="contact.id">
            <h2>{{ contact.name }}</h2>
            <p>{{ contact.phone }}</p>
            <p>{{ contact.email }}</p>
            <p>{{ contact.location }}</p>
        </div>
    </div>
    <FooterView/>
</template>

<script>
import UserNavigation from '../views/UserNavigation.vue'
import FooterView from '../views/FooterView.vue'
import axios from 'axios';

export default {
    components: {
        UserNavigation,
        FooterView,
    },
    data() {
        return {
            contacts: [],
            searchTerm: ''
        }
    },
    computed: {
        filteredContacts() {
            if (!this.searchTerm) {
                return this.contacts;
            }

            return this.contacts.filter(contact =>
                contact.location.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
        }
    },
    beforeMount() {
        const userId = localStorage.getItem('user_id');
        console.log('User ID:', userId);  // Print user ID to console

        if (!userId) {
            // Redirect to login page if user id is not present
            this.$router.push('/login');
        }
        else {
            // Fetch contacts from API
            this.fetchContacts();
        }
    },
    methods: {
        async fetchContacts() {
            try {
                const response = await axios.get('http://localhost:8000/api/contacts');
                this.contacts = response.data;
            } catch (error) {
                console.error(error);
            }
        },
    }
}
</script>

<style scoped>
.homepage {
    width: 80%;
    margin: auto;
    padding: 20px;
}
</style>
