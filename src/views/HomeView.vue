<template>
<UserNavigation/>
 <div class="homepage">
        <h1>Welcome, {{ user.name }}</h1>
        <p>Here are some resources you might find helpful:</p>
        <ul>
            <li v-for="resource in resources" :key="resource.id">
                <a :href="resource.url">{{ resource.name }}</a>
            </li>
        </ul>
    </div>
</template>

<script>
import UserNavigation from '../views/UserNavigation.vue'

export default {
    data() {
        return {
            user: {
                name: 'John Doe', // replace with actual user data
            },
            resources: [
                { id: 1, name: 'Resource 1', url: '#' },
                { id: 2, name: 'Resource 2', url: '#' },
                // add more resources as needed
            ],
        }
    },
    components: {
        UserNavigation,
    },
    beforeMount() {
        const userId = localStorage.getItem('user_id');
        console.log('User ID:', userId);  // Print user ID to console

        if (!userId) {
            // Redirect to login page if user id is not present
            this.$router.push('/login');
        }
        else {
            // Load user data from API, etc.
            // this.loadUserData(userId);
        }
    },
    methods: {
        loadUserData(userId) {
            // Make API call to load user data, etc.
        }
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
