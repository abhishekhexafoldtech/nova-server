<template>
  <el-row :gutter="30">
    <el-col :xs="24" :sm="24" :md="12" :lg="12">
      <div class="cd_box">

        <div class="prod_heading">
          <h4 class="cd_heading">Exchange point</h4>
          <button @click="handleExPointDetails">
            <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
          </button>
        </div>

        <div class="cd_list">
          <div class="cd_item">
            <img :src="ExchangePoint" alt="" srcset="" />
            <h4>Name of Exchange point:<span>Accra</span></h4>
          </div>

          <div class="cd_item">
            <img :src="District" alt="icon" />
            <h4>District:<span>Ghana</span></h4>
          </div>

          <div class="cd_item">
            <img :src="Phone" alt="" srcset="" />
            <h4>Exchange point phone number:<span>0277400000</span></h4>
          </div>

          <div class="cd_item">
            <img :src="Region" alt="icon" />
            <h4>Region:<span>Accra</span></h4>
          </div>

          <div class="cd_item">
            <img :src="Email" alt="" srcset="" />
            <h4>Exchange point email:<span>accra@gmail.com</span></h4>
          </div>

          <div class="cd_item">
            <img :src="Location" alt="icon" />
            <h4>Exchange point Address:<span>Agbogba-ashongman road</span></h4>
          </div>

        </div>

        <div class="mt-5">
          <div class="prod_heading">
            <h4 class="cd_heading">Insurance Details</h4>
            <button @click="handleInsurenceDetails">
              <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
            </button>
          </div>

          <div class="cd_list">
            <div class="cd_item">
              <img :src="Company" alt="" srcset="" />
              <h4>Insurance company:<span>Gas agency</span></h4>
            </div>
            <div class="cd_item">
              <img :src="PolicyNumber" alt="" srcset="" />
              <h4>Policy number:<span>4523</span></h4>
            </div>
            <div class="cd_item">
              <img :src="Calender" alt="" srcset="" />
              <h4>Expiry:<span>2028/02/18</span></h4>
            </div>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="24" :sm="24" :md="12" :lg="12">
      <div class="cd_box">
        <h4 class="cd_heading">Uploaded documents</h4>
        <div class="d-flex flex-wrap">
          <div class="up_doc">
            <div class="doc_item">
              <img src="@/assets/img/card-visa.jpg" alt="image" />
              <h4>
                <span>Proof of Ownership</span>
                Uploaded on 11/08/2023
              </h4>
            </div>
            <br>
            <div class="doc_item">
              <img src="@/assets/img/card-visa.jpg" alt="image" />
              <h4>
                <span>Insurance card</span>
                Uploaded on 11/08/2023
              </h4>
            </div>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script setup>
import District from "@/assets/svg/district.svg";
import ExchangePoint from "@/assets/svg/exchange_point.svg";
import Region from "@/assets/svg/region.svg";
import Email from "@/assets/svg/email.svg";
import Location from "@/assets/svg/location.svg";
import Calender from "@/assets/svg/calender.svg";
import Phone from "@/assets/svg/phone.svg";
import Company from "@/assets/svg/company.svg";
import PolicyNumber from "@/assets/svg/policy_number.svg";
import { useNavStore } from "@/stores/NavStore";
const navStore = useNavStore();

const props = defineProps({
  deliveryAgent: {
    default: false,
    required: false,
  },
});
const router = useRouter();
// moving to buisinedd details add form
function handleExPointDetails() {
  router.b_details = {
    name_of_depot: "Gas agency",
    depot_number: "0277400000",
    depot_email: "kwatsons@gmail.com",
  };
  // router.push("/distributor/add-distributor/");
}
// moving to insurance details  form
function handleInsurenceDetails() {
  router.i_details = {
    name_of_insurence_company: "Gas agnecy",
    policy_number: "4523",
    expiry_of_insurence: "2028/02/18",
    insurence_card: "",
  };
  // router.push("/distributor/add-distributor/insurence-details");
}
onMounted(() => {
  navStore.setBreadCrumbs(
    "Distributor / Location / Exchange point / Exchange point details"
  );
});
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

.cd_box {
  min-height: calc(100vh - 365px);
}
</style>
