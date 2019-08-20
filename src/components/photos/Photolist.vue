<template>
    <div>
        <div class="top-tabbar">
            <div id="slider" class="mui-slider">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll">
						<a :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']" href="#" @click.prevent="getPhotoListById(item.id)" v-for="item in categoryLists" :key="item.id">
							{{ item.title }}
						</a>
					</div>
				</div>
			</div>
        </div>
		<div class="photo-list">
			<ul>
				<router-link :to="'/home/photoinfo/'+ item.id" tag="li" v-for="item in photoLists" :key="item.id">
					<img v-lazy="item.img_url">
					<div class="info">
						<h3 class="info-title">{{ item.title }}</h3>
						<p class="info-body" v-html=" item.zhaiyao ">
						</p>
					</div>
				</router-link>
			</ul>
		</div>
    </div>
</template>   

<script>
	import { Toast } from 'mint-ui';
    import mui from '../../lib/mui/js/mui.min';

    export default {
        data() {
            return {
				categoryLists: [],
				photoLists: []
            }
        },
        methods: {
			getCategoryList: function() {
				this.$http.get('api/getimgcategory').then(result => {
					if(result.body.status === 0) {
						result.body.message.unshift({
							title: '全部',
							id: 0
						})
						this.categoryLists = result.body.message
					}
				})
			},
			getPhotoListById: function(cateId) {
				this.$http.get('api/getimages/' + cateId).then(result => {
					if(result.body.status === 0) {
						this.photoLists = result.body.message
					} else {
						Toast('加载出了问题，请稍后重试！')
					}
				})
			}
		},
		created() {
			this.getCategoryList()
			this.getPhotoListById(0)
		},
        mounted() {
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        }
    }
</script>

<style lang="scss" scoped>
    * {
		touch-action: pan-x; //解决Chrome 'treated as passive'报错
	}
	.photo-list {
		ul {
			margin: 0;
			padding: 10px;
			padding-bottom: 0;
			li {
				margin-bottom: 20px;
				text-align: center;
				background-color: #ccc;
				box-shadow: 0 0 4px 4px #a1a499;
				border-radius: 8px;
				position: relative;
				overflow: hidden;
				&:last-child {
					margin-bottom: 0;
				}
				img {
					width: 100%;
					vertical-align: middle;
				}
				img[lazy=loading] {
					width: 40px;
					height: 300px;
					margin: auto;
				}
				.info {
					position: absolute;
					left: 0;
					bottom: 0;
					max-height: 103px;
					overflow: hidden;
					background-color: rgba(113,110,119,.5);
					.info-title {
						font-size: 14px;
						line-height: 1.5;
						color: #f07818;
					}
					.info-body {
						font-size: 12px;
						line-height: 2;
						text-align: left;
						color: #fff;
						text-indent: 2em;
					}
				}
			}
		}
	}
</style>