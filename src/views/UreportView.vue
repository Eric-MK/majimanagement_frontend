<template>
    <UserNavigation/>
     <div class="homepage">
            <p>Report View:</p>
        </div>
        <FooterView/>

    </template>
    
    <script>
    import UserNavigation from '../views/UserNavigation.vue'
    import FooterView from '../views/FooterView.vue'

    export default {
        
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
    