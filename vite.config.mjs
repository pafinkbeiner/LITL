import { viteStaticCopy } from 'vite-plugin-static-copy'

export default {
  base: "/LITL/",
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
    port: 8080,
    strictPort: true,
  },
  server: {
    port: 8080,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:8080",
  },
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  }
}