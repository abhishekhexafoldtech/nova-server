<template>
    <Tree :data="data" />
</template>

<script setup>
import Tree from "@/components/tables/Tree.vue";

const data = [
    {
        id: 1,
        label: 'Zone',
        children: [
            {
                id: 1.1,
                label: "Northen"
            },
            {
                id: 1.2,
                label: "Western"
            }
        ],
    },
    {
        id: 2,
        label: 'Sub zone',
        children: [
            {
                id: 2.2,
                label: 'N12',
            },
            {
                id: 2.3,
                label: 'W12',
            },
        ],
    },
    {
        id: 3,
        label: 'Status',
        children: [
            {
                id: 3.1,
                label: 'Active',
            },
            {
                id: 3.2,
                label: 'Inactive',
            },
        ],
    },
    {
        id: 4,
        label: 'Distributor name',
        children: [
            {
                id: 4.1,
                label: 'Yaw Graham',
            },
            {
                id: 4.2,
                label: 'Derric Nwafor',
            },
            {
                id: 4.3,
                label: 'Yaw Graham',
            },
            {
                id: 4.4,
                label: 'Derric Nwafor',
                
            },
            
        ],
    },
]
</script>