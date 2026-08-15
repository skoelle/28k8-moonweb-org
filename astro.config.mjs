import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
export default defineConfig({
  site: 'https://28k8.moonweb.org',
  integrations: [react()],
  server: { host: '0.0.0.0' },
  vite: { server: { allowedHosts: true } }
});
