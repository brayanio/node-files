export default {
props: ['text'],
template: `
    <section v-if="text">
        <pre><p v-text="text"></p></pre>
    </section>
`
}