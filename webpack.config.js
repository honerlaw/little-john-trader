const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./typescript/src/component/main.tsx",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "client", "dist")
    },
    resolve: {
        extensions: [".js", ".jsx", ".json", ".ts", ".tsx"]
    },
    plugins: [new HtmlWebpackPlugin({
        title: "Little John Trader",
        favicon: path.resolve(__dirname, "assets", "favicon.ico")
    })],
    module: {

        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: "awesome-typescript-loader",
                    options: {
                        configFileName: path.resolve(__dirname, "typescript", "tsconfig.json")
                    }
                }
            },
            {
                test: /\.scss$/,
                use: ["style-loader" ,"css-loader", "sass-loader"]
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, "client", "dist"),
        historyApiFallback: true
    }
};