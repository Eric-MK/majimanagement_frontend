<template>
<AdminNavigation/>
    <div>
        <input type="text" v-model="searchTerm" placeholder="Search by City">
        <div v-for="report in filteredReports" :key="report.id">
            <h2>City: {{ report.city }}</h2>
            <p>Street: {{ report.street }}</p>
            <p>Street_Number: {{ report.number }}</p>
            <p>Postal_Code: {{ report.postal_code }}</p>
            <p>Description: {{ report.description }}</p>
            <p>Reported by: {{ report.user.name }}</p> <!-- showing reporter's name -->
            <p>User email: {{ report.user.email}}</p>
            <p>Status: <select v-model="report.status" @change="updateReportStatus(report)">
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="denied">Denied</option>
            </select></p>

            <p v-if="report.updateMessage">{{ report.updateMessage }}</p>

         
        </div>
    </div>
</template>
<style>
  div {
    margin: 0;
    padding: 10px;
    font-family: Arial, sans-serif;
  }

  h1 {
    font-size: 2em;
    color: #333;
    text-align: center;
    padding: 10px;
  }

  input[type="text"] {
    display: block;
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    box-sizing: border-box;
  }

  h2 {
    font-size: 1.5em;
    color: #333;
    margin-top: 15px;
    margin-bottom: 5px;
  }

  p {
    font-size: 1em;
    color: #666;
    line-height: 1.6;
  }

  select {
    padding: 5px;
    font-size: 1em;
  }
</style>

<script>
import axios from 'axios'
import AdminNavigation from '../views/NavigationAdminView.vue'

export default {
    data() {
        return {
            reports: [],
            searchTerm: ''
        }
    },
    computed: {
        filteredReports() {
            return this.reports.filter(report => report.city.includes(this.searchTerm))
        }
    },
    methods: {
        async getReports() {
            try {
                const response = await axios.get('http://localhost:8000/api/reports')
                this.reports = response.data
            } catch (error) {
                console.error(error)
            }
        },
        async updateReportStatus(report) {
            try {
                const response = await axios.put(`http://localhost:8000/api/reports/${report.id}`, {
                    status: report.status,
                })
                // Set updateMessage to response message
                report.updateMessage = response.data.message;
                console.log(response.data)
                // Clear the update message after 1 second
                setTimeout(() => {
                    report.updateMessage = null;
                }, 2000);
            } catch (error) {
                console.error(error)
            }
        },
        checkUserId() {
            const userId = localStorage.getItem('user_id');
            console.log('User ID:', userId);  // Print user ID to console

            if (!userId) {
                // Redirect to login page if user id is not present
                this.$router.push('/login');
            }
        }
    },
    beforeMount() {
        this.checkUserId(); // Check if user id is present
    },
    mounted() {
        this.getReports()
    },
    components: {
        AdminNavigation,
    },
}
</script>

