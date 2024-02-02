<template>
  <div>
    <div class="cd_box">
      <div class="prod_heading">
        <h4 class="cd_heading">Product Style</h4>
      </div>
      <el-row class="main_row">
        <el-col
          :xs="24"
          :sm="12"
          :md="12"
          :lg="8"
          class="main_col"
          v-for="data in props.data"
          :key="data.id"
        >
          <div class="ps_card">
            <div class="psc_header">
              <img :src="data.images[0].image_url" alt="" />
              <div class="psc_info">
                <div class="pr_name">
                  <h4>{{ data?.name }}</h4>
                  <button class="edit_btn" @click="handleEdit()">
                    <i class="fa fa-pencil-square-o"></i>
                  </button>
                </div>
                <p>{{ data?.product?.subcategory?.category_detail.name }}</p>
              </div>
              <div class="psc_status">
                <span>Active</span>
                <!-- Enable it for to show inactive status -->
                <!-- <span class="inactive">Inactive</span> -->
              </div>
              <!-- <div class="psc_switch">
                <el-switch
                  v-model="data.is_active"
                  inline-prompt
                  active-text="Active"
                  inactive-text="Inactive"
                  style="
                    --el-switch-on-color: #0a7b37;
                    --el-switch-off-color: #ff4949;
                  "
                />
              </div> -->
            </div>
            <div class="psc_body">
              <ul>
                <li>
                  Product dimension <span>{{ data.dimension || "-" }}</span>
                </li>
                <li>
                  Product base price<span>GHs {{ data.cost.cost || "-" }}</span>
                </li>
                <li>
                  Discount in %<span>{{
                    data.cost?.strikethrough_cost_in_percentage || "NA"
                  }}</span>
                </li>
              </ul>
            </div>
            <div class="psc_footer">
              <ul>
                <li>
                  Cylinder weight
                  <span
                    >{{ data.weight || 0 }}
                    {{ data.measuring_unit || "kg" }}</span
                  >
                </li>
                <li>
                  Product price<span>GHs {{ data.cost.cost }}</span>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps({
  data: {
    type: Array,
    default: [],
  },
});
function handleEdit(data) {
  router.push(`edit-style`);
}
</script>

<style lang="scss" scoped>
.prod_heading {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 30px;

  .cd_heading {
    margin: 0;
  }

  button {
    background-color: transparent;
    color: var(--violet);
    font-size: 16px;
    width: 26px;
    height: 26px;
    line-height: 24px;
    padding: 0;
    padding-left: 2px;
    text-align: center;
    border: none;
    border-radius: 3px;
    margin-top: 3px;
    transition: all 200ms ease-in-out;

    &:hover {
      background-color: var(--violet);
      color: var(--white);
    }
  }
}

.main_row {
  margin: -15px;

  .main_col {
    padding: 15px;
  }
}
</style>
