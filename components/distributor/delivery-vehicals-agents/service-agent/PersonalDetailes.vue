<template>
  <div class="main_div">
    <el-row :gutter="30" class="main_row">
      <el-col :xs="24" :sm="24" :md="12" :lg="12">
        <div class="cd_box">
          <h4 class="cd_heading">Personal details</h4>
          <div class="cd_list">
            <div class="cd_item">
              <img :src="Phone" alt="icon" />
              <h4>Phone number:<span>{{ props.data?.personal_details?.phone || "-"}}</span></h4>
            </div>
            <div class="cd_item">
              <img :src="Region" alt="icon" />
              <h4>Region:<span> {{ address.region || "-" }}  </span></h4>
            </div>

            <div class="cd_item">
              <img :src="Email" alt="icon" />
              <h4>Email:<span>{{ props.data?.personal_details?.email || "-"}}</span></h4>
            </div>
            <br>

            <div class="cd_item">
              <img :src="Location" alt="icon" />
              <h4>Address:<span> {{ `${address.area || "-"},${address.street || ""},${address.post_code || ""}` }} </span></h4>
            </div>
            
            <br />
            <div class="cd_item">
              <img :src="District" alt="icon" />
              <h4>District:<span>{{address.district || "-"}}</span></h4>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12">
        <div class="cd_box" v-if="document.name">
          <h4 class="cd_heading">Uploaded documents</h4>
          <div class="up_doc">
            <div class="doc_item">
              <img :src="document.front_document_url" alt="image" @error="handleImageError('front')"/>
              <img v-if="document.name == 'ghana card'" :src="document.back_document_url" alt="image" @error="handleImageError('back')"/>
              <h4>
                <span class="text-uppercase">{{document.name}}</span>
                Uploaded on {{ document.created_at }}
              </h4>
              <template v-if="document">
                <div :class="document.is_verified_by_admin ? 'verify_success' : 'verify_pending'">
                  <i class="ri-check-line" v-if="document.is_verified_by_admin"></i>{{ document.is_verified_by_admin ? 'Verified Successfully' : 'Verification Pending' }}
                </div>
              </template>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import District from "@/assets/svg/district.svg";
import Email from "@/assets/svg/email.svg";
import Location from "@/assets/svg/location.svg";
import Region from "@/assets/svg/region.svg";
import Phone from "@/assets/svg/phone.svg";
import { useNavStore } from "@/stores/NavStore";
const navStore = useNavStore();


const props = defineProps({
  data:{
    default:{},
    type:Object,
    required: true
  }
});

const address = ref({});
const document = ref({})

watch(props,async()=>{
  address.value = props.data?.personal_details?.address[0] || {};
  const docs = await getDocuments();
  const name = docs?.name.split("_").join(" ");
  const created_at = docs?.created_at.split("T")[0].split("-").join("/");
  document.value = {...docs,name,created_at};
});

async function getDocuments(){
  const documents = await props.data.documents;
  const filteredDoc = documents.filter(e => e.name == 'ghana_card')[0] || documents[0]
  return filteredDoc
}

function handleImageError(type){
  if( type === 'front'){
    document.value.front_document_url = "https://iconspng.com/uploads/id-card/id-card.png";
  }
  if( type === 'back'){
    document.value.back_document_url = "https://iconspng.com/uploads/id-card/id-card.png";
  }
}



onMounted(() => {
  navStore.setBreadCrumbs(
    "Distributor / Delivery vehicles & agents / Service agents / Personal details"
  );
});
</script>

<style lang="scss" scoped>
.cd_box {
  min-height: calc(100vh - 245px);
}

.cd_heading {
  text-transform: capitalize;
}

.main_div {
  margin-top: 40px;
}

@media (max-width: 992px) {
  .main_row {
    gap: 30px;
  }

  .cd_box {
    min-height: auto;
  }
}
</style>
