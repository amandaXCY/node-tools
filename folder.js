const { rootPath } = require("./constants.js")
const {isRegExp} = require("./regexp")
const fs = require('fs')
const path = require('path')



async function getFolders(src,reg) {
    const rSrc = path.join(rootPath,src)
    const folders = await fs.readdirSync(rSrc)
    return folders.filter(item => {
        if(item.indexOf('.') === 0) return false
        if (!isRegExp(reg)) return true
        if (reg.test(item)) return true;
        return false
    })
}

getFolders('./',/(?!=\.)(.*)/).then((data)=>console.log(data))