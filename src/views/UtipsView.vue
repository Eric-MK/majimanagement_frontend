<template>
    <UserNavigation/>
    <div class="homepage">
        <h2>Tips and Advice for Managing Water Resources</h2>
        <ul>
            <li>
                <strong>Conservation:</strong> Limit your water usage where possible. Small changes can have a big impact. Turn off the tap while brushing your teeth, shorten your showers, and only run full loads in your washing machines and dishwashers. Consider using water-efficient appliances and fixtures.
            </li>
            <li>
                <strong>Cleanliness:</strong> Keep water sources clean. Do not dump garbage, chemicals, or other waste into rivers, lakes, or oceans. Dispose of waste properly to prevent it from entering the water system. In agriculture, avoid excessive use of fertilizers and pesticides to prevent runoff into water bodies.
            </li>
            <li>
                <strong>Purification:</strong> Always purify water before drinking. There are several methods you can use including boiling, using purification tablets, filtering, or UV treatment. Each method has its pros and cons, so choose the one that suits your situation best.
            </li>
            <li>
                <strong>Education:</strong> Understand the value of water and the need for conservation. Encourage friends, family, and community members to do the same. Teach children about the water cycle and why it's important to keep our water clean.
            </li>
            <li>
                <strong>Community Efforts:</strong> Participate in local clean-up activities, tree planting events and initiatives promoting water conservation. This not only directly benefits your community's water sources but also raises awareness among participants and observers.
            </li>
            <li>
                <strong>Report Issues:</strong> If you notice water wastage or contamination in your community, do not hesitate, report. A quick response can prevent more severe water issues.
            </li>
        </ul>
    </div>
    <FooterView/>
</template>

<script>
import UserNavigation from '../views/UserNavigation.vue'
import FooterView from '../views/FooterView.vue'

export default {
    
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
            // Load user data from API, etc.
            // this.loadUserData(userId);
        }
    },
    methods: {
        loadUserData(userId) {
            // Make API call to load user data, etc.
        }
    }
}
</script>

<style scoped>
.homepage {
    width: 80%;
    margin: auto;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 15px;
}

.homepage h2 {
    color: #000508;
    font-size: 2em;
    text-align: center;
    padding-bottom: 15px;
}

.homepage ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.homepage ul li {
    padding: 20px;
    border-bottom: 1px solid #ddd;
    font-size: 1.2em;
    line-height: 1.6em;
}

.homepage ul li strong {
    color: #3498db;
}
</style>
