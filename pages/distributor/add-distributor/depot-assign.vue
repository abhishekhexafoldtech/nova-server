<template>
  <div>
    <section class="edit_mang_wrap">
      <div class="mang_inner comp_inner">
        <div class="mang_title">
          <h3>Assign depot</h3>
        </div>
        <div class="w442">
          <el-form
            label-position="top"
            label-width="100px"
            :model="formData"
            :rules="formValidationRules"
            ref="formRef"
          >
            <!-- <div class="fieldrow">
              <el-form-item v-if="formData" label="District" prop="district">
                <el-select
                  class="form_input w-100"
                  placeholder="Name of district"
                  v-model="formData.district"
                >
                  <el-option label="select" value="value" />
                </el-select>
              </el-form-item>
            </div> -->

            <!-- Region -->
            <!-- <div class="fieldrow">
              <el-form-item v-if="formData" label="Region" prop="region">
                <el-select
                  class="form_input w-100"
                  placeholder="Name of region"
                  v-model="formData.region"
                >
                  <el-option label="select" value="value" />
                </el-select>
              </el-form-item>
            </div> -->

            <!-- Zone -->
            <div class="fieldrow">
              <el-form-item v-if="formData" label="Zone" prop="zone">
                <el-select
                  class="form_input w-100"
                  placeholder="Name of zone"
                  v-model="formData.zone"
                >
                  <el-option
                    v-for="item in zones"
                    :label="item.zone_name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </div>

            <!-- Assign Depot -->
            <div class="fieldrow">
              <el-form-item v-if="formData" label="Assign Depot" prop="assign_depot">
                <el-select
                  class="form_input w-100"
                  placeholder="Name of depot"
                  v-model="formData.assign_depot"
                >
                  <el-option
                    v-for="item in assignDepotList"
                    :label="item.location_name"
                    :value="item.location_name"
                    @click="getLocationId(item.id)"
                  />
                </el-select>
              </el-form-item>
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
    </section>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { flashNotification } from "@/composables/useNotification.js";
import { selectBoxRule } from "@/rules/all-rules";
import {
  getAllZone,
  getAllCompanyLocation,
  updateCompanyLocation,
} from "@/api/distributor/assign-depot";
import { useNavStore } from "@/stores/NavStore";
const navStore = useNavStore();
//all zone
const zones = ref([]);
//assign depot list
const assignDepotList = ref([]);
//company id
const companyId = ref("");

const router = useRouter();
const formRef = ref(null);

const location_id = ref("");
const getLocationId = (id) => {
  location_id.value = id;
};
//form data
const formData = reactive({
  district: "",
  region: "",
  zone: "",
  assign_depot: "",
});

//validation rules
const formValidationRules = reactive({
  district: selectBoxRule("the district"),
  region: selectBoxRule("the region"),
  zone: selectBoxRule("the zone"),
  assign_depot: selectBoxRule("the depot"),
});

//call api with form data
const handleSave =() => {
  const depotData = {
    company_id: companyId.value,
    zone_id: formData.zone,
    location_name: formData.assign_depot,
  };
  formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        updateCompanyLocation(depotData, location_id.value)
          .then((res) => {
            if (res.status === 200) {
              flashNotification("success", "Assign depot successfully");
              let r = "assign-zone";
              router.push(`${r}`);
            }
          })
          .catch((er) => {
            flashNotification("warning", "Unable to assign depot");
          });
        // // Perform data submission logic here
      } catch (error) {
        flashNotification("error", "An error occurred. Please try again.");
      }
    } else {
      flashNotification("warning", "Please fill required fields");
    }
  });
};

//handle cancel button
const handleCancel = () => {
  router.push("/onboarding/depot-assign");
};

//onmounted for get all zone ,
onMounted(() => {
  navStore.setBreadCrumbs('Distributor / Add distributor')
  companyId.value = sessionStorage.getItem("company_id");
  //get all zone
  getAllZone()
    .then((res) => {
      if (res.status === 200) {
        zones.value = res.data.data;
      }
    })
    .catch((error) => {
    flashNotification("warning", "Unable to get all zone");
    });
  // get all company locations
  getAllCompanyLocation({ location_type: "depot" })
    .then((res) => {
      if (res.status === 200) {
        assignDepotList.value = res.data.data;
      }
    })
    .catch((error) => {
      flashNotification("warning", "Unable to get all company location");
    });
});

// definePageMeta({
//   layout: "default",
// });
</script>

<style scoped lang="scss">
.w442 {
  width: 100%;
  max-width: 442px;
}

.fieldrow {
  margin-bottom: 25px;
}

.comp_footer {
  margin-top: 60px;
}
</style>
