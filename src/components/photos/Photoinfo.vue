<template>
    <div class="photo-info">
        <div class="photo-info-title">
            <h2>{{ photoInfo.title }}</h2>
            <p class="subtitle">
                <span>发表时间：{{ photoInfo.add_time | dateFormat}}</span>
                <span>点击：{{ photoInfo.click }}次</span>
            </p>
            <hr>
        </div>

        <!-- 缩略图 -->
        <div class="photo-thumbnails" >
            
            <vue-preview v-if="slides.length > 0" :slides="slides" @close="handleClose"></vue-preview>
            
            <div v-else  class="tip">
                <p>没有任何图片</p>
            </div>
        </div>

        <div class="photo-info-content">
            <h2>描述：</h2>
            <div class="desc" v-html="photoInfo.content"></div>
        </div>

        <!-- 评论子组件 -->
        <comment :id="photoId"></comment>
    </div>
</template>

<script>
    import Comment from '../subComponents/Comment.vue'

    export default {
        data() {
            return {
                photoId: this.$route.params.id,
                photoInfo: {},
                slides: []
            }
        },
        methods: {
            getPhotoInfo: function() {
                this.$http.get('api/getimageInfo/' + this.photoId).then(result => {
                    if(result.body.status === 0) {
                        this.photoInfo = result.body.message[0]
                    }
                })
            },
            getThumbnails: function() {
                this.$http.get('api/getthumimages/' + this.photoId).then(result => {
                    if(result.body.status === 0) {
                        result.body.message.map(item => {
                            item.msrc = item.src
                            item.w = 600
                            item.h = 400
                            return item
                        })
                        this.slides = result.body.message
                        // console.log(result.body.message)
                    }
                })
            },
            handleClose() {
                // console.log('close')
            }
        },
        created() {
            this.getPhotoInfo()
            this.getThumbnails()
        },
        components: {
            comment: Comment
        }
    }
</script>

<style lang="scss">
    .photo-info {
        padding: 0 5px;
        .photo-info-title {
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
        .photo-thumbnails {
            padding: 10px 0;
            .my-gallery {
                display: flex;
                flex-wrap: wrap;
                figure {
                    width: 33.33333%;
                    margin: 0;
                    padding: 0 10px;
                    img {
                        width: 100%;
                        box-shadow: 0 0 8px 4px #a1a499;
                        border-radius: 5px;
                    }
                }
            }
            .tip {
                p {
                    font-size: 16px;
                    text-align: center;
                }
                
            }
        }
        .photo-info-content {
            margin-top: 10px;
            h2 {
                font-size: 16px;
                color: #FF3B1D;
            }
            .desc {
                font-size: 14px;
                text-indent: 2em;
                color: #13334c;
            }          
        }
    }
</style>