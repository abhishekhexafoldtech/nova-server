<template>
  <div>
    <section class="edit_mang_wrap">
      <p class="page_heading mb-3">Return Stock</p>
      <div class="mang_inner comp_inner">
        <div class="comp_form_box">
          <el-form label-position="top" label-width="100px" :model="formData" :rules="formValidationRules" ref="formRef"
            @submit.prevent="">
            <el-row>
              <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <div class="fieldrow">
                  <el-form-item label="PO" prop="po">
                    <el-input v-model="formData.po" placeholder="PO" />
                  </el-form-item>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <div class="fieldrow">
                  <el-form-item label="Manufacture Cylinder" prop="manufacture_cylinder">
                    <el-select v-model="formData.manufacture_cylinder" filterable
                      placeholder="Select Cylinder Suply Category">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <div class="fieldrow">
                  <el-form-item label="Ordered date" prop="ordered_date">
                    <el-date-picker v-model="formData.ordered_date" placeholder="Ordered date" format="DD/MM/YYYY" />
                  </el-form-item>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <div class="fieldrow">
                  <el-form-item label="Product" prop="product">
                    <el-input v-model="formData.product" placeholder="product" />
                  </el-form-item>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <div class="fieldrow">
                  <el-form-item label="Cylinder ID" prop="cylinder_id">
                    <el-input v-model="formData.cylinder_id" placeholder="Cylinder ID" />
                  </el-form-item>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <div class="fieldrow">
                  <el-form-item label="Type of issue" prop="type_of_issue">
                    <el-select v-model="formData.type_of_issue" filterable placeholder="Select Cylinder Suply Category">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <div class="fieldrow">
                  <el-form-item label="Return date" prop="return_date">
                    <el-date-picker v-model="formData.return_date" placeholder="Ordered date" format="DD/MM/YYYY" />
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <div class="comp_footer">
              <nuxt-link class="btn btn-default" @click="handleCancel">Cancel</nuxt-link>
              <button class="btn btn-primary" @click.prevent="handleSave">
                Send request
              </button>
            </div>
          </el-form>
        </div>
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
  product: "3kg|Comp",
  cylinder_id: "N005464065496",
  type_of_issue: "Option2",
  return_date: "09/11/2222",
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
  for (const [key, value] of Object.entries(formData)) {
    if (value === null || value === undefined) {
      flashNotification("warning", "Please fill all the fields")
      return false;
    }

    // Check for an empty object
    if (typeof value === 'object' && Object.keys(value).length === 0) {
      flashNotification("warning", "Please fill all the fields")
      return false;
    }

    // Check for an empty string
    if (typeof value === 'string' && value.trim() === '') {
      flashNotification("warning", "Please fill all the fields")
      return false;
    }

    // Check for false
    if (value === false) {
      flashNotification("warning", "Please fill all the fields")
      return false;
    }
  }

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
  min-height: calc(100vh - 195px);
}

.comp_inner .comp_form_box .fieldrow {
  margin-bottom: 5px;
}

.comp_footer {
  justify-content: flex-end;
  margin-top: 80px;
}

.comp_inner .comp_form_box p {
  font-size: 16px;
}

.comp_inner .comp_form_box {
  max-width: 100%;

  .el-row {
    margin: -10px -15px;

    .el-col {
      padding: 10px 15px;
    }
  }
}
</style>
