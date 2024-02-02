<template>
    <section class="onboarding_wrap">
        <h3 class="ob_title">Approval onboarding</h3>
        <div class="ob_box w768">
            <div class="prof_header">
                <img src="../../../assets/img/team-3.jpg" alt="">
                <div class="prof_con">
                    <h4>Yaw graham</h4>
                    <p>Admin</p>
                </div>
            </div>
            <div class="prof_info">
                <el-row>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <ul>
                            <li><span>Full Name:</span>Yaw graham</li>
                            <li><span>Phone number:</span>9987654321</li>
                            <li><span>Email:</span>dummy@gmaiil.com</li>
                            <li><span>Date of Birth</span>2023/11/15</li>
                            <li><span>Address:</span>GL-044-1541, second rangoon close elwak stadium, la dade kotopon</li>
                        </ul>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <p>Voter's ID</p>
                        <img class="id_img" src="@/assets/img/vr-bg.jpg" alt="" />
                    </el-col>
                </el-row>
            </div>
            <div class="prof_footer">
                <button class="btn btn-default" @click="handleDeclineDialog">Decline</button>
                <button class="btn btn-primary" @click="handleApprove">Approve</button>
            </div>
        </div>

        <DeclineDialog :dialogVisible="dialogVisible" :form-data="formData" @getChildFormData="handleChildFormData($event)"
            @childClose="handleChildClose()" />
    </section>
</template>

<script setup>
import DeclineDialog from "@/pages/onboarding/dialog-box/DeclineDialgo"
let dialogVisible = ref(false)
var formData = reactive({
    name: ''
})

// open dialog 
function handleDeclineDialog() {
    dialogVisible.value = true
}

// close dialog 
function handleChildClose() {
    dialogVisible.value = false
}

// submit decline form data 
function handleChildFormData(data) {
    console.log(data)
    dialogVisible.value = false
    const router = useRouter();
    router.push("/notification")
}

// submit approv form data 
function handleApprove() {
    const router = useRouter();
    router.push("/notification")
}

</script>