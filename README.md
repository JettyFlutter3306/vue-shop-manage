# 一. 简介

本项目是一个Vue.js实战项目,使用到Vue框架的基本语法以及一些前端常用的库,基于Vue的脚手架构建,通过本项目,你可以了解到Vue的实战应用以及一些进阶的JS语法.

# 二. MVVM架构

## 2.1 什么是MVVM?

MVVM是Model-View-ViewModel的简写。它本质上就是MVC 的改进版。MVVM 就是将其中的View 的状态和行为抽象化，让我们将视图 UI 和业务逻辑分开。当然这些事 ViewModel 已经帮我们做了，它可以取出 Model 的数据同时帮忙处理 View 中由于需要展示内容而涉及的业务逻辑。微软的WPF带来了新的技术体验，如Silverlight、音频、视频、3D、动画……，这导致了软件UI层更加细节化、可定制化。同时，在技术层面，WPF也带来了 诸如Binding、Dependency Property、Routed Events、Command、DataTemplate、ControlTemplate等新特性。MVVM（Model-View-ViewModel）框架的由来便是MVP（Model-View-Presenter）模式与WPF结合的应用方式时发展演变过来的一种新型架构框架。它立足于原有MVP框架并且把WPF的新特性糅合进去，以应对客户日益复杂的需求变化。

![img](src/assets/images/mvvm.png)

上图描述了MVVM一个基本结构，看到了什么，是不是**发现比MVC架构中多了一个ViewModel**，没错，就是这个ViewModel，他是MVVM相对于MVC改进的核心思想。在开发过程中，由于需求的变更或添加，项目的复杂度越来越高，代码量越来越大，此时我们会发现MVC维护起来有些吃力，首先被人吐槽的最多的就是MVC的简写变成了Massive-View-Controller（意为沉重的Controller）

由于Controller主要用来处理各种逻辑和数据转化，复杂业务逻辑界面的Controller非常庞大，维护困难，所以有人想到**把Controller的数据和逻辑处理部分从中抽离出来，用一个专门的对象去管理，这个对象就是ViewModel，是Model和Controller之间的一座桥梁**。当人们去尝试这种方式时，发现Controller中的代码变得非常少，变得易于测试和维护，只需要**Controller和ViewModel做数据绑定**即可，这也就催生了MVVM的热潮。



## 2.2 MVVM的优点

MVVM模式和MVC模式一样，主要目的是分离视图（View）和模型（Model），有几大优点

**1. 低耦合**。视图（View）可以独立于Model变化和修改，一个ViewModel可以绑定到不同的"View"上，当View变化的时候Model可以不变，当Model变化的时候View也可以不变。

**2. 可重用性**。你可以把一些视图逻辑放在一个ViewModel里面，让很多view重用这段视图逻辑。

**3. 独立开发**。开发人员可以专注于业务逻辑和数据的开发（ViewModel），设计人员可以专注于页面设计，使用Expression Blend可以很容易设计界面并生成xaml代码。

**4. 可测试**。界面素来是比较难于测试的，测试可以针对ViewModel来写。



# 三. Vue.js快速入门

## 3.1 Vue.js是什么?

Vue (读音 /vjuː/，类似于 **view**) 是一套用于构建用户界面的**渐进式框架**。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。
而且Vue也支持像React那样的组件化构建应用程序.**组件系统**是 Vue 的另一个重要概念，因为它是一种抽象，允许我们使用小型、独立和通常可复用的组件构建大型应用。仔细想想，几乎任意类型的应用界面都可以抽象为一个组件树：

![Component Tree](src/assets/images/components.png)

## 3.2 起步安装

以如下方式引入Vue.js,分别是开发环境和生产环境

```html
<!-- 开发环境版本，包含了有帮助的命令行警告 -->
<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
<!-- 生产环境版本，优化了尺寸和速度 -->
<script src="https://cdn.jsdelivr.net/npm/vue@2"></script>
```



