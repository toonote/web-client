// vite.config.js
import vue from '@vitejs/plugin-vue'
import viteSvgIcons from 'vite-plugin-svg-icons';
import path from 'path';

export default {
    plugins: [
      vue(),
      viteSvgIcons({
        iconDirs: [path.resolve(__dirname, './packages/web-client/lib/view/images/icons')],
        symbolId: 'icon-[name]',
      }),
    ],
    server: {
        open: '/examples/main.html',
        port: 1113,
    }
}
