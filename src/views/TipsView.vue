<template>
    <div>
      <AdminNavigation />
      <div class="users-container">
        <h2>All Users</h2>
        <ul class="user-list">
          <li v-for="user in users" :key="user.id" class="user-item">
            <div class="user-details">
              <span class="user-name">{{ user.name }}</span>
              <span class="user-email">{{ user.email }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import AdminNavigation from '../views/NavigationAdminView.vue';
  
  export default {
    components: {
      AdminNavigation,
    },
    data() {
      return {
        users: [],
      };
    },
    mounted() {
      this.fetchUsers();
    },
    methods: {
      fetchUsers() {
        axios.get('http://localhost:8000/api/allusers').then((response) => {
          this.users = response.data;
        }).catch((error) => {
          console.error(error);
        });
      },
    },
  };
  </script>
  
  <style scoped>
  .users-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  h2 {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .user-list {
    list-style: none;
    padding: 0;
  }
  
  .user-item {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
    margin: 10px 0;
  }
  
  .user-details {
    display: flex;
    flex-direction: column;
  }
  
  .user-name {
    font-weight: bold;
    font-size: 18px;
  }
  
  .user-email {
    color: #777;
  }
  </style>
  