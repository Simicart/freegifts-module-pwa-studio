const componentOverrideMapping = require('./componentOverrideMapping');
const moduleOverridePlugin = require('./moduleOverrideWebpackPlugin');

module.exports = targets => {
    targets.of('@magento/pwa-buildpack').webpackCompiler.tap(compiler => {
        new moduleOverridePlugin(componentOverrideMapping).apply(compiler);
    })
};