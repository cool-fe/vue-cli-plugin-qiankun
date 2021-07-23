export default {
  target: 'browser',
  esm: 'babel',
  runtimeHelpers: true,
  nodeFiles: ['src/index.ts', 'src/generator.ts', 'src/master/index.ts', 'src/slave/index.ts']
};
