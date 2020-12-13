module.exports = {
    title: 'vdesjs',
    description: '基于vue的可视化拖拽，代码生成工具',
    head: [
        ['link', {
            rel: 'icon',
            href: `/vdesjslogo.png`
        }]
    ],

    themeConfig: {
        nav: [
            { text: '主页', link: '/' },
            { text: '教程', link: '/guide/sxyl' },
            { text: '关于我们', link: '/cooperation/' },
            { text: 'Github', link: 'https://github.com/china-bin/vdesjs' },
            { text: 'Gitee', link: 'https://gitee.com/china-bin/vdesjs' },
        ],
        sidebarDepth: 2,
        sidebar:
        {
            '/guide/': [
                {
                    title: "实现原理",
                    collapsable: true,
                    path: "sxyl",
                },
                {
                    title: "扩展组件",
                    collapsable: true,
                    path: "extend",
                },
                {
                    title: "目录结构",
                    collapsable: true,
                    path: "dir",
                }
            ]
        }

    }

}