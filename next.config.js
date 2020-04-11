const tsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  webpack: ({ resolve, ...rest }) => {
    return {
      ...rest,
      resolve: {
        ...resolve,
        plugins: [...resolve.plugins, new tsConfigPathsPlugin()],
      },
    }
  },
}
