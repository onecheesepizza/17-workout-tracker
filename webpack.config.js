const WorkboxPlugin = require('workbox-webpack-plugin');
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
    new MiniCssExtractPlugin({ filename: 'css/style.css' }),
    new WorkboxPlugin.GenerateSW({
      swDest: 'service-worker.js',
      clientsClaim: true,
      skipWaiting: true,
      additionalManifestEntries: [
        {
          url: "/manifest.webmanifest",
          revision: "null"
        },
        {
          url: "/",
          revision: "null"
        },
        {
          url: "/signin",
          revision: "null"
        },
        {
          url: "/offline",
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
      ],
      runtimeCaching: [
        // api calls
        {
          urlPattern: /\b(?:https?:\/\/)?[^\/:]+\/.*?api/,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api'
          }
        },
        // images
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'images',
            expiration: {
              maxEntries: 10,
            },
          },
        },
        // google fonts
        {
          urlPattern: /^https:\/\/fonts\.gstatic\.com/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'google-fonts-webfonts'
          }
        },
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'google-fonts-webfonts'
          }
        },
        // jquery
        {
          urlPattern: /^https:\/\/code\.jquery\.com/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'jquery'
          }
        },
        // bootstrap
        {
          urlPattern: /^https:\/\/stackpath\.bootstrapcdn\.com/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'bootstrap'
          }
        },
        {
          urlPattern: /^https:\/\/cdn\.jsdelivr\.net/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'bootstrap'
          }
        },
      ]
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