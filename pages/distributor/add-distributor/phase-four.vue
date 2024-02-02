<template>
  <section class="edit_mang_wrap">
    <div class="mang_inner comp_inner">
      <div class="mang_title mb-3">
        <h3>Phase 4 form</h3>
        <p>Please upload images or pdf's of distributor outlet</p>
      </div>
      <el-form class="phase_four_upload">
        <el-row>
          <el-col
            :xs="12"
            :sm="8"
            :md="8"
            :lg="8"
            v-for="file in filesList"
            :key="file"
          >
            <p class="form_label">Image {{ file.p_no + 1 }}</p>
            <div>
              <el-upload
                :show-file-list="false"
                :on-success="handleUploadSuccess"
                :before-upload="handleBeforeUpload"
                :multiple="false"
                accept="image/*"
                :on-error="handleOnError"
                @click="setGetId(file.p_no)"
                :on-progress="hanldeOnProgress"
                :disabled="disabled"
              >
                <img v-if="file.file" :src="file.file" />
                <el-icon v-else class="el-icon--upload">
                  <UploadFilled />
                </el-icon>
              </el-upload>
              <el-progress
                v-if="getId === file.p_no && file.percentage && disable"
                :percentage="file.progress"
                :stroke-width="5"
                striped
                striped-flow
                :duration="10"
                class="mt-1"
              />
            </div>
          </el-col>
        </el-row>
        <div class="confirm_check">
          <el-checkbox
            v-model="dcUploadForm.checkedStatus"
            :label="dcUploadForm.checkDescription"
          />
        </div>
        <div class="comp_footer">
          <button class="btn btn-default" @click.prevent="handleCancel">
            Decline
          </button>
          <button
            class="btn btn-primary"
            type="primary"
            @click.prevent="handleApprove"
          >
            Approve
          </button>
        </div>
      </el-form>
    </div>
  </section>
  <DialogStatus
    :dialogVisible="dialogVisible"
    width="md"
    dialogTitle="Distributor onboarded successfully"
    dialogTitleSize="22"
    :dialogImage="success"
    @dialogVisible="handleCloseDialog"
    dialog-text="Yaw graham onboarded successfully"
  />
  <DialogStatus
    :dialog-visible="declineDialogVisible"
    width="md"
    dialogTitle="Decline"
    dialogTitleSize="25"
    :dialogImage="decline"
    dialogText="Are you sure, you want to go back?"
    :dialog-text-width="80"
    left-button-name="No"
    right-button-name="Yes"
    @handleLeftButton="declineDialogVisible = false"
    @handleRightButton="handleDecline"
    @dialog-visible="declineDialogVisible = false"
  />
  <!-- <el-card class="rounded-3 mx-4 mt-5">
        <div class="bg-light text-center" style="height:70px;border-radius:0px 0px 7px 7px;">
            <h3 style="position:relative;top:15px">Phase 4 form</h3>
        </div>
        <div class="container mt-3">
            <div class="text-lg text-bold text-dark">Please upload images or pdf's of distributor outlet</div>
            <el-form>
                <div style="display:flex;flex-wrap: wrap;gap:25px;justify-content: space-around;" class="mt-4">
                    <div v-for="file in filesList" :key="file">
                        <div class="p-2">Image {{ file.p_no + 1 }}</div>
                        <div class="file-upload">
                            <el-upload class="upload-demo bg-light rounded-3" style="height:200px;text-align: center;"
                                :show-file-list="false" :on-success="handleUploadSuccess"
                                :before-upload="handleBeforeUpload" :multiple="false" accept="image/*"
                                :on-error="handleOnError" @click="setGetId(file.p_no)" :on-progress="hanldeOnProgress"
                                :disabled=disabled>
                                <div>
                                    <img v-if="file.file" :src="file.file" class="avatar" />

                                    <el-icon v-else class="el-icon--upload" style="min-width:70px">
                                        <UploadFilled style="font-size: 70px;margin-top:180px;" />
                                    </el-icon>
                                </div>
                            </el-upload>
                            <el-progress v-if="getId === file.p_no && file.percentage && disable"
                                :percentage="file.progress" :stroke-width="5" striped striped-flow :duration="10"
                                class="mt-1" />
                        </div>
                    </div>
                </div>
                <div class="mt-4 mx-2">
                    <el-checkbox v-model="dcUploadForm.checkedStatus" :label="dcUploadForm.checkDescription" size="large" />
                </div>
                <div class="px-5" style="text-align: right;">
                    <el-button class="btn btn-default" @click="handleCancel">Decline</el-button>
                    <el-button class="btn btn-primary" type="primary" @click="handleApprove">Approve</el-button>
                </div>
            </el-form>
        </div>
    </el-card> -->
