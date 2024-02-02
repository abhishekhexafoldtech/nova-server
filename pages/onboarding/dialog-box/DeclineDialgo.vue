<template>
  <el-dialog v-model="props.dialogVisible" class="decline_popup">
    <div class="pop_inner">
      <h3>Decline admin onboarding request</h3>
      <el-form label-position="top">
        <el-form-item label="Type a reason for decline admin onboarding request">
          <el-input type="textarea" v-model="formData.name" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div class="pop_footer">
        <button class="btn btn-default" @click="handleCloseDialog">Cancel</button>
        <button class="btn btn-primary" @click="handleFormSubmit">Send </button>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>

let emit = defineEmits()

let props = defineProps({
  dialogVisible: Boolean,
  formData: {
    name: String
  }
})

// close dialog 
function handleCloseDialog() {
  emit('childClose')
}

// submit data 
function handleFormSubmit() {
  emit('getChildFormData', props.formData)
}
</script>