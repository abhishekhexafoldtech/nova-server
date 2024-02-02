<template>
  <div>
    <section class="edit_mang_wrap">
      <div class="mang_inner comp_inner">
        <div class="mang_title">
          <h3>Assign zone</h3>
        </div>
        <div class="w442">
          <el-form
            label-position="top"
            label-width="100px"
            :model="formData"
            :rules="formValidationRules"
            ref="formRef"
          >
            <!--distributorName  -->
            <div class="comp_form_box">
              <div class="fieldrow">
                <el-form-item label="Distributor name" prop="distributorName">
                  <el-input
                    class="form_input"
                    placeholder="Distributor name"
                    v-model="formData.distributorName"
                  >
                  </el-input>
                </el-form-item>
              </div>
            </div>

            <!-- Region -->
            <div class="comp_form_box">
              <div class="fieldrow">
                <el-form-item label="Region" prop="region">
                  <el-select
                    class="form_input w-100"
                    placeholder="Name of region"
                    v-model="formData.region"
                  >
                    <el-option label="select" value="value" />
                  </el-select>
                </el-form-item>
              </div>
            </div>

            <!-- Zone -->
            <div class="comp_form_box">
              <div class="fieldrow">
                <el-form-item label="Zone" prop="zone">
                  <el-select
                    class="form_input w-100"
                    placeholder="Name of zone"
                    v-model="formData.zone"
                  >
                    <el-option label="select" value="value" />
                  </el-select>
                </el-form-item>
              </div>
            </div>
          </el-form>
          <div class="comp_footer">
            <nuxt-link class="btn btn-default" to="/distributor"
              >Cancel</nuxt-link
            >
            <button class="btn btn-primary" @click="handleSave">
              Continue
            </button>
          </div>
        </div>
      </div>

      <!--zone invoice poup -->
      <ZoneInvoice
        :dialogVisible="zoneInvoiceVisibility"
        @handleSendReceiptEmail="handleSendReceiptEmail"
        @handleReceiptClose="handleCloseInvoice"
      />
    </section>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { flashNotification } from "@/composables/useNotification.js";
import { selectBoxRule, nameRule } from "@/rules/all-rules";
import ZoneInvoice from "@/components/distributor/zone-invoice.vue";
import { useNavStore } from "@/stores/NavStore";
const navStore = useNavStore();

const router = useRouter();
const formRef = ref(null);
const zoneInvoiceVisibility = ref(false);
//form data
const formData = reactive({
  distributorName: "",
  region: "",
  zone: "",
});

//validation rules
const formValidationRules = reactive({
  distributorName: nameRule("the distributorName"),
  region: selectBoxRule("the region"),
  zone: selectBoxRule("the zone"),
});

//call api with form data
const handleSave = () => {
  zoneInvoiceVisibility.value = true;

  formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        // Perform data submission logic here
        // let r = "";
        // router.push(`${r}`);
        zoneInvoiceVisibility.value = true;
        flashNotification("success", "Assign zone successfully");
      } catch (error) {
        flashNotification("error", "An error occurred. Please try again.");
      }
    } else {
      flashNotification("warning", "Please fill required fields");
    }
  });
};

function handleDownload(index, data) {
  console.log(index, data);
}
function handleViewReceipt(data) {
  console.log(data);
  viewReceiptVisibility.value = true;
}
function handleSendReceiptEmail() {
  viewReceiptVisibility.value = false;
  flashNotification("success", "Email sented.");
}
function handleReceiptClose() {
  viewReceiptVisibility.value = false;
}
function handleCloseInvoice() {
  zoneInvoiceVisibility.value = false;
}

//onmount
onMounted(() => {
  navStore.setBreadCrumbs("Distributor / Add distributor");
});

definePageMeta({
  layout: "default",
});
</script>

<style scoped lang="scss">
.w442 {
  width: 100%;
  max-width: 442px;
}

.comp_form_box {
  margin-bottom: 25px;

  .fieldrow {
    margin: 0;
  }
}

.comp_footer {
  margin-top: 60px;
}
</style>
