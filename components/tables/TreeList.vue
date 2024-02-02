<template>
    <div v-if="treeList.length > 0">
        <div v-for="node in  childList" :key="node.id" class="ftree_item">
            <div class="check_box">
                <input type="checkbox" id="checkBox" v-if="checkBox"
                    :checked="props.defaultCheckBox.includes(node.id) ? true : false"
                    @change="handleChildCheckBox(node.id)" />
                <span class="check_tick"></span>
            </div>
            <span class="item_name">{{ node.label }}</span>
            <div v-if="node.children" class="mx-3">
                <!-- <Tree :data="node.children" :new_parent="true"/> -->
            </div>
        </div>
        <span class="btn_see_all" v-if="seeall" @click="handleSeeAll">See All</span>
    </div>
</template>

<script setup>
import Tree from "./Tree.vue";
const childCheckBoxList = ref([]);
const childList = ref([])
const seeall = ref(false)
const props = defineProps(
    {
        treeList: {
            required: true,
            type: Array
        },
        checkBox: {
            required: false,
            default: false
        },
        defaultCheckBox: {
            required: false,
            type: Array
        },
        parent_id: {
            required: true,
            default: ""
        }
    }
);
const emit = defineEmits();
function handleChildCheckBox(id) {
    if (props.defaultCheckBox.includes(id)) {
        props.childCheckBox = false;
        let index = props.defaultCheckBox.indexOf(id);
        props.defaultCheckBox.splice(index, 1)
    } else {
        props.defaultCheckBox.push(id);
    }
    handleCheckBox();
};

function handleCheckBox() {
    // if child check box is true that means every child element is checked so we are pushing every id ti child checkboxlist
    if (props.childCheckBox) {
        props.treeList.map((e) => {
            childCheckBoxList.value.push(e.id)
        })
    } else {
        childCheckBoxList.value = []
    };
    // tree conatins any checkbox element it is pushing it into the childcheckboxlist
    props.treeList.map((e) => {
        if (props.defaultCheckBox.includes(e.id)) {
            if (!childCheckBoxList.value.includes(e.id)) {
                childCheckBoxList.value.push(e.id)
            }
        }
    });
    // aasigning parent check to true if all the childs are checked
    if (props.treeList.length == childCheckBoxList.value.length) {
        const data = {
            id: props.parent_id,
            status: true,
            defaultCheckBox: props.defaultCheckBox,
            childList: childCheckBoxList.value,
            totalLength: props.treeList.length
        }
        emit("handleParentCheckBox", data)
    } else {
        const data = {
            id: props.parent_id,
            status: false,
            defaultCheckBox: props.defaultCheckBox,
            childList: childCheckBoxList.value,
            totalLength: props.treeList.length
        }
        emit("handleParentCheckBox", data)
    };
    const checklist = {};
    checklist.id = props.parent_id;
    checklist.children = childCheckBoxList.value;
}
function handleSeeAll() {
    childList.value = props.treeList
    seeall.value = false;
}

onMounted(() => {
    if (props.treeList.length > 3) {
        for (let i = 0; i < 3; i++) {
            childList.value.push(props.treeList[i])
        }
        seeall.value = true;
    }
    else {
        childList.value = props.treeList
    }
    handleCheckBox();
})
</script>