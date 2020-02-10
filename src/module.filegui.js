import fileService from './src?name=service.get-files'

// import FileBrowser from './src?name=comp.filebrowser'
// import FileMenu from './src?name=comp.filemenu'
// import FileProperties from './src?name=comp.fileproperties'
import FileTree from './src?name=comp.filetree'

export default {
    components: {
        // 'filebrowser': FileBrowser,
        // 'filemenu': FileMenu,
        // 'fileproperties': FileProperties,
        'filetree': FileTree
    },
    data: {
        fileService: fileService.data()
    }
}