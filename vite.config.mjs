import { viteStaticCopy } from 'vite-plugin-static-copy'

export default {
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: './obj',
          dest: './'
        }
      ]
    })
  ],
  preview: {
    port: 3030,
    strictPort: true,
  },
  server: {
    port: 3030,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:3030",
  }
}