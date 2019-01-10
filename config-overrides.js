const {injectBabelPlugin} = require('react-app-rewired');
module.exports = function override(config, env) {

    config = injectBabelPlugin(['@babel/plugin-proposal-decorators', { "legacy": true }], config)

    config = injectBabelPlugin(
        ['import', {libraryName: 'antd', libraryDirectory: 'es', style: 'css'}],
        config,
    );

    // do stuff with the webpack config...
    return config;
};