<!-- <template>
  <FrontNavBar class="sticky-top"></FrontNavBar>
  <div class="container" id="commentSection">
    <div class="row">
      <div class="col-md-4" id="commentList">
        <div v-for="comment in comments" :key="comment.commentId" class="jumbotron text-left">
          <p class="lead"><font-awesome-icon :icon="['fas', 'comment-dots']" />{{ comment.commentText }}</p>
          <hr class="my-4">
          <p>{{ comment.member.memberName }} {{ formatGender(comment.member.gender) }} 來自{{ formatAddress(comment.member.contactAddress) }}</p>
        </div>
      </div>
      <div class="col-md-4 fixed-center">
        <div class="jumbotron text-center">
          <h1 class="row mb-6 justify-content-center">住客評語</h1>
          <p class="lead">歡迎透過本聯絡表單留下您的需求與疑問，我們將由專人與您回覆處理，也請記下您的客服編號與我們進行追蹤。</p>
          <hr class="my-4">
          <p class="lead">
            <button class="btn btn-secondary" type="button" @click="comment" v-show="disabled">留下評論</button>
          </p>
        </div>
      </div>
      <div class="col-md-4" id="heroUnit">
        <div class="jumbotron text-right">
          <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
          <hr class="my-4">
        </div>
      </div>
    </div>
  </div>
  <Footer></Footer>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import FrontNavBar from '../../FrontNavBar.vue';
import Footer from '@/components/room/Footer.vue';
import axiosapi from "@/plugins/axios.js"
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';

const comments = ref([]);
const disabled = ref(true);

const router = useRouter();

onMounted(() => {
  fetchComments();
  activateScrollspy();
});

function fetchComments() {
  axiosapi.get('/hotel/backend/comments')
    .then(response => {
      comments.value = response.data;
    })
    .catch(error => {
      console.error('Error fetching comments:', error);
    });
}

function formatAddress(address) {
  return address ? address.substring(0, 3) : '';
}

function formatGender(gender) {
  if (gender === '男') {
    return '先生';
  } else if (gender === '女') {
    return '女士';
  } else {
    return '';
  }
}

function comment() {
  const send = {
    commentText: commentmessage.value,
    situationType: "商品品質",
    typeInstance: productName.value,
    score: 5,
    member: {
      memberId: userId.value,
      // 假設這裡有其他用戶資料的初始化
    }
  };
  axios.post('/hotel/backend/comments', send)
    .then(() => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "新增成功",
        showConfirmButton: false,
        allowOutsideClick: false,
        timer: 2000
      });
      setTimeout(() => {
        Swal.close();
        router.go(0);
      }, 2000);
    })
    .catch(error => {
      Swal.fire({
        text: '失敗：' + error.message,
        icon: 'error',
        allowOutsideClick: false,
        confirmButtonText: '確認',
      });
    });
}

function activateScrollspy() {
  const scrollSpy = new bootstrap.ScrollSpy(document.body, {
    target: '#commentSection',
    offset: 0,
  });
}
</script>

<style>
.jumbotron.text-left {
  text-align: left;
}

.jumbotron.text-center {
  text-align: center;
}

.jumbotron.text-right {
  text-align: right;
}

#commentblock {
  margin-top: 20px;
}


.fixed-center {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000; /* 確保它位於其他內容的頂層 */
  width: 100%; /* 根據需要調整寬度 */
}
</style> -->
<template>
    
</template>
  
<script setup lang='ts'>
  
</script>
  
<style>
  
</style>