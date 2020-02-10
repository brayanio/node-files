import fileService from './src?name=service.get-files'

export default {
computed: {
    fileService: function (){
        return fileService.data()
    },
    active: function () {
        return this.fileService.file || {name: ''}
    }
},
template: `
    <section class="part y-scroll h10 no-m filetree">
        <div class="flex align-center">
            <button class="icon" @click="fileService.back()" :disabled="!fileService.history.length">
                <i class="material-icons">arrow_back</i>
            </button>
        </div>
        <hr>
        <div v-for="file in fileService.files">
            <a class="edge icon" @click="fileService.goto(file.name)" href="#/" v-if="file.isDir">
                <i class="material-icons">folder</i>
                <span class="gutter">{{ file.name }}</span>
            </a>
            <a class="edge icon" href="#/" v-if="!file.isDir" @click="fileService.getFile(file.name)" :class="{'active': active.name === file.name}"> 
                <i class="material-icons">insert_drive_file</i>
                <span class="gutter">{{ fileService.file.name }}</span>
            </a>
        </div>
    </section>
`
}