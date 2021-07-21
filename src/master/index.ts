export function isMasterEnable(options: any) {
  return (
    !!options.pluginOptions?.qiankun?.master ||
    !!process.env.INITIAL_QIANKUN_MASTER_OPTIONS
  );
}
export default function QiankunMaster(api: any, options: any) {
  if(isMasterEnable(options)){
    console.log("QiankunMaster");
  }
}
