## 项目结构问题
> official_joke_api文件夹里的是一个获取笑话的服务器，里面已经配置过CORS跨域

### 利用本地服务器的跨域思路
> 发送 ajax 请求的是你的浏览器，所谓 User Agent，而「跨域」的限制 仅仅在浏览器和服务器之间。我们不能强制远程服务器都像例子中那样允许「跨域」请求，所以我们能做的就是不要使用浏览器发送请求。所以在前端开发中，一种常见的规避跨域的方法就是：把 ajax 请求发送到你的本地开发服务器，然后本地开发服务器再把 ajax 请求转发到远端去，从网络拓扑上看本地开发服务器起着「反向代理」的作用。本地服务器和远端服务器是「服务器和服务器间的通信」，就不存在跨域问题了
### 具体做法为配置代理请求
- 把/dev开头的请求转发到服务器，和nginx的代理转发是一个原理
- 具体配置见umi的config.js中的proxy (和webpack的devServer配置还是有区别的)

## 软件分层
> 一个完整的软件，往往会被拆分成多个不同的层次，每一个层次聚焦于完成特定的功能。

### 服务端代码层次结构
1. Controller 层负责与用户直接打交道，渲染页面、提供接口等，侧重于展示型逻辑。
2. Service 层负责处理业务逻辑，供 Controller 层调用。
3. Data Access 层顾名思义，负责与数据源对接，进行纯粹的数据读写，供 Service 层调用。

### 前端的代码结构，要进行同样的分层
1. Page 负责与用户直接打交道：渲染页面、接受用户的操作输入，侧重于展示型交互性逻辑。
2. Model 负责处理业务逻辑，为 Page 做数据、状态的读写、变换、暂存等。
3. Service 负责与 HTTP 接口对接，进行纯粹的数据读写。
> Model 是前端分层中的腰部力量，承上启下，负责管理数据（状态）。业界主流的状态管理类库有 redux、mobx，等

## 状态管理 - dva
- 提升state到所有组件之上
    1. 约定优于配置，在src/model下写store的js文件
    2. 通过@connect(mapStateToProps, mapDispatchToProps)装饰器把state和dispatch传入
    3. 组件中通过props使用
- 通过dispatch统一管理
    1. dispatch(action)
    2. action匹配reducer
    3. reducer返回new state
    4. state根据注入到关联组件中rerender
    
## CSS modules特性
> 在 umi 中我们默认开启了 CSS modules 特性，这使得 class 名需要通过变量属性去引用
- 简单理解CSS modules特性：确保所有的样式能够服务于单个组件
- 原理是在构建过程中，将css文件中的选择器名和html中修改为唯一的字符串并保留关联
> _注意：很多 CSS 选择器是不会被 CSS Modules 处理的，比如 body、div 、a 这样的 HTML 标签名就不会。我们推荐如果要定义局部 css 样式/动画， 只使用 class 或 @keyframe。_

### 控制单个页面class选择器不被改变
- :global(.ant-btn) 其中.ant-btn是antd的按钮的样式 我们使用:global自定义样式，保证可以覆盖antd的默认样式

### 修改antd的默认样式 
1. 利用 less 提供的一个能力：modifyVars 因为antd的样式是使用less写的
2. 简单地讲，antd 在使用 less 定义样式时，使用了大量的变量声明。这些变量的定义在编译期是可以被工具识别并修改的
3. 如果使用的是 umi ，这个过程相当简单，只需要简单地修改配置文件.umirc.js即可

### 那么想写全局样式的时候怎么办？
> 如果使用 umi 的话，有一个专门的文件 global.less 来让我们书写全局样式。这个文件并不会被 CSS modules 处理。
1. 一个用途是全局性地定义 HTML 标签的样式，比如写入：heml, body { margin: 0; }
2. 另外一个用途是全局性地覆盖第三方库的样式，比如 antd 中的样式 

### react 16 生命周期
> 最难理解的更新过程：牢记每个钩子函数只专注与做一件事
> getDerivedStateFromProps决定组件新的state
> shouldComponentUpdate决定是否进行渲染
> render的功能就是把props和state渲染到视图上
> 后面两个更新方法 实在新的状态渲染上去之后 进行一些其他的操作，比如网络请求之类的
> getSnapshotBeforeUpdate的返回值作为componentDidUpdate的第三个参数(快照)
```
// 根据新props生成新state：返回值会修改当前组件的state(如果最终没有执行render方法，显示也不会变)
// prevState是组件的当前的state 也就是this.state。有prevState === this.state
// nextProps 在加载期间是this.props 在更新期间就是this.props新的值。有nextProps === this.props
// 想要获取prevProps是不行的：
// 根据上面对nextProps的解析，知道nextProps可以看作this.props的引用，而获取prevProps的方法就是this.props，
// 即使能访问this也是没有意义的，更何况该函数为静态函数 无法访问this
static getDerivedStateFromProps(nextProps, prevState) {
    console.log('getDerivedStateFromProps', nextProps, prevState)
    if (nextProps.version === '1.0') return null
    return {versionXXX: '2.0'}
}

// 决定是否重新渲染，一般不会改变这个函数，nextState可以看作是getDerivedStateFromProps的返回结果(因为它决定新的state嘛)
shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log('shouldComponentUpdate', nextProps, nextState)
    // 对比新旧props和state 决定返回true还是false
    return true
}
```
