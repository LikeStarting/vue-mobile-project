<template>
    <div class="app-container">
        <mt-header fixed title="Header">
            <div class="back" slot="left" @click="goBack" v-show="flag">
                <mt-button icon="back">返回</mt-button>
            </div>
        </mt-header>

		<!-- routerView -->
		<transition name="component-fade">
			<router-view></router-view>		
		</transition>

		<!-- 底部导航 -->
        <nav class="mui-bar mui-bar-tab">
			<routerLink class="mui-tab-item-v" to="/home">
				<span class="mui-icon mui-icon-shouye"></span>
				<span class="mui-tab-label">首页</span>
			</routerLink>
			<routerLink class="mui-tab-item-v" to="/member">
				<span class="mui-icon mui-icon-guanyu"></span>
				<span class="mui-tab-label">信息</span>
			</routerLink>
			<routerLink class="mui-tab-item-v" to="/cart">
				<span class="mui-icon mui-icon-gouwuche"><span class="mui-badge" id="badge">{{ $store.getters.getAllCounts }}</span></span>
				<span class="mui-tab-label">购物车</span>
			</routerLink>
			<routerLink class="mui-tab-item-v" to="/about">
				<span class="mui-icon mui-icon-wode"></span>
				<span class="mui-tab-label">我的</span>
			</routerLink>
		</nav>
    </div>
</template>

<script>
	export default {
		data() {
			return {
				flag: false
			}
		},
		methods: {
			goBack() {
				this.$router.go(-1)
			}
		},
		created() {
			this.flag = this.$route.path === '/home' ? false : true
		},
		watch: {
			'$route.path': function(newVal, oldVal) {
				if(newVal != '/home') {
					this.flag = true
				} else {
					this.flag = false
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
    .app-container {
		padding-top: 40px;
		padding-bottom: 50px;
		overflow-x: hidden;
	}
	.mint-header {
		background-color: skyblue;
		.back {
			.mint-button {
				height: 40px;
			}
		}
	}

	.component-fade-enter {
		opacity: 0;
		transform: translateX(100%);
	}
	.component-fade-leave-to {
		position: absolute;
		opacity: 0;
		transform: translateX(-100%);
	}
	.component-fade-enter-active,
	.component-fade-leave-active {
		transition: all 0.5s ease;
	}
</style>