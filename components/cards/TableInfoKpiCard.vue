<template>
  <div class="cus_kpi_item">
    <div class="kpi_percentage">
      <figure>
        <img :src="icon" alt="icon" />
      </figure>
      <p>
        <span v-if="Math.sign(parseFloat(percentage)) === 1" class="text-success">
          <el-icon>
            <TopRight />
          </el-icon>
          +{{ percentage }}
        </span>
        <span v-if="Math.sign(parseFloat(percentage)) === -1" class="text-danger">
          <el-icon>
            <BottomRight />
          </el-icon>
          -{{ percentage }}
        </span>
        <span v-if="Math.sign(parseFloat(percentage)) === 0" class="text-danger">
          <el-icon>
            <BottomRight />
          </el-icon>
          {{ percentage }}
        </span>
        {{ time }}
      </p>
    </div>
    <h4 :class="[Math.sign(parseFloat(percentage)) === -1 ? 'text-danger' : '']">
      {{ value }}
      <span v-if="status===true" class="kpi_status"><i class="ri-checkbox-circle-line"></i></span>
      <!-- Active it for Pending Distributor -->
      <span v-if="status===false" class="kpi_status pending"><i class="ri-time-line"></i></span>
    </h4>
    <p class="kpi_det">{{ title }}</p>
    <p v-if="depot_no" class="kpi_det">Depot number:{{ depot_no }}</p>
  </div>
  <!-- <div class="mb-3 card">
      <div class="p-3 card-body">
        <div class="d-flex flex-row-reverse justify-content-between">
          <div class="text-center">
            <span v-if="Math.sign(parseFloat(percentage)) === 1" class="text-sm text-success font-weight-bolder">
              <el-icon>
                <TopRight />
              </el-icon> +{{ percentage }}
            </span>
            <span v-if="Math.sign(parseFloat(percentage)) === -1" class="text-sm text-danger font-weight-bolder">
              <el-icon>
                <BottomRight />
              </el-icon> -{{ percentage }}
            </span>
            <span v-if="Math.sign(parseFloat(percentage)) === 0" class="text-sm text-danger font-weight-bolder">
              <el-icon>
                <BottomRight />
              </el-icon> {{ percentage }}
            </span>
            <br />
            <span style="font-size: smaller"> {{ time }} </span>
          </div>
          <div :class="classContent">
            <div class="numbers">
              <div>
                <img :src="icon" alt="icon" />
              </div>
              <h5 :class="[
                Math.sign(parseFloat(percentage)) === -1 ? 'text-danger' : '',
              ]" class="mt-4 mb-0 font-weight-bolder">
                {{ value }}
              </h5>
              <span class="font-weight-bolder">
                {{ title }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div> -->
</template>
  
<script setup>
import { TopRight, BottomRight } from "@element-plus/icons-vue";

defineProps({
  time: {
    type: String,
    default: "since last week",
  },
  status:{
     type:Boolean,
     default: null,
  },
  title: {
    type: String,
    required: false,
    color: {
      type: String,
    },
  },
  depot_no: {
    type: String,
    required: false,
    color: {
      type: String,
    },
  },
  description: {
    type: String,
    default: "",
  },
  value: {
    type: [Object, String, Number],
    required: false,
    text: {
      type: [String, Number],
    },
  },
  percentage: {
    type: [Number],
    value: {
      type: String,
    },
  },

  icon: {
    type: [String],
  },
  classContent: {
    type: String,
    default: "",
  },
});
</script>
  
<style scoped lang="scss"></style>
  