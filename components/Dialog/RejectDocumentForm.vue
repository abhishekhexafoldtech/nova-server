<template>
    <div class="rejection_modal">
      <el-dialog
        v-model="props.visible"
        title="You have rejected this Document"
        align-center
        @close="closeDialog"
      >
        <el-form
          label-position="top"
          label-width="100px"
          ref="formRef"
          :model="customer_edit_form"
          :rules="rules"
        >
        <el-form-item label="Reason for rejection" prop="desc">
            <el-input placeholder="please enter reason" v-model="form.desc" type="textarea" />
          </el-form-item>
          
        </el-form>
        <template #footer>
          <button class="btn btn-default" @click="handleCancel">Cancel</button>
          <button class="btn btn-primary" @click="handleReject(formRef)">
            Reject
          </button>
        </template>
      </el-dialog>
    </div>
  </template>
  ​
  <script setup>
  import {
  nameRule,
} from "@/rules/all-rules";
  const emit = defineEmits();
  import { flashNotification } from "~/composables/useNotification";
  const props = defineProps({
    visible: {
      type: Boolean,
      default: true,
    }
  });

  const formRef = ref();
  const form = reactive({
    desc:""
  });
  
    
    
   
//   const form_rules = reactive({
//     desc: nameRule("Description"),
//   });
const rules = reactive({

})

  function handleReject(formEl) {
    emit("handleReject", form);
    console.log("Reason for rejection:", form.desc);
    // Reset the input value to null
    form.desc = null;
    // if (!formEl) {
    //   return;
    // }

    // formEl.validate((valid) => {
    //   if (valid) {
    //     emit("handleReject", form);
    //   }
    // });
  }

  function handleCancel() {
    emit("handleCloseForm", "cancel");
    form.desc = null;
  }

  function closeDialog() {
    emit("handleCloseForm");
    form.desc = null;
  }
  </script>
  