<template>
  <div>
    <el-row :gutter="30">
      <el-col :xs="24" :sm="24" :md="12" :lg="12">
        <div class="cd_box">
          <div class="prod_heading">
            <h4 class="cd_heading"> Business Details</h4>
            <button @click="handleBusinessDetails">
              <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
            </button>
          </div>
          <div class="cd_list">
            <div class="cd_item">
              <img :src="PhoneIcon" alt="" srcset="" />
              <h4 >Company phone number:<span>{{ business_details.phone }}</span></h4>
            </div>
            <div class="cd_item">
              <img :src="Email" alt="" srcset="" />
              <h4>Company email:<span>{{ business_details.email }}</span></h4>
            </div>
            <div class="cd_item">
              <img :src="companyReg" alt="" srcset="" />
              <h4 >Company registration number:<span>{{ business_details.registration_number }}</span></h4>
            </div>
            <div class="cd_item">
              <img :src="companyWeb" alt="" srcset="" />
              <h4 >Company website<span>{{ business_details.website }}</span></h4>

            </div>
            <div class="cd_item">
              <img :src="Location" alt="" srcset="" />
              <h4 >Address:
                <span v-if="business_details.address">
                 <span v-if="business_details.address[0]">
                  <span>
                    {{ business_details.address[0].area }} &nbsp;
                    {{ business_details.address[0].street }} &nbsp;
                    {{ business_details.address[0].region }} &nbsp;
                    {{ business_details.address[0].district }} &nbsp;
                    {{ business_details.address[0].post_code }} &nbsp;
                  </span>
                 </span>
                </span>
              </h4>
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
                <h4>Insurance company:<span>{{ insurance_details.insurance_company}}</span></h4>
              </div>
              <div class="cd_item">
                <img :src="PolicyNumber" alt="" srcset="" />
                <h4 >Policy number:<span>{{ insurance_details.policy_number  }}</span></h4>
              </div>
              <div class="cd_item">
                <img :src="Calender" alt="" srcset="" />
                <h4>Expiry:<span>{{ insurance_details.expiry }}</span></h4>
              </div>
            </div>
          </div>

          <div class="mt-5" v-if="props.deliveryAgent">
            <h4 class="cd_heading">Work details</h4>
            <div class="cd_list">
              <div class="cd_item">
                <h4>Work timing:<span>8:00AM - 5:00PM</span></h4>
              </div>
              <div class="cd_item">
                <h4>Delivery zone:<span>Northern</span></h4>
              </div>
            </div>
          </div>
        </div>
      </el-col>

      
      <el-col :xs="24" :sm="24" :md="12" :lg="12">
        <div class="cd_box">
          <h4 class="cd_heading">Uploaded documents</h4>
          <!-- <br>
          <br>
          documents {{ responseData ? responseData.documents[0] : "" }}
          <br><br>
           {{ responseData ? responseData.documents[0].front_document_url : "" }}
           <br><br>
           {{ responseData ? responseData.documents[0].back_document_url : "" }} -->



          <div class="d-flex flex-wrap">
            <div class="up_doc">
              <div class="doc_item">

                <img src="@/assets/img/card-visa.jpg" alt="image" />

                <!-- <img 
                  :src="responseData.documents[0].front_document_ur" 
                  @error="handleImageError('front_doc')"
                /> -->

                <h4>
                  <span>Certificate of registration</span>
                  Uploaded on 11/08/2023
                </h4>
              </div>
              <div class="doc_item">
                <img src="@/assets/img/card-visa.jpg" alt="image" />
                <h4>
                  <span>Insurance card</span>
                  Uploaded on 11/08/2023
                </h4>
              </div>
              <div class="doc_item">
                <img src="@/assets/img/card-visa.jpg" alt="image" />
                <h4>
                  <span>Certificate of commencement</span>
                  Uploaded on 11/08/2023
                </h4>
              </div>
            </div>
          </div>
          <div class="mt-5" v-if="props.deliveryAgent">
            <h4 class="cd_heading">Assigned vehicle details</h4>
            <div class="cd_list">
              <div class="cd_item">
                <h4>Work timing:<span>8:00AM - 5:00PM</span></h4>
              </div>
              <div class="cd_item">
                <h4>Delivery zone:<span>Northern</span></h4>
              </div>
              <div class="cd_item">
                <h4>Color:<span>Black</span></h4>
              </div>
              <div class="cd_item">
                <h4>Model:<span>Mini Truck</span></h4>
              </div>
              <div class="cd_item">
                <h4>Passing number:<span>GH02774</span></h4>
              </div>
              <div class="cd_item">
                <h4>Registration number:<span>GH1234</span></h4>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>


<script setup>
import Email from "@/assets/svg/email.svg";
import Location from "@/assets/svg/location.svg";
import Calender from "@/assets/svg/calender.svg";
import PhoneIcon from "@/assets/svg/phone.svg";
import companyReg from "@/assets/svg/registration.svg";
import companyWeb from "@/assets/svg/website.svg";
import Whearhouse from "@/assets/svg/whearhouse.svg";
import Company from "@/assets/svg/company.svg";
import PolicyNumber from "@/assets/svg/policy_number.svg";
import { useNavStore } from "@/stores/NavStore";
const navStore = useNavStore();

const props = defineProps({
  deliveryAgent: {
    default: false,
    required: false,
  },

  responseData: {
    type: Object,
    default: function () {
      return {};
    }
  },

  business_details: {
    type: Object,
    default: function () {
      return {};
    }
  },
  insurance_details: {
    type: Object,
    default: function () {
      return {};
    }
  },

});
const router = useRouter();


// function handleImageError(data){
//   if(data === 'front_doc'){
//     props.details.documents.front_document_url = "https://via.placeholder.com/300x200"
//   }
//   if(data === "back_doc"){
//     props.details.documents.back_document_url = "https://via.placeholder.com/300x200"
//   }
// }


function handleBusinessDetails() {
  router.b_details = {
    name_of_bussiness: "kwatsons ltd",
    company_registration_number: "G12566",
    company_phone_number: "0277400000",
    company_email: "kwatsons@gmail.com",
    house_number: "Agbogba-ashongman road",
    company_website: "www.kwatsons.com",
  };
  router.push("/distributor/add-distributor/business-details");
}
// moving to insurance details  form
function handleInsurenceDetails() {
  router.i_details = {
    name_of_insurence_company: "Gas agnecy",
    policy_number: "4523",
    expiry_of_insurence: "2028/02/18",
    insurence_card: "",
  };
  router.push("/distributor/add-distributor/insurence-details");
}
onMounted(() => {
  navStore.setBreadCrumbs("Distributor / Business details");
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
</style>
