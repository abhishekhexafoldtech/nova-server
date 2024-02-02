<template>
    <section class="edit_mang_wrap">
        <div class="mang_inner">
            <div class="mang_title">
                <h3>{{currentRouteName}} Role</h3>
            </div>
            <el-form :model="newRoleForm" ref="formRef" :rules="newRoleFormRules">
                <p class="sec_subtitle mb-2">Role Name</p>
                <div class="fieldrow w455 mar15">
                    <el-form-item prop='name'>
                        <el-input v-model="newRoleForm.name" placeholder="Role Name" />
                    </el-form-item>
                </div>
                <!-- <div class="perm_sec">
                    <p class="sec_subtitle">Set Permissions</p>
                    <div class="perm_table">
                        <table class="table table-responsive">
                            <thead>
                                <tr>
                                    <th>Module</th>
                                    <th>Permission</th>
                                    <th>Assign</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td rowspan="3"><b>Dashboard</b></td>
                                    <td class="border_left">View</td>
                                    <td><el-checkbox v-model="checked1" /></td>
                                </tr>
                                <tr>
                                    <td class="border_left">Can see own data</td>
                                    <td><el-checkbox v-model="checked1" /></td>
                                </tr>
                                <tr class="border_bottom">
                                    <td class="border_left">Can see others data</td>
                                    <td><el-checkbox v-model="checked1" /></td>
                                </tr>
                                <tr>
                                    <td rowspan="4"><b>Customer</b></td>
                                    <td class="border_left">View all customer(Including added by others)</td>
                                    <td><el-checkbox v-model="checked1" /></td>
                                </tr>
                                <tr>
                                    <td class="border_left">View only customer added by you</td>
                                    <td><el-checkbox v-model="checked1" /></td>
                                </tr>
                                <tr>
                                    <td class="border_left">Edit</td>
                                    <td><el-checkbox v-model="checked1" /></td>
                                </tr>
                                <tr class="border_bottom">
                                    <td class="border_left">Delete</td>
                                    <td><el-checkbox v-model="checked1" /></td>
                                </tr>
                                <tr>
                                    <td rowspan="6"><b>Distributor</b></td>
                                    <td class="border_left">View</td>
                                    <td><el-checkbox v-model="checked1" /></td>
                                </tr>
                                <tr>
                                    <td class="border_left">Can add new distributor</td>
                                    <td><el-checkbox v-model="checked1" /></td>
                                </tr>
                                <tr>
                                    <td class="border_left">Can edit details of any distributor</td>
                                    <td><el-checkbox v-model="checked1" /></td>
                                </tr>
                                <tr>
                                    <td class="border_left">Can edit details of distributor added by them</td>
                                    <td><el-checkbox v-model="checked1" /></td>
                                </tr>
                                <tr>
                                    <td class="border_left">Can delete any distributor</td>
                                    <td><el-checkbox v-model="checked1" /></td>
                                </tr>
                                <tr class="border_bottom">
                                    <td class="border_left">Can delete distributor added by them</td>
                                    <td><el-checkbox v-model="checked1" /></td>
                                </tr>
                                <tr>
                                    <td rowspan="6"><b>Transactions</b></td>
                                    <td class="border_left">Can view all transactions</td>
                                    <td><el-checkbox v-model="checked1" /></td>
                                </tr>
                                <tr>
                                    <td class="border_left">Can view only their transactions</td>
                                    <td><el-checkbox v-model="checked1" /></td>
                                </tr>
                                <tr>
                                    <td class="border_left">Can provide refunds</td>
                                    <td><el-checkbox v-model="checked1" /></td>
                                </tr>
                                <tr>
                                    <td class="border_left">Can request for remaining payments</td>
                                    <td><el-checkbox v-model="checked1" /></td>
                                </tr>
                                <tr>
                                    <td class="border_left">Download receipts of transactions</td>
                                    <td><el-checkbox v-model="checked1" /></td>
                                </tr>
                                <tr class="border_bottom">
                                    <td class="border_left">Download receipts of your transactions only</td>
                                    <td><el-checkbox v-model="checked1" /></td>
                                </tr>
                                <tr>
                                    <td rowspan="5"><b>Complaints</b></td>
                                    <td class="border_left">Can view all complaints</td>
                                    <td><el-checkbox v-model="checked1" /></td>
                                </tr>
                                <tr>
                                    <td class="border_left">Can view complaints related to them</td>
                                    <td><el-checkbox v-model="checked1" /></td>
                                </tr>
                                <tr>
                                    <td class="border_left">Can take action on all complaints</td>
                                    <td><el-checkbox v-model="checked1" /></td>
                                </tr>
                                <tr>
                                    <td class="border_left">Can take actions on complaints related to them</td>
                                    <td><el-checkbox v-model="checked1" /></td>
                                </tr>
                                <tr class="border_bottom">
                                    <td class="border_left">Can transfer complaints to other admin</td>
                                    <td><el-checkbox v-model="checked1" /></td>
                                </tr>
                                <tr>
                                    <td rowspan="5"><b>Support system</b></td>
                                    <td class="border_left">Handling general queries</td>
                                    <td><el-checkbox v-model="checked1" /></td>
                                </tr>
                                <tr>
                                    <td class="border_left">Handling complaints coming to support team</td>
                                    <td><el-checkbox v-model="checked1" /></td>
                                </tr>
                                <tr>
                                    <td class="border_left">Promotional updates</td>
                                    <td><el-checkbox v-model="checked1" /></td>
                                </tr>
                                <tr>
                                    <td class="border_left">Handling support team</td>
                                    <td><el-checkbox v-model="checked1" /></td>
                                </tr>
                                <tr class="border_bottom">
                                    <td class="border_left">Handling product and technical issues</td>
                                    <td><el-checkbox v-model="checked1" /></td>
                                </tr>
                                <tr>
                                    <td rowspan="4"><b>Delivery agents</b></td>
                                    <td class="border_left">Can view all delivery agents</td>
                                    <td><el-checkbox v-model="checked1" /></td>
                                </tr>
                                <tr>
                                    <td class="border_left">Can view delivery agents added by them</td>
                                    <td><el-checkbox v-model="checked1" /></td>
                                </tr>
                                <tr>
                                    <td class="border_left">Can edit details of all agents</td>
                                    <td><el-checkbox v-model="checked1" /></td>
                                </tr>
                                <tr>
                                    <td class="border_left">Can edit details of agents added by them</td>
                                    <td><el-checkbox v-model="checked1" /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div> -->
                <div class="perm_footer" >
                    <el-button class="btn btn-default" @click="handleCancel()">Cancel</el-button>
                    <el-button class="btn btn-primary" @click="submitForm(formRef)">Save</el-button>
                </div>

            </el-form>
        </div>
    </section>
