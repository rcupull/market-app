module.exports = {
  apps: [
    {
      name: "Asere Market",
      script: "./back/build/index.js",
      env: {
        APP_CONFIG_PATH: "./app-config-prod.json",
        NODE_ENV: "production",
      },
    },
  ],
};
