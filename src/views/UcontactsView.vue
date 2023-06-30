<template>
    <UserNavigation/>
    <div class="homepage">
        <h1>Contacts</h1>
        <input class="search-box" v-model="searchTerm" type="text" placeholder="Search by location...">
        <div class="contact-card" v-for="contact in filteredContacts" :key="contact.id">
            <h2>{{ contact.name }}</h2>
            <p><b>Phone No:</b> {{ contact.phone }}</p>
            <p><b>Email: </b>{{ contact.email }}</p>
            <h3>City: {{ contact.location }}</h3>
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

.search-box {
    width: 100%;
    padding: 10px;
    margin: 20px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.contact-card {
    padding: 20px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
}
</style>
