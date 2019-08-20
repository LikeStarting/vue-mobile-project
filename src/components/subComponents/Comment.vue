<template>
    <div class="comment-container">
        <div class="title">
            <h2>评论区</h2>
        </div>
        <p class="input-box">
            <textarea placeholder="请输入您要吐槽的话。（最多120个字）" v-model="newComment"></textarea>
        </p>
        <div class="post-btn">
            <mt-button type="primary" @click="postComment">发表评论</mt-button>
        </div>
        <div class="comments-lists">
            <h3>网友评论：</h3>
            <div class="comments-item" v-for="(item, index) in commentLists" :key="index">
                <div class="item-title">
                    <p class="p1">
                        <span>第{{ index + 1 }}楼</span>
                        <span>用户：{{ item.user_name }}</span>
                    </p>
                    <p>发表时间：{{ item.add_time | dateFormat }}</p>
                </div>
                <div class="item-body">
                    {{ item.content ? item.content : '这个评论...∑(っ°Д°;)っ卧槽，不见了'}}
                </div>
            </div>
        </div>

        <div class="more-btn">
            <mt-button type="primary" @click="getMore">加载更多...</mt-button>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    
    export default {
        data() {
            return {
                pageIndex: 1,
                commentLists: [],
                newComment: ''
            }
        },
        created() {
            this.getComments()
        },
        methods: {
            getComments() {
                this.$http.get('api/getcomments/' + this.id + '?pageindex=' + this.pageIndex).then(result => {
                    if(result.body.status === 0) {
                        // this.commentLists = result.body.message.filter(value => value.content != '')
                        // 拼接之前获取的评论数据
                        // console.log(result.body.message,this.pageIndex)
                        this.commentLists = this.commentLists.concat(result.body.message)
                    } else {
                        Toast('获取评论失败，请稍后重试！')
                    }
                })
            },
            getMore() {
                this.pageIndex++;
                this.getComments()
            },
            postComment() {
                if(this.newComment.trim() == '') {
                    return Toast('说点什么吧...')
                }

                this.$http.post('api/postcomment/' + this.id, { content:this.newComment }).then(result => {
                    if(result.body.status === 0) {
                        let cmt = {
                            user_name: "匿名用户",
                            add_time: Date.now(),
                            content: this.newComment.trim()
                        }
                        this.commentLists.unshift(cmt)
                        this.newComment = ''
                        Toast('发表成功！')
                    }
                })
            }
        },
        props: ['id']
    }
</script>

<style lang="scss">
    .comment-container {
        padding: 20px 0;
        .title h2 {
            font-size: 20px;
            line-height: 2;
            color: #AEC5EB;
        }
        .input-box textarea {
            margin-bottom: 0;
            font-size: 14px;
            color: #13334c;
            &::-webkit-input-placeholder {           
                font-size: 14px;
                color: #13334c;
            }
        }
        .comments-lists {
            margin-top: 10px;
            h3 {
                font-size: 18px;
                line-height: 2;
            }
            .comments-item {
                margin-bottom: 10px;
                .item-title {
                    padding: 5px 10px;
                    font-size: 14px;
                    background-color: #d9d9f3;
                    box-shadow: 0px 0px 4px #668b8a;
                    p {
                        margin: 0;
                        color: #668b8a;
                        &.p1 {
                            display: flex;
                            justify-content: space-between;
                        }
                    }
                }
                .item-body {
                    margin-top: 10px;
                    padding: 20px 0;
                    font-size: 16px;
                    line-height: 28px;
                    text-indent: 2em;  
                    color: #74c239;
                    border-radius: 4px;
                    background-color: #f0dac7; 
                }
            }
        }
        .post-btn {
            text-align: center;
            .mint-button {
                width: 50%;
                background-color: #2BDE73;
            }
        }
        .more-btn {
            margin-top: 10px;
            text-align: center;
           .mint-button {
                width: 50%;
            } 
        }
    }
</style>