module.exports = {
  apps: [
    {
      name: "Asere Market",
      script: "./back/build/index.js",
      env: {
        DB_ENV: "production",
        NODE_ENV: "production",
        // CONFIG_PATH: "./app-config.js",
      },
    },
  ],
};
