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
      <div class="comp_footer">
        <button class="btn btn-default" @click="cancel()">Cancel</button>
        <button class="btn btn-primary" @click="verify()">Verify</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const isVerified = ref(false);
const router = useRouter();

function cancel() {
  // Redirect to a cancel page
  router.push('distributor-101');
};

function verify() {
  // Redirect to a verify page and log the checkbox value
  router.push('distributor-101');
  console.log('Checkbox is verified:', isVerified.value);
};
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
  }

  .comp_footer {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -25px;
    padding: 0 25px;
    margin-top: 15px;
    padding-top: 15px;
    border-top: solid 1px #efefef;
    justify-content: flex-end;
    gap: 10px;

    button {
      margin: 0;
      width: 100%;
      max-width: 210px;
      padding: 9px 15px;
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
