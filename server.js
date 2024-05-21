// server.js
require("@babel/register")({
  presets: ["@babel/preset-env", "@babel/preset-react"],
});
const Koa = require("koa");
const Router = require("koa-router");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const connect = require("koa-connect");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const fs = require("fs");
const path = require("path");

const app = new Koa();
const router = new Router();
const compiler = webpack(webpackConfig);

// 使用 koa-connect 适配 webpack-dev-middleware 和 webpack-hot-middleware
app.use(
  webpackDevMiddleware.koaWrapper(compiler, {
    publicPath: webpackConfig.output.publicPath,
    // stats: { colors: true },
    serverSideRender: true,
  })
);
app.use(connect(webpackHotMiddleware(compiler)));

// 服务器端渲染路由
router.get("/app", async (ctx) => {
  const App = require("./src/server/App").default;
  const appString = ReactDOMServer.renderToString(React.createElement(App));

  const template = fs.readFileSync(
    path.resolve(__dirname, "src/template.html"),
    "utf8"
  );
  const html = template.replace("<!-- app -->", appString);

  ctx.body = html;
});

app.use(router.routes()).use(router.allowedMethods());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Koa server is listening on port ${PORT}`);
});
