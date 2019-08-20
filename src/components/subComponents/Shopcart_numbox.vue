<template>
    <div class="mui-numbox" data-numbox-min='1' data-numbox-max='9'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" readonly :value="this.$store.getters.getGoodsIdCounts[id]" ref="numbox" @change="ChangeValue"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
    import mui from '../../lib/mui/js/mui.min'

    export default {
        methods: {
            ChangeValue() {               
                this.$store.commit('updateCartCounts', {
                    id: this.id,
                    counts: this.$refs.numbox.value
                })
            }
        },
        mounted() {
            console.log(this.$store.getters.getGoodsIdCounts)
            mui('.mui-numbox').numbox()
        },
        props: ['id']
    }
</script>

<style lang="scss">
    
</style>