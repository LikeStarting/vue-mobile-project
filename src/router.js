import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import HomeContainer from './components/tabbar/HomeContainer.vue';
import MemberContainer from './components/tabbar/MemberContainer.vue';
import CartContainer from './components/tabbar/CartContainer.vue';
import AboutContainer from './components/tabbar/AboutContainer.vue';
import NewsList from './components/news/Newslist.vue';
import NewsInfo from './components/news/Newsinfo.vue';
import PhotoList from './components/photos/Photolist.vue';
import PhotoInfo from './components/photos/Photoinfo.vue';
import GoodsList from './components/goods/Goodslist.vue';
import GoodsInfo from './components/goods/Goodsinfo.vue';
import GoodsDesc from './components/goods/GoodsDesc.vue';
import GoodsComment from './components/goods/GoodsComment.vue';

let router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: HomeContainer
        },
        {
            path: '/member',
            component: MemberContainer
        },
        {
            path: '/cart',
            component: CartContainer
        },
        {
            path: '/about',
            component: AboutContainer
        },
        {
            path: '/home/newslist',
            component: NewsList
        },
        {
            path: '/home/newsinfo/:id',
            component: NewsInfo
        },
        {
            path: '/home/photolist',
            component: PhotoList
        },
        {
            path: '/home/photoinfo/:id',
            component: PhotoInfo
        },
        {
            path: '/home/goodslist',
            component: GoodsList
        },
        {
            path: '/home/goodsinfo/:id',
            component: GoodsInfo,
            name: 'goodsinfo'
        },
        {
            path: '/home/goodsdesc/:id',
            component: GoodsDesc
        },
        {
            path: '/home/goodscomment/:id',
            component: GoodsComment
        }
    ],
    linkActiveClass: 'mui-active'
})

export default router;