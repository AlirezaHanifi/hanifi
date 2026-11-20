import { defineConfig } from 'astro/config';

export default defineConfig({
  // Project page of the AlirezaHanifi/hanifi repo: https://alirezahanifi.github.io/hanifi/
  site: 'https://alirezahanifi.github.io',
  base: '/hanifi',
  devToolbar: { enabled: false },
  // content/profile.yaml lives one level above the Astro root.
  vite: { server: { fs: { allow: ['..'] } } },
});
