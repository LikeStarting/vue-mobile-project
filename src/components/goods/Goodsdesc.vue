<template>
    <div class="goodsdesc-container">
        <div class="news-info-title">
            <h2>{{ goodsDesc.title }}</h2>
            <hr>
        </div>
        <div class="news-info-content" v-html="goodsDesc.content"></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                goodsDesc: {}
            }
        },
        methods: {
            getGoodsDesc() {
                this.$http.get('api/goods/getdesc/' + this.$route.params.id).then(result => {
                    if(result.body.status === 0) {
                        this.goodsDesc = result.body.message[0]
                    }
                })
            }
        },
        created() {
            this.getGoodsDesc()
        }
    }
</script>

<style lang="scss">
    .goodsdesc-container {
        background-color: #fff;
        padding: 0 5px;
        overflow: hidden;
        .news-info-title {
            margin: 15px 0;
            h2 {
                font-size: 16px;
                text-align: center;
            }
        }
        .news-info-content {
            p,.heise14 {
                font-size: 14px;
                color: #343434;
                strong {
                    font-size: 16px;
                    line-height: 1.5;
                    color: #010409;
                }
            }   
            p {
                margin: 0;
            }       
            img {
                width: 100%;
                height: auto;
                vertical-align: middle;
            }
            .ke-zeroborder {
                tr {
                    display: block;
                    td {
                        display: block;
                        width: 100%;
                    }
                }
            }
        }
    }
</style>