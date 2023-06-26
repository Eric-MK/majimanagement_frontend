<template>
    <UserNavigation/>
     <div class="homepage">
         <form @submit.prevent="createReport">
             <label for="city">City:</label>
             <input v-model="newReport.city" id="city" required>

             <label for="street">Street:</label>
             <input v-model="newReport.street" id="street" required>

             <label for="number">Number:</label>
             <input v-model="newReport.number" id="number" required>

             <label for="postal_code">Postal Code:</label>
             <input v-model="newReport.postal_code" id="postal_code" required>

             <label for="description">Description:</label>
             <textarea v-model="newReport.description" id="description" required></textarea>

             <button type="submit">Create Report</button>
         </form>
         <div v-for="report in reports" :key="report.id">
             <h2>{{ report.description }}</h2>
             <p>{{ report.city }}, {{ report.street }}, {{ report.number }}, {{ report.postal_code }}</p>
             <p>Status: {{ report.status }}</p>
         </div>
     </div>
     <FooterView/>
</template>

<script>
import axios from 'axios'
import UserNavigation from '../views/UserNavigation.vue'
import FooterView from '../views/FooterView.vue'

export default {
    data() {
        return {
            reports: [],
            newReport: {
                user_id: '', // the user_id will be added before the API call
                city: '',
                street: '',
                number: '',
                postal_code: '',
                description: '',
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
        }
        else {
            this.newReport.user_id = userId;  // set the user_id
            this.loadUserReports(userId);
        }
    },
    methods: {
        loadUserReports(userId) {
            axios.get(`http://localhost:8000/api/users/${userId}/reports`)
                .then(response => {
                    // assuming response.data has the user's reports
                    this.reports = response.data;
                })
                .catch(error => {
                    console.log(error);
                    // handle error
                });
        },
        createReport() {
            // Assume you have a POST endpoint at `/reports` for report creation
            axios.post(`http://localhost:8000/api/reports`, this.newReport)
                .then(response => {
                    // Clear the form
                    this.newReport = {
                        user_id: this.newReport.user_id,  // keep the user_id
                        city: '',
                        street: '',
                        number: '',
                        postal_code: '',
                        description: '',
                    };

                    // Add the newly created report to the list
                    this.reports.push(response.data);
                })
                .catch(error => {
                    console.log(error);
                    // handle error
                });
        }
    }
}
</script>

<style scoped>
.homepage {
    width: 80%;
    margin: auto;
    padding: 20px;
}
</style>
