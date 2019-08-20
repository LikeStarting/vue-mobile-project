<template>
    <div>
        <div class="news-lists">
            <div class="news-lists-title">
                <h1>过时的资讯</h1>
            </div>
            <ul class="mui-table-view">
                <li class="mui-table-view-cell mui-media" v-for="item in newsLists" :key="item.id">
                    <router-link :to="'/home/newsinfo/' +item.id">
                        <img class="mui-media-object mui-pull-left" :src="item.img_url">
                        <div class="mui-media-body">
                            <h2>{{ item.title }}</h2>
                            <p class='mui-ellipsis'>
                                <span>发表时间：{{ item.add_time | dateFormat }}</span>
                                <span>点击：{{ item.click }}次</span>
                            </p>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>    
    </div>
</template>

<script>
    export default {
        data() {
            return {
                newsLists: []
            }
        },
        created() {
            this.getNewsList()
        },
        methods: {
            getNewsList: function() {
                this.$http.get('api/getnewslist').then(result => {
                    if(result.body.status === 0) {
                        this.newsLists = result.body.message
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .news-lists-title {
        h1 {
            margin-left: 15px;
            font-size: 14px;
            line-height: 28px;
            color: #FF7260;
        }
    }
    .mui-table-view {
        .mui-media-body {
            h2 {
                font-size: 14px;
            }
            .mui-ellipsis {
                display: flex;
                justify-content: space-between;
                span {
                    font-size: 12px;
                    color: #999;
                }
            }
        }
    }
</style>