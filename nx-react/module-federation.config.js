const pkg = require('./package.json');

module.exports = {
  name: 'nx-react',
  remotes: [['checkout', 'https://checkout.hub4all.io/remoteEntry.js']],
  shared: (name, config) => {
    if (name === 'lru-cache') {
      return false;
    }

    if (name === 'react') {
      config.eager = true;
      config.singleton = true;
      config.requiredVersion = pkg.dependencies.react;
      config.strictVersion = true;
    }
    if (name === 'react-dom') {
      config.eager = true;
      config.singleton = true;
      config.requiredVersion = pkg.dependencies['react-dom'];
      config.strictVersion = true;
    }
    //Fix to correct shared this library
    if (name === 'jose') {
      return false;
    }
    return config;
  },
};
