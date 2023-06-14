<template>
  <div class="container">
    <h1>Welcome to MajiManagement System</h1>
    <p>Manage all your water management needs in one place.</p>
    <router-link to="/login" class="button">Sign In</router-link>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
};
</script>

<style scoped>
.container {
  text-align: center;
}

.button {
  display: inline-block;
  padding: 15px 25px;
  font-size: 24px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  background-color: #4CAF50;
  border: none;
  border-radius: 15px;
  box-shadow: 0 9px #999;
}
</style>
