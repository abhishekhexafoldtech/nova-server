<template>
  <div>
    <!-- Dialog box code -->
    <el-dialog
      v-model="props.dialogVisible"
      @close="closeDialog"
      :title="dialogTitle"
      center
      class="rounded-3 shadow fw-bold w-75 w-md-30"
    >
      <div class="d-flex justify-content-center">
        <img :src="dialogImage" alt="Mail" />
      </div>
      <span>
        {{ dialogText }}
      </span>

      <template #footer>
        <span class="dialog-footer d-flex">
          <div class="col-6">
            <button
              class="btn border border-primary w-75"
              @click="handleLeftButton"
            >
              {{ leftButtonName }}
            </button>
          </div>
          <div class="col-6">
            <button class="btn btn-primary w-100" @click="handleRightButton">
              {{ rightButtonName }}
            </button>
          </div>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
let emit = defineEmits();

let props = defineProps({
  dialogVisible: {
    type: Boolean,
  },
  leftButtonName: {
    type: String,
    required: true,
  },
  rightButtonName: {
    type: String,
    required: true,
  },
  dialogTitle: {
    type: String,
    required: true,
  },
  dialogImage: {
    type: String,
    required: true,
  },
  dialogText: {
    type: String,
    required: true,
  },
});
const handleLeftButton=()=> {
  emit("handleLeftButton");
}
const handleRightButton=()=> {
  emit("handleRightButton");
}

const closeDialog = () => {
  emit("dialogVisible");
};
</script>
<style>

</style>
