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
props: ['read', 'isImg'],
template: `
    <div class="flex list">
        <div>
            <a class="edge icon" href @click="openFileMenu($event)" :class="{'active': fileMenu}">
                <i class="material-icons">menu</i>
                <span class="gutter">File Menu</span>
            </a>
        </div>
        <div v-if="fileMenu">
            <p v-if="!isImg">
                <button @click="$emit('read')">Read</button>
            </p>
        </div>
    </div>
`
}