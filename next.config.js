const antdLessLoader = require("next-antd-aza-less");
require("dotenv").config();

if (typeof require !== "undefined") {
  require.extensions[".less"] = file => {};
}

module.exports = antdLessLoader({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]"
  },
  lessLoaderOptions: {
    javascriptEnabled: true
  },
  env: {
    // Will be available on both server and client
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME
  }
});
