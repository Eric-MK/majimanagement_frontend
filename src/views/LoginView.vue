<template>
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
  
        <button class="submit-btn" type="submit">Login</button>
      </form>
      <p class="register-link">If you are not a member, <router-link to="/register">register here</router-link>.</p>
    </div>
</template>

  
  <style>
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

.register-link {
  text-align: center;
  margin-top: 20px;
}
</style>

  <script>
  import axios from 'axios'
  
  export default {
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      login() {
        axios.post('http://localhost:8000/api/login', {
          email: this.email,
          password: this.password
        })
        .then(response => {
           // Save user_id in local storage
        localStorage.setItem('user_id', response.data.user_id);
         // Check user_role and redirect
         if(response.data.user_role === 'admin') {
          this.$router.push('/adminpage');
        } else {
          this.$router.push('/homepage');
        }
        })
        .catch(error => {
          console.log(error)
          // Handle the error. Maybe show a message to the user, etc.
        })
      }
    }
  }
  </script>
  