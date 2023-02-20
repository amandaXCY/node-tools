const fs = require('fs-extra')
const logger = require('./logger')
const reg = /^\d+\.\d+\.\d+((-rc|-beta|-alpha)\.\d+)?$/
const reg2 = /(-rc\.|-beta\.|-alpha\.)/

/**
 * 比较版本
 * @param {*} v1 
 * @param {*} v2 
 * @returns v1>v2:true, v1<v2:false
 */
export function compareVersion(v1, v2) {
    const v1Info = parseVersion(v1);
    const v2Info = parseVersion(v2);
    if (v1Info.major > v2Info.major) {
        return true
    }
    if (v1Info.minor > v2Info.minor) {
        return true
    }
    if (v1Info.patch > v2Info.patch) {
        return true
    }
    if (v1Info.suffix > v2Info.suffix) {
        return true
    }
    return false
}

//比较版本
export function parseVersion(v) {
    if (validateVersion(v)) {
        logger.warn('version 不合法，应该为0.0.0或0.0.0-rc.0或0.0.0-alpha.0或0.0.0-beta.0');
    }
    const vArr = v.split(reg2)
    const stableV = vArr[0].split('.')
    return {
        major: stableV[0],
        minor: stableV[1],
        patch: stableV[2],
        suffixIco: vArr[2] ?? "",
        suffix:vArr[3] ?? ""
    }
}
export function validateVersion(v) {
    return reg.test(v)
}

/**
 * 升级版本
 * 
 * @param {major | minor| patch|suffix} env : 
 * @param {number} ascNum 
 * @param {boolean} hasSuffix:如果为false，则舍弃小版本
 * @example
 * 
 * ```
 * major:x+1.x.x
 * minor:x.x+1.x
 * patch:x.x.x+1
 * suffix:x.x.x-beat.x+1
 * hasSuffix=false: x.x.x-beat.x ----> x.x.x
 * ```
 */
export function ascendVersion(v, env, ascNum=1,hasSuffix=true) {
    const vInfo = parseVersion(v)
    vInfo[env] += ascNum
    const suffixStr = (!hasSuffix || !vInfo.suffix ) ? "" : `${vInfo.suffixIco}.${vInfo.suffix}`
    return `${vInfo.major}.${vInfo.minor}.${vInfo.patch}${suffixStr}`
}


 