</template>



<script setup>
import { store, edit, update } from "@/api/role.js"
import { flashNotification } from "@/composables/useNotification.js"
import {selectBoxRule,nameRule} from '@/rules/all-rules'
const newRoleForm = reactive({
    id: null,
    name: null,
});
const newRoleFormRules = reactive({
    name: nameRule("role name"),
});
const formRef = ref();

//get dynamic url name
const currentRouteName = computed(() => {
  const route = useRoute();
  const file = route.path.split("/").slice(-1)[0];
  const name = file.split("_");
  const fulllRouteName = name[0].charAt(0).toUpperCase() + name[0].slice(1);
  console.log(name[0])
  if(name[0] == 'edit') {
    fetch(name[1])
  }
  return fulllRouteName;
});

// edit data 
function fetch(id) {
    edit(id).then((response) => {
        newRoleForm.name = response.data.name
        newRoleForm.id = response.data.id
    });
}

// validate 
const validate = () => {
    if (!newRoleForm.name.length) { return false };
    return true;
}

// handle form submit 
const submitForm = (formEl) => {
    if (!formEl) { return };
    formEl.validate((valid) => {
        if (valid && validate()) {
            let formData = {
                id: newRoleForm.id,
                name: newRoleForm.name,
                description: newRoleForm.name
            }
          if(currentRouteName.value == 'Edit') {
            update(formData.id, formData).then((response => {
                console.log(response)
                flashNotification('success', 'Role Updated successfully')
                navigateTo("/onboarding")
            }))
          } else if(currentRouteName.value == 'Add') {
            store(formData).then((response => {
                console.log(response)
                flashNotification('success', 'Role Added successfully')
                navigateTo("/onboarding")
            }))
          }
        } else {
            flashNotification('warning', 'Please fill required fields')
            return false
        }
    })
}

// handle cancle form submit 
const handleCancel = () => {
    navigateTo("/onboarding")
}

// route back
onBeforeRouteLeave((to, from, next) => {
    const router = useRouter();
    router.previousRoute = 'role'
    next();
});

</script>
