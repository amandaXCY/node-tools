shell.exec(`git fetch origin`, {cwd:this.rootPath,silent:true})
const cnt = shell.exec(`git rev-list --count HEAD..origin/${this.branch}`, {cwd:this.rootPath,silent:true}).stdout.trim()
if(cnt > 0) console.log('远程有更新')