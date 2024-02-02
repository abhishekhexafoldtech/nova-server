<template>
    <div class="blank_box" ref="empty_items">
        <div class="box_inner">
            <img :src="icon" alt="">
            <h4>{{ heading }}</h4>
            <p>{{ description }}</p>
            <button class="btn btn-primary" @click="doSomething" v-if="button">
                {{ button }}
            </button>
        </div>
    </div>
</template>
<script setup>
const height = ref(0);
const padding_top = ref(100);
const emit = defineEmits();
defineProps({
    heading: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    button: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
});
function doSomething() {
    emit("doSomething")
};

</script>
<style scoped lang="scss">
.blank_box {
    background-color: var(--white);
    padding: 15px;
    margin-top: 45px;
    margin-left: 15px;
    min-height: calc(100vh - 120px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .box_inner {
        text-align: center;
        width: 100%;
        max-width: 280px;

        img {
            width: 185px;
            height: 185px;
            object-fit: contain;
            object-position: center;
            margin-bottom: 20px;
        }

        h4 {
            color: var(--black);
            font-size: 28px;
            font-weight: 700;
            line-height: 36px;
            letter-spacing: -0.8px;
            margin: 0;
            margin-bottom: 15px;
        }

        p {
            color: var(--grey);
            font-size: 18px;
            font-weight: 400;
            line-height: 24px;
            letter-spacing: -0.8px;
            margin: 0;
        }

        button {
            margin: 0;
            margin-top: 40px;
            color: var(--white);
            font-size: 14px;
            font-weight: 700;
            line-height: 21px;
            min-width: 230px;
        }
    }
}
</style>