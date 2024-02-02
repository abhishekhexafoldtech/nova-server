<template>
  <div class="container-area">
    <el-row :gutter="30">
      <el-col :xs="24" :sm="24" :md="12" :lg="12">
        <div class="cd_box">
          <h4 class="cd_heading">Vehicle Details</h4>
          <div class="cd_list">
            <div class="cd_item">
              <h4 class="p-0">Vehicle Name:<span>Mini truck</span></h4>
            </div>
            <div class="cd_item">
              <h4 class="p-0">Model:<span>Mini12</span></h4>
            </div>
            <div class="cd_item">
              <h4 class="p-0">Vehicle Id:<span>101</span></h4>
            </div>
            <div class="cd_item">
              <h4 class="p-0">Color:<span>Black</span></h4>
            </div>
            <div class="cd_item">
              <h4 class="p-0">Passing number:<span>GH02774</span></h4>
            </div>
            <div class="cd_item">
              <h4 class="p-0">Year of make:<span>2020</span></h4>
            </div>
            <div class="cd_item">
              <h4 class="p-0">Capacity:<span>710kg</span></h4>
            </div>
            <div class="cd_item">
              <h4 class="p-0">Registration number:<span>12361</span></h4>
            </div>
            <div class="cd_item">
              <h4 class="p-0">Join date:<span>2020/12/15</span></h4>
            </div>
          </div>

          <div class="mt-5 pt-2">
            <h4 class="cd_heading">Road worthy</h4>
            <div class="cd_list">
              <div class="cd_item">
                <h4 class="p-0">Expiry date:<span>2023/12/15</span></h4>
              </div>
            </div>
            <div class="up_doc mt-4">
              <div class="doc_item">
                <img src="@/assets/img/card-visa.jpg" alt="image" />
                <h4>
                  <span>Front side</span>
                  Uploaded on 11/08/2023
                </h4>
              </div>
              <div class="doc_item">
                <img src="@/assets/img/card-visa.jpg" alt="image" />
                <h4>
                  <span>Back side</span>
                  Uploaded on 11/08/2023
                </h4>
              </div>
            </div>
          </div>

          <div class="mt-5 pt-2">
            <h4 class="cd_heading">Assigned delivery agent</h4>
            <div class="del_rating">
              <img src="@/assets/img/team-3.jpg" alt="image" />
              <div class="del_con">
                <h4>Laryea Adolphus</h4>
                <p>Id: <span>101</span></p>
                <ul>
                  <li class="fill"><i class="ri-star-s-fill"></i><i class="ri-star-s-line"></i></li>
                  <li class="fill"><i class="ri-star-s-fill"></i><i class="ri-star-s-line"></i></li>
                  <li class="fill"><i class="ri-star-s-fill"></i><i class="ri-star-s-line"></i></li>
                  <li class="fill"><i class="ri-star-s-fill"></i><i class="ri-star-s-line"></i></li>
                  <li><i class="ri-star-s-fill"></i><i class="ri-star-s-line"></i></li>
                  <li>({{ data.rating }})</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </el-col>

      <el-col :xs="24" :sm="24" :md="12" :lg="12">
        <div class="cd_box">
          <h4 class="cd_heading">Insurance details</h4>
          <div class="cd_list">
            <div class="cd_item">
              <h4 class="p-0">Company:<span>Unique Insaurance</span></h4>
            </div>
            <div class="cd_item">
              <h4 class="p-0">Policy number:<span>AS12334</span></h4>
            </div>
            <div class="cd_item">
              <h4 class="p-0">Expiry date:<span>2023/12/15</span></h4>
            </div>
          </div>
          <div class="up_doc mt-4">
            <div class="doc_item">
              <img src="@/assets/img/card-visa.jpg" alt="image" />
              <h4>
                <span>Front side</span>
                Uploaded on 11/08/2023
              </h4>
            </div>
            <div class="doc_item">
              <img src="@/assets/img/card-visa.jpg" alt="image" />
              <h4>
                <span>Back side</span>
                Uploaded on 11/08/2023
              </h4>
            </div>
          </div>
          <div class="mt-5 pt-2">
            <h4 class="cd_heading">Vehicle Image</h4>
            <div class="up_doc">
              <div class="doc_item">
                <img src="@/assets/img/card-visa.jpg" alt="image" />
                <h4>
                  <span>Front side</span>
                  Uploaded on 11/08/2023
                </h4>
              </div>
              <div class="doc_item">
                <img src="@/assets/img/card-visa.jpg" alt="image" />
                <h4>
                  <span>Back side</span>
                  Uploaded on 11/08/2023
                </h4>
              </div>
              <div class="doc_item">
                <img src="@/assets/img/card-visa.jpg" alt="image" />
                <h4>
                  <span>Side 1</span>
                  Uploaded on 11/08/2023
                </h4>
              </div>
              <div class="doc_item">
                <img src="@/assets/img/card-visa.jpg" alt="image" />
                <h4>
                  <span>Side 2</span>
                  Uploaded on 11/08/2023
                </h4>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import {onMounted} from 'vue'
import { useNavStore } from "@/stores/NavStore";
const navStore = useNavStore();
const vehicleDetails = ref([
  {
    label: "Vehicle Name",
    value: "Mini truck",
  },
  {
    label: "Model",
    value: "Mini12",
  },
  // Add other vehicle details here
]);

const roadWorthyDetails = ref([
  {
    label: "Expiry date",
    value: "2023/12/15",
  },
]);

const images = ref([
  {
    type: "Front side",
    src: "@/assets/img/card-visa.jpg",
    uploadDate: "11/08/2023",
  },
  {
    type: "Back side",
    src: "@/assets/img/card-visa.jpg",
    uploadDate: "11/08/2023",
  },
  // Add other images here
]);

const assignedAgent = ref({
  name: "Laryea Adolphus",
  id: 101,
  rating: 4,
});

const data = reactive({
  rating: 4,
});
const ratingStyle = computed(() => {
  return `width:${data.rating * 2 * 10}%`;
});

onMounted(()=>{
  navStore.setBreadCrumbs('Distributor / Delivery vehicles & agents / Delivery vehicles ')
})
</script>
  
<style lang="scss" scoped>
.cd_box {
  font-family: Montserrat;

  h5 {
    color: var(--black);
  }
}

.del_rating {
  width: 100%;
  max-width: 300px;
  border: 1px solid #D8D8D8;
  background: var(--white);
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.25);
  padding: 10px 15px;

  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
    display: inline-block;
  }

  .del_con {
    display: inline-block;
    vertical-align: middle;
    width: calc(100% - 50px);
    padding-left: 20px;

    h4 {
      font-size: 15px;
      font-weight: 600;
      line-height: normal;
      margin: 0;
      letter-spacing: 0;
    }

    p {
      color: #7B809A;
      font-size: 13px;
      font-weight: 400;
      line-height: normal;
      margin: 6px 0;

      span {
        font-weight: 600;
        color: var(--black);
      }
    }

    ul {
      padding-inline-start: 0;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 3px;

      li {
        display: block;
        line-height: 20px;
        color: var(--black);

        i {
          font-size: 20px;
          color: #FF7A00;

          &.ri-star-s-fill {
            display: none;
          }
        }

        &.fill {
          .ri-star-s-fill {
            display: block;
          }

          .ri-star-s-line {
            display: none;
          }
        }

        &:last-child {
          font-size: 14px;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
  