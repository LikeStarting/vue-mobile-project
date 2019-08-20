<template>
    <div class="mui-numbox" data-numbox-min='1' data-numbox-max='maxQuantity'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" ref="numbox" @change="ChangeValue"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
    import mui from '../../lib/mui/js/mui.min'

    export default {
        methods: {
            ChangeValue() {               
                this.$emit('func', parseInt(this.$refs.numbox.value))
            }
        },
        mounted() {
            // console.log(this.maxQuantity)------undefined
            mui('.mui-numbox').numbox()
        },
        watch: {
            maxQuantity: function(newVal, oldVal) {
                mui('.mui-numbox').numbox().setOption('max', newVal)
            }
        },
        props: ['maxQuantity']
    }
</script>

<style lang="scss">
    
</style>