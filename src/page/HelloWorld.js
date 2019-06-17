import React, { Component } from 'react'
import { Card, Tabs, Tree } from 'antd'

class MyInput extends Component {

    static defaultProps = {
        value: 18
    }

    render() {
        return (
            <div>
                <input value={this.props.value} onChange={this.props.onChange}/>
            </div>
        )
    }
}

export default class HelloWorld extends Component {
    state = {
        text: '',
        activeKey: '2',
        expandedKeys: [],
    }

    onTextChange = (e) => {
        this.setState({
            text: e.target.value
        })
    }

    onTextReset = (e) => {
        this.setState({
            text: ''
        })
    }

    onTabChange = (activeKey) => {
        this.setState({ activeKey });
    }

    onSelect = (selectedKeys) => {
        const { expandedKeys } = this.state
        const key = selectedKeys[0]

        if (expandedKeys.includes(key)) {
            this.setState({
                expandedKeys: expandedKeys.filter(k => k !== key)
            })
        } else {
            this.setState({
                expandedKeys: [...expandedKeys, key]
            })
        }
    }

    onExpand = (expandedKeys) => {
        this.setState({
            expandedKeys: expandedKeys
        })
    }

    render() {
        const { TabPane } = Tabs
        const { TreeNode } = Tree

        return (
            <div>
                <MyInput value={this.state.text} onChange={this.onTextChange}></MyInput>
                <button onClick={this.onTextReset}>Reset</button>

                <Tabs activeKey={this.state.activeKey} onChange={this.onTabChange}>
                    <TabPane tab="Tab 1" key="1">Content of Tab Pane 1</TabPane>
                    <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
                </Tabs>

                <Tree
                    expandedKeys={this.state.expandedKeys}
                    onExpand={this.onExpand}
                    selectedKeys={[]}
                    onSelect={this.onSelect}
                >
                    <TreeNode title="parent 1" key="0-0">
                        <TreeNode title="leaf" key="0-0-0" />
                        <TreeNode title="leaf" key="0-0-1" />
                    </TreeNode>
                </Tree>
            </div>
        )
    }
}
