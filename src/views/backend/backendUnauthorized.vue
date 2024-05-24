<template>
    <div>
        <h1>您無此權限!!</h1>
    </div>
    
</template>
    
<script setup>
    import { onMounted } from 'vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();
    onMounted(function(){
        setTimeout(function () {
            router.push({name:"backend-home-link"});
                }, 1000);
    });
</script>
    
<style scoped>
   div{
        margin-top: 300px;
        justify-content: center;
        align-items: center;
        display: flex;
        box-shadow: 5px 5px 5px black;
        border-radius: 20px;
        color: red;

    }
</style>