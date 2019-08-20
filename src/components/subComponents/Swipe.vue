<template>
    <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in swipeLists" :key="item.id">
            <img :src="item[imgUrl]" :class="{full: isFull}">
        </mt-swipe-item>
    </mt-swipe>
</template>

<script>
    export default {
        props: ['swipeLists', 'imgUrl', 'isFull']
    }
</script>

<style lang="scss">
    .mint-swipe {
        .mint-swipe-item {
            text-align: center;
            img {
                height: 100%;
            }
        }       
    }
    .full {
        width: 100%;
    }
</style>