<template>
  <div :class="subEmptyManager ? 'sub_blank_box' : 'blank_box'" ref="empty_items">
    <div class="box_inner">
      <img :src="icon" alt="" />
      <h4>{{ heading }}</h4>
      <p>{{ description }}</p>
      <p>{{ description2 }}</p>
      <button class="btn btn-primary" @click="doSomething" v-if="button">
        {{ button }}
      </button>
    </div>
  </div>
</template>
<script setup>
import {ref , defineProps} from "vue"
const height = ref(0);
const padding_top = ref(100);
const emit = defineEmits();
defineProps({
  heading: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  description2: {
    type: String,
    required: true,
  },
  button: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  subEmptyManager: {
    type: Boolean,
    required: false,
    default: false,
  },
});
function doSomething() {
  emit("doSomething");
}
// this function manages the height of component
// function heightManage(){
//         height.value = window.innerHeight - 110;
//         padding_top.value = (height.value - 120 * 2) * 0.5;
//         window.addEventListener("resize",()=>{
//             height.value = window.innerHeight - 110;
//             padding_top.value = (height.value - 120 * 2) * 0.5;
//         })
// }
// onMounted(()=>{
//     heightManage()
// })
</script>
<style scoped lang="scss">
.blank_box {
  background-color: var(--white);
  padding: 15px;
  margin: 0 auto;
  margin-top: 45px;
  min-height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .box_inner {
    text-align: center;
    width: 100%;
    max-width: 375px;

    img {
      width: 185px;
      height: 185px;
      object-fit: contain;
      object-position: center;
      margin-bottom: 20px;
    }

    h4 {
      color: var(--black);
      font-size: 28px;
      font-weight: 700;
      line-height: 36px;
      letter-spacing: -0.8px;
      margin: 0;
      margin-bottom: 15px;
      width: max-content;
      margin: 0 auto 10px;
    }

    p {
      color: #7B809A;
      text-align: center;
      font-family: Montserrat;
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: 26px;
      margin: 0;
    }

    button {
      margin: 0;
      margin-top: 40px;
      color: var(--white);
      font-size: 14px;
      font-weight: 700;
      line-height: 21px;
      min-width: 230px;
    }
  }
}

.sub_blank_box {
  text-align: center;
  width: 100%;
  padding: 150px;
  margin: 0 auto;

  img {
    width: 185px;
    height: 185px;
    object-fit: contain;
    object-position: center;
    margin-bottom: 20px;
  }

  h4 {
    color: var(--black);
    font-size: 28px;
    font-weight: 700;
    line-height: 36px;
    letter-spacing: -0.8px;
    margin: 0;
    margin-bottom: 15px;
    width: max-content;
    margin: 0 auto 10px;
  }

  p {
    color: var(--grey);
    font-size: 18px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: -0.8px;
    margin: 0;
  }
}
</style>
