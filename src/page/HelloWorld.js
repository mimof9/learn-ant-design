import React, { Component } from 'react'
import {
    FormattedMessage,
    formatMessage,
} from 'umi/locale'

import LifeCircle from './advanced/lifecircle/index'
import { Button } from 'antd'

export default class HelloWorld extends Component {
    changLang() {

    }

    state = {
        version: '1.0'
    }

    render() {
        return (
            <div>
                Hello World!
                <FormattedMessage id="helloworld" />

                <LifeCircle version={this.state.version} />
                <Button onClick={this.onhandleUpdate}>改变state 促发更新</Button>
            </div>
        )
    }

    onhandleUpdate = () => {
        this.setState({
            version: '2.0'
        })
    }
}
