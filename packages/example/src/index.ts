import { name } from '@moonman/moonman'
// import 'virtual:windi-devtools'
import 'virtual:windi.css'
import { createApp } from 'vue'
import { App } from './app'
console.log(`To the moon! ${'\n'} --${name}`)
const app = createApp(App)
app.mount('#app')
