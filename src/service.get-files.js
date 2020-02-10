const route = async path => {
    let res = await fetch(path)
    let obj = await res.json()
    console.log(obj)
    return obj
}

const routeText = async path => {
    let res = await fetch(path)
    let obj = await res.text()
    console.log(obj)
    return obj
}

let GetFiles = {
    dir: async path => await route(`./dir?path=${path}`),
    file: async path => await route(`./file?path=${path}`),
    asset: async path => await route(`/asset?path=${path}`),
    read: async path => await routeText(`/asset?path=${path}`)
}

let history = JSON.parse(localStorage.history || '[]')
let files = JSON.parse(localStorage.files || '[]')
let file = JSON.parse(localStorage.file || 'false')
let fileText

const loadFiles = async () => {
    let path = '/'
    if(history.length)
        path += history.join('/')
    console.log(path)
    
    files = await GetFiles.dir(path)
    localStorage.files = JSON.stringify(files)
}

const getFile = async name => {
    if(file && name == file.name){
        file = undefined;
        delete localStorage.file;
        return '';
    }
    let path = '/'
    if(history.length)
        path += history.join('/')
    path += '/' + name
    console.log(path)
    
    file = await GetFiles.file(path)
    localStorage.file = JSON.stringify(file)
    localStorage.files = JSON.stringify(files)
}

const goto = async name => {
    history.push(name)
    localStorage.history = JSON.stringify(history)
    loadFiles()
}

const back = async () => {
    history.splice(history.length - 1, 1)
    localStorage.history = JSON.stringify(history)
    loadFiles()
    if(file && name == file.name){
        file = undefined;
        delete localStorage.file;
    }
}

const isImg = file => {
    if(!file) return false
    let res = false
    ;[ '.png', '.jpg', '.svg', '.gif']
        .forEach(ext => file.name.substr(file.name.length - 4).toLowerCase() == ext ? res = true : null)
    ;[ '.jpeg' ]
        .forEach(ext => file.name.substr(file.name.length - 5).toLowerCase() == ext ? res = true : null)
    return res
}

const read = async file => {
    let asset = await GetFiles.read(file.asset)
    fileText = asset
}

(async () => await loadFiles())()

console.log('fileService', files)

const data = () => {
    return { history, files, file, fileText, back, goto, getFile, isImg }
}

export default { data }