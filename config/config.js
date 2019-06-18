export default {
    // 根目录
    singular: true, // 约定的存放页面代码的文件夹是 pages，该配置使之变为page

    // 路由
    // 约定式路由根据文件路径和名字来默认路由
    // 除了约定式的路由，你也可以使用配置式的路由
    routes: [
        {
            path: '/',
            component: '../layout',
            routes: [
                {
                    path: 'helloworld',
                    component: './HelloWorld'
                },
                {
                    path: '/dashboard',
                    routes: [
                        { path: 'analysis', component: 'Dashboard/Analysis' },
                        { path: '/dashboard/monitor', component: 'Dashboard/Monitor' },
                        { path: 'workplace', component: './Dashboard/Workplace' }
                    ]
                },
                {
                    path: 'puzzlecards',
                    component: './puzzlecards'
                },
                {
                    path: 'list',
                    component: './list'
                }
            ]
        },
    ],

    // 代理请求
    proxy: {
        '/dev': {
            target: 'http://localhost:3005/',
            changeOrigin: true,
            "pathRewrite": { "^/dev" : "" }
        }
    },

    // 插件
    plugins: [
      [
          // umi官方插件，集成了常用的一些进阶的功能
          'umi-plugin-react',
          {
              antd: true,   // 打开antd插件，会引入antd并实现按需编译
              dva: true, // 使用dva框架，进行状态管理
          }
      ],
    ],
}
