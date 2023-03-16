import {defineUserConfig,defaultTheme} from 'vuepress'

export default defineUserConfig({
	lang: 'zh-CN',
	title: '',
	description: '个人博客',
	theme: defaultTheme({
		docsBranch: "main",
		// public文件路径
		logo: '/logo.png',
		// 默认主题配置
		navbar: [
			{
				text: '首页',
				link: '/',
			},
			{
				text: '项目',
				link: '/projects',
			},
		],
		repo: 'https://github.com/montilloo/montilloo.github.io',
	})
})
