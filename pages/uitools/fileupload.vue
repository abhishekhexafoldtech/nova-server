<template>
    <div>
        <div class="comp_form_box w355">
            <div class="fieldrow">
              <p>Face recognization</p>
              <SingleFileUpload iconClass="iconClass" @getImage="handleFileData"
                 />
            </div>
          </div>
        <br/>
        <br/>
        <br/>
        <el-button @click="handleUpload" type="primary">submit</el-button>
    </div>
</template>

<script setup>
import {uploadDocument} from "@/api/upload";
import SingleFileUpload from "@/components/upload/SingleFileUpload.vue";
const file = ref()
async  function  handleUpload(){
   const res =await uploadDocument(file.value,'https://minio.minio--yzwf6hkd6qdh.addon.code.run/nova/db4a4451-fc9c-4c4e-8be1-79b930c80c21/e13878e6-20bb-4cf4-b23a-4934d31a1867_back.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ba5c405a629e9475f4%2F20231020%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231020T112500Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=d1159f1ab90a03d31534be3e7ee7faf3e206326707e4604e48f74cd4c2504bd2');
  console.log(res)
//   you can use promises to resolve and reject this is just a sample code for uploading image or doc using single file upload file same process for individual upload as well.
};
function handleFileData(data){
  file.value = data;
}
</script>



