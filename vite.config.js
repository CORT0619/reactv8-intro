import { defineConfig } from "vite";
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	root: 'src' // won't need this if you put index.html in base of project
});