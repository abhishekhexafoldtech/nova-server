<template>
  <div>
    <section class="edit_mang_wrap">
      <h4 class="page_heading mb-3">Add Stock</h4>
      <div class="mang_inner comp_inner">
        <el-row :gutter="50">
          <el-col :xs="24" :sm="24" :md="12" :lg="11" :xl="11">
            <el-form label-position="top" label-width="100px" :model="formData" :rules="formValidationRules"
              ref="formRef">
              <div class="comp_form_box">
                <!-- PO -->
                <div class="fieldrow">
                  <el-form-item label="PO" prop="po">
                    <el-input v-model="formData.po" placeholder="PO" />
                  </el-form-item>
                </div>

                <!-- Manufacture Cylinder -->
                <div class="fieldrow">
                  <el-form-item label="Manufacture Cylinder" prop="manufacture_cylinder">
                    <el-select v-model="formData.manufacture_cylinder" filterable
                      placeholder="Select Cylinder Suply Category">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </div>

                <!-- Ordered date -->
                <div class="fieldrow">
                  <el-form-item label="Ordered date" prop="ordered_date">
                    <el-date-picker v-model="formData.ordered_date" placeholder="Ordered date" format="DD/MM/YYYY" />
                  </el-form-item>
                </div>

                <!-- Cylinder types -->
                <div class="fieldrow manufacture_check">
                  <el-form-item label="Cylinder" prop="cylinder">
                    <el-checkbox-group v-model="formData.cylinder_types" class="checkbox_group">
                      <el-checkbox label="Steel" />
                      <el-checkbox label="Comp" />
                    </el-checkbox-group>
                  </el-form-item>
                </div>

                <!-- Cylinder quantity -->
                <div class="cylinder_type">
                  <el-table :data="formData.table" border style="width: 100%;">
                    <el-table-column prop="date" label="CYLINDER TYPE" width="180">
                      <template #default="scope">
                        <el-checkbox :label="scope.row.cylinder_type" v-model="scope.row.cylinder_type_value" />
                      </template>
                    </el-table-column>
                    <el-table-column prop="date" label="OTDERED QTY" width="180">
                      <template #default="scope">
                        <el-input type="number" v-model="scope.row.ordered_quantity" />
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </el-form>
          </el-col>
        </el-row>
        <div class="comp_footer">
          <nuxt-link class="btn btn-default" @click="handleCancel">Cancel</nuxt-link>
          <button class="btn btn-primary" @click="handleSave">
            Send request
          </button>
        </div>
        <!-- cancel and save button -->
      </div>
    </section>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { flashNotification } from "@/composables/useNotification.js";
const router = useRouter();
const formRef = ref(null);

//form data
const formData = reactive({
  po: "1104",
  manufacture_cylinder: "Option1",
  ordered_date: "09/11/2222",
  cylinder_types: ["Steel"],
  table: [
    {
      cylinder_type: "3kg",
      cylinder_type_value: false,
      ordered_quantity: "Tom",
    },
    {
      cylinder_type: "6kg",
      cylinder_type_value: true,
      ordered_quantity: "Tom",
    },
    {
      cylinder_type: "12kg",
      cylinder_type_value: false,
      ordered_quantity: "Tom",
    },
  ],
});

const options = [
  {
    value: "Option1",
    label: "Option1",
  },
  {
    value: "Option2",
    label: "Option2",
  },
  {
    value: "Option3",
    label: "Option3",
  },
  {
    value: "Option4",
    label: "Option4",
  },
  {
    value: "Option5",
    label: "Option5",
  },
];

//call api with form data
const handleSave = () => {
  flashNotification("success", `${formData.po} details requested.`);
  router.push("/manufacturer");
};

const handleCancel = () => {
  router.push("/manufacturer");
  formData = {
    po: "1104",
    manufacture_cylinder: "Option1",
    ordered_date: "09/11/2222",
    cylinder_types: ["Steel"],
    table: [
      {
        cylinder_type: "3kg",
        cylinder_type_value: false,
        ordered_quantity: "Tom",
      },
      {
        cylinder_type: "6kg",
        cylinder_type_value: true,
        ordered_quantity: "Tom",
      },
      {
        cylinder_type: "12kg",
        cylinder_type_value: false,
        ordered_quantity: "Tom",
      },
    ],
  };
};

definePageMeta({
  layout: "default",
});
</script>

<style scoped lang="scss">
.edit_mang_wrap .mang_inner {
  min-height: calc(100vh - 185px);
}

.comp_inner .comp_form_box .fieldrow {
  margin-bottom: 25px;
}

.comp_footer {
  justify-content: left;
  margin-top: 30px;
}

.comp_inner .comp_form_box p {
  font-size: 16px;
}

.checkbox_group {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}
</style>
