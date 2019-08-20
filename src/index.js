import Vue from 'vue';
import router from './router.js';

import VueResource from 'vue-resource';
Vue.use(VueResource);
// options
Vue.http.options.root = 'http://www.liulongbin.top:3005';
Vue.http.options.emulateJSON = true;

// 注册Vuex
import Vuex from 'vuex';
Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        cart: JSON.parse(localStorage.getItem('cart')) || []
    },
    mutations: {
        addToCart(state, goods) {         
            let selectedGoods = state.cart.find(item => item.id == goods.id)
            if(!selectedGoods) {
                state.cart.push(goods)
            } else {
                selectedGoods.counts += parseInt(goods.counts)             
            }
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        updateCartCounts(state, goods) {
            state.cart.map(item => {
                if(item.id == goods.id) {
                    item.counts = parseInt(goods.counts)
                }
            })
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        removeCartById(state, goodsId) {
            let index = state.cart.findIndex(item => item.id == goodsId)
            state.cart.splice(index, 1)
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        updateCartSelect(state, infoObj) {
            state.cart.some(item => {
                if(item.id == infoObj.id) {
                    item.selected = infoObj.val
                }
            })
            localStorage.setItem('cart', JSON.stringify(state.cart))
        }
    },
    getters: {
        getAllCounts(state) {
            if(!state.cart.length) {
                return 0
            }
            return state.cart.reduce((prev, cur) => prev + cur.counts, 0)
        },
        getAllGoodsId(state) {
            let idsArr = []
            state.cart.forEach( item => {
                idsArr.push(item.id)              
            })
            return idsArr
        },
        getGoodsIdCounts(state) {
            let countsObj = {}
            state.cart.forEach( item => {
                countsObj[item.id] = item.counts
            })
            return countsObj
        },
        getGoodsSelected(state) {
            let selectedObj = {}
            state.cart.forEach( item => {
                selectedObj[item.id] = item.selected
            })
            return selectedObj
        },
        settleAccounts(state) {
            let accountsObj = {
                counts: 0,
                amounts: 0
            }
            state.cart.forEach(item => {
                if(item.selected) {
                    accountsObj.counts += item.counts
                    accountsObj.amounts += item.counts * item.price
                }
            })
            return accountsObj
        }
    }
})

import MintUi from 'mint-ui';
Vue.use(MintUi);

import 'mint-ui/lib/style.css';
import './lib/mui/css/mui.css';
// 自定义css
import './css/style.css';

import moment from 'moment';
// 定义全局过滤器
Vue.filter('dateFormat', function(date, pattern='YYYY-MM-DD HH:mm:ss') {
    return moment(date).format(pattern)
})

import VuePreview from 'vue-preview';
Vue.use(VuePreview);

import App from './App.vue';


let vm = new Vue({
    el: '#app',
    data: {
    },
    methods: {
    },
    render: c => c(App),
    // components: {
    //     App
    // },
    router,
    store
})