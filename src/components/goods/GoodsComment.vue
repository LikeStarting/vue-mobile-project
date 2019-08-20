<template>
    <div class="goods-comments">
        <comment :id="$route.params.id"></comment>
    </div>
</template>

<script>
    import comment from '../subComponents/Comment.vue';
    export default {
        components: {
            comment
        }
    }
</script>

<style lang="scss">
    .goods-comments {
        padding: 0 3%;
    }
</style>