<template>
    <UserNavigation/>
    <div :class="$style.homepage">
        <div :class="$style.header">
            <h1>Welcome, {{ user.name }}</h1>
            <p>Join us in our mission to manage water resources effectively and efficiently. Report any issues or share your suggestions today.</p>
            <button @click="navigateToReport" :class="$style.ctaButton">Report Now</button>
        </div>
    </div>
    <FooterView/>
</template>

<script>
import axios from 'axios'
import UserNavigation from '../views/UserNavigation.vue'
import FooterView from '../views/FooterView.vue'

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
        FooterView,
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
            this.$router.push('/ureport');
        }
    }
}
</script>

<!-- Define your styles inside a module -->
<style module>
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

.ctaButton {
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 15px 30px;
    font-size: 1.2em;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.ctaButton:hover {
    background-color: #2980b9;
}
</style>
