<template>
    <div>
        <div class="news-info">
            <div class="news-info-title">
                <h2>{{ newsInfo.title }}</h2>
                <p class="subtitle">
                    <span>发表时间：{{ newsInfo.add_time }}</span>
                    <span>点击：{{ newsInfo.click }}次</span>
                </p>
                <hr>
            </div>
            <div class="news-info-content" v-html="newsInfo.content"></div>
            
            <comment :id="newsId"></comment>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    import Comment from '../subComponents/Comment.vue';

    export default {
        data() {
            return {
                newsId: this.$route.params.id,
                newsInfo: {}
            }
        },
        created() {
            this.getNewsInfo()
        },
        methods: {
            getNewsInfo: function() {
                this.$http.get('api/getnew/' + this.newsId).then(result => {
                    if(result.body.status === 0) {
                        this.newsInfo = result.body.message[0]
                        // console.log(this.newsInfo)
                    } else {
                        Toast('获取新闻失败，请重新获取!')
                    }
                })
            }
        },
        components: {
            comment: Comment
        }
    }
</script>

<style lang="scss">
    .news-info {
        padding: 0 5px;
        .news-info-title {
            margin: 15px 0;
            h2 {
                font-size: 16px;
                text-align: center;
            }
            .subtitle {
                display: flex;
                justify-content: space-between;
                margin-top: 10px;
                span {
                    font-size: 12px;
                }
            }
        }
        .news-info-content {
            p {
                color: #13334c;
                strong,b {
                    color: #ffb6b9;
                }
                img {
                    width: 100%;
                }
            }              
        }
    }
</style>