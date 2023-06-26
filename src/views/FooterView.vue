<template>
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-section">
          <h4>About Us</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc gravida odio vel cursus suscipit.</p>
        </div>
        <div class="footer-section">
          <h4>Contact Us</h4>
          <ul class="footer-list">
            <li><strong>Phone:</strong> 110-567-984</li>
            <li><strong>Email:</strong> Majimanagement@gmail.co.ke</li>
            <li><strong>Address:</strong> 123 Main Street, City</li>
          </ul>
        </div>
        <div class="footer-section">
          <h4>Quick Links</h4>
          <ul class="footer-list">
            <li><router-link to="/homepage" exact-active-class="active-link" class="nav-link">Home</router-link></li>
            <li><router-link to="/ureport" exact-active-class="active-link" class="nav-link">Report</router-link></li>
            <li><router-link to="/utips" exact-active-class="active-link" class="nav-link">Tips</router-link></li>
            <li><router-link to="/ucontacts" exact-active-class="active-link" class="nav-link">Contacts</router-link></li>
            <li><router-link to="/uprofile" exact-active-class="active-link" class="nav-link">Profile</router-link></li>
          </ul>
        </div>
      </div>
    </footer>
</template>

<style scoped>
.footer {
  background-color: #333;
  color: #fff;
  padding: 20px 0;
  font-size: 14px;
  line-height: 1.5;
  text-align: center;
}

.footer-container {
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

.footer-section {
  flex: 1;
}

.footer-section h4 {
  font-size: 16px;
  margin-bottom: 10px;
}

.footer-list {
  list-style: none;
  padding: 0;
}

.footer-list li {
  margin-bottom: 5px;
}

.nav-link {
  color: #fff;
  text-decoration: none;
}

.nav-link:hover,
.active-link {
  color: #3498db;
}

@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
  }

  .footer-section {
    margin-bottom: 20px;
  }
}
</style>

<script>
export default {
  name: 'MyFooter',
}
</script>
