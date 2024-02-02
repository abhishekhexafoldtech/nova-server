<template>
  <el-dialog v-model="props.dialogVisible" center @close="closeDialog" class="depo_modal" :style="`width:${props.width}px`">
    <h3>{{ dialogTitle }}</h3>
    <img :src="dialogImage" alt="Image" />
    <p>{{ dialogText }}</p>
    <template #footer>
      <button class="btn btn-default" @click="handleLeftButton" v-if="props.leftButtonName">
        {{ leftButtonName }}
      </button>
      <button class="btn btn-primary" @click="handleRightButton" v-if="props.rightButtonName">
        {{ rightButtonName }}
      </button>
    </template>
  </el-dialog>
</template>
<script setup>
let emit = defineEmits();

let props = defineProps({
  width: {
    type: String
  },
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

const handleLeftButton = () => {
  emit("handleLeftButton","left");
}
const handleRightButton = () => {
  emit("handleRightButton","right");
}

const closeDialog = () => {
  emit("dialogVisible","close");
};
</script>
<style lang="scss" scoped>
  .depo_modal.el-dialog--center .el-dialog__body img{
    height: 165px;
    width: 300px;
  }
</style>
  