<template>
  <FrontNavBar class="sticky-top"></FrontNavBar>
  <div class="container" id="commentSection">
    <div class="row">
      <div class="col-md-3 d-flex flex-column align-items-start" id="commentList1">
        <div v-for="comment in comments" :key="comment.commentId" class="jumbotron text-left">
          <p class="lead"><font-awesome-icon :icon="['fas', 'comment-dots']" /> {{ comment.commentText }}</p>
          <p>{{ comment.member.memberName }} {{ formatGender(comment.member.gender) }} 來自{{ formatAddress(comment.member.contactAddress) }}</p>
          <hr class="my-4">
        </div>
      </div>
      <div class="col-md-6"></div>
      <div class="col-md-4 fixed-center">
        <div class="jumbotron text-center">
          <h1 class="row mb-6 justify-content-center">住客評語</h1>
          <p class="lead">歡迎透過本聯絡表單留下您的需求與疑問，我們將由專人與您回覆處理。</p>
          <hr class="my-4">
          <p class="lead">
            <button class="btn btn-secondary" type="button" @click="openModal">留下評論</button>
          </p>
        </div>
      </div>
      <div class="col-md-3 d-flex flex-column align-items-end" id="commentList2">
        <div v-for="comment in comments.slice().reverse()" :key="comment.commentId" class="jumbotron text-left">
          <p class="lead"><font-awesome-icon :icon="['fas', 'comment-dots']" /> {{ comment.commentText }}</p>
          <p>{{ comment.member.memberName }} {{ formatGender(comment.member.gender) }} 來自{{ formatAddress(comment.member.contactAddress) }}</p>
          <hr class="my-4">
        </div>
      </div>
    </div>
  </div>
  
  <!-- Modal -->
  <div class="modal fade" id="commentModal" tabindex="-1" aria-labelledby="commentModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-center" id="commentModalLabel">客服專區</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="box">
          <p>當您於本網頁提供個人基本資料，
            即表示您同意我們蒐集個人相關資料以利處理，
            並用於客戶服務等意見回饋服務，該等資料之蒐集及使用，
            您同意由本公司為之，
            您得隨時透過客服信箱 freerelxservice@grand-hilai.com.tw 
            查詢、閱覽、製給複本、補充或更正、停止蒐集、處理或利用、刪除您的個人基本資料。
            本公司保有修改相關服務及權益條款之權。</p>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitComment">
            <div class="form-group">
              <label for="guestName">貴賓姓名 <span class="text-danger">*</span></label>
              <input type="text" class="form-control" id="guestName" v-model="form.guestName" required>
            </div>
            <div class="form-group">
              <label>性別 <span class="text-danger">*</span></label>
              <div class="row">
                <div class="col-md-4">
                  <input type="radio" id="male" value="男" v-model="form.gender">
                  <label for="male">男</label>
                </div>
                <div class="col-md-4">
                  <input type="radio" id="female" value="女" v-model="form.gender">
                  <label for="female">女</label>
                </div>
                <div class="col-md-4">
                  <input type="radio" id="other" value="其他" v-model="form.gender">
                  <label for="other">其他</label>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="issueType">我的問題 <span class="text-danger">*</span></label>
              <select class="form-control" id="issueType" v-model="form.issueType" required>
                <option value="" disabled selected>問題類型</option>
                <option value="住房問題">住房問題</option>
                <option value="建議回覆">建議回覆</option>
                <option value="服務諮詢">服務諮詢</option>
              </select>
            </div>
            <div class="form-group">
              <label for="contactNumber">聯絡電話</label>
              <input type="tel" class="form-control" id="contactNumber" v-model="form.contactNumber">
            </div>
            <div class="form-group">
              <label for="commentText">留言內容 <span class="text-danger">*</span></label>
              <textarea class="form-control" id="commentText" v-model="form.commentText" rows="3" required></textarea>
            </div>
            <div class="mt-1 text-danger">
              「*」為必填項目
            </div>
            <br>
            <div class="d-flex justify-content-center">
              <button type="submit" class="btn btn-primary">提交</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  
  <Footer class="sticky-bottom"></Footer>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import FrontNavBar from '../../FrontNavBar.vue';
import Footer from '@/components/room/Footer.vue';
import axiosapi from "@/plugins/axios.js";
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';

const comments = ref([]);
const userName = sessionStorage.getItem('userName');
const form = ref({
  guestName: 'Ernest Barnes',
  issueType: '',
  contactNumber: '',
  commentText: '',
  gender: '男'
});

const router = useRouter();

onMounted(() => {
  const memberName = sessionStorage.getItem('userName');
  if (memberName) {
    form.value.guestName = memberName;
  }
  fetchComments();
  activateScrollspy();
  addGlobalScrollListener();
});

function fetchComments() {
  axiosapi.get('/hotel/comments/instances/Room')
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

function openModal() {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      router.push('/member/login');
    } else {
      const commentModal = new bootstrap.Modal(document.getElementById('commentModal'));
      commentModal.show();
    }
  }

  function submitComment() {
  const userId = sessionStorage.getItem('userId');
  const userName = sessionStorage.getItem('userName');
  const userPhone = sessionStorage.getItem('userPhone');
  const userGender = sessionStorage.getItem('userGender');

  const typeInstanceMap = {
    '住房問題': 'Room',
    '建議回覆': 'Suggest',
    '服務諮詢': 'Service'
  };

  const send = {
    commentText: form.value.commentText,
    situationType: 'Positive',
    issueType: form.value.issueType || 'Positive',
    score: 5,
    typeInstance: typeInstanceMap[form.value.issueType] || 'Room',
    member: {
      memberId: userId || 1,
      memberName: userName || form.value.guestName || 'John Doe',
      contactPhone: userPhone || form.value.contactNumber || '',
      gender: userGender || form.value.gender || '男'
    }
  };

  axiosapi.post('/hotel/comments', send)
    .then(() => {
      Swal.fire({
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

function addGlobalScrollListener() {
  const commentList1 = document.getElementById('commentList1');
  const commentList2 = document.getElementById('commentList2');
  const sensitivity = 20; // 調整靈敏度的係數，數值越大靈敏度越高

  window.addEventListener('wheel', (event) => {
    if (event.deltaY > 0) {
      commentList1.scrollTop += sensitivity;
      commentList2.scrollTop -= sensitivity;
    } else {
      commentList1.scrollTop -= sensitivity;
      commentList2.scrollTop += sensitivity;
    }
  });
}
</script>

<style scoped>
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

#commentList1,
#commentList2 {
  max-height: 500px;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

#commentList1::-webkit-scrollbar,
#commentList2::-webkit-scrollbar {
  display: none;
}

.fixed-center {
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 400px;
  z-index: 1000;
}

.text-danger {
  color: red;
}

.box {
  padding: 15px;
  overflow: hidden;
}
</style>
