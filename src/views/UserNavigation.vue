<template>
  <nav>
    <ul>
      <li>
        <h1 class="text-2xl font-bold text-white">
          <span style="font-style: oblique"><u>MajiManagement</u></span>
        </h1>
      </li>
      <li class="centered">
        <router-link to="/homepage" active-class="active-link"
          >Home</router-link
        >
      </li>
      <li class="centered">
        <router-link to="/ureport" active-class="active-link"
          >Report</router-link
        >
      </li>
      <li class="centered">
        <router-link to="/utips" active-class="active-link">Tips</router-link>
      </li>
      <li class="centered">
        <router-link to="/ucontacts" active-class="active-link"
          >Contacts</router-link
        >
      </li>
      <li class="centered">
        <router-link to="/uprofile" active-class="active-link"
          >Profile</router-link
        >
      </li>
      <li class="centered right">
        <a @click="logout" class="logout-link">Logout</a>
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
  background-color: #05140b;
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
  background-color: rgb(145, 175, 145);
}

.active-link {
  background-color: #4caf50;
}

.centered {
  text-align: center;
}

.right {
  float: right;
}

.logout-link:hover {
  background-color: rgb(176, 33, 23);
  color: red;
}
.logout-link {
  color: red;
}
</style>
<script>
export default {
  methods: {
    logout() {
      // Remove user_id from localStorage
      localStorage.removeItem("user_id");
      // Redirect to login page
      this.$router.push("/login");
    },
  },
};
</script>
