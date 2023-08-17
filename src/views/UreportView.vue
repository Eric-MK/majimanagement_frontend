<template>
  <UserNavigation />
  <div class="homepage">
    <div class="content-container">
      <div class="image-container">
        <img src="report.jpg" alt="Image" />
      </div>
      <div class="form-container">
        <h2>Report</h2>
        <form @submit.prevent="createReport" class="report-form">
          <label for="city">City:</label>
          <select v-model="newReport.city" id="city" required>
            <option disabled value="">Please select a city</option>
            <option>Nairobi</option>
            <option>Mombasa</option>
            <option>Kisumu</option>
            <option>Nakuru</option>
            <option>Eldoret</option>
            <!-- Add more cities as needed -->
          </select>

          <label for="street">Street:</label>
          <input v-model="newReport.street" id="street" required />

          <label for="number">Number:</label>
          <input v-model="newReport.number" id="number" required />

          <label for="postal_code">Postal Code:</label>
          <input v-model="newReport.postal_code" id="postal_code" required />

          <label for="description">Description:</label>
          <textarea
            v-model="newReport.description"
            id="description"
            required
          ></textarea>

          <button type="submit">Create Report</button>
        </form>
      </div>
    </div>
    <h3>Reports Made</h3>
    <div class="report-card-container">
      <div v-if="reports.length === 0">No reports made.</div>
      <div
        v-else
        v-for="report in reports"
        :key="report.id"
        class="report-card"
      >
        <h2>Description: {{ report.description }}</h2>
        <p>City: {{ report.city }}</p>
        <p>Street: {{ report.street }}</p>
        <p>Number: {{ report.number }}</p>
        <p>Postal Code: {{ report.postal_code }}</p>
        <p><b>Status:</b> {{ report.status }}</p>
        <button @click="deleteReport(report.id)">Delete Report</button>
      </div>
    </div>
  </div>
  <FooterView />
</template>

<script>
import axios from "axios";
import UserNavigation from "../views/UserNavigation.vue";
import FooterView from "../views/FooterView.vue";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      reports: [],
      newReport: {
        user_id: "", // the user_id will be added before the API call
        city: "",
        street: "",
        number: "",
        postal_code: "",
        description: "",
      },
    };
  },
  components: {
    UserNavigation,
    FooterView,
  },
  beforeMount() {
    const userId = localStorage.getItem("user_id");
    console.log("User ID:", userId); // Print user ID to console

    if (!userId) {
      // Redirect to login page if user id is not present
      this.$router.push("/login");
    } else {
      this.newReport.user_id = userId; // set the user_id
      this.loadUserReports(userId);
    }
  },
  methods: {
    loadUserReports(userId) {
      axios
        .get(`http://localhost:8000/api/users/${userId}/reports`)
        .then((response) => {
          // assuming response.data has the user's reports
          this.reports = response.data;
        })
        .catch((error) => {
          console.log(error);
          // handle error
        });
    },
    createReport() {
      // Show a confirmation dialog using SweetAlert
      Swal.fire({
        title: "Create Report",
        text: "Are you sure you want to create this report?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Create",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          // User confirmed, proceed to create the report
          axios
            .post(`http://localhost:8000/api/reports`, this.newReport)
            .then((response) => {
              // Clear the form
              this.newReport = {
                user_id: this.newReport.user_id, // keep the user_id
                city: "",
                street: "",
                number: "",
                postal_code: "",
                description: "",
              };

              // Add the newly created report to the list
              this.reports.push(response.data);

              // Show a success message
              Swal.fire({
                title: "Report Created",
                text: "Your report has been created successfully!",
                icon: "success",
                confirmButtonText: "OK",
              });
            })
            .catch((error) => {
              console.log(error);
              // handle error
            });
        }
      });
    },
    deleteReport(reportId) {
      if (!confirm("Are you sure you want to delete this report?")) {
        return; // Stop here if the user clicked "Cancel"
      }

      axios
        .delete(`http://localhost:8000/api/reports/${reportId}`)
        .then((response) => {
          // Remove the deleted report from the list
          this.reports = this.reports.filter(
            (report) => report.id !== reportId
          );

          alert("Report deleted successfully");
        })
        .catch((error) => {
          console.log(error);
          // handle error
        });
    },
  },
};
</script>
<style scoped>
.homepage {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.content-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  width: 80%;
  margin: 0 auto;
}

.form-container {
  width: 50%;
  margin-right: 20px;
}

.report-form {
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
  padding: 20px;
  border-radius: 5px;
  background-color: #05140b;
  color: #ece0e0;
}

.report-form label {
  margin-bottom: 10px;
  font-weight: bold;
}

.report-form input,
.report-form select,
.report-form textarea {
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.report-form button {
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
}

.report-form button:hover {
  background-color: #45a049;
}

.report-card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.report-card {
  width: 45%; /* Adjust as needed to fit more cards in a row */
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0px 0px 10px 0px green;
  border-radius: 5px;
}

.report-card h2 {
  font-size: 20px;
  margin-bottom: 10px;
}

.image-container {
  width: 50%;
  margin-right: 20px;
  height: 100%;
  margin-top: 65px;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
}

@media (max-width: 768px) {
  .content-container {
    flex-direction: column;
  }

  .form-container,
  .image-container {
    width: 100%;
    margin: 0;
  }
}
</style>
