<template>
  <section class="onboarding_wrap">
    <h3 class="ob_title">Approval distributor onboarding</h3>
    <div class="ob_box w1377 approval_distributor">
      <div class="prof_info">
        <p>
          Please go through the following link where you find all onboarding
          details of distributor
        </p>
        <div class="phase_det">
          <div class="phase_det_item" @click="handleDetailsDialog('phaseOne')">
            <div class="ph_status" :class="phaseOneRead ? 'active' : ''">
              <i class="ri-check-line"></i>
            </div>
            <figure>
              <i class="ri-file-list-3-line"></i>
            </figure>
            Phase 2 details
          </div>
          <div class="phase_det_item" @click="handleDetailsDialog('phaseTwo')">
            <div class="ph_status" :class="phaseTwoRead ? 'active' : ''">
              <i class="ri-check-line"></i>
            </div>
            <figure>
              <i class="ri-file-list-3-line"></i>
            </figure>
            Phase 3 details
          </div>
        </div>
      </div>
      <div class="prof_footer">
        <button class="btn btn-default" @click="handleDeclineDialog">
          Decline
        </button>
        <el-button
          type="primary"
          @click="handleApprove"
          size="large"
          style="background-color: #5e72e4"
          :disabled="phaseOneRead === false || phaseTwoRead === false"
          ><b>Approve</b></el-button>
      </div>
    </div>

    <ApprovalDetailsDialog
      :dialogVisible="detailsDialogVisible"
      :dialogType="dialogType"
      :form-data="formData"
      @getChildFormData="handleChildFormData($event)"
      @childClose="handleDetailsDialogClose()"
      @markAsRead="handleMarkAsRead($event)"
    />

    <DeclineDialgo
      :dialogVisible="declineDialgoVisible"
      :form-data="formData"
      @getChildFormData="handleDeclineFormData($event)"
      @childClose="handleDeclineDialogClose()"
    />

    <SuccessDialog
      leftButtonName="Cancel"
      rightButtonName="Send email"
      dialogTitle="Admin added successfully"
      dialogText="Send temporary logic credentials to distributor"
      :dialogImage="adminMailImg"
      :dialogVisible="successDialogVisible"
      @childClose="handleSuccessDialogClose"
      @handleSendEmail="handleSendEmail"
      @dialogVisible="successDialogVisible"
    />
  </section>
</template>
    
<script setup>

import ApprovalDetailsDialog from "@/pages/distributor/dialog-box/ApprovalDetailsDialog";
import DeclineDialgo from "@/pages/distributor/dialog-box/DeclineDialgo";
import SuccessDialog from "@/pages/distributor/dialog-box/SuccessDialog.vue";
import adminMailImg from "@/assets/svg/admin_mail.svg";
import { flashNotification } from "@/composables/useNotification.js";
import { useRouter } from "vue-router";

let router = useRouter();
    
let detailsDialogVisible = ref(false);
let declineDialgoVisible = ref(false);
let successDialogVisible = ref(false);
    
let phaseOneRead = ref(false);
let phaseTwoRead = ref(false);

let dialogType = ref(null);

let formData = reactive({
name: "",
});
    
// open details dialog
function handleDetailsDialog(type) {
    dialogType.value = type;
    formData.name = type;
    detailsDialogVisible.value = true;
}
    
// close details dialog
function handleDetailsDialogClose() {
    detailsDialogVisible.value = false;
}
    
// open Decline dialog
function handleDeclineDialog() {
    declineDialgoVisible.value = true;
}
    
// close Decline dialog
function handleDeclineDialogClose() {
    declineDialgoVisible.value = false;
}
    
// submit decline form data
function handleDeclineFormData(data) {
    console.log(data);
    declineDialgoVisible.value = false;
    router.push("/distributor");
}
    
// submit approv form data
function handleApprove() {
    successDialogVisible.value = true;
}
    
function handleSendEmail() {
    successDialogVisible.value = false;
    router.push("/distributor");
    flashNotification("success", "Distributor Added successfully");
}
    
function handleSuccessDialogClose() {
    successDialogVisible.value = false;
}
    
function handleMarkAsRead(data) {
    if (data == "phaseOne") {
    phaseOneRead.value = true;
    } else if (data === "phaseTwo") {
    phaseTwoRead.value = true;
    }
    detailsDialogVisible.value = false;
}
    
function handleChildFormData(data) {
    console.log(data);
    if (data.name === "phaseOne") {
    router.push("/distributor/add-distributor/phase-two");
    } else if (data.name === "phaseTwo") {
    router.push("/distributor/add-distributor/phase-three");
    }
}

</script>
    
    