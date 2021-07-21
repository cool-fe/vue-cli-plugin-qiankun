import { isString, isEqual } from "lodash";

export default function QiankunSlave(api: any, options: any) {
  if(isSlaveEnable(options)){
    console.log("QiankunSlave");
  }
}

export function isSlaveEnable(options: any) {
  return (
    !!options.pluginOptions?.qiankun?.slave ||
    isEqual(options.pluginOptions?.qiankun, {}) ||
    !!process.env.INITIAL_QIANKUN_SLAVE_OPTIONS
  );
}
