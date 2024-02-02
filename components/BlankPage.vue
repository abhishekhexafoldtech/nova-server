<template>
  <div class="container main-container">
    <div class="row main-section">
      <img
        :src="blankImage"
        class="blank-image w-40 w-md-20"
        alt="Blank0"
      />
      <h4 class="fw-bolder mb-3">{{ mainTitle }}</h4>
      <br />
      <p>{{ title }}</p>
      <p>{{ subTitle }}</p>
      <button
        class="btn w-70 w-sm-40 w-lg-25 btn-primary mt-3"
        @click="handleBlankPage"
      >
        + {{ buttonText }}
      </button>
    </div>
  </div>
</template>
<script setup>
import { defineProps } from "vue";
import image from "@/assets/svg/empty_product.svg"
defineProps({
  mainTitle: {
    type: String,
    default: "Product",
  },
  title:{
    type: String,
  },
  subTitle:{
    type: String,
  },
  buttonText: {
    type: String,
    default: "Add Product",
  },
  handleBlankPage: {
    type: Function,
  },
  blankImage:{
    type: String,
    default:image
  }
});
</script>
<style scoped>
.main-container {
  background-color: #ffff;
  height: 75vh;
  width: 98%;
  overflow: hidden;
}

.main-section {
  display: flex;
  justify-content: center;
  text-align: center;
}
p {
  line-height: 10px;
  font-family: Open, Sans;
}
@media screen and (min-width: 768px) {
  .main-container {
    position: relative;
    bottom: 55px;
  }
}
</style>
