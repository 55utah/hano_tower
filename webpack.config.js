const webpack = require('webpack')
const path = require('path')


const HtmlWebpackPlugin = require('html-webpack-plugin')


const DIST_PATH = path.resolve('./')


const config = {
    mode:'development',
    entry:'./src/main.js',
	output:{
		path:DIST_PATH,
		filename:'build.js',
		publicPath:'/'
    },
    resolve:{
		extensions:['.js','.css'], //自动拓展文件后缀名
    },
    module:{
		rules:[{
			test:/\.js$/,
			loader:'babel-loader',
			exclude:/node_modules/,
			query:{
				presets:['react', 'es2015']
			}
		},{
		  	test:/\.css$/,
		  	loader:'style-loader!css-loader'
		},{
			test: /\.(ttf|eot|svg|woff2?)/,
			loader: 'url-loader'
		}]
	},
	plugins:[
		new webpack.HotModuleReplacementPlugin(),
  		new HtmlWebpackPlugin({
    		template: './src/index.html', // 模板文件
    		//inject: 'body' // js的script注入到body底部
    		}),
	],
	devServer: {
        port: 2433,
        contentBase: DIST_PATH,
        historyApiFallback: true,
        inline:true
    }
}


module.exports = config