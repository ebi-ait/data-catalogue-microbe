import biosamplesDataProvider from "./biosamplesDataProvider";
import biosamplesFacetsDataProvider from "./biosamplesFacetsDataProvider";

const delegatingDataProvider = (resource) => {
    switch (resource) {
        case 'facets':
            return biosamplesFacetsDataProvider;
        default:
            return biosamplesDataProvider;
    }
};
export const customDataProvider = new Proxy({}, {
    get: (_, name) => (resource, params) => {
        const provider = delegatingDataProvider(resource);
        if (typeof provider[name] !== 'function') {
            throw new Error(`Method ${name} is not implemented in the provider for resource: ${resource}`);
        }
        return provider[name](resource, params);
    },
});
export var notImplemented = (resource) => Promise.reject(new Error(`${resource} are read-only`));
