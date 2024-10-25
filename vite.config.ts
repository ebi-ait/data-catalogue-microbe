import {defineConfig, loadEnv, ConfigEnv} from 'vite';
import react from '@vitejs/plugin-react';

function getEnvVariable(config: ConfigEnv, envKey: string) {
    const env = loadEnv(config.mode, process.cwd(), '')
    const envValue = env[envKey];
    if (config.command == 'serve' && !envValue) {
        throw new Error(`${envKey} is not defined. Check your .env file`);
    }
    console.log(`using ${envKey}: ${envValue}`)
    return envValue;
}

// https://vitejs.dev/config/
export default defineConfig((config) => {

    const biosamplesRoot = getEnvVariable(config, 'VITE_BIOSAMPLES_ROOT');

    return {
            plugins: [react()],
            build: {
                outDir: 'dist',
            },
            server: {
                open: true,  // Automatically open the app in the browser
                proxy: {
                    // Proxy requests to the API server
                    '/api': {
                        target: biosamplesRoot,
                        changeOrigin: true,
                        secure: false,
                        rewrite: (path:string) => path.replace(/^\/api/, ''),
                        configure: (proxy, options) => {
                            proxy.on('proxyReq', (proxyReq, req, res) => {
                                console.log(`Proxying request to: ${req.url}`);
                            });
                        },},

                },
            },
            // TODO: does this mean that the build time needs to know the deployment path?
            base: '/microbe'
        }
    }
);
