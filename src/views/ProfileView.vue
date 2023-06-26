<template>
    <UserNavigation/>
    <div class="profile-container">
        <h1>Profile</h1>

        <form @submit.prevent="updateProfile" class="profile-form">
            <label>Name:</label>
            <input v-model="user.name" type="text" required />

            <label>Email:</label>
            <input v-model="user.email" type="email" required />

            <button type="submit" class="submit-btn">Update Profile</button>
        </form>

        <form @submit.prevent="changePassword" class="profile-form">
            <label>New Password:</label>
            <input v-model="passwords.new" type="password" required />

            <label>Confirm New Password:</label>
            <input v-model="passwords.confirm" type="password" required />

            <button type="submit" class="submit-btn">Change Password</button>
        </form>

        <button @click="deleteProfile" class="delete-btn">Delete Profile</button>
    </div>
</template>

<style scoped>
.profile-container {
    width: 60%;
    margin: auto;
    padding: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.profile-form {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
}

.profile-form label {
    font-size: 1.2em;
    margin: 10px 0;
}

.profile-form input {
    padding: 10px;
    font-size: 1em;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.submit-btn, .delete-btn {
    margin-top: 20px;
    padding: 10px;
    font-size: 1em;
    border: none;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.3s;
}

.submit-btn {
    background: #4CAF50;
}

.submit-btn:hover {
    background: #45a049;
}

.delete-btn {
    background: #f44336;
}

.delete-btn:hover {
    background: #da190b;
}
</style>
<script>
import axios from 'axios';
import UserNavigation from '../views/UserNavigation.vue'

export default {
    data() {
        return {
            user: {
                name: '',
                email: '',
            },
            passwords: {
                new: '',
                confirm: '',
            },
        };
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
            this.loadUserData(userId);
        }
    },
    methods: {
        loadUserData() {
            const userId = localStorage.getItem('user_id');
            axios.get(`http://localhost:8000/api/users/${userId}`).then((response) => {
                this.user = response.data;
            });
        },
        updateProfile() {
            const userId = localStorage.getItem('user_id');
            axios.put(`http://localhost:8000/api/users/${userId}`, this.user).then(() => {
                this.$router.push('/homepage');
            });
        },
        changePassword() {
    if (this.passwords.new !== this.passwords.confirm) {
        alert('Passwords do not match!');
        return;
    }

    const userId = localStorage.getItem('user_id');
    axios.put(`http://localhost:8000/api/users/${userId}/password`, { password: this.passwords.new, password_confirmation: this.passwords.confirm }).then(() => {
        this.$router.push('/homepage');
    });
},
deleteProfile() {
    const userId = localStorage.getItem('user_id');
    axios.delete(`http://localhost:8000/api/users/${userId}`).then(() => {
        localStorage.removeItem('user_id');
        this.$router.push('/login');
    });
}
,
    },
    created() {
        this.loadUserData();
    },
};
</script>
