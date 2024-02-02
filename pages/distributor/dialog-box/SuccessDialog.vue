<template>
  <div>
    <!-- Dialog box code -->
    <el-dialog
      v-model="props.dialogVisible"
      @close="handleCloseDialog()"
      center
      class="rounded-3 shadow fw-bold w-75 w-md-30"
    >
      <header style="text-align: center;"><h4><b>{{ dialogTitle }}</b></h4></header>
      <div class="d-flex justify-content-center">
        <img :src="dialogImage" alt="Mail" />
      </div>
      <span>
        <p style="text-align: center;"> {{ dialogText }}</p>
      </span>

      <template #footer>
        <span class="dialog-footer d-flex">
          <div class="col-6">
            <button class="btn border border-primary w-75" @click="handleCloseDialog">
              {{ leftButtonName }}
            </button>
          </div>
          <div class="col-6">
            <button class="btn btn-primary w-100" @click="handleSendEmail">
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

const handleSendEmail=()=> {
  emit("handleSendEmail");
}

// close dialog 
function handleCloseDialog() {
  emit('childClose')
}
</script>
<style>

</style>
