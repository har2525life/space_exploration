module.exports = {
  // 開発環境(development) or 本番環境(production) ?
  mode: "development",
  // どのファイルを最初に見に行くのか コンパイル時
  entry: "./src/index.js",
  // 出力先 __dirname 現在のwebpackの階層と同じ
  output: {
    path: `${__dirname}/public`,
    filename: "bundle.js",
  },
  // ローカルサーバーで見に行くときの設定
  devServer: {
    static: "./public",
  },
  // 拡張子を書かなくてもよくするように
  resolve: {
    extensions: [".js", ".glsl"],
  },
  // コンパイラの設定
  module: {
    rules: [
      // javascript
      {
        // .jsファイルを古い記述にコンパイルしてね
        test: /\.js$/,
        // node_modulesはコンパイルしなくてもいいよ
        exclude: /node_modules/,
        // コンパイルにはbabel-loaderを使用するよ
        use: ["babel-loader"],
      },
      //  Shader
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        type: "asset/source",
        generator: {
          filename: "assets/images/[hash][ext]",
        },
      },
      //   images
      {
        test: /\.(jpg|png|gif|svg)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[name][ext]",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
