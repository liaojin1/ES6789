function Animals() {
    this.species = "动物";
}
function Cat(name, color) {
    this.name = name;
    this.color = color;
}

// 1.构造函数绑定
// 不能继承原型上的属性和方法;
function Cat(name, color) {
    Animals.apply(this, arguments);
    this.name = name;
    this.color = color;
}
// 2.prototype继承
// 如果子对象的prototype对象上有属性或方法时，将被清除;
Cat.prototype = new Animals();
Cat.prototype.constructor = Cat;
// 3.直接继承
// 不用执行和建立Animal的实例了，比较省内存。
// 缺点是 Cat.prototype和Animal.prototype现在指向了同一个对象，
// 那么任何对Cat.prototype的修改，都会反映到Animal.prototype。
Cat.prototype = Animals.prototype;
Cat.prototype.constructor = Cat;//这一句实际上把Animal.prototype对象的constructor属性也改掉了！
// 4.利用空对象作为中介
var F = function () { }// F是空对象，所以几乎不占内存
F.prototype = Animals.prototype;
Cat.prototype = new F();
Cat.prototype.constructor = Cat;



import Vue from "vue";
import Vuex from "vuex";
Vue.user(Vuex);
// 1.
const state = {//设置全局访问的state对象
    showFooter: true,
    changableNum: 0
    // 要设置的初始属性值
}
// 完成1.的步骤，就可以使用this.$store.showFooter在任何一个组件里边获取定义的值
// 但是这种直接访问的方式不可取，vuex提供了getters和vue的计算属性computed一样，来实时监听state值得变化(最新状态),并把他也扔进Vuex.store里。
// 2.
const getters = {//实时监听state值得变化
    isShow(state) {// 主要是用来承载变化的showFooter
        return state.showFooter
    },
    getChangedNum() {// 主要是用来承载变化的changableNum
        return state.changableNum
    }
};
// 完成1.2.只能定义固定的state值并不能改变值，这不是我们所需要的。
// mutations是一个对象，这个对象里边可以放改变state初始值的方法
// 用法：给mutations内的方法传入参数state或者额外的参数，然后利用vue的双向数据驱动进行值的改变，定义好的mutations扔进Vuex.Store
// 3.
const mutations = {
    show(state) {//自定义改变state初始值的方法，这里边的参数除了state之外还可以再传额外的参数变量或对象
        state.showFooter = true;
    },
    hide(state) {
        state.showFooter = false;
    },
    newNum(state, sum) {
        state.changableNum += sum;;
    }
}
// 这时候完全可以用this.$store.commit('show')或者this.$store.commit('newNum', 6)在别的组件里边进行改变showfooter和changebleNum值，但这不是理想的方式
// 因为在Vuex中，mutations里面的方法都是同步事务
// 比如this.$store.commit('newNum', sum)方法在两个组简历执行得到的值每次都是一样的。
// vuex的api还提供了一个actions，actions也是个对象变量，最大的作用就是里边的action方法可以包含任意异步操作。
// 这里边的方法是用来异步触发mutations里的方法，action里面自定义的函数接受一个context参数和要变化的形参，context与store实例具有相同的方法和属性，所以它可以执行context.commit('')
// 4.
const actions = {
    actionShow(context) {//自定义触发mutations里函数的方法，context与store实例具有相同的方法和属性
        context.commit('show');
    },
    actionHide(context) {
        context.commit('hide');
    },
    actionNewNum(context, num) {
        context.commit('newNum', num)
    }
}
// 这时在外部组件里进行全局执行actions里边的方法只需要执行this.$store.dispatch('actionShow')或者this.$store.dispatch('actionNewNum', 6)
// 这样就可以全局改变showfooter或者changeableNum的值

const store = new Vuex.Store(
    state,
    getters,
    mutations,
    actions,
);
export default store;
