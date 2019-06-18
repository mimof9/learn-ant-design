import React from 'react'
import G2 from '@antv/g2'

class SampleChart extends React.Component {

    // 更新
    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.refreshChart();
        }
    }

    // 销毁
    componentWillUnmount() {
        if (this.chart) {
            this.chart.destroy();
        }
    }

    refreshChart = () => {
        // 接收 data 属性作为数据源
        this.chart.source(this.props.data)
        // 此处为硬编码，配置源自 G2 官方示例： https://github.com/antvis/g2
        // 实际开发中需要封装，推荐直接使用 BizCharts。
        this.chart.interval().position('genre*sold').color('genre')
        this.chart.render()
    }

    componentDidMount() {
        // G2图形初始化
        this.chart = new G2.Chart({
            container: this.containerRef.current,
            width: 450,
            height: 300
        })

        // 刷新图表
        this.refreshChart()
    }

    constructor(props) {
        super(props)
        this.containerRef = React.createRef()
    }

    render() {
        return (
            <div ref={this.containerRef}></div>
        )
    }
}

export default SampleChart
