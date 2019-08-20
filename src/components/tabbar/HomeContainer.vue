<template>

    <div class="home-container">
        <div class="swipe-banner">
            <swiper :swipeLists="swipeImageLists" :imgUrl="'img'" :isFull="true"></swiper>
        </div>
        <div class="grid-menu">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4">
                    <router-link to="/home/newslist">
                        <img src="../../images/menu1.png" alt="">
                        <span class="mui-media-body">新闻资讯</span>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4">
                    <router-link to="/home/photolist">
                        <img src="../../images/menu2.png" alt="">
                        <span class="mui-media-body">图片分享</span>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4">
                    <router-link to="/home/goodslist">
                        <img src="../../images/menu3.png" alt="">
                        <span class="mui-media-body">商品购买</span>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4">
                    <a href="#">
                        <img src="../../images/menu4.png" alt="">
                        <span class="mui-media-body">留言反馈</span>
                    </a>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4">
                    <a href="#">
                        <img src="../../images/menu5.png" alt="">
                        <span class="mui-media-body">视频专区</span>
                    </a>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4">
                    <a href="#">
                        <img src="../../images/menu6.png" alt="">
                        <span class="mui-media-body">联系我们</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>

</template> 

<script>
    import Swipe from '../subComponents/Swipe.vue'

    export default {
        data() {
            return {
                swipeImageLists: []
            }
        },
        created() {
            this.getSwipeImage()
        },
        methods: {
            getSwipeImage: function() {
                this.$http.get('api/getlunbo').then(result => {
                    if(result.body.status === 0) {
                        this.swipeImageLists = result.body.message
                    }
                })
            }
        },
        components: {
            swiper: Swipe
        }
    }
</script>

<style lang="scss" scoped>
    .swipe-banner {
        height: 200px;
    }
    .mui-table-view {
        &:after {
            height: 0;
        }
        &.mui-grid-9 {
            background-color: #fff;
            border: none;
            .mui-table-view-cell {
                border: none;
                img {
                    width: 50%;
                }
                .mui-media-body {
                    font-size: 14px;
                }
            }
        }
    } 
</style>        