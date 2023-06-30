<template>
  <div class="body-wrapper">
    <div class="container">
      <h1>Login</h1>
      <form @submit.prevent="login">
        <div class="input-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required>
        </div>

        <div class="input-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required>
        </div>

        <!-- Error message -->
        <p class="error" v-if="errorMessage">{{ errorMessage }}</p>

        <button class="submit-btn" type="submit">Login</button>
      </form>
      <p class="register-link">Not a member yet? <router-link to="/register">Sign up here</router-link>.</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 100vh;
  margin: 0 auto;
  padding: 40px;
  text-align: center;
  background-color: #05140b;
  border-radius: 8px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 28px;
  margin-bottom: 30px;
  color: #ece0e0;
}

.input-group {
  margin-bottom: 20px;
  text-align: left;
}

.input-group label {
  display: block;
  font-size: 16px;
  margin-bottom: 10px;
  color: #ece0e0;
}

.input-group input {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #dddddd;
  border-radius: 4px;
}

.submit-btn {
  display: inline-block;
  padding: 12px 24px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #ffffff;
  background-color: #4CAF50; /* Green background */
  border: none;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease-in-out;
}

.submit-btn:hover {
  background-color: #45a049; /* Darker green on hover */
}

.register-link {
  font-size: 14px;
  margin-top: 20px;
  color: #666666;
}

.register-link a {
  color: #007bff;
  text-decoration: none;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '', // to store the error message
    }
  },
  methods: {
    async login() {
      this.errorMessage = ''; // clear previous error message
      try {
        const response = await axios.post('http://localhost:8000/api/login', {
          email: this.email,
          password: this.password
        });

        // Save user_id in local storage
        localStorage.setItem('user_id', response.data.user_id);

        // Check user_role and redirect
        if (response.data.user_role === 'admin') {
          this.$router.push('/adminpage');
        } else {
          this.$router.push('/homepage');
        }

      } catch (error) {
        if (error.response) {
          // Show the error message from the response to the user
          this.errorMessage = error.response.data.message;
        }
      }
    }
  }
}
</script>

<style>
.body-wrapper {
  background-image: url('drinkingwater1.jpg');
  background-size: cover;
}
</style>
