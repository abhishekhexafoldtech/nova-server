<template>
  <div class="fileupload_with_close">
    <el-upload :class="class" :show-file-list="false" :limit="1" :on-remove="handleRemove"
      :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :on-progress="handleOnProgress"
      @change="clearValidationError" v-model:file-list="file">
      <img v-if="file.length && file[0]?.image" :src="file[0]?.image" :class="iconClass" class="avatar img-fluid" />
      <el-icon v-else class="avatar-uploader-icon" :class="iconClass">
        <Plus />
      </el-icon>
    </el-upload>
    <div class="uploaded-files" v-if="props.progress">
      <el-progress class="up_progress" color="green" v-if="file.length" :percentage="file[0]?.percentage" required>
        <div class="up_info">
          <!-- <i class="fa fa-file-text-o" aria-hidden="true"></i> -->
          <span>{{ file[0].name }}</span>
          <span>{{ (file[0].size / 1048576).toFixed(3) }} MB</span>
        </div>
        <p class="percentage">{{ file[0].percentage }} %</p>
        <span @click="handleReomve(file)" class="up_cross">
          <i class="fa fa-times-circle-o" aria-hidden="true"></i>
        </span>
      </el-progress>
    </div>

    <p v-if="validationError"><span class="error-message">{{ validationError }}</span></p>
  </div>
</template>
<script setup>
import { Plus } from '@element-plus/icons-vue';
import { ref } from 'vue';

const file = ref([])


const props = defineProps({
  class: String,
  iconClass: String,
  reactivePropertyName: [String, null],
  value: {
    type: [String, null],
    default: null
  },
  progress: {
    type: Boolean,
    default: true,
    required: false
  }
});
const avtar = ref(null);
const validationError = ref('');
const emit = defineEmits(['getImage']);

const handleAvatarSuccess = (response, uploadFile) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    const base64Image = event.target.result;
    avtar.value = base64Image;
    emit('getImage', base64Image);
    file.value[0].image = base64Image;
  };
  reader.readAsDataURL(uploadFile.raw);
  // don't remove it (used in admin onboarding)
  emit('getFullImageData', file.value[0],file.value[0].raw);
};

function handleReomve() {
  file.value = []
  emit('getImage', null);
  // don't remove it (used in admin onboarding)
  emit('getFullImageData', null,null);
}

function handleOnProgress(evt) {
  // console.log("progress", evt);
}

const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    validationError.value = 'Avatar picture must be in JPG format.';
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    validationError.value = 'Avatar picture size cannot exceed 2MB.';
    return false;
  }
  validationError.value = '';
  return true;
};
const clearValidationError = () => {
  validationError.value = '';
};
onMounted(() => {
  if (props?.value) {
    // used in admin oboarding
    if(props.value.raw){
      file.value[0] = props.value;
    }
  }
})
// <!-- remove uploaded avtar -->

</script>

<style  scoped lang="scss">
.uploaded-files {
  .up_progress {
    margin-top: 50px;
    margin-bottom: 20px;
    width: 90%;
    display: inline-block;

    .up_info {
      width: 100%;
      left: 0px;
      top: -25px;
      position: absolute;
      display: flex;
      justify-content: space-between;
      gap: 10px;

      span {
        display: inline-block;
        color: #494949;
        font-size: 13px;
        font-weight: 400;
        line-height: 18px;
        margin: 0;

        &:first-child {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
        }

        &:last-child {
          white-space: nowrap;
        }
      }
    }
  }

  .up_cross {
    text-align: right;
    display: block;
    position: absolute;
    right: 0;
    bottom: -3px;
    font-size: 20px;
    cursor: pointer;
    display: inline-block;
  }

  .percentage {
    white-space: nowrap;
    margin: 0;
    margin-top: 5px;
    margin-left: -5px;
    color: #494949;
    font-size: 13px;
    font-weight: 400;
    line-height: 18px;
  }
}
</style>
