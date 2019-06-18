import { Upload, message, Button, Icon } from 'antd'

const props = {
    name: 'file',
    action: '//jsonplaceholder.typicode.com/posts/',
    onChange(info) {
        console.log(info.file.status)
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList)
        } else if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`)
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`)
        }
    }
}

export default () => {

    /*
     * 第一步，fetch 一个接口获取其内容并转成 blob 对象。
     * 第二步，将 blob 对象使用 createObjectURL 方法转化成 ObjectURL，等同于一个下载地址链接。
     * 第三步，创建一个 a 标签，并赋予 ObjectURL 且执行一次 click。
     * 第四步，通过 revokeObjectURL 回收 ObjectURL。
     */
    const onHandleDownload = () => {
        // 注意这里，这个a标签并不需要移除dom，因为压根就没真的加进去，真的骚
        const url = 'http://127.0.0.1:8081/style1.css'; // 用得我本地的nginx服务器 已经配置了跨域
        fetch(url).then(res => res.blob()).then(blob => {
            var a = document.createElement('a');
            var url = window.URL.createObjectURL(blob);
            var filename = 'myfile.css';
            a.href = url;
            a.download = filename;
            a.click();
            window.URL.revokeObjectURL(url);
        })
    }

    return (
        <div>
            <Upload {...props}>
                <Button>
                    <Icon type='upload'></Icon> Click to Upload
                </Button>
            </Upload>

            <Button onClick={onHandleDownload}>下载</Button>
        </div>
    )
}
