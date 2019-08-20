<template>
    <div class="cart-container">
        <div class="cart-lists">
            <div class="mui-card" v-for="(item, index) in cartLists" :key="item.id">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="changeSelectStatus({'id': item.id, 'val': $store.getters.getGoodsSelected[item.id]})"></mt-switch>
                        <img :src="item.thumb_path" alt="">
                        <div class="info">
                            <h3 class="info-tit">{{ item.title }}</h3>
                            <div class="info-con">
                                <span class="price">￥{{ item.sell_price }}</span>
                                <numbox :id="item.id"></numbox>
                                <a class="remove" href="#" @click="removeGoods(item.id, index)">删除</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="cart-clean">
            <div class="mui-card">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <div class="clean-info">
                            <p>总计（不含运费）</p>
                            <p>已勾选商品<span class="r-color">{{ $store.getters.settleAccounts.counts }}</span>件，总价<span class="r-color">￥{{ $store.getters.settleAccounts.amounts }}</span>元</p>
                        </div>
                        <div class="clean-btn">
                            <mt-button type="danger">去结算</mt-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>      
    </div>
</template> 

<script>
    import numbox from '../subComponents/Shopcart_numbox.vue'

    export default {
        data() {
            return {
                cartLists: [],
                ids: this.$store.getters.getAllGoodsId,
                value: true
            }
        },
        methods: {
            getCartLists() {
                if(this.ids.length > 0) {
                    this.$http.get('api/goods/getshopcarlist/' + this.ids.join(',')).then(result => {
                        if(result.body.status === 0) {
                            this.cartLists = result.body.message
                        }
                    })
                }             
            },
            removeGoods(id, i) {
                if(confirm('您真的狠心要删除吗？')) {
                    this.cartLists.splice(i, 1)
                    this.$store.commit('removeCartById', id)
                }
            },
            changeSelectStatus(obj) {
                this.$store.commit('updateCartSelect', obj)
            }
        },
        created() {
            this.getCartLists()
        },
        components: {
            numbox
        }
    }
</script>

<style lang="scss">
    .cart-container {
        .cart-lists {
            .mui-card-content-inner {
                display: flex;
                justify-content: space-between;
                align-items: center;
                .mint-switch {
                    margin-right: 10px;
                    .mint-switch-input:checked + .mint-switch-core {
                        border-color: #2BDE73;
                        background-color: #2BDE73;
                    }
                }
                img {
                    width: 60px;
                }
                .info {  
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between; 
                    margin-left: 10px;              
                    .info-tit {
                        font-size: 13px;
                        color: #39BAE8;
                    }
                    .info-con {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        .price {
                            font-size: 12px;
                            font-weight: bold;
                            color: #fd5f00;
                        }
                        .mui-numbox {
                            width: 100px;
                            height: 25px;
                            padding: 0 30px 0 30px;
                            .mui-btn {
                                width: 30px;
                            }
                            .mui-input-numbox {
                                color: #ccc;
                            }
                        }
                        .remove {
                            color: #fb3c3c;
                        }
                    }
                }
            }
        }
        .cart-clean {
            .mui-card-content-inner {
                display: flex;
                justify-content: space-between;
                align-items: center;
                .clean-info {
                    p {
                        margin-bottom: 0;
                        line-height: 2;
                        .r-color {
                            color: #fb3c3c;
                        }
                    }
                }
            }
        }
    }
</style>        