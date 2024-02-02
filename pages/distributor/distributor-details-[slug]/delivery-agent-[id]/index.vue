<template>
  <div class="container-area">
    <div class="cd_header">
      <div class="header_inner">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-4TTdIlL3swAddqR7ZY42BAgAo5Xj4lawocuvnjIuEVXm7ref0Xb9D0LTqfCNyPVGpy8&usqp=CAU"
          alt="Profile"
        />
        <div class="h_right">
          <div class="h_name">
            <h4>{{ header_details.first_name }} {{ header_details.last_name }}</h4>
            <el-switch
              disabled
              v-model="header_details.is_active"
              class="ml-2"
              inline-prompt
              style="
                --el-switch-on-color: #0a7b37;
                --el-switch-off-color: #ff4949;
              "
              active-text="Active"
              inactive-text="In-active"
            />
          </div>
          <div class="h_info">
            <div>
              <p>Delivery agent</p>
              <p>ID:<span>{{ header_details.display_id }}</span></p>
            </div>
            <div>
              <br />
              <p>Company name:<span>{{ header_details.company }}</span></p>
            </div>
          </div>
        </div>
      </div>
      <div class="cd_header_tabs">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="Personal details" name="personal_details"></el-tab-pane>
          <el-tab-pane label="Rating" name="rating"></el-tab-pane>
          <el-tab-pane label="All orders" name="all_orders"></el-tab-pane>
          <el-tab-pane label="Complaints" name="complaints"></el-tab-pane>
          <el-tab-pane label="License details" name="license"></el-tab-pane>
          <el-tab-pane label="Guarantors" name="guarantor"></el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <!-- Conditional rendering -->
    <div>
      <PersonalDetailes v-if="activeName === 'personal_details'" 
        :personal_details="personal_details"
        :work_details="work_details"
        :assigned_vehicles="assigned_vehicles"
      />
      <Rating v-if="activeName === 'rating'" 
        :avg_rating="avg_rating"
        :negative_feedback_percentage="negative_feedback_percentage"
        :positive_feedback_percentage="positive_feedback_percentage"
      />
      <AllOrdersTable v-if="activeName === 'all_orders'" 
      :distId="distId"
      />
      <ComplaintsTable v-if="activeName === 'complaints'" />
      <LicenseDetails v-if="activeName === 'license'" 
        :license_details="license_details"
      />
      <Guarantors v-if="activeName === 'guarantor'" 
        :guarantor_location="guarantor_location"
        :guarantor_personal_details="guarantor_personal_details"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { fetchDeliveryAgentDetails } from "@/api/distributor/delivery-agents-details"
import PersonalDetailes from "./PersonalDetailes.vue";
import Rating from "./Rating.vue";
import LicenseDetails from "./LicenseDetails.vue";
import Guarantors from "./Guarantors.vue";
import AllOrdersTable from "./AllOrders.vue";
import ComplaintsTable from "./Complaints.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const activeName = ref("personal_details");
const activeBtn = ref(true);

let responseData = ref(null)

let header_details = ref({})
let personal_details = ref({})
let work_details = ref({})
let assigned_vehicles = ref({})
let license_details = ref({})
let guarantor_location = ref({})
let guarantor_personal_details = ref({})
let avg_rating = ref(null)
let negative_feedback_percentage = ref(null)
let positive_feedback_percentage = ref(null)

let distId = ref(null)


//change component afetr calling
const handleClick = (tab) => {
  activeName.value = tab.props.name;
  getDistributorDetails(tab.props.name)
};


function getDistributorDetails(tabName) {
    if(tabName == "personal_details") {
    
      let id = router.currentRoute.value.params.id;
      // let id = "245bd033-6148-4502-83f8-51a080dfcf46"

      let paramsQuery = reactive({
        "tab": tabName ? tabName : "personal_details"
      });

      fetchDeliveryAgentDetails(id, paramsQuery).then((res)=>{
        if(Object.keys(res.data[0]).length){
          console.log("personal_details res", res.data[0])
          header_details.value = res.data[0].header_details;
          responseData.value = res.data[0];
          personal_details.value = res.data[0].personal_details;
          work_details.value = res.data[0].work_details;
          assigned_vehicles.value = res.data[0].assigned_vehicles;
        } 
      })
    } else if(tabName == "rating") {
      let id = router.currentRoute.value.params.id;
      let paramsQuery = reactive({
        "tab": tabName ? tabName : "rating",
        "employee_type" : "delivery_agent"
      });

      fetchDeliveryAgentDetails(id, paramsQuery).then((res)=>{
        if(Object.keys(res.data[0]).length){
          header_details.value = res.data[0].header_details;
          avg_rating.value = res.data[0].avg_rating
          negative_feedback_percentage.value = res.data[0].negative_feedback_percentage;
          positive_feedback_percentage.value = res.data[0].positive_feedback_percentage;
        
        } 
      })
    } else if(tabName == "all_orders") {
      distId.value = router.currentRoute.value.params.id;
    } else if(tabName == "complaints") {
      console.log("res location")
    } else if(tabName == "license") {
      let id = router.currentRoute.value.params.id;

      let paramsQuery = reactive({
        "tab": tabName ? tabName : "personal_details"
      });

      fetchDeliveryAgentDetails(id, paramsQuery).then((res)=>{
        if(Object.keys(res.data[0]).length){
          header_details.value = res.data[0].header_details;
          license_details.value = res.data[0].license_details;
        } 
      })
    } else if(tabName == "guarantor") {

      let id = router.currentRoute.value.params.id;

      let paramsQuery = reactive({
        "tab": tabName ? tabName : "personal_details"
      });

      fetchDeliveryAgentDetails(id, paramsQuery).then((res)=>{
        if(Object.keys(res.data[0]).length){
          header_details.value = res.data[0].header_details;
          guarantor_location.value = res.data[0].guarantor_location;
          guarantor_personal_details.value = res.data[0].guarantor_personal_details;
        } 
      })
    } else {
      console.log("Oops something went wrong.....")
    }
} 



onMounted(() => {
  getDistributorDetails("personal_details")
});


</script>


