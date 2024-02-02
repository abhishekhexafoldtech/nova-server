<template>
  <el-dialog
    class="dd_modal"
    v-model="props.dialogVisible"
    :title="
      dialogType == 'phaseOne' ? 'Phase Two Details' : 'Phase Three Details'
    "
    @close="handleCloseDialog()"
  >
    <!-- Phase 2 Details -->
    <div class="dd_body" v-if="props.dialogType == 'phaseOne'">
      <el-row>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <h4 class="dd_title">Distributor’s Company Details</h4>
          <div class="dd_det">
            <div class="dd_item">
              <span>Name of Business</span>
              <p>Nova Gas Pvt. Ltd.</p>
            </div>
            <div class="dd_item">
              <span>Company Registration Number</span>
              <p>ABCD1223456NH</p>
            </div>
            <div class="dd_item">
              <span>House No. / Street</span>
              <p>
                Nikolaus Burg, 61470 Christiansen Crest, New Mexico, Kilbackland
              </p>
            </div>
            <div class="dd_item">
              <span>GPS Code</span>
              <p>7.946508, -1.142073</p>
            </div>
            <div class="dd_item">
              <span>Area</span>
              <p>Nikolaus Burg</p>
            </div>
            <div class="dd_item">
              <span>Region</span>
              <p>Kilbackland</p>
            </div>
            <div class="dd_item">
              <span>District</span>
              <p>Christiansen Crest</p>
            </div>
            <div class="dd_item">
              <span>Post Code</span>
              <p>04496</p>
            </div>
            <div class="dd_item">
              <span>GPS Address</span>
              <p>
                Nikolaus Burg, 61470 Christiansen Crest, New Mexico, Kilbackland
              </p>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <h4 class="dd_title">Details of National ID</h4>
          <div class="dd_img">
            <div class="dd_item">
              <img src="@/assets/img/vr-bg.jpg" alt="" />
              <p>Id Type <span>Ghana Card</span></p>
            </div>
            <div class="dd_item">
              <img src="@/assets/img/vr-bg.jpg" alt="" />
              <p>Certificate of Registration</p>
            </div>
          </div>
          <h4 class="dd_title mt-3">Proof of ownership of property</h4>
          <div class="dd_img">
            <div class="dd_item">
              <img src="@/assets/img/vr-bg.jpg" alt="" />
              <p>Uploaded Certificates <span>Owned Property</span></p>
            </div>
            <div class="dd_item">
              <img src="@/assets/img/vr-bg.jpg" alt="" />
              <p>Certificate of Commencement</p>
            </div>
            <div class="dd_item">
              <img src="@/assets/img/vr-bg.jpg" alt="" />
              <p>Fire Proof/safety Protocol Certificate</p>
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="dd_footer">
        <button
          class="btn btn-default"
          type=""
          @click="handleMarkAsRead(props.dialogType)"
        >
          Mark as Checked
        </button>
        <button class="btn btn-primary" @click="handleFormSubmit">
          Edit Details
        </button>
      </div>
    </div>

    <!-- Phase 3 Details -->
    <div class="dd_body" v-else>
      <el-row>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <h4 class="dd_title">Insurance details</h4>
          <div class="dd_det">
            <div class="dd_item">
              <span>Name of Insurance Company</span>
              <p>Nova Gas Pvt. Ltd.</p>
            </div>
            <div class="dd_item">
              <span>Policy Number</span>
              <p>ABCD1223456NH</p>
            </div>
            <div class="dd_item">
              <span>Expiry of Insurance</span>
              <p>25 Jan 2025</p>
            </div>
          </div>
          <div class="dd_img mt-3">
            <div class="dd_item">
              <img src="@/assets/img/vr-bg.jpg" alt="" />
              <p>Insurance Card</p>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <h4 class="dd_title">Banking details</h4>
          <div class="dd_det">
            <div class="dd_item">
              <span>Name of Bank</span>
              <p>Standard Chartered Bank</p>
            </div>
            <div class="dd_item">
              <span>Branch Name</span>
              <p>New Mexico</p>
            </div>
            <div class="dd_item">
              <span>Branch Code</span>
              <p>SCB0001234</p>
            </div>
            <div class="dd_item">
              <span>Account Name</span>
              <p>John Doe</p>
            </div>
            <div class="dd_item">
              <span>Account Number</span>
              <p>12334567890</p>
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="dd_footer">
        <button
          class="btn btn-default"
          type=""
          @click="handleMarkAsRead(props.dialogType)"
        >
          Mark as Checked
        </button>
        <button class="btn btn-primary" @click="handleFormSubmit">
          Edit Details
        </button>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
let emit = defineEmits();

let props = defineProps({
  dialogVisible: Boolean,
  dialogTitle: String,
  dialogType: String,
  formData: {
    name: String,
  },
});

// close dialog
function handleCloseDialog() {
  emit("childClose");
}

function handleMarkAsRead(type) {
  emit("markAsRead", type);
}

// submit data
function handleFormSubmit() {
  emit("getChildFormData", props.formData);
}

</script>