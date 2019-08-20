<template>
    <div class="goodsinfo-container">
        <div class="mui-card photos-show">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swipe :swipeLists="goodsSwipes" :imgUrl="'src'" :isFull="false"></swipe>
                </div>
            </div>
        </div>

        <div class="mui-card goods-cart">
            <div class="mui-card-header">购物车</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <div class="price">
                        <span class="m">市场价：<i>￥{{ goodsInfo.market_price }}</i></span>
                        <span class="s">销售价：<i>￥{{ goodsInfo.sell_price }}</i></span>
                    </div>
                    <div class="quantity">
                        <div>
                            购买数量：
                            <numbox :maxQuantity="goodsInfo.stock_quantity" @func="getSelectedCount"></numbox>
                        </div>
                    </div>
                    <div class="operate-btn">
                        <mt-button type="primary" size="small">立即结算</mt-button>
                        <mt-button type="danger" size="small"  @click="addToCart">加入购物车</mt-button>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="mui-card goods-desc">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{ goodsInfo.goods_no }}</p>
                    <p>上架时间：{{ goodsInfo.add_time | dateFormat }}</p>
                    <p>库存剩余：{{ goodsInfo.stock_quantity }}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="danger" plain @click="toGoodsDesc(goodsInfo.id)">图文介绍</mt-button>
                <mt-button type="primary" plain @click="toGoodsComment(goodsInfo.id)">商品评论</mt-button>
            </div>
        </div>
        <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <div class="goods-ball" v-show="ballFlag" ref="ball"></div>     
        </transition>
    </div>
</template>

<script>
    import swipe from '../subComponents/Swipe.vue'
    import numbox from '../subComponents/Goodsinfo_numbox.vue'

    export default {
        data() {
            return {
                goodsId: this.$route.params.id,
                goodsSwipes: [],
                goodsInfo: {},
                ballFlag: false,
                selectedCount: 1
            }
        },
        methods: {
            getGoodsSwipe() {
                this.$http.get('api/getthumimages/' + this.goodsId).then(result => {
                    if(result.body.status === 0) {
                        this.goodsSwipes = result.body.message
                    }
                })
            },
            getGoodsInfo() {
                this.$http.get('api/goods/getinfo/' + this.goodsId).then(result => {
                    if(result.body.status === 0) {
                        this.goodsInfo = result.body.message[0]
                    }
                })
            },
            toGoodsDesc(id) {
                this.$router.push({
                    path: `/home/goodsdesc/${ this.goodsId }`
                })
            },
            toGoodsComment(id) {
                this.$router.push({
                    path: `/home/goodscomment/${ this.goodsId }`
                })
            },
            getSelectedCount(count) {
                this.selectedCount = count
                // console.log(this.selectedCount)
            },
            addToCart() {
                // 加入购物车
                this.ballFlag = !this.ballFlag

                let cartGoods = {
                    id: this.goodsId,
                    counts: this.selectedCount,
                    price: this.goodsInfo.sell_price,
                    selected: true
                }
                this.$store.commit('addToCart', cartGoods)
            },
            beforeEnter(el) {               
                el.style.transform = 'translate(0, 0)'
            },
            enter(el, done) {
                const ballPosition = this.$refs.ball.getBoundingClientRect()
                const badgePosition = document.getElementById('badge').getBoundingClientRect()
                const ballX = badgePosition.left - ballPosition.left
                const ballY = badgePosition.top - ballPosition.top

                el.offsetWidth;
                el.style.transition = 'all 0.5s cubic-bezier(1,-0.64,.83,.67)'
                el.style.transform = `translate(${ ballX }px, ${ ballY }px)`

                done()
            },
            afterEnter(el){
                this.ballFlag = !this.ballFlag
            }            
        },
        created() {
            this.getGoodsSwipe()
            this.getGoodsInfo()
        },
        mounted() {
            // console.log(this.goodsInfo.stock_quantity)
        },
        components: {
            swipe,
            numbox
        }
    }
</script>

<style lang="scss">
    .goodsinfo-container {
        overflow: hidden;
        .photos-show {
            .mui-card-content-inner {
                height: 200px;
            }
        }
        .goods-cart {
            .mui-card-content-inner {
                .price {
                    padding: 5px 0;
                    span {
                        i {
                            font-style: normal;
                        }
                        &.m {
                            margin-right: 10px;
                            i {  
                                color: #ccc;                      
                                text-decoration: line-through;
                            }
                        }
                        &.s {
                            i {
                                color: #ff3b1d;
                            }
                        }
                    }                 
                }
                .quantity {
                    padding: 5px 0;
                    .mui-numbox {
                        height: 30px;
                    }
                }
                .operate-btn {
                    padding: 5px 0;
                }
            }
        }
        .goods-desc {
            .mui-card-footer {
                display: block;
                .mint-button {
                    width: 100%;
                    margin: 10px 0;
                    &.mint-button--danger {
                        border-color: #ff6766;
                        color: #ff6766;
                    }
                    &.mint-button--primary {
                        border-color: #2bde73;
                        color: #2bde73;
                    }
                }
            }
        }
        .goods-ball {
            width: 15px;
            height: 15px;
            position: absolute;
            top: 360px;
            left: 40%;
            border-radius: 50%;
            background-color: #ff3b1d;
            z-index: 99;
        }
    }
</style>