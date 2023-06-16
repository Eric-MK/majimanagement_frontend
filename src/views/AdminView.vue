<template>
<AdminNavigation/>
    <div>
        <h1>Admin Dashboard</h1>
        <input type="text" v-model="searchTerm" placeholder="Search by location">
        <div v-for="report in filteredReports" :key="report.id">
            <h2>Location: {{ report.location }}</h2>
            <p>Description: {{ report.description }}</p>
            <p>Reported by: {{ report.user.name }}</p> <!-- showing reporter's name -->
            <p>User email: {{ report.user.email}}</p>
            <p>Status: <select v-model="report.status" @change="updateReportStatus(report)">
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="denied">Denied</option>
            </select></p>
         
        </div>
    </div>
</template>

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
            return this.reports.filter(report => report.location.includes(this.searchTerm))
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
                console.log(response.data)
            } catch (error) {
                console.error(error)
            }
        }
    },
    mounted() {
        this.getReports()
    },
    components: {
        AdminNavigation,
  },
}
</script>
