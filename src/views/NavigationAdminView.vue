<template>
  <nav>
      <ul>
          <li>
              <h1 class="text-2xl font-bold text-white"><span style="font-style: oblique;"><u>MajiManagement<sub>admin</sub></u></span></h1>
          </li>
          <li class="centered">
              <router-link to="/adminpage" active-class="active-link">Reports</router-link>
          </li>
         <!--  <li class="centered">
              <router-link to="/tips" active-class="active-link">Tips</router-link>
          </li> -->
          <li class="centered">
              <router-link to="/contacts" active-class="active-link">Contacts</router-link>
          </li>
           <li class="centered">
              <router-link to="/tips" active-class="active-link">Users</router-link>
          </li> 

          <li class="centered right">
              <a @click="logout">Logout</a>
          </li>
      </ul>
  </nav>
</template>

<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

li {
  float: left;
}

li h1 {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 20px;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 18px;
}

li a:hover:not(.active-link) {
  background-color: #111;
}

.active-link {
  background-color: #4CAF50;
}

.centered {
  text-align: center;
}

.right {
  float: right;
}
</style>
<script>
export default {
  methods: {
    logout() {
      // Remove user_id from localStorage
      localStorage.removeItem('user_id');
      // Redirect to login page
      this.$router.push('/login');
    },
  },
};
</script>