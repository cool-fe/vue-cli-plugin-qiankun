export default {
  target: "node",
  nodeVersion: 12,
  cjs: { type: "babel", lazy: true },
  runtimeHelpers: true,
  browserFiles: [
    'src/master/runtimePlugin.ts',
    'src/slave/lifecycles.ts',
    'src/slave/runtimePlugin.ts',
    'src/common.ts',
  ],
};
