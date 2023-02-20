//检测本地文件变更
const output = shell.exec(`git status`, { cwd: this.rootPath, silent: true }).stdout.trim()
        if(output.match(/Changes\s+to\s+be\s+committed/) || output.match(/Changes\s+not\s+staged\s+for\s+commit/) || output.match(/Untracked\s+files/)) {
            goOn = await this._getContinue()
        }