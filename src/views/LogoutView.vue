<script>
  export default {
    // Other properties and methods...
    methods: {
      // Other methods...
      logout() {
        // Clear user_id from local storage
        localStorage.removeItem('user_id');
  
        // Redirect to login page
        this.$router.push('/login');
      },
    },
  };
</script>
