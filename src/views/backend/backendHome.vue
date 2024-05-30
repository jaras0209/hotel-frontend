<template>
    <backendNavbar></backendNavbar>
    <div class="wrapper">
        <div class="context"><RouterLink class="button--secondary" to="/backend/orderRoom" ><span class="text"><font-awesome-icon :icon="['fas', 'house']" />&nbsp;訂房管理</span></RouterLink></div>
        <div class="context"><RouterLink class="button--secondary" to="/backend/memberManage"><span class="text"><font-awesome-icon :icon="['fas', 'user']" />&nbsp;會員管理</span></RouterLink></div>
        <div class="context"><RouterLink class="button--secondary" to="/backend/shoppingManage"><span class="text"><font-awesome-icon :icon="['fas', 'shop']" />&nbsp;商城管理</span></RouterLink></div>
        <div class="context"><RouterLink class="button--secondary" to="/backend/backIndex"><span class="text"><font-awesome-icon :icon="['fas', 'door-open']" />&nbsp;報到管理</span></RouterLink></div>
    </div>
</template>
    
<script setup>
    import backendNavbar from '../BackendNavbar.vue';
</script>
    
<style scoped>

    .context{
        background-color: #cd0505;
        height: 200px;
        border-radius: 5%;
        border:0.5rem outset rgb(220, 73, 5);
    }
    div{
        /* border: 4mm ridge rgba(211, 220, 50, .6); */
        border-radius: 5%;
    }
    .wrapper{
        margin-top: 200px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        height: 35%;
    }
    a{
        text-decoration: none;
    }

    .button--secondary {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    color: #cd0505;
    width: 625px;
    height: 176px;
    border-radius: 22px;
    padding: 0 0 0 21px;
    line-height: 44px;
    text-align: center;
    cursor: pointer;
    }
    .button--secondary:before { /*圓點*/
    content: "";
    position: absolute;
    left: 21px;
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #cd0505;
    transform: scale(0);
    opacity: 0;
    transition: all .33s cubic-bezier(.68,-.55,.265,1.55);
    }
    .button--secondary .text {
        white-space: nowrap;
        font-size: 32px;
        transition: all .3s cubic-bezier(.68,-.55,.265,1.55);
    }
    .button--secondary .icon-arrow {
    position: relative;
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-right: 20px;
    border-radius: 50%;
    background-color: #cd0505;
    transition: all .3s cubic-bezier(.68,-.55,.265,1.55);
    }
    .button--secondary .icon-arrow:after {
    content: "";
    display: inline-block;
    background-color: inherit;
    position: absolute;
    left: 100%;
    width: 30px;
    height: 2px;
    top: 4px;
    }
    .button--secondary:hover {
    animation: icon-arrow-off .33s cubic-bezier(0,0,.2,1);
    }
    @keyframes icon-arrow-off {
    0% {
        transform: scale(1); }
    50% {
        transform: scale(0.95); }
    100% {
        transform: scale(1); } 
    }
    .button--secondary:hover:before {
        transform: scale(1);
        opacity: 1;
    }
    .button--secondary:hover .text {
    transform: translateX(21px);
    }
    .button--secondary:hover .icon-arrow {
    transform: translateX(30px) scale(.8);
    opacity: 0;
    }

</style>