## 3.3 创建Vue实例

每个 Vue 应用都是通过用 `Vue` 函数创建一个新的 **Vue 实例**开始的

```js
const vm = new Vue({
  // 选项
})
```

虽然没有完全遵循 MVVM 模型，但是 Vue 的设计也受到了它的启发。因此在文档中经常会使用 `vm` (ViewModel 的缩写) 这个变量名表示 Vue 实例。

当一个 Vue 实例被创建时，它将 data 对象中的所有的 property 加入到 Vue 的响应式系统中。当这些 property 的值发生改变时，视图将会产生“响应”，即匹配更新为新的值。

```js
// 我们的数据对象
const data = { a: 1 }

// 该对象被加入到一个 Vue 实例中
const vm = new Vue({
  data: data
})

// 获得这个实例上的 property
// 返回源数据中对应的字段
vm.a == data.a // => true

// 设置 property 也会影响到原始数据
vm.a = 2
data.a // => 2

// ……反之亦然
data.a = 3
vm.a // => 3
```

当这些数据改变时，视图会进行重渲染。值得注意的是**只有当实例被创建时就已经存在于 `data` 中的 property 才是响应式的**。也就是说如果你添加一个新的 **property**，**这一点很重要, 在开发中经常会碰到动态创建属性的操作,但是这时候并不会触发自动更新视图**, 比如：

```js
vm.b = 'hi'
```

那么对 `b` 的改动将不会触发任何视图的更新。如果你知道你会在晚些时候需要一个 property，但是一开始它为空或不存在，那么你仅需要设置一些初始值。比如：

## 3.4 钩子函数

每个 Vue 实例在被创建时都要经过一系列的初始化过程——例如，需要设置数据监听、编译模板、将实例挂载到 DOM 并在数据变化时更新 DOM 等。同时在这个过程中也会运行一些叫做**生命周期钩子**的函数，这给了用户在不同阶段添加自己的代码的机会。

比如 `created()` 钩子函数可以用来在一个实例被创建之后执行代码：

```js
new Vue({
  data: {
    a: 1
  },
  created() {
    // `this` 指向 vm 实例
    console.log('a is: ' + this.a)
  }
})
// => "a is: 1"
```

也有一些其它的钩子，在实例生命周期的不同阶段被调用，如 `mounted()`、`updated()` 和 `destroyed()`。生命周期钩子的 `this` 上下文指向调用它的 Vue 实例。

不要在选项 property 或回调上使用**箭头函数**!

比如 `created: () => console.log(this.a)` 或 `vm.$watch('a', newValue => this.myMethod())`。因为箭头函数并没有 `this`，`this` 会作为变量一直向上级词法作用域查找，直至找到为止，经常导致 `Uncaught TypeError: Cannot read property of undefined` 或 `Uncaught TypeError: this.myMethod is not a function` 之类的错误。



**生命周期图示**:

![Vue 实例生命周期](src/assets/images/lifecycle.png)

## 3.5 模板语法

Vue.js 使用了基于 HTML 的模板语法，允许开发者声明式地将 DOM 绑定至底层 Vue 实例的数据。所有 Vue.js 的模板都是合法的 HTML，所以能被遵循规范的浏览器和 HTML 解析器解析。

在底层的实现上，Vue 将模板编译成虚拟 DOM 渲染函数。结合响应系统，Vue 能够智能地计算出最少需要重新渲染多少组件，并把 DOM 操作次数减到最少。

### 3.5.1 文本

数据绑定最常见的形式就是使用“Mustache”语法 (双大括号) 的文本插值：

```html
<span>Message: {{ msg }}</span>
```

Mustache 标签将会被替代为对应数据对象上 `msg` property 的值。无论何时，绑定的数据对象上 `msg` property 发生了改变，插值处的内容都会更新。

