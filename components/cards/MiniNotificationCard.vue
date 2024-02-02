<template>
  <div>
    <ul class="dropdown-menu dropdown-menu-end mini_not_box" aria-labelledby="dropdownMenuButton">
      <button class="close_not" @click="navStore.miniNotification = !navStore.miniNotification">
        <i class="ri-close-line"></i>
      </button>

      <div class="box_header">
        <h4>Notification</h4>
        <NuxtLink to="/">Mark all as read</NuxtLink>
      </div>

      <el-tabs v-model="activeName" class="demo-tabs" >
        <!-- all  -->
        <el-tab-pane label="All(10)" name="all">
          <div class="box_inner">
            <div class="box_item active">
              <figure class="user_icon">
                <img src="../../assets/img/logos/mastercard.png" alt="">
              </figure>
              <div class="box_con">
                <p>Approve onboarding request for <a href="#">Yaw graham</a></p>
                <span>5 hrs ago</span>
                <div class="box_act">
                  <button @click="handleViewDialog">Decline</button>
                  <button @click="handleViewDialog" class="accept_btn">Approve</button>
                </div>
              </div>
            </div>
            <div class="box_item active" style="cursor: pointer" @click="handleVerificationOutlet">
              <img class="user_img" src="../../assets/img/team-2.jpg" alt="">
              <div class="box_con">
                <p>Verify distributor outlet</p>
                <span>2 hrs ago</span>
              </div>
            </div>
            <div class="box_item active" >
              <img class="user_img" src="../../assets/img/team-2.jpg" alt="">
              <div class="box_con">
                <p><a href="#">Yaw graham</a> require new stock.</p>
                <span>2 hrs ago</span>
              </div>
            </div>
            <div class="box_item">
              <img class="user_img" src="../../assets/img/team-2.jpg" alt="">
              <div class="box_con">
                <p>Approve onboarding request for <a href="#">New graham</a></p>
                <span>12 jan 2023, 8:00 AM</span>
              </div>
            </div>
            <div class="box_item">
              <img class="user_img" src="../../assets/img/team-2.jpg" alt="">
              <div class="box_con">
                <p><a href="#">Derrick nwafor</a> require new stock.</p>
                <span>8 hrs ago</span>
                <div class="box_act">
                  <button @click="handleViewDialog" >Decline</button>
                  <button @click="handleViewDialog" class="accept_btn">Approve</button>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <!-- pending  -->
        <el-tab-pane label="Pending requests(3)" name="pending">
          <div class="box_inner">
            <div class="box_item active">
              <figure class="user_icon">
                <img src="../../assets/img/logos/mastercard.png" alt="">
              </figure>
              <div class="box_con">
                <p>Approve onboarding request for <a href="#">Yaw graham</a></p>
                <span>5 hrs ago</span>
                <div class="box_act">
                  <button>Decline</button>
                  <button class="accept_btn">Approve</button>
                </div>
              </div>
            </div>
            <div class="box_item active">
              <img class="user_img" src="../../assets/img/team-2.jpg" alt="">
              <div class="box_con">
                <p><a href="#">Yaw graham</a> require new stock.</p>
                <span>2 hrs ago</span>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <!-- stock  -->
        <el-tab-pane label="Stock request(2)" name="stock">
          <div class="box_inner">
            <div class="box_item active">
              <figure class="user_icon">
                <img src="../../assets/img/logos/mastercard.png" alt="">
              </figure>
              <div class="box_con">
                <p>Approve onboarding request for <a href="#">Yaw graham</a></p>
                <span>5 hrs ago</span>
                <div class="box_act">
                  <button>Decline</button>
                  <button class="accept_btn">Approve</button>
                </div>
              </div>
            </div>
            <div class="box_item active">
              <img class="user_img" src="../../assets/img/team-2.jpg" alt="">
              <div class="box_con">
                <p><a href="#">Yaw graham</a> require new stock.</p>
                <span>2 hrs ago</span>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <!-- other  -->
        <el-tab-pane label="Other(2)" name="other">
          <div class="box_inner">
            <div class="box_item active">
              <figure class="user_icon">
                <img src="../../assets/img/logos/mastercard.png" alt="">
              </figure>
              <div class="box_con">
                <p>Approve onboarding request for <a href="#">Yaw graham</a></p>
                <span>5 hrs ago</span>
                <div class="box_act">
                  <button>Decline</button>
                  <button class="accept_btn">Approve</button>
                </div>
              </div>
            </div>
            <div class="box_item active">
              <img class="user_img" src="../../assets/img/team-2.jpg" alt="">
              <div class="box_con">
                <p><a href="#">Yaw graham</a> require new stock.</p>
                <span>2 hrs ago</span>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>

      <div class="box_footer" >
        <NuxtLink @click="handleAllNotification">View all notifications</NuxtLink>
        <!-- <p @click="handleAllNotification">View all notifications</p> -->
      </div>
    </ul>
  </div>
</template>

<script setup>
import { useNavStore } from "@/stores/NavStore";

const navStore = useNavStore();

const activeName = ref("all");

function handleAllNotification() {
  navStore.miniNotification = !navStore.miniNotification
  const router = useRouter();
    router.push("/notification")
}

function handleViewDialog() {
  const router = useRouter();
  router.push("/onboarding/approval-onboarding")
  navStore.miniNotification = !navStore.miniNotification
}

function handleVerificationOutlet() {
  const router = useRouter();
  router.push("/distributor/verify-outlet")
  navStore.miniNotification = !navStore.miniNotification
}

</script>

<style scope>
.mini_not_box {
  right: -20px !important;
}
</style>