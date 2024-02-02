<template>
  <div class="ftree_box" :class="new_parent ? '' : ''">
    <div v-if="props.data && props.data.length > 0">
      <div class="ftree_item"  v-for="item in  props.data" :key="item.id">
        <i :class="activeTree == item.id && active ? 'ri-arrow-right-s-fill active' : 'ri-arrow-right-s-fill'"
          @click="handleOpenTree(item.id)" :key="item.id"></i>
        <div class="check_box">
          <input type="checkbox" v-if="props.checkBox"
            :checked="(props.defaultCheckBox.includes(item.id) || parentId.includes(item.id)) ? true : false"
            @click="handleParentInputCheckBox(item.id, item.children)">
          <span class="check_tick"></span>
          <span class="half_tick" v-if="halfActiveTree.includes(item.id)"></span>
        </div>
        <span class="item_name">{{ item.label }}</span>
        <div v-if="item.children && active && activeTree == item.id">
          <TreeList :treeList="item.children" :checkBox="props.checkBox" :defaultCheckBox="checkBoxData"
            :parent_id="item.id" @handleParentCheckBox="handleParentCheckBox"
            @handleChildCheckBoxList="handleChildCheckBoxList" />
        </div>
      </div>
    </div>
   
    <div class="ftree_item">
      <i :class="date.active ? 'ri-arrow-right-s-fill active' : 'ri-arrow-right-s-fill'" @click="handleDate('act')"></i>
      <div class="check_box">
        <input type="checkbox" @change="handleDate('check')" :checked="date.checked">
        <span class="check_tick"></span>
      </div>
      <span class="item_name">Date</span>
      <div>
        <el-date-picker v-model="date.value" type="daterange" range-separator="To" start-placeholder="Start date"
          end-placeholder="End date" @change="handleDate('date')" v-if="date.active" />
      </div>
    </div>
    <div class="ftree_action">
      <button @click="uiStore.updateStateValue('showFilterBar',false)" class="btn btn-default">Clear</button>
      <button @click="uiStore.updateStateValue('showFilterBar',false)" class="btn btn-primary">Apply</button>
    </div>
  </div>
</template>


<script setup>
import { useUIStore } from "@/stores/uiStore";
import TreeList from './TreeList.vue';
const uiStore = useUIStore();

const activeTree = ref(0);
const active = ref(false);
const halfActiveTree = ref([]);
const parentId = ref([]);
const checkBoxData = ref([]);
const date = reactive({
  checked: false,
  value: "",
  active: false
})
const props = defineProps({
  checkBox: {
    required: true,
    default: true
  },
  data: {
    required: true,
    type: Array
  },
  new_parent: {
    required: false,
    default: false,
    type: Boolean
  },
  defaultCheckBox: {
    required: false,
    type: Array,
    default: []
  },
});
function handleChildCheckBoxList(data) {
  //  console.log(checkBoxData.value)
  //  console.log("point1")
}
function handleDate(status) {
  if (status === "act") {
    date.active = !date.active
    if (date.active) {
      active.value = false;
    }
  }
  if (status === 'check') {
    date.checked = !date.checked
  }
  if (status === 'date') {
    if (date.value) {
      date.checked = true;
    }
  }
  handleParentInputCheckBox()
}
function handleOpenTree(id) {
  if (activeTree.value == id) {
    active.value = !active.value;
    date.active = false;
  } else {
    activeTree.value = id;
    active.value = true;
    date.active = false;
    if (halfActiveTree.value.includes(id)) {
      const index = halfActiveTree.value.indexOf(id);
      halfActiveTree.value.splice(index, 1)
    }
  };

}
function handleParentInputCheckBox(id, data) {
  if (parentId.value.includes(id)) {
    const index = parentId.value.indexOf(id);
    parentId.value.splice(index, 1);
    if (data) {
      data.map((e) => {
        if (checkBoxData.value.includes(e.id)) {
          const index = checkBoxData.value.indexOf(e.id);
          checkBoxData.value.splice(index, 1)
        }
      })
    };
  } else {
    parentId.value.push(id);
    if (halfActiveTree.value.includes(id)) {
      const index = halfActiveTree.value.indexOf(id);
      halfActiveTree.value.splice(index, 1)
    }
    if (data) {
      data.map((e) => {
        if (!checkBoxData.value.includes(e.id)) {
          checkBoxData.value.push(e.id)
        }
      })
    }
  }
  if (checkBoxData.value || date.checked) {
    const data = {
      date: date.checked ? date.value : '',
      filterList: checkBoxData.value
    }
    console.log(data)
  }
  console.log("point2")
}
function handleParentCheckBox(data) {
  if (data.status) {
    if (parentId.value.includes(data.id)) {
      return
    } else {
      parentId.value.push(data.id)
    }
  } else {
    if (parentId.value.includes(data.id)) {
      let index = parentId.value.indexOf(data.id);
      parentId.value.splice(index, 1)
    } else {
    }
  };
  checkBoxData.value = data.defaultCheckBox
  if (checkBoxData.value) {
    if (data.childList.length > 0 && data.childList.length < data.totalLength) {
      if (!halfActiveTree.value.includes(data.id)) {
        halfActiveTree.value.push(data.id)
      }
    } else {
      if (halfActiveTree.value.includes(data.id)) {
        const index = halfActiveTree.value.indexOf(data.id);
        halfActiveTree.value.splice(index, 1)
      }
    }
  }
  if (checkBoxData.value || date.checked) {
    const data = {
      date: date.checked ? date.value : '',
      filterList: checkBoxData.value
    }
    console.log(data)
  }
  console.log("point3")
}
function handleDateActive() {
  date.active = !date.active;
  console.log(date.active)
}
onMounted(() => {
  // console.log(props.data)
})


</script>

<style scoped></style>