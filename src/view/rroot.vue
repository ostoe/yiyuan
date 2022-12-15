<template>
    <div></div>
</template>


<script>
import router from '../router';
import { useRoute } from "vue-router";
import { ref, onMounted } from 'vue';
export default {
    setup() {
        const route = useRoute();
        onMounted(() => {
            console.log("rootmount", route.query)
            // router.push("`/home?code=${route.query.code}`")
            router.push("/home")
        });
    }
    
}


</script>