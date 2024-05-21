<template>

    <body>
        <div class="main">
            <aside class="left">
            </aside>
            <main>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">訂單編號</th>
                            <th scope="col">訂單日期</th>
                            <th scope="col">訂單狀態</th>
                            <th scope="col">抵達日期</th>
                            <th scope="col">總價</th>
                        </tr>
                        <MyorderComponents v-for="result in result" :total="result.total" :AddedTime="result.AddedTime"
                            :Orderstatus="result.Orderstatus" :orderid="result.orderid"
                            :arriveddTime="result.arriveddTime">
                        </MyorderComponents>
                    </thead>
                </table>
            </main>
            <aside class="right">
            </aside>
        </div>
    </body>
    <footer>
    </footer>
</template>

<script setup>
import MyorderComponents from '@/components/shopping/MyorderComponents.vue';
import { ref, onMounted } from "vue";
import xxx from "@/plugins/axios.js"
const result = ref({})
const userid = ref(null)
onMounted(function () {
    userid.value = sessionStorage.getItem("userid")
    myorder()
})
function myorder() {
    xxx.get(`/hotel/orders/mes/${userid.value}`).then(function (response) {
        console.log(response);
        result.value = response.data.list
        console.log(result.value)
    }).catch(function (error) {
        console.log("callFindById error", error);
    });
}
</script>
<style scoped>
* {
    margin: 1px;
    box-sizing: border-box;
}

body {
    height: 95vh;
    background: #34e7e4;
    font-family: sans-serif;
    text-align: start;
    color: black;
    font-size: 16px;
    display: flex;
    flex-direction: column;
}

header {
    background: yellow;
    padding: 2em 0 2em 0;
}

.left {
    background: gainsboro;
    padding: 3em 0 3em 0;
    flex: 1 1 100px
}

main {
    background: white;
    padding: 3em 0 3em 0;
    flex: 10 10 150px
}

.main {
    display: flex;
    flex: 1
}

.right {
    background: gainsboro;
    padding: 3em 0 3em 0;
    flex: 1 1 100px
}

footer {
    background: burlywood;
}

@media all and (max-width: 550px) {
    .main {
        flex-direction: column;
    }

    main {
        padding: 5em 0 5em 0;
    }
}
</style>