export default {
  target: "node",
  nodeVersion: 12,
  cjs: { type: "babel", lazy: true },
  runtimeHelpers: true,
  browserFiles: [
    'src/master/generator/index.js',
    'src/slave/generator/lifecycles.ts',
    'src/slave/generator/index.js',
    'src/common.ts',
  ],
};
