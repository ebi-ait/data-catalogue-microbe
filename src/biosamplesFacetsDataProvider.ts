import {stringify} from 'query-string';
import {DataProvider, fetchUtils} from 'react-admin';

// TODO: read /microbe from config.js
const apiUrl = '/microbe/api/biosamples/samples/facets';
const httpClient = fetchUtils.fetchJson;

const biosamplesFacetsDataProvider: DataProvider = {
    getList: (resource, params) => {
        const query = {
            filter: 'attr:project+name:MICROBE',
            ...params.filter,
        };
        const url = `${apiUrl}?${stringify(query, {encode:false})}`;
        return httpClient(url).then(({headers, json}) => {
            var attributes = json._embedded[resource]
                .filter(facet => facet.type == 'attribute');
            return ({
                data: attributes
                    .map((record: any) => {
                        return {
                            ...record,
                            id: record.label,
                        };
                    }),
                pageInfo: {
                    hasNextPage: false,
                    hasPreviousPage: false
                },
                total: attributes.length

            });
        });
    },
    getOne: (resource, params) =>
        httpClient(`${apiUrl}/${params.id}`).then(({json}) => ({
            data: json,
        })),
    getMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({id: params.ids}),
        };
        const url = `${apiUrl}?${stringify(query)}`;
        return httpClient(url).then(({json}) => ({data: json}));
    },
    getManyReference: (resource, params) => {
        const {page, perPage} = params.pagination;
        const {field, order} = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${apiUrl}?${stringify(query)}`;
        return httpClient(url).then(({headers, json}) => ({
            data: json,
            total: parseInt(headers.get('content-range')?.split('/').pop() || '0', 10),
        }));
    },
    update: () => Promise.reject(new Error('Samples are read-only')),
    updateMany: () => Promise.reject(new Error('Samples are read-only')),
    create: () => Promise.reject(new Error('Samples are read-only')),
    delete: () => Promise.reject(new Error('Samples are read-only')),
    deleteMany: () => Promise.reject(new Error('Samples are read-only')),
};

export default biosamplesFacetsDataProvider;
