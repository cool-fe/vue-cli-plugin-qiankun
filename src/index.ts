export { isMasterEnable } from './master';
export { isSlaveEnable } from './slave';


export default function PluginQiankun(api: any, options: any) {
    const master = require('./master');
    const slave = require('./slave');
    master.default(api,options)
    slave.default(api,options)
}
