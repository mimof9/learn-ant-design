export default {
    // 根目录
    singular: true, // 约定的存放页面代码的文件夹是 pages，该配置使之变为page

    // 路由
    // 约定式路由根据文件路径和名字来默认路由
    // 除了约定式的路由，你也可以使用配置式的路由
    routes: [
        {
            path: '/',
            component: './HelloWorld',
        }
    ],

    // 插件
    plugins: [
      [
          // umi官方插件，集成了常用的一些进阶的功能
          'umi-plugin-react',
          {}
      ],
    ],
}