</template>

<script setup>
import decline from "@/assets/svg/delete-vector.svg";
import success from "@/assets/svg/success.svg";
import { UploadFilled } from "@element-plus/icons-vue";
import { flashNotification } from "@/composables/useNotification.js";
import DeclineDialgo from "../dialog-box/DeclineDialgo.vue";
const router = useRouter();
// import { Plus } from '@element-plus/icons-vue'
const dcUploadForm = reactive({
  noOfFiles: 6,
  checkDescription:
    "Please confirm that you have verified the distributor's outlet",
  checkedStatus: false,
});
const filesList = ref([]);
const getId = ref(0);
const disable = ref(false);
const dialogVisible = ref(false);
const declineDialogVisible = ref(false);
// on each file upload it will form an array of files
function handleUploadSuccess(res, uploadFile) {
  try {
    const id = uploadFile.raw.uid;
    const reader = new FileReader();
    console.log(getId.value);
    reader.onload = (event) => {
      const base64Image = event.target.result;
      filesList.value[getId.value] = {
        id: id,
        file: base64Image,
        name: uploadFile.raw.name,
        p_no: getId.value,
        percentage: false,
        progress: 0,
      };
      disable.value = false;
    };
    reader.readAsDataURL(uploadFile.raw);
  } catch (err) {
    console.log("error");
  }
}
// removing the selected or uploaded file
// function handleOnRemove(file) {
//     filesList.value = filesList.value.filter((e) => {
//         if (e.id != file.raw.uid) {
//             return e
//         }
//         return
//     });
// };
function handleApprove() {
  const result = filesList.value.filter((e) => {
    if (Object.keys(e).length != 1) {
      return e;
    }
  });
  console.log(
    "result : ",
    JSON.stringify(result) + "\n" + "checked : " + dcUploadForm.checkedStatus
  );
  dialogVisible.value = true;
  setTimeout(() => {
    router.push("/distributor");
  }, 3000);
}
function handleBeforeUpload(rawFile) {
  if (disable.value) {
    flashNotification("warning", "Weight for the file to upload.");
    return false;
  }
  if (rawFile.size / 1024 / 1024 > 2) {
    flashNotification("warning", "File size is too large.");
    return false;
  }
  return true;
}
function hanldeOnProgress(evt) {
  try {
    console.log("progress", evt.percent);
    disable.value = true;
    filesList.value[getId.value].percentage = true;
    filesList.value[getId.value].progress = Math.floor(evt.percent);
  } catch (err) {
    console.log("progress error");
  }
}
function handleCancel() {
  console.log("cancel");
  declineDialogVisible.value = true;
}
function handleDecline() {
  declineDialogVisible.value = false;
  router.push("/distributor");
}
function handleOnError() {
  filesList.value[getId.value].percentage = false;
  filesList.value[getId.value].progress = 0;
  disable.value = false;
  flashNotification(
    "warning",
    "File size is too large and select only image formats."
  );
}
function setGetId(id) {
  getId.value = id;
}
function handleCloseDialog() {
  dialogVisible.value = false;
  router.push("/distributor");
}
const disabled = computed(() => {
  if (disable.value) {
    return true;
  }
  return false;
});
onMounted(() => {
  for (let i = 0; i < dcUploadForm.noOfFiles; i++) {
    filesList.value.push({
      p_no: i,
      percent: 0,
    });
  }
});
definePageMeta({
  layout: "default",
});
</script>

<style scoped></style>
