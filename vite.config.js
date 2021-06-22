// vite.config.js
import vue from '@vitejs/plugin-vue'

export default {
    plugins: [vue()],
    server: {
        open: '/examples/main.html',
        port: 1113,
    }
}
