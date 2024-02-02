<template>
  <div class="cus_edit_wrap">
    <el-dialog
      v-model="props.visible"
      title="Edit details"
      align-center
      @close="closeDialog"
    >
      <el-form
        label-position="top"
        label-width="100px"
        ref="formRef"
        :model="customer_edit_form"
        :rules="customer_edit_form_rules"
      >
        <el-row :gutter="25">
          <el-col :xs="24" :sm="24" :md="6" :lg="6">
            <div class="form_sec">
              <p class="text-bold">Photo</p>
              <img src="@/assets/img/img-2.jpg" />
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="9" :lg="9">
            <div class="form_sec">
              <div class="fieldrow">
                <el-form-item label="Name" prop="name">
                  <el-input
                    placeholder="Name of customer"
                    v-model="customer_edit_form.name"
                  />
                </el-form-item>
              </div>
              <div class="fieldrow">
                <el-form-item label="Phone Number" prop="phone">
                  <el-input
                    placeholder="Phone number "
                    v-model="customer_edit_form.phone"
                    type="number"
                  />
                </el-form-item>
              </div>
              <div class="fieldrow">
                <el-form-item label="Email" prop="email">
                  <el-input
                    placeholder="Email"
                    v-model="customer_edit_form.email"
                  />
                </el-form-item>
              </div>
              <div class="fieldrow">
                <el-form-item label="Date of birth" prop="date">
                  <el-input
                    type="date"
                    v-model="customer_edit_form.date"
                    formate="DD-MM-YYYY"
                  />
                </el-form-item>
              </div>
              <div class="fieldrow">
                <el-form-item label="Address" prop="address">
                  <el-input
                    placeholder="Address"
                    v-model="customer_edit_form.address"
                  />
                </el-form-item>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="9" :lg="9">
            <div class="form_sec">
              <div class="fieldrow">
                <el-form-item label="Zone" prop="customer_edit_form_rules.zone">
                  <el-select
                    placeholder="please select zone"
                    filterable
                    v-model="customer_edit_form.zone"
                  >
                    <el-option
                      v-for="zone in selectList.zone"
                      :key="zone.name"
                      :label="zone.name"
                      :value="zone.value"
                    />
                  </el-select>
                </el-form-item>
              </div>
              <div class="fieldrow">
                <el-form-item
                  label="Region"
                  prop="customer_edit_form_rules.region"
                >
                  <el-select
                    placeholder="please select region"
                    filterable
                    v-model="customer_edit_form.region"
                  >
                    <el-option
                      v-for="region in selectList.region"
                      :key="region.value"
                      :label="region.name"
                      :value="region.value"
                    />
                  </el-select>
                </el-form-item>
              </div>
              <div class="fieldrow">
                <el-form-item
                  label="District"
                  prop="customer_edit_form_rules.district"
                >
                  <el-select
                    placeholder="please select district"
                    filterable
                    v-model="customer_edit_form.district"
                  >
                    <el-option
                      v-for="district in selectList.district"
                      :key="district.value"
                      :label="district.name"
                      :value="district.value"
                    />
                  </el-select>
                </el-form-item>
              </div>
              <div class="fieldrow" v-if="distributor_name">
                <el-form-item
                  label="Distributor name"
                  prop="customer_edit_form_rules.distributor_name"
                >
                  <el-select
                    placeholder="please select distibutor name"
                    filterable
                    v-model="customer_edit_form.distibutor_name"
                  >
                    <el-option
                      v-for="distributor_name in selectList.distributor_name"
                      :key="distributor_name.value"
                      :label="distributor_name.name"
                      :value="distributor_name.value"
                    />
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="fieldrow mt-4" v-if="props.work_timing">
              <el-form-item label="Work timing" prop="worktiming">
                <el-input
                  placeholder="Working time"
                  v-model="customer_edit_form.work_timing"
                />
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <button class="btn btn-default" @click="handleCancel">Cancel</button>
        <button class="btn btn-primary" @click="handleUpdate(formRef)">
          Update
        </button>
      </template>
    </el-dialog>
  </div>
</template>
​
<script setup>
const emit = defineEmits();
import { flashNotification } from "~/composables/useNotification";
const props = defineProps({
  visible: {
    type: Boolean,
    default: true,
  },
  work_timing: {
    type: Boolean,
    default: false,
  },
  distributor_name: {
    type: Boolean,
    default: true,
  },
});
const formRef = ref();
const customer_edit_form = reactive({
  name: "Yaw Grahm",
  phone: "23364567454",
  email: "graham@gmail.com",
  date: "2023-09-06",
  address: "accra",
  zone: "northen",
  region: "accra",
  district: "tano_south",
  distibutor_name: "will_smith",
  work_timing: "8:00AM 5:00PM",
});
const selectList = reactive({
  zone: [
    {
      name: "Northen",
      value: "northen",
    },
    {
      name: "Southen",
      value: "southen",
    },
  ],
  region: [
    {
      name: "Accra",
      value: "accra",
    },
    {
      name: "Bccra",
      value: "bccra",
    },
  ],
  district: [
    {
      name: "Tano south",
      value: "tano_south",
    },
    {
      name: "Tanno north",
      value: "tano_north",
    },
  ],
  distributor_name: [
    {
      name: "Will smitth",
      value: "will_smith",
    },
    {
      name: "Tom cruis",
      value: "tom_cruis",
    },
  ],
});
const customer_edit_form_rules = reactive({
  name: [
    {
      required: true,
      message: "Please provide  name.",
      trigger: ["blur", "change"],
    },
  ],
  phone: [
    {
      required: true,
      message: "Please provide  phone number.",
      trigger: ["blur", "change"],
    },
  ],
  email: [
    {
      required: true,
      message: "Please provide  email.",
      trigger: ["blur", "change"],
    },
    {
      type: "email",
      message: "Please enter a valid email address",
      trigger: "blur",
    },
  ],
  date: [
    {
      required: true,
      message: "Please provide  Dte of Birth.",
      trigger: ["blur", "change"],
    },
  ],
  address: [
    {
      required: true,
      message: "Please provide  Address.",
      trigger: ["blur", "change"],
    },
  ],
  zone: [
    {
      required: true,
      message: "Please provide  Zone type.",
      trigger: ["blur", "change"],
    },
  ],
  region: [
    {
      required: true,
      message: "Please provide  Region.",
      trigger: ["blur", "change"],
    },
  ],
  district: [
    {
      required: true,
      message: "Please provide  District.",
      trigger: ["blur", "change"],
    },
  ],
  distributor_name: [
    {
      required: true,
      message: "Please provide  Distributor name.",
      trigger: ["blur", "change"],
    },
  ],
});
function handleUpdate(formEl) {
  if (!formEl) {
    return;
  }
  formEl.validate((valid) => {
    if (valid) {
      emit("handleUpdateCustomerDetails", customer_edit_form);
    }
  });
}
function handleCancel() {
  emit("handleCloseCustomerEditForm", "cancel");
}
function closeDialog() {
  emit("handleCloseCustomerEditForm");
}
</script>
