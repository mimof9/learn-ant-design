import React, { Component } from 'react'
import { Layout, Menu, Icon, Button } from 'antd'
import Link from 'umi/link'
import { FormattedMessage, getLocale, setLocale } from 'umi/locale'

export default class BasicLayout extends Component {
    changLang() {
        const locale = getLocale();
        if (!locale || locale === 'zh-CN') {
            setLocale('en-US');
        } else {
            setLocale('zh-CN');
        }
    }

    render() {
        const { Header, Footer, Sider, Content } = Layout
        const { SubMenu } = Menu

        return (
            <Layout>
                <Sider width={256} style={{ minHeight: '100vh' }}>
                    <div style={{ height: '32px', background: 'rgba(255,255,255,.2)', margin: '16px'}}/>
                    <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
                        <Menu.Item key='1'>
                            <Link to='/helloworld'>
                                <Icon type='pie-chart'></Icon>
                                <span>HelloWorld</span>
                            </Link>
                        </Menu.Item>
                        <SubMenu
                            key='sub1'
                            title={<span><Icon type='dashboard' /><span>Dashboard</span></span>}
                        >
                            <Menu.Item key="2"><Link to='/dashboard/analysis'>分析页</Link></Menu.Item>
                            <Menu.Item key="3"><Link to='/dashboard/monitor'>监控页</Link></Menu.Item>
                            <Menu.Item key="4"><Link to='/dashboard/workplace'>工作台</Link></Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>

                <Layout>
                    <Header style={{ background: '#fff', textAlign: 'center', padding: 0 }}>
                        <Button
                            size="small"
                            onClick={() => {
                                this.changLang();
                            }}
                        >
                            <FormattedMessage id="lang" />
                        </Button>
                    </Header>
                    <Content style={{ margin: '24px 16px 0' }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        )
    }
}
