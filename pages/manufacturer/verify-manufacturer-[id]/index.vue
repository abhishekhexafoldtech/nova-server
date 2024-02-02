<template>
  <div class="container-area">
    <h4 class="page_heading mb-3">Certificate verification</h4>
    <div class="cert_box">
      <h4 class="cert_title">Manufacturer Name:<span>Mg gas ltd</span></h4>
      <h5 class="cert_subtitle">Iso certificate</h5>
      <img class="cert_img"
        src="https://5.imimg.com/data5/TestImages/SF/OW/LQ/SELLER-42249117/iso-9001-2005-certification.JPG" alt="" />

      <div class="manufacture_check">
        <el-checkbox v-model="isVerified" label="Please confirm that you have verified the manufacturer documents."
          name="type" />
      </div>
      <RejectForm
        :visible="dialog"
        @handleReject="handleReject"
        @handleCloseForm="handleClose"
      />
      <div class="comp_footer">
        <button class="btn btn-primary" @click="verify()" :disabled="!isVerified">Verify</button>
        <button class="btn btn-danger" @click="reject(form)">Reject</button>
        <button class="btn btn-default" @click="cancel()">Cancel</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { flashNotification } from "@/composables/useNotification.js";
import RejectForm from "@/components/Dialog/RejectDocumentForm.vue";
import { useRouter } from 'vue-router';

const form = ref();
const dialog = ref(false);
const isVerified = ref(false);
const router = useRouter();


function cancel() {
  // Redirect to a cancel page
  router.push('manufacturer-101');
};

function verify() {
  // Redirect to a verify page and log the checkbox value
  router.push('manufacturer-101');
  console.log('Checkbox is verified:', isVerified.value);
};

// Handle reject from page
function reject(data) {
  console.log(data);
  dialog.value = true;
}

// Handle closing the form
function handleClose(data) {
  if (data === "cancel") {
    console.log("form canceled");
  }
  dialog.value = false;
}

// Handle reject in dialogue
function handleReject(data) {
  // console.log("handleEditedDistributorUpdate");
  // flashNotification("success", "Distributor details updated.");
  dialog.value = false;
}
</script>

<style scoped lang="scss">
.cert_box {
  background-color: var(--white);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 0 2rem 0 rgba(136, 152, 170, 0.15);
  width: 100%;
  max-width: 1000px;
  padding: 25px;

  .cert_title,
  .cert_subtitle {
    color: #7B809A;
    font-size: 18px;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: -0.8px;
    margin: 0px;
    margin-bottom: 20px;

    span {
      display: inline-block;
      margin-left: 5px;
      color: var(--black);
    }
  }

  .cert_subtitle {
    margin: 0;
    font-weight: 700;
    color: var(--black);
  }

  .cert_img {
    width: 100%;
    max-width: 300px;
    object-fit: contain;
    object-position: center;
    margin: 15px 0;
    margin-bottom: 20px;
  }

  .comp_footer {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -25px;
    padding: 0 25px;
    margin-top: 25px;
    padding-top: 20px;
    border-top: solid 1px #efefef;
    justify-content: flex-end;
    gap: 10px;

    button {
      margin: 0;
      width: 100%;
      max-width: 210px;
      padding: 9px 15px;
      box-shadow: none !important;

      &:disabled {
        background-color: var(--menu-grey);
        color: var(--black);
        pointer-events: all;
        opacity: 1;
        cursor: not-allowed;
      }

      &.btn-danger {
        background-color: #F33F22;
      }
    }
  }
}

@media (max-width: 768px) {
  .cert_box {
    border-radius: 12px;
    padding: 20px;

    .cert_title,
    .cert_subtitle {
      font-size: 16px;
      line-height: 22px;
    }

    .cert_subtitle {
      margin: 0;
    }

    .comp_footer {
      margin: 0 -20px;
      padding: 0 20px;
      margin-top: 12px;
      padding-top: 12px;

      button {
        max-width: 150px;
        padding: 9px 15px;
      }
    }
  }
}
</style>
