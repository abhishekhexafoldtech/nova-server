<template>
  <el-row class="pr_img_upload_box">
    <el-col
      :xs="24"
      :sm="24"
      :md="12"
      :lg="12"
      :xl="12"
      v-for="box in boxes"
      :key="box.id"
    >
      <label
        :class="[
          'image-box',
          'image-preview',
          { 'top-box': box.type === 'top' },
        ]"
      >
        <div class="file-upload-wrapper box_inner overflow-hidden">
          <el-upload
            class="avatar-uploader"
            :ref="`fileInput${box.id}`"
            :show-file-list="false"
            @change="(file) => handleFileChange(file, box)"
          >
            <img
              class="img-fluid overflow-hidden"
              v-if="box.image"
              :src="box.image"
              alt="Preview"
            />
            <div class="box_inner" v-else>
              <div class="text">Drop files here to upload</div>
            </div>
          </el-upload>
        </div>
      </label>
      <div class="file_info" v-if="box.image">
        <span class="remove_icon" @click="removeFile(box)">
          <i class="ri-close-line"></i>
        </span>
        <p>{{ box.uploadedFileName }}</p>
        <!-- <span class="remove-icon text-success" @click="removeFile(box)"><el-icon><CircleCheck /></el-icon></span> -->
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import { ElUpload } from "element-plus";
import { Plus, CircleClose, CircleCheck } from "@element-plus/icons-vue";
const emit = defineEmits();

const boxes = ref([
  { id: 1, type: "top", image: null, uploadedFileName: null },
  { id: 2, type: "top", image: null, uploadedFileName: null },
  { id: 3, type: "bottom", image: null, uploadedFileName: null },
  { id: 4, type: "bottom", image: null, uploadedFileName: null },
]);

const handleFileChange = (file, box) => {
  if (file.status === "success") {
    const uploadedFile = file.raw;
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageSrc = e.target.result;
      const updatedBox = boxes.value.find((b) => b.id === box.id);
      if (updatedBox) {
        updatedBox.image = imageSrc;
        updatedBox.uploadedFileName = uploadedFile.name;
      }
      emit("image-uploaded", boxes.value);
    };
    reader.readAsDataURL(uploadedFile);
  }
};

const removeFile = (box) => {
  emit("removeAvtar", box.image);
  setTimeout(() => {
    box.image = null;
    box.uploadedFileName = null;
  }, 100);
};
</script>
<style>
.el-upload__input {
  display: none !important;
}
</style>
<style scoped lang="scss">
.file_info {
  margin-top: 10px;
  position: relative;

  p {
    color: var(--black) !important;
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
    margin: 0;
    padding-left: 35px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    padding-top: 3px;
  }

  .remove_icon {
    font-size: 14px;
    display: block;
    background-color: var(--violet);
    color: white !important;
    width: 22px;
    height: 22px;
    line-height: 22px;
    text-align: center;
    border-radius: 50%;
    cursor: pointer;
    position: absolute;
    padding-left: 1px;
    top: 0;
    left: 0;
  }
}

.file-upload-wrapper {
  display: inline-block;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 4px;
}
</style>
