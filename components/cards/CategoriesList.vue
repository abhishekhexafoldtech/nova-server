<template>
  <div class="card">
    <div class="p-3 pb-0 card-header">
      <h6 class="dashboard_table_heading m-0">{{ title }}</h6>
    </div>
    <div class="p-3 card-body">
      <ul :class="`list-group ${isRTL && 'pe-0'}`">
        <li v-for="(
            { url, label, description }, index
          ) of categories" :key="index"
          class="mb-2 border-0 list-group-item d-flex justify-content-between border-radius-lg">
          <div class="d-flex align-items-center gap-3">
            <div class="text-center">
              <img class="text-white opacity-10" :src="url" />
            </div>
            <div class="tsp_info">
              <h6>{{ label }}</h6>
              <span v-html="description"> </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: "Top selling products",
  },
  categories: {
    type: Array,
    required: true,
    img: String,
    label: String,
    description: String,
  },
  isRTL: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped lang="scss">
.tsp_info {
  h6 {
    color: var(--black);
    font-size: 14px;
    font-weight: 700;
    line-height: 150%;
    margin: 0;
  }

  span {
    color: var(--violet);
    font-size: 12px;
    font-weight: 700;
    line-height: 15px;
  }
}
</style>