通过使用 `v-once` 指令，**能执行一次性地插值，当数据改变时，插值处的内容不会更新。但请留心这会影响到该节点上的其它数据绑定**：

```html
<span v-once>这个将不会改变: {{ msg }}</span>
```

### 3.5.2 原始HTML

双大括号会将数据解释为普通文本，而非 HTML 代码。为了输出真正的 HTML，你需要使用 `v-html` ：

```html
<p>Using mustaches: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
```

这个 `span` 的内容将会被替换成为 property 值 `rawHtml`，直接作为 HTML——会忽略解析 property 值中的数据绑定。注意，你不能使用 `v-html` 来复合局部模板，因为 Vue 不是基于字符串的模板引擎。反之，对于用户界面 (UI)，组件更适合作为可重用和可组合的基本单位。

你的站点上动态渲染的任意 HTML 可能会非常危险，因为它很容易导致 [XSS 攻击]。请只对可信内容使用 HTML 插值，**绝不要**对用户提供的内容使用插值。

### 3.5.3 属性动态绑定

Mustache 语法不能作用在 HTML attribute 上，遇到这种情况应该使用 `v-bind` ：

```html
<div v-bind:id="dynamicId"></div>
```

### 3.5.4 JavaScript表达式

迄今为止，在我们的模板中，我们一直都只绑定简单的 property 键值。但实际上，对于所有的数据绑定，Vue.js 都**提供了完全的 JavaScript 表达式支持**。

```html
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div v-bind:id="'list-' + id"></div>
```

这些表达式会在所属 Vue 实例的数据作用域下作为 JavaScript 被解析。有个限制就是，每个绑定都只能包含**单个表达式**，所以下面的例子都**不会**生效。

```html
<!-- 这是语句，不是表达式 -->
{{ var a = 1 }}

<!-- 流控制也不会生效，请使用三元表达式 -->
{{ if (ok) { return message } }}
```

### 3.5.5 修饰符

修饰符 (modifier) 是以半角句号 `.` 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。例如，`.prevent` 修饰符告诉 `v-on` 指令对于触发的事件调用 `event.preventDefault()`：

```html
<form v-on:submit.prevent="onSubmit">...</form>
```

### 3.5.6 Vue常用指令总结

| 指令名称  |                             作用                             | 示例                                                         |
| :-------: | :----------------------------------------------------------: | ------------------------------------------------------------ |
|  v-once   |    只执行一次性地插值，当数据改变时，插值处的内容不会更新    | `<div v-once>{{ msg }}</div>`                                |
|  v-text   |               替换元素内部文本,不解析html标签                | `<div v-text="msg"></div>`                                   |
|  v-html   |                替换元素内部文本,解析html标签                 | `<div v-html="msg"></div>`                                   |
|  v-bind   |                    动态属性绑定,缩写 `:`                     | `<a :href="http://www.baidu.com"></a>`                       |
|   v-on    |                      事件绑定,缩写 `@`                       | `<a href="#" @Click="method"></a>`                           |
|  v-show   |   根据表达式之真假值，切换元素的 `display` CSS property。    | `<div v-show="flag"></div>`                                  |
|   v-if    | 根据表达式的值的 truthiness 来有条件地渲染元素。在切换时元素及它的数据绑定 / 组件被销毁并重建。如果元素是 `<template>`，将提出它的内容作为条件块。 | `<div v-if="flag"></div>`                                    |
|  v-else   |           前一兄弟元素必须有 `v-if` 或 `v-else-if`           |                                                              |
| v-else-if |           前一兄弟元素必须有 `v-if` 或 `v-else-if`           |                                                              |
|   v-for   |                           遍历数组                           |                                                                |
|  v-model  |               在表单控件或者组件上创建双向绑定               |                                                              |
|  v-slot   | 可放置在函数参数位置的 JavaScript 表达式 在支持的环境下可使用解构)。可选，即只需要在为插槽传入 prop 的时候使用。 |                                                              

