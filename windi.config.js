/*
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-05-13 11:18:59
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-05-13 11:20:11
 * @FilePath: \shop-admin\windi.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from 'vite-plugin-windicss';
import colors from 'windicss/colors';
export default defineConfig({
	attributify: true,
	theme: {
		colors: {
			...colors,  // 想要使用windi自带的文字颜色，需要加上这句
			dark: '#000', // 这里自定义了颜色
		},
        backgroundColor: {
            ...colors, // 这样背景色也可以使用winddi自带的颜色了
        }
	},
});