// const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
const WorkboxPlugin = require('workbox-webpack-plugin');
const WebpackPwaManifest = require("webpack-pwa-manifest");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require("path");

const config = {
  entry: {
    app: "./src/js/app.js",
    home: "./src/js/home.js",
    signin: "./src/js/signin.js",
    signup: "./src/js/signup.js",
    workout: "./src/js/workout.js",
    workoutCreate: "./src/js/workoutCreate.js",
    workouts: "./src/js/workouts.js"
  },
  output: {
    path: __dirname + "/dist/",
    filename: "[name].bundle.js"
  },
  mode: "production",
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: '/css/style.css' }),
    new WorkboxPlugin.GenerateSW({
      additionalManifestEntries: [
        {
          url: "/manifest.json",
          revision: "null"
        },
        {
          url: "/offline",
          revision: "null"
        },
        {
          url: "/signin",
          revision: "null"
        },
        {
          url: "/workouts",
          revision: "null"
        },
        {
          url: "/workout",
          revision: "null"
        },
        {
          url: "/home",
          revision: "null"
        },
        {
          url: "/",
          revision: "null"
        }
      ],
      ignoreURLParametersMatching: [/\b(\w*id\w*)\b/],
      runtimeCaching: [
        {
          // Match any request that ends with .png, .jpg, .jpeg or .svg.
          urlPattern: /(\/api\/)|\.(?:png|jpg|jpeg|svg|html)$/,

          // Apply a cache-first strategy.
          handler: "NetworkFirst"
        }
      ]
    }),
    new WebpackPwaManifest({
      name: "Workout Tracker",
      short_name: "Workout Tracker",
      description: "Track your workouts.",
      background_color: "#000000",
      theme_color: "#20b513",
      "theme-color": "#20b513",
      start_url: "/home",
      display: "standalone",
      icons: [
        {
          src: path.resolve("./src/img/android-chrome-512x512.png"),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join("img", "icons")
        }
      ],
      fingerprints: false
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      { 
        test: /\.scss$/, 
        use: [ MiniCssExtractPlugin.loader, "css-loader", "sass-loader" ] 
      }
    ]
  }
};

module.exports = config;