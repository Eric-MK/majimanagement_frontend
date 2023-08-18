<template>
    <div>
      <AdminNavigation />
      <div class="users-container">
        <h2>All Users</h2>
        <p>Total Users: {{ users.length }}</p>
        <ul class="user-list">
          <li v-for="user in users" :key="user.id" class="user-item">
            <div class="user-details">
              <span class="user-name">{{ user.name }}</span>
              <span class="user-email">{{ user.email }}</span>
            </div>
            <button @click="confirmDeleteUser(user)" class="delete-button">Delete</button>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Swal from 'sweetalert2';
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
      confirmDeleteUser(user) {
        Swal.fire({
          title: 'Delete User',
          text: 'Are you sure you want to delete this user?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
        }).then((result) => {
          if (result.isConfirmed) {
            this.deleteUser(user.id);
          }
        });
      },
      deleteUser(userId) {
        axios.delete(`http://localhost:8000/api/users/${userId}`)
          .then((response) => {
            this.fetchUsers(); // Refresh the user list after deletion
            Swal.fire({
              title: 'User Deleted',
              text: 'The user has been deleted successfully!',
              icon: 'success',
              confirmButtonText: 'OK',
            });
          })
          .catch((error) => {
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
  
  p {
    font-size: 18px;
    margin-bottom: 10px;
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

  .delete-button {
  margin-top: 6px;
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #c0392b;
}
  </style>
  