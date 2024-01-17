const {
    withNativeFederation,
    shareAll,
  } = require("@softarc/native-federation/build");
  
  module.exports = withNativeFederation({
    name: "vue-vite",
    shared: {
        react: {
            eager: true,
            singleton: true,
            requiredVersion: '18.2.0'
        },
        "react-dom": {
            eager: true,
            singleton: true,
            requiredVersion: '18.2.0'
        }
    },
  });