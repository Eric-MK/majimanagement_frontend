<template>
  <div class="landing-page">
    <div class="services-section">
      <h2>Services Offered</h2>
      <div class="services">
        <div class="service">
      <h3>Reporting</h3>
      <p>Report water-related issues, such as leakages or contamination, to the appropriate authorities for prompt action and resolution.</p>
    </div>
        <div class="service">
      <h3>Water Resource Management</h3>
      <p>Connect with cooperatives to ensure sustainable water resource management and conservation in Kenya.</p>
    </div>
    <div class="service">
      <h3>Water Quality Monitoring</h3>
      <p>Monitor the quality of water sources and ensure safe and clean water supply</p>
    </div>
      </div>
    </div>
    <div class="container">
      <h1>Welcome to MajiManagement</h1>
<!--       <p>Manage all your water management needs in one place.</p>
 -->      <router-link to="/login" class="button">Sign In</router-link>
    </div>
  </div>
</template>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}

.landing-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f2f2f2;
  background-image: url('drinkingwater1.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.services-section {
  width: 50%;
  padding: 50px;
  text-align: center;
  color: #ece0e0;
  margin-right: auto;
}

h2 {
  font-size: 32px;
  margin-bottom: 20px;
}

.services {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 30px;
}

.service {
  width: 300px;
  padding: 20px;
  margin: 20px;
  background-color: #05140b;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out;
}

.service:hover {
  transform: translateY(-10px);
}

.service h3 {
  font-size: 24px;
  margin-bottom: 10px;
}

.service p {
  font-size: 18px;
  margin-bottom: 0;
}

.container {
  width: 50%;
  text-align: center;
  color: #05140b;
  margin-left: auto;
  margin-bottom: 110px;
/*   background-color: rgba(208, 231, 208, 0.5); /* semi-transparent green */
 
}

.container h1{

  background-color: rgba(208, 231, 208, 0.5);
  border-radius: 8px;
}

h1 {
  font-size: 48px;
  margin-bottom: 20px;
}

p {
  font-size: 24px;
  margin-bottom: 40px;
}

.button {
  display: inline-block;
  padding: 15px 25px;
  font-size: 24px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #ffffff;
  background-color: #4CAF50;
  border: none;
  border-radius: 15px;
  box-shadow: 0 9px #999;
}
</style>

<script>
export default {
  name: 'LandingPage',
};
</script>
