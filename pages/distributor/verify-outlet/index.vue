<template>
  <!-- <section class="onboarding_wrap ver_outlet">
        <div class="ob_box approval_distributor">
            <h3>Verify the distributor outlet</h3>
            <div class="prof_info">
                <span>Verify Yaw graham outlet</span>
                <p>
                    You have to go for physical verification of distributor’s outlet and capture some images of it as a
                    proof.
                </p>
                <p>
                    After finishing the physical verification of distributor’s outlet then click on below link to attach
                    clicked images or pdfs of it.
                </p>
                <div class="phase_det" @click="handlePhaseFourForm">
                    <div class="phase_det_item">
                        <figure>
                            <i class="ri-file-list-3-line"></i>
                        </figure>
                        Phase 4 Form
                    </div>
                </div>
            </div>
        </div>
    </section> -->
  <section class="verify-outlet-section">
    <h3>Verify the distributor outlet</h3>
    <div class="verify-outlet-content">
      <span>Verify Yaw graham outlet</span>
      <p>
        You have to go for physical verification of distributor’s outlet and
        capture some images of it as a proof.
      </p>
      <p>
        After finishing the physical verification of distributor’s outlet then
        click on below link to attach clicked images or pdfs of it.
      </p>
        <div class="verify-outlet__verification" @click="handlePhaseFourForm">
          <figure class="verification-figure">
            <i class="ri-file-list-3-line"></i>
          </figure>
          Physical verification
        </div>
    </div>
  </section>
</template>
  
<script setup>
import { useRouter } from "vue-router";
var router = useRouter();
function handlePhaseFourForm() {
  console.log("jhg")
  router.push("/distributor/add-distributor/physical-verification")
}
</script>

<style scoped lang="scss">
/*.onboarding_wrap .ob_box.approval_distributor .prof_info {
    padding-bottom: 45px;
}

@media (max-width: 992px) {
    .onboarding_wrap .ob_box.approval_distributor .prof_info {
        padding-bottom: 30px;
    }
}*/
.verify-outlet {
  &-section {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.25); 
    margin: 55px 20px;
    border-radius: 15px;
    overflow: hidden;
    color: var(--black);
    h3 {
      background: rgba(131, 146, 171, 0.2);
      font-size: 20px;
      height: 56px;
      display: flex;
      align-items: center;
      font-weight: 600;
      padding: 35px 50px;
    }
  }
  &-content {
    margin-left: 50px;
    span {
      font-weight: 600;
      font-size: 14px;
      line-height: 4;
    }
    p {
      font-weight: 400;
      max-width: 850px;
      &:nth-child(2) {
        padding-top: 20px;
      }
    }
  }
  &__verification {
    border: 1px solid rgba(221, 221, 221, 1);
    width: 168px;
    height: 150px;
    padding: 10px;
    text-align: center;
    font-size: 14px;
    border-radius: 10px;
    margin: 35px 0 100px 0;
    cursor: pointer;
    figure {
      font-size: 38px;
      width: 70px;
      height: 70px;
      margin: 10px auto;
      background-color: #172b4d;
      color: var(--white);
      border-radius: 10px;
    }
  }
}
</style>
