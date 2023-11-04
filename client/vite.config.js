import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
//esto es para crear el proxi para el client
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        // every request that start with api is sending to this
        //http://localhost:4000/api
        target: "http://localhost:4000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
