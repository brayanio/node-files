import FileGuiModule from './src?name=module.filegui'

export default {
components: { ...FileGuiModule.components },
data: function () { return { ...FileGuiModule.data } },
template: `
    <div class="part flex t-list">
        <filetree class="d-w2 t-col"></filetree>
    </div>
`
}

/*
<section class="part d-w8 t-col">
    <div v-if="fileService.file">
        <section>
            <p class="gutter">
                <strong>{{ fileService.history[ fileService.history.length - 1 ] }}</strong>
                <span>|</span>
                <strong>{{ fileService.file.name }}</strong>
            </p>
            <img class="asset_img" v-if="fileService.isImg(fileService.file)" :src="'./asset?path=' + fileService.file.asset">
            <fileproperties
                :file="fileService.file"
            ></fileproperties>
            <filemenu
                :isImg="fileService.isImg(fileService.file)"
                @read="fileService.read(fileService.file)"
            ></filemenu>
        </section>
        <filebrowser
            :text="fileService.fileText"
        ></filebrowser>
    </div>
</section>
*/