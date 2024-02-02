<template>
  <section class="edit_mang_wrap">
    <div class="mang_inner comp_inner">
      <div class="mang_title">
        <h3>Add Express Delivery details</h3>
      </div>
      <el-form
        label-position="top"
        label-width="100px"
        :model="formData"
        :rules="formValidationRules"
        ref="formRef"
      >
        <el-row :gutter="50">
          <el-col :xs="24" :sm="24" :md="12" :lg="11" :xl="11">
            <div class="comp_form_box">
              <!-- time slot -->
              <div class="fieldrow manufacture_check">
                <el-form-item label="Time Slots" prop="time_slot">
                  <el-select
                    v-model="formData.time_slot"
                    multiple
                    filterable
                    allow-create
                    default-first-option
                    :reserve-keyword="false"
                    placeholder="Select time slot"
                  >
                    <el-option
                      v-for="item in formData.time_slot_content"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </el-form-item>
              </div>

              <!-- Company Registration Number -->
              <div class="fieldrow">
                <el-form-item label="Time Duration(hrs)" prop="time_duration">
                  <el-input
                    v-model="formData.time_duration"
                    placeholder="2 hours"
                  />
                </el-form-item>
              </div>

              <div class="fieldrow">
                <el-form-item
                  label="Delivery Cost (Per Km)"
                  prop="delivery_cost"
                >
                  <el-input
                    v-model="formData.delivery_cost"
                    placeholder="GHs 10"
                  />
                </el-form-item>
              </div>

              <div class="fieldrow">
                <el-form-item label="Households" prop="households">
                  <el-input v-model="formData.households" placeholder="347" />
                </el-form-item>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
            <div class="comp_form_box">
              <div class="fieldrow">
                <el-form-item label="Description" prop="desc">
                  <el-input
                    v-model="formData.desc"
                    type="textarea"
                    placeholder="description"
                  />
                </el-form-item>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <!-- cancel and save button -->
      <div class="comp_footer">
        <nuxt-link class="btn btn-default" @click="handleCancel"
          >Cancel</nuxt-link
        >
        <button class="btn btn-primary" @click="handleSave(formRef)">
          Save
        </button>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { flashNotification } from "@/composables/useNotification.js";
import { nameRule, numberRule, selectBoxRule } from "@/rules/all-rules";

const router = useRouter();
const formRef = ref(null);

//validation values for certificate
const isRegistrationUploaded = ref(false);

//form data
const formData = reactive({
  time_duration: "",
  desc: "",
  delivery_cost: "",
  households: "",
  time_slot: [],
  time_slot_content: [
    "08:00am - 11:00am",
    "12:00am - 03:00am",
    "04:00pm - 06:00pm",
  ],
});

//validation rules
const formValidationRules = reactive({
  time_duration: numberRule("time duration"),
  delivery_cost: nameRule("delivery cost"),
  desc: nameRule("description"),
  households: nameRule("households"),
  time_slot: selectBoxRule("time slot"),
});

const handleSave = async () => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
};

const handleCancel = () => {
  router.push("/deliveries");
  formData = {
    time_duration: "",
    desc: "",
    delivery_cost: "",
    households: "",
    time_slot: [],
  };
};
definePageMeta({
  layout: "default",
});
</script>

<style scoped lang="scss">
.comp_inner .comp_form_box .fieldrow {
  margin-bottom: 25px;
}

.comp_inner .comp_form_box p {
  font-size: 16px;
}
</style>
