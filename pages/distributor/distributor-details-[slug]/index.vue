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
            <h4> {{ header_details.name }}  <span class="dist_status"><i class="ri-checkbox-circle-line"></i></span></h4>
            <el-switch
              disabled
              v-model="switchValue"
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
              <p>Distributor</p>
              <p>Company owner:<span>{{ header_details.name }} </span></p>
            </div>
          </div>
        </div>
      </div>

      <div class="cd_header_tabs">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="Business details" name="business"></el-tab-pane>
          <el-tab-pane label="Owner details" name="owner"></el-tab-pane>
          <el-tab-pane label="Delivery vehicles & agents" name="employee"></el-tab-pane>
          <el-tab-pane label="Location" name="location"></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <h4 class="page_heading mt-4 mb-3"></h4>
    <div>
      <BussinessDetailsTab v-if="activeName === 'business'" 
        :response-data="responseData" 
        :business_details="business_details" 
        :insurance_details="insurance_details"
      />
      <DistributorDetailsTab v-if="activeName === 'owner'" 
        :response-data="responseData" 
        :owner_details="owner_details" 
      />
      <DeliveryVehicalsAndAgentsTab v-if="activeName === 'employee'" 
        :deliveryAgentKPI="deliveryAgentKPI" 
        :deliveryVehicleKPI="deliveryVehicleKPI"
        :serviceAgentKPI="serviceAgentKPI"
        :distId="router.currentRoute.value.params.slug"
      />
      <LocationTab v-if="activeName === 'location'" />
    </div>

  </div>
</template>

<script setup>
import { fetchBusinessDetails } from "@/api/distributor/distributor-details"
import { useRouter } from "vue-router";

import BussinessDetailsTab from "@/components/distributor/BussinessDeatils.vue";
import DistributorDetailsTab from "@/components/distributor/DistributorDetails.vue";
import DeliveryVehicalsAndAgentsTab from "@/components/distributor/DeliveryVehicalsAndAgents.vue";
import LocationTab from "@/components/distributor/Location.vue";

const activeName = ref("business");
const switchValue = ref(true);

let responseData = ref(null)
let header_details = ref({})
let business_details = ref({})
let insurance_details = ref({})
let owner_details = ref({})

let deliveryAgentKPI = ref({})
let deliveryVehicleKPI = ref({})
let serviceAgentKPI = ref({})

const router = useRouter();


//change component afetr calling
const handleClick = (tab, event) => {
  activeName.value = tab.props.name;
  getDistributorDetails(tab.props.name)
};

function getDistributorDetails(tabName) {
  console.log("tabName", tabName, "url", router.currentRoute.value.params.slug)

  if(tabName == "business") {
    
    let id = router.currentRoute.value.params.slug;
    // let id = "ec5daef5-0957-4be7-ab09-954f4f0e34be"

    let paramsQuery = reactive({
      "tab": tabName ? tabName : "business"
    });

    fetchBusinessDetails(id, paramsQuery).then((res)=>{
      if(Object.keys(res.data[0]).length){
        header_details.value = res.data[0].header_details;
        responseData.value = res.data[0];
        business_details.value = res.data[0].business_details;
        insurance_details.value = res.data[0].insurance_details;
      } 

   
    })
    } else if(tabName == "owner") {

      // let id = "c4024125-b5b0-490b-9533-6310d08dac25";
      let id = router.currentRoute.value.params.slug;
      let paramsQuery = reactive({
        "tab": tabName ? tabName : "owner"
      });

      fetchBusinessDetails(id, paramsQuery).then((res)=>{
        if(Object.keys(res.data[0]).length){
          header_details.value = res.data[0].header_details;
          responseData.value = res.data[0];
          owner_details.value = res.data[0].owner_details;
        } 
      })


    } else if(tabName == "employee") {

      console.log("res employee")

      let id = router.currentRoute.value.params.slug;
      // let id = "ec5daef5-0957-4be7-ab09-954f4f0e34be";
      let paramsQuery = reactive({
        "tab": tabName ? tabName : "owner",
        "employee": "delivery_agent"
      });

      fetchBusinessDetails(id, paramsQuery).then((res)=>{
        if(Object.keys(res.data[0]).length){
          header_details.value = res.data[0].header_details;

          deliveryAgentKPI.value = res.data[0].key_performance_indicator.delivery_agent;
          deliveryVehicleKPI.value = res.data[0].key_performance_indicator.delivery_vehicle;
          serviceAgentKPI.value = res.data[0].key_performance_indicator.service_agent;

          console.log(res.data[0])
        } 
      })

    } else if(tabName == "location") {
      console.log("res location")
    } else {
      console.log("Oops something went wrong.....")
    }
  } 


onMounted(() => {
  getDistributorDetails("business")
  
  // distributorName.value = router.currentRoute.value.params.slug;
  // if (router.owner) {
  //   activeName.value = "owner";
  //   delete router.owner;
  // }
});
</script>
<style scoped></style>
