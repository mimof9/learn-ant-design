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
