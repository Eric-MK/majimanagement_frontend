<template>
    <AdminNavigation/>
    <div>
        <h1>Create Tip</h1>
        <form @submit.prevent="createTip">
            <input v-model="newTip.title" placeholder="Tip title" required>
            <textarea v-model="newTip.content" placeholder="Tip content" required></textarea>
            <button type="submit">Submit Tip</button>
        </form>
        <div v-if="message" class="success-message">{{ message }}</div>
        <div v-if="errors" class="error-message">
            <div v-for="(value, key, index) in errors" :key="index">{{ `${key}: ${value}` }}</div>
        </div>
        <h1>Tips</h1>
        <div v-for="tip in tips" :key="tip.id">
            <h2>{{ tip.title }}</h2>
            <p>{{ tip.content }}</p>
            <button @click="deleteTip(tip)">Delete</button>
            <div v-if="tip.message" class="success-message">{{ tip.message }}</div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import AdminNavigation from '../views/NavigationAdminView.vue'

export default {
    data() {
        return {
            tips: [],
            newTip: {
                title: '',
                content: ''
            },
            errors: {}, // store the validation errors
            message: '', // store the success message
        }
    },
    components: {
        AdminNavigation,
    },
    methods: {
        getTips() {
            axios.get('http://localhost:8000/api/tips')
                .then(response => {
                    this.tips = response.data.map(tip => {
                        tip.message = '';
                        return tip;
                    });
                })
        },
        createTip() {
            axios.post('http://localhost:8000/api/tips', this.newTip)
                .then(response => {
                    this.tips.push(response.data.tip);
                    this.newTip = { title: '', content: '' };
                    this.message = response.data.message;// show success message
                    this.clearMessage();
                })
                .catch(error => {
                    if (error.response && error.response.status === 400) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        this.errors = error.response.data;
                        this.clearMessage();
                    }
                });
        },
        deleteTip(tip) {
            axios.delete(`http://localhost:8000/api/tips/${tip.id}`)
                .then(response => {
                    const tipIndex = this.tips.findIndex(t => t.id === tip.id);
                    if (tipIndex > -1) {
                        this.tips[tipIndex].message = response.data.message;
                        this.getTips();
                    }
                })
                .catch(error => {
                    if (error.response && error.response.status === 400) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        this.errors = error.response.data;
                        this.clearMessage();
                    }
                });
        },
        clearMessage() {
            setTimeout(() => {
                this.errors = {};
                this.message = '';
                this.tips.forEach(tip => tip.message = '');
            }, 2000);
        }
    },
    created() {
        this.getTips();
    }
}
</script>

<style>
.error-message {
    color: red;
}

.success-message {
    color: green;
}
</style>
