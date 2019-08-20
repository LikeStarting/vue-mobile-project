<template>
    <div>
        <div class="goods-lists">
            <div class="goods-item" v-for="item in goodsLists" :key="item.id" @click="toGoodsInfo(item.id)">
                <img :src="item.img_url" :onerror="errorImg">
                <h2 class="goods-title">{{ item.title }}</h2>
                <div class="goods-info">
                    <p class="price">
                        <span class="new">￥{{ item.sell_price }}</span>
                        <span class="old">￥{{ item.market_price }}</span>
                    </p>
                    <p class="sell">
                        <span class="hot">热卖中</span>
                        <span class="lave">剩{{ item.stock_quantity }}件</span>
                    </p>
                </div>
            </div>
        </div>
        <div class="more-goods">
            <mt-button type="primary" @click="getMoreGoods">加载更多...</mt-button>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    export default {
        data() {
            return {
                pageIndex: 1,
                goodsLists: [],
                errorImg: 'this.src="http://placekitten.com/300/300"'
            }
        },
        methods: {
            getGoodsLists() {
                this.$http.get('api/getgoods?pageindex=' + this.pageIndex).then(result => {
                    if(result.body.status != 0) {
                        Toast('获取商品信息失败，请稍后重试！')                      
                    } else if(result.body.message.length != 0) {
                        this.goodsLists = this.goodsLists.concat(result.body.message) 
                    } else {
                        return Toast('没有更多了...')
                    }
                })
            },
            getMoreGoods() {
                this.pageIndex++
                this.getGoodsLists()
            },
            toGoodsInfo(goodsId) {
                // 编程式导航
                this.$router.push({
                    // path: '/home/goodsinfo/' + goodsId
                    // path: `/home/goodsinfo/${ goodsId }`
                    name: 'goodsinfo',
                    params: { id: goodsId }
                })
            }
        },
        created() {
            this.getGoodsLists()
        }
    }
</script>

<style lang="scss">
    .goods-lists {
        padding: 0 2%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .goods-item {
            width: 48%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-top: 10px;
            padding: 2px;
            box-shadow: 0 0 4px 2px #f5f5f5;
            background-color: #fff;
            img {
                width: 100%;
            }
            .goods-title {
                font-size: 14px;
            }
            .goods-info {
                background-color: #fbf4f4;
                p {
                    margin: 0;
                }
                .price {
                    span {
                        &.new {
                            font-size: 14px;
                            font-weight: bold;
                            color: #ff3b1d;
                            margin-right: 10px;
                        }
                        &.old {
                            color: #ccc;
                            text-decoration: line-through;
                        }
                    }
                }
                .sell {
                    display: flex;
                    justify-content: space-between;
                    font-size: 12px;
                    span.hot {
                        color: #ff3b1d;
                    }
                }
            }
        }
    }
    .more-goods {
        margin-top: 10px;
        margin-bottom: 10px;
        text-align: center;
        .mint-button {
            width: 50%;
            background-color: rgba(254,132,2,.6);
        } 
    }
</style>