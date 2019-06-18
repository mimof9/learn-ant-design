import React from 'react'
// import { Button } from 'antd'

/*
 * 整个更新会有违和感的原因在于，state应该由父组件传递进来，这样getDerivedStateFromProps做对比的时候就有了意义
 * 已做改进，放入了HelloWorld组件中
 */

export default class LifeCircle extends React.Component {

    // componentWillReceiveProps(nextProps, nextContext) {
    //     console.log('componentWillReceiveProps')
    // }

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

    // 转载期间
    constructor(props) {
        console.log('constructor')
        super(props)
        this.state = {
            versionXXX: '1.0'
        }
    }

    // componentWillMount() {
    //     console.log('componentWillMount')
    // }

    componentDidMount() {
        console.log('componentDidMount')
    }

    // 更新期间
    // 决定是否重新渲染，一般不会改变这个函数，nextState可以看作是getDerivedStateFromProps的返回结果(因为它决定新的state嘛)
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log('shouldComponentUpdate', nextProps, nextState)
        // 对比新旧props和state 决定返回true还是false
        return true
    }

    // componentWillUpdate(nextProps, nextState, nextContext) {
    //     console.log('componentWillUpdate')
    // }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('getSnapshotBeforeUpdate', this.props, prevProps, this.state, prevState)
        // 在render之后dom渲染之前返回一个值 作为componentDidUpdate的第3个参数
        return null
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('componentDidUpdate', this.props, prevProps, this.state, prevState)
    }

    // 卸载期间
    componentWillUnmount() {
        console.log('componentWillUnmount')
    }

    // 异常
    componentDidCatch(error, errorInfo) {
        console.log('componentDidCatch')
    }

    // 渲染
    render() {
        console.log('render')

        return (
            <div>
                生命周期 {this.props.version} {this.state.versionXXX}
                {/*<Button onClick={this.onhandleUpdate}>改变state 促发更新</Button>*/}
            </div>
        )
    }

    // onhandleUpdate = () => {
    //     this.setState({
    //         version: '2.0'
    //     })
    // }
}
