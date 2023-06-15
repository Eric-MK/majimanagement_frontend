<template>
    <div class="container">
      <h1>Register</h1>
      <form @submit.prevent="register">
        <div class="input-group">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="name" required>
        </div>
  
        <div class="input-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required>
        </div>
  
        <div class="input-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required>
        </div>
  
        <div class="input-group">
          <label for="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" required>
        </div>
  
        <!-- Error message -->
        <p class="error" v-if="errorMessage">{{ errorMessage }}</p>
  
        <button class="submit-btn" type="submit">Register</button>
      </form>
      <p class="login-link">Already a member? <router-link to="/login">Login here</router-link>.</p>
    </div>
  </template>
  
  <style scoped>
.container {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
}

.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  margin-bottom: 10px;
}

.input-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.error {
  color: red;
  margin: 10px 0;
}

.submit-btn {
  display: block;
  width: 100%;
  padding: 10px;
  border: none;
  color: white;
  background-color: #007bff;
  border-radius: 4px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #0056b3;
}

.login-link {
  text-align: center;
  margin-top: 20px;
}
</style>

  
  <script>
  import axios from 'axios'
  
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        errorMessage: '',  // to store the error message
      }
    },
    methods: {
      async register() {
        this.errorMessage = '';  // clear previous error message
        try {
          if (this.password !== this.confirmPassword) {
            throw new Error('Password and Confirm Password do not match.');
          }
  
          const response = await axios.post('http://localhost:8000/api/register', {
            name: this.name,
            email: this.email,
            password: this.password,
            password_confirmation: this.confirmPassword,
          });
  
          this.$router.push('/login');
  
        } catch (error) {
          if (error.response) {
            // Show the error message from the response to the user
            this.errorMessage = error.response.data.message;
          } else {
            this.errorMessage = error.message;
          }
        }
      }
    }
  }
  </script>
  