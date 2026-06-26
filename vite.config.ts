import { defineConfig } from 'vite';
import angular from '@angular/vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [angular(), tailwindcss()],
});