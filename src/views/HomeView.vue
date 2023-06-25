<template>
    <UserNavigation/>
     <div class="homepage">
            <h1>Welcome, {{ user.name }}</h1>

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
    