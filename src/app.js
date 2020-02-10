import Home from './src?name=page.home'

const routes = [
  { path: '*', component: Home }
]

onload = () => {
  const router = new VueRouter({ routes })
  
  const app = new Vue({
    router
  }).$mount('#app')
}