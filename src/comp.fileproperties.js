export default {
    data: function() {
        return { fileMenu: false }
    },
    methods: {
        openFileMenu: function (e) {
            e.preventDefault()
            this.fileMenu = !this.fileMenu
        }
    },
    props: ['file'],
    template: `
        <div class="flex list">
            <div>
                <a class="edge icon" href @click="openFileMenu($event)" :class="{'active': fileMenu}">
                    <i class="material-icons">more_vert</i>
                    <span class="gutter">File Properties</span>
                </a>
            </div>
            <div v-if="fileMenu">
                <p>
                    <span>Created <strong>{{ (new Date(file.date)).toString().substr(0, 24) }}</strong></span>
                    <br>
                    <span>Last Edit <strong>{{ (new Date(file.modified)).toString().substr(0, 24) }}</strong></span>
                </p>
            </div>
        </div>
    `
    }