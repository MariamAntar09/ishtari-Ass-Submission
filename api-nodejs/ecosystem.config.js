module.exports = {
  apps: [
    {
      name: "ishtari-api",
      script: "./src/index.js",
      env: {
        NODE_ENV: "production",
      },
      out_file: "./logs/out.log",
      error_file: "./logs/error.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      //ignore_watch: ["node_modules", "logs"],
    },
  ],
};