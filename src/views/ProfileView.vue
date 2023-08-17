<template>
    <UserNavigation />
    <div class="profile-container">
      <h1>Profile</h1>
      <div v-if="updateSuccess" class="alert alert-success">
        Profile updated successfully!
      </div>
      <div v-if="passwordSuccess" class="alert alert-success">
        Password changed successfully!
      </div>
      <form ref="updateProfileForm" class="profile-form">
        <label>Name:</label>
        <input v-model="user.name" type="text" required />

        <label>Email:</label>
        <input v-model="user.email" type="email" required />

        <button type="button" class="submit-btn" @click="confirmProfileUpdate">Update Profile</button>
    </form>
  
    <form @submit.prevent="changePassword" class="profile-form">
        <label>New Password:</label>
        <input v-model="passwords.new" type="password" required />

        <label>Confirm New Password:</label>
        <input v-model="passwords.confirm" type="password" required />

        <button type="button" class="submit-btn" @click="confirmPasswordChange">Change Password</button>
    </form>
  
      <button @click="deleteProfile" class="delete-btn">Delete Profile</button>
    </div>
    <FooterView />
</template>

<script>
import axios from 'axios';
import UserNavigation from '../views/UserNavigation.vue';
import FooterView from '../views/FooterView.vue';
import Swal from 'sweetalert2';

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
            updateSuccess: false,
            passwordSuccess: false,
        };
    },
    components: {
        UserNavigation,
        FooterView,
    },
    beforeMount() {
        const userId = localStorage.getItem('user_id');

        if (!userId) {
            this.$router.push('/login');
        } else {
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
            axios.put(`http://localhost:8000/api/users/${userId}`, this.user)
                .then(response => {
                    const message = response.data.message; // Get the message from the API response

                    if (message === 'User updated successfully') {
                        /* this.updateSuccess = true;
                        setTimeout(() => this.updateSuccess = false, 5000); */
                        Swal.fire({
                            title: 'Profile Updated',
                            text: 'Your profile has been updated successfully!',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        });
                        
                    } else if (message === 'No changes detected') {
                        // Handle the scenario where no changes were detected
                        // Display the custom message or perform any necessary actions
                        Swal.fire({
                            title: 'No Changes Detected',
                            text: 'No changes were made to your profile.',
                            icon: 'info',
                            confirmButtonText: 'OK'
                        });
                    }
                })
                .catch(error => {
                    // Handle API error
                    console.error(error);
                });
        },
       
        changePassword() {
            const userId = localStorage.getItem('user_id');
            axios.put(`http://localhost:8000/api/users/${userId}/password`, { password: this.passwords.new, password_confirmation: this.passwords.confirm }).then(() => {
                 this.passwordSuccess = true;
        setTimeout(() => this.passwordSuccess = false, 5000);
        
        Swal.fire({
            title: 'Password Changed',
            text: 'Your password has been changed successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
        });
    });
},

confirmPasswordChange() {
    if (this.passwords.new !== this.passwords.confirm) {
        Swal.fire({
            title: 'Password Mismatch',
            text: 'The new passwords do not match. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return;
    }

    Swal.fire({
        title: 'Change Password',
        text: 'Are you sure you want to change your password?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Change Password',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            this.changePassword();
        }
    });
},

        deleteProfile() {
            Swal.fire({
                title: 'Delete Account',
                text: 'Are you sure you want to delete your account? This action cannot be undone.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Delete',
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    const userId = localStorage.getItem('user_id');
                    axios.delete(`http://localhost:8000/api/users/${userId}`).then(() => {
                        localStorage.removeItem('user_id');
                        this.$router.push('/login');
                    });
                }
            });
        },
        confirmProfileUpdate() {
            Swal.fire({
                title: 'Update Profile',
                text: 'Are you sure you want to update your profile details?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Update',
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.updateProfile();
                }
            });
        },
    },
    created() {
        this.loadUserData();
    },
};
</script>

  
  <style scoped>
  .profile-container {
    width: 50%;
    margin: auto;
    padding: 20px;
    box-shadow: 0px 2px 10px green;
    margin-top: 30px;
    margin-bottom: 30px;
  }

.profile-container h1{
    text-align: center;
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

.alert {
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid transparent;
    border-radius: 4px;
}

.alert-success {
    color: #155724;
    background-color: #d4edda;
    border-color: #c3e6cb;
}
</style>
