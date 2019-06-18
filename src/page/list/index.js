import React from 'react';
import { Table, Modal, Button, Form, Input } from 'antd'
import { connect } from 'dva'
import SampleChart from '../../components/SampleChart'

const FormItem = Form.Item

function mapStateToProps(state) {
    return {
        cardsList: state.cards.cardsList,
        // 当用户 dispatch 对应 effect 时，dva 会自动注入对应 effect 的 loading 状态
        // 这个用来确定数据的加载状态 相当方便
        cardsLoading: state.loading.effects['cards/queryList'],
        statistic: state.cards.statistic,
    }
}

class List extends React.Component {

    state = {
        visible: false,
        statisticVisible: false,
        id: null
    }

    columns = [
        {
            title: '名称',
            dataIndex: 'name',
        },
        {
            title: '描述',
            dataIndex: 'desc',
        },
        {
            title: '链接',
            dataIndex: 'url',
            render: value => <a href={value}>{value}</a>,
        },
        {
            title: '',
            dataIndex: '_',
            render: (_, { id }) => {
                return (
                    <Button onClick={() => { this.showStatistic(id) }}>图表</Button>
                )
            }
        },
    ];

    componentDidMount() {
        this.props.dispatch({
            type: 'cards/queryList',
        });
    }

    showModal = () => {
        this.setState({ visible: true })
    }

    handleCancel = () => {
        this.setState({ visible: false })
    }

    handleOk = () => {
        const { dispatch, form: { validateFields } } = this.props

        // 通过 validateFields 方法验证表单是否完成填写
        validateFields((err, values) => {
            if (!err) {
                dispatch({
                    type: 'cards/addOne',
                    payload: values
                })
                this.setState({ visible: false })
            }
        })
    }

    onhandleStatisticCancel = () => {
        this.setState({ statisticVisible: false })
    }

    showStatistic = (id) => {
        this.props.dispatch({
            type: 'cards/getStatistic',
            payload: id
        })
        this.setState({
            statisticVisible: true,
            id: id
        })
    }

    render() {
        const { cardsList, cardsLoading, statistic } = this.props
        const { visible, statisticVisible, id } = this.state
        // getFieldDecorator 是用于将包裹的组件与表单进行双向绑定使用
        const { form: { getFieldDecorator } } = this.props

        return (
            <div>
                <Table columns={this.columns} dataSource={cardsList} loading={cardsLoading} rowKey="id" />

                <Modal visible={statisticVisible} onCancel={this.onhandleStatisticCancel} footer={null}>
                    <SampleChart data={statistic[id]} />
                </Modal>

                <Button onClick={this.showModal}>新建</Button>
                <Modal
                    title='新建记录'
                    visible={visible}
                    onCancel={this.handleCancel}
                    onOk={this.handleOk}
                >
                    <Form>
                        <FormItem label='名称'>
                            {
                                getFieldDecorator('name', {
                                    rules: [{ required: true }]
                                })(<Input />)
                            }
                        </FormItem>
                        <FormItem label='描述'>
                            {
                                getFieldDecorator('desc')(<Input />)
                            }
                        </FormItem>
                        <FormItem label='链接'>
                            {
                                getFieldDecorator('url', {
                                    rules: [{ type: 'url' }]
                                })(<Input />)
                            }
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}

// Form.create()(List) 创建一个高阶组件，为页面组件 List 提供表单所需要的内容(this.props.form)
export default connect(mapStateToProps)(Form.create()(List));
