import {defineConfig, loadEnv, ConfigEnv} from 'vite';
import react from '@vitejs/plugin-react';

function getEnvVariable(config: ConfigEnv, envKey: string) {
    const env = loadEnv(config.mode, process.cwd(), '')
    const envValue = env[envKey];
    if (config.command == 'serve' && !envValue) {
        let message = `${envKey} is not defined. Check your .env file`;
        console.error(message);
        throw new Error(message);
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
                    '/microbe/api': {
                        target: biosamplesRoot,
                        changeOrigin: true,
                        secure: false,
                        rewrite: (path:string) => path.replace(/\/microbe\/api/, ''),
                        configure: (proxy, options) => {
                            proxy.on('proxyReq', (proxyReq, req) => {
                                console.log(`Proxying request to: ${proxyReq.getHeader('host')}${proxyReq.path}`);
                                console.log(`Original URL: ${req.url}`);
                                debugger;
                                if (!proxyReq.getHeader('Content-Type')) {
                                    proxyReq.setHeader('Content-Type', 'application/json'); // Set default Content-Type
                                }
                                console.log(`Proxying request with Content-Type: ${proxyReq.getHeader('Content-Type')}`);
                            });
                        },},

                },
            },
            // TODO: does this mean that the build time needs to know the deployment path?
            base: '/microbe'
        }
    }
);
