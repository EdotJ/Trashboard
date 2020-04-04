const {override, fixBabelImports, addLessLoader} = require('customize-cra');

const findWebpackPlugin = (plugins, pluginName) =>
    plugins.find(plugin => plugin.constructor.name === pluginName);

const overrideProcessEnv = value => config => {
    const plugin = findWebpackPlugin(config.plugins, 'DefinePlugin');
    const processEnv = plugin.definitions['process.env'] || {};

    plugin.definitions['process.env'] = {
        ...processEnv,
        ...value,
    };

    return config;
};


module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            '@primary-color': '#644A80',
            '@input-placeholder-color': '#999999',
            '@error-color': '#cc0000'},
    }),
    overrideProcessEnv({
        config: JSON.stringify({
            apiUrl: 'http://localhost:8080'
        })
    })
);