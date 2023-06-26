<template>
    <footer class="bg-gray-900 text-white py-10">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 class="text-lg font-bold mb-4">About Us</h4>
            <p class="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc gravida odio vel cursus suscipit.</p>
            <div class="social-icons mt-4">
              <a href="#" class="mr-2"></a>
              <a href="#" class="mr-2"></a>
              <a href="#" class="mr-2"></a>
            </div>
          </div>
          <div>
            <h4 class="text-lg font-bold mb-4">Contact Us</h4>
            <ul class="contacts text-sm">
              <li><strong>Phone:</strong> 110-567-984</li>
              <li><strong>Email:</strong> SpursMatchUp@gmail.co.ke</li>
              <li><strong>Address:</strong> 123 Main Street, City</li>
            </ul>
          </div>
          <div>
            <h4 class="text-lg font-bold mb-4">Quick Links</h4>
            <ul class="quick text-sm">
    <li><router-link to="/home" exact-active-class="activee-link" class="nav-link">Home</router-link></li>
    <li><router-link to="/services" exact-active-class="activee-link" class="nav-link">Services</router-link></li>
    <li><router-link to="/ticket" exact-active-class="activee-link" class="nav-link">Tickets</router-link></li>
    <li><router-link to="/profile-page" exact-active-class="activee-link" class="nav-link">Profile</router-link></li>
  </ul>
          </div>
        </div>
      </div>
    </footer>
  </template>
  
  
  <style>
  
  .contacts{
  
  display: block;
  
  }
  
  .quick{
    display: block;
  
  }
  /* strong{
    color:000080 #	;
  
  } */
  
  .activee-link{
   
    color: blue;
  }
  
  .nav-link:hover {
    text-decoration: underline;
  }
  
  </style>
    
   
    <script>
    export default {
      name: 'MyFooter',
    }
    </script>