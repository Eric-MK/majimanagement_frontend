<template>
    <UserNavigation/>
    <div class="homepage">
        <div class="header">
            <h1>Welcome, {{ user.name }}</h1>
            <p>Join us in our mission to manage water resources effectively and efficiently. Report any issues or share your suggestions today.</p>
            <button @click="navigateToReport" class="cta-button">Report Now</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import UserNavigation from '../views/UserNavigation.vue'

export default {
    data() {
        return {
            user: {
                name: '', // will be replaced with actual user data
            },
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
            this.loadUserData(userId);
        }
    },
    methods: {
        loadUserData(userId) {
            axios.get(`http://localhost:8000/api/users/${userId}`)
                .then(response => {
                    // assuming response.data has the user data
                    this.user.name = response.data.name;
                })
                .catch(error => {
                    console.log(error);
                    // handle error
                });
        },
        navigateToReport() {
            this.$router.push('/report');
        }
    }
}
</script>

<style scoped>
.homepage {
    width: 80%;
    margin: auto;
    padding: 20px;
    text-align: center;
}

.header {
    padding: 50px 0;
}

.header h1 {
    font-size: 2em;
    color: #333;
    margin-bottom: 20px;
}

.header p {
    font-size: 1.2em;
    color: #666;
    margin-bottom: 30px;
}

.cta-button {
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 15px 30px;
    font-size: 1.2em;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.cta-button:hover {
    background-color: #2980b9;
}
</style>
