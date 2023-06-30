<template>
  <div :class="$style.container">
    <UserNavigation />
    <div :class="$style.homepage">

      <div :class="$style.header">
        <h1>Welcome, <span>{{ user.name }}</span></h1>
        <p>Join us in our mission to manage water resources effectively and efficiently. Report any issues or share your suggestions today.</p>
        <button @click="navigateToReport" :class="$style.ctaButton">Report Now</button>
      </div>
     
    </div>

    <div :class="$style.waterInfo">
  <h2>The Impact of Water Mismanagement and Scarcity in Kenya</h2>
  <p>Water is an essential resource, but in many parts of Kenya, it's a scarce commodity. Lack of access to clean water affects health, livelihood, and education. Poor water management exacerbates these issues, leading to increased water scarcity and impacting socio-economic development. </p>
  <p>Through vigilant <span>reporting</span> and collective efforts, we can mitigate the adverse effects of water mismanagement. <span>Your voice can make a significant difference.</span> Stand with us to create a sustainable future for Kenya.</p>
</div>


    <FooterView />
  </div>
</template>


  
  <script>
  import axios from 'axios'
  import UserNavigation from '../views/UserNavigation.vue'
  import FooterView from '../views/FooterView.vue'
  
  export default {
    data() {
      return {
        user: {
          name: '', // will be replaced with actual user data
        },
      }
    },
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
      } else {
        this.loadUserData(userId);
      }
    },
    methods: {
      loadUserData(userId) {
        axios.get(`http://localhost:8000/api/users/${userId}`)
          .then(response => {
            // assuming response.data has the user data
            this.user.name = response.data.name;
          })
          .catch(error => {
            console.log(error);
            // handle error
          });
      },
      navigateToReport() {
        this.$router.push('/ureport');
      },
    },
  }
  </script>
  
  <!-- Define your styles inside a module -->
  <style module>
  .container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .header span{
    border: 2px solid black;
    border-radius: 8px;
    padding: 5px;
    background-color: #ece0e0;
    color: black;

  }
  
  .homepage {
    flex: 1;
    width: 80%;
    margin: auto;
    padding: 20px;
    text-align: center;
    background-image: url('drinkingwater2.jpg');
    background-size: cover;
    margin-bottom: 20px;
    margin-top: 10px;
  }
  
  .header {
    padding: 50px 0;



  }
  
  .header h1 {
    font-size: 2em;
    color: #ece0e0;
    margin-bottom: 0px;
    margin-top: 65px;
  }
  
  .header p {
    font-size: 1.3em;
    color: #f3ecec;
    margin-bottom: 100px;
  }
  
  .ctaButton {
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 15px 30px;
    font-size: 1.2em;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-bottom: 0px;
  }
  
  .ctaButton:hover {
    background-color: #2980b9;
  }

 


.waterInfo {
  width: 80%;
  margin: auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 2px 10px green;
  color: #333;
  margin-bottom: 50px;
}

.waterInfo h2 {
  font-size: 1.5em;
  color: #000;
  margin-bottom: 20px;
}

.waterInfo p {
  font-size: 1.2em;
  color: #333;
  line-height: 1.5;
}

.waterInfo span{
  font-size: 1.1em; 
  color: #3498db; 
  font-weight: bold; 
}
  </style>
  