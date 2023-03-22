import {defineUserConfig,defaultTheme} from 'vuepress';
import {backToTopPlugin} from '@vuepress/plugin-back-to-top';
import {registerComponentsPlugin} from '@vuepress/plugin-register-components'
import {docsearchPlugin} from "@vuepress/plugin-docsearch";
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
				children: [
					{
						text: '德善教育',
						link: '/projects/deshan',
					},
				],
			},
			{
				text: 'CSS效果合集',
				link: '/projects/css'
			}
		],
		repo: 'https://github.com/montilloo/montilloo.github.io',
	}),
	plugins: [
		backToTopPlugin(),
		registerComponentsPlugin({
			// 配置项
		}),
		docsearchPlugin({
			appId: process.env.appId,
			apiKey: process.env.apiKey,
			indexName: process.env.indexName,
			placeholder: '搜索...',
		}),
	]
})
