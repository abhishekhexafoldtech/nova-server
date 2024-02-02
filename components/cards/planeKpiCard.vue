<template>
  <div class="cus_kpi_item">
    <div class="kpi_percentage">
      <figure>
        <img :src="icon" alt="icon" />
      </figure>
      <!-- <p>
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
        </p> -->
    </div>
    <h4 class="kpi_title">
      {{ caption }}
    </h4>
    <p class="kpi_det">{{ label }}<span>{{ labelValue }}</span></p>
  </div>
</template>
  
<script setup>

defineProps({
  time: {
    type: String,
  },
  label: {
    type: String,
    required: false,
    color: {
      type: String,
    },
  },
  labelValue: {
    type: String,
    required: false,
  },
  caption: {
    type: [Object, String, Number],
    required: false,
    text: {
      type: [String, Number],
    },
  },
  icon: {
    type: [String],
  },
  classContent: {
    type: String,
    default: "",
  },
  required: false,
});
</script>
  
<style scoped lang="scss">
.kpi_title {
  color: var(--black);
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  margin: 0;
  margin-bottom: 8px;
  letter-spacing: 0px;
}

.kpi_det {
  color: #7B809A;
  font-family: Montserrat;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  opacity: 0.7;

  span {
    font-weight: 700;
  }
}
</style>