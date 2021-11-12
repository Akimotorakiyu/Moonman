import 'virtual:windi.css'
import './basicMerge'
import './basicDelete'
import './basicColor'
import './basicMove'

import { createApp } from 'vue'
import { App } from './App'

const app = createApp(App)

app.mount('#app')
