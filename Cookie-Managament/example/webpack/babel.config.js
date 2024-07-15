module.exports = api => {
  api.cache(true)

  const presets = [
    [
      '@babel/preset-env',
      {
        // useBuiltIns: 'entry',
        // corejs: 3,
        modules: false,
        targets: '>1%',
      },
    ],
  ]
  const plugins = []

  return {
    presets,
    plugins,
  }
}
