
const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const logger = require('./logger')
const webpackConfig = require('../config/webpack.config')
const project = require('../config/project.config')

const runWebpackCompiler = (webpackConfig) =>
  new Promise((resolve, reject) => {
    webpack(webpackConfig).run((err, stats) => {
      if (err) {
        logger.error('Webpack compiler encountered a fatal error.', err)
        return reject(err)
      }

      const jsonStats = stats.toJson()
      if (jsonStats.errors.length > 0) {
        logger.error('Webpack compiler encountered errors.')
        logger.log(jsonStats.errors.join('\n'))
        return reject(new Error('Webpack compiler encountered errors'))
      } else if (jsonStats.warnings.length > 0) {
        logger.warn('Webpack compiler encountered warnings.')
        logger.log(jsonStats.warnings.join('\n'))
      }
      resolve(stats)
    })
  })

const compile = () => Promise.resolve()
  .then(() => logger.info('Starting compiler...'))
  .then(() => logger.info('Target application environment: ' + chalk.bold(project.env)))
  .then(() => runWebpackCompiler(webpackConfig))
  .then((stats) => {
    logger.info(`Copying static assets from ./public to ${project.paths.dist()}.`)
    fs.copySync(
      path.resolve(project.basePath, 'public'),
      path.resolve(project.basePath, 'dist')
    )
    return stats
  })
  .then((stats) => {
    if (project.verbose) {
      logger.log(stats.toString({
        colors: true,
        chunks: false
      }))
    }
    logger.success(`Compiler finished successfully! See ./${project.paths.dist()}.`)
  })
  .catch((err) => logger.error('Compiler encountered errors.', err))

compile()

// const fs = require('fs-extra')
// const webpack = require('webpack')
// const debug = require('debug')('app:bin:compile')
// const webpackConfig = require('../config/webpack.config')
// const project = require('../config/project.config')

// // Wrapper around webpack to promisify its compiler and supply friendly logging
// const webpackCompiler = (webpackConfig) =>
//   new Promise((resolve, reject) => {
//     const compiler = webpack(webpackConfig)

//     compiler.run((err, stats) => {
//       if (err) {
//         debug('Webpack compiler encountered a fatal error.', err)
//         return reject(err)
//       }

//       const jsonStats = stats.toJson()
//       debug('Webpack compile completed.')
//       debug(stats.toString(project.compiler_stats))

//       if (jsonStats.errors.length > 0) {
//         debug('Webpack compiler encountered errors.')
//         debug(jsonStats.errors.join('\n'))
//         return reject(new Error('Webpack compiler encountered errors'))
//       } else if (jsonStats.warnings.length > 0) {
//         debug('Webpack compiler encountered warnings.')
//         debug(jsonStats.warnings.join('\n'))
//       } else {
//         debug('No errors or warnings encountered.')
//       }
//       resolve(jsonStats)
//     })
//   })

// const compile = () => {
//   debug('Starting compiler.')
//   return Promise.resolve()
//     .then(() => webpackCompiler(webpackConfig))
//     .then(stats => {
//       if (stats.warnings.length && project.compiler_fail_on_warning) {
//         throw new Error('Config set to fail on warning, exiting with status code "1".')
//       }
//       debug('Copying static assets to dist folder.')
//       fs.copySync(project.paths.public(), project.paths.dist())
//     })
//     .then(() => {
//       debug('Compilation completed successfully.')
//     })
//     .catch((err) => {
//       debug('Compiler encountered an error.', err)
//       process.exit(1)
//     })
// }

// compile()
