<template>
  <div>
    <section class="edit_mang_wrap">
      <h4 class="page_heading mb-3">Stock Request</h4>
      <div class="mang_inner comp_inner">
        <el-row :gutter="50">
          <el-col :xs="24" :sm="24" :md="12" :lg="11" :xl="11">
            <el-form label-position="top" label-width="100px" :model="formData" :rules="formValidationRules"
              ref="formRef">
              <div class="comp_form_box">
                <!-- Distributor Name -->
                <div class="fieldrow">
                  <el-form-item label="Distributor name">
                    <el-input v-model="stockData.distributor_name" placeholder="Distributor name" :disabled="true" />
                  </el-form-item>
                </div>

                <!-- Cylinder quantity -->
                <div class="cylinder_type">
                  <el-form-item label="Cylinder">
                    <div class="table_inner">
                      <el-table :data="stockData.table">
                        <el-table-column prop="date" label="CYLINDER TYPE">
                          <template #default="scope">
                            <el-checkbox :label="scope.row.cylinder_type" v-model="scope.row.cylinder_type_value" />
                          </template>
                        </el-table-column>
                        <el-table-column prop="date" label="OTDERED QTY">
                          <template #default="scope">
                            <el-input type="number" v-model="scope.row.ordered_quantity" />
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                  </el-form-item>
                </div>
              </div>
            </el-form>
          </el-col>
        </el-row>
        <div class="comp_footer">
          <nuxt-link class="btn btn-default" @click="handleCancel">Cancel</nuxt-link>
          <button class="btn btn-primary" @click="handleSave">
            Stock request
          </button>
        </div>
        <!-- cancel and save button -->
      </div>
    </section>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { useNavStore } from "@/stores/NavStore";
const navStore = useNavStore();
const router = useRouter();

const stockData = reactive({
  distributor_name: "Yaw Graham",
  table: [
    {
      cylinder_type: "3kg|Steel",
      cylinder_type_value: true,
      ordered_quantity: 5000,
    },
    {
      cylinder_type: "6kg|Steel",
      cylinder_type_value: true,
      ordered_quantity: 4000,
    },
    {
      cylinder_type: "12kg|Steel",
      cylinder_type_value: false,
      ordered_quantity: 0,
    },
    {
      cylinder_type: "6kg|Comp",
      cylinder_type_value: false,
      ordered_quantity: 0,
    },
    {
      cylinder_type: "12kg|Comp",
      cylinder_type_value: false,
      ordered_quantity: 0,
    },
  ],
});

function handleSave() {
  console.log("Distributor add stock data", stockData.table);
}

function handleCancel() {
  let currentRoute = router.currentRoute.value.path;
  const splitRoute = currentRoute.split("/");
  splitRoute.pop();
  const redirectRoute = splitRoute.join("/");
  router.push(redirectRoute);
}

onMounted(() => {
  navStore.setBreadCrumbs(
    "Inventory and stock / Distributor's stock / stock request"
  );
});

definePageMeta({
  layout: "default",
});
</script>

<style scoped lang="scss">
.edit_mang_wrap .mang_inner {
  min-height: calc(100vh - 188px);
}

.comp_inner .comp_form_box {
  .fieldrow {
    margin-bottom: 25px;

  }

  p {
    font-size: 16px;
  }
}

.table_inner {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 1px 1px 6px 0px rgba(0, 0, 0, 0.25);
}

.comp_footer {
  justify-content: left;
  margin-top: 40px;
}
</style>
