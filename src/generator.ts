import { isMasterEnable } from "./master";
import { isSlaveEnable } from "./slave";

export default (api) => {
    const master = require('./master/generator');
    const slave = require('./slave/generator');
    master.default(api)
    slave.default(api)
};
