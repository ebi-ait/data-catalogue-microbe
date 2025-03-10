import {stringify} from 'query-string';
import {DataProvider, fetchUtils} from 'react-admin';
import {defaultFilter} from "./constants";

// TODO: read /microbe from config.js
const apiUrl = '/microbe/api/biosamples/samples/facets';
const httpClient = fetchUtils.fetchJson;

const biosamplesFacetsDataProvider: DataProvider = {
    getList: (resource, params) => {
        const {filter} = params;
        const query = {
            filter: defaultFilter,
        };
        if(filter.q) {
            query['text'] = filter.q;
            delete filter.q;
        }
        if(filter) {
            Object.entries(filter)
                .map(([attr,value])=>`${attr}:${value}`)
                .forEach(query.filter.push);
        }
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
    getOne: ()=>Promise.reject(new Error('getOne is not implemented')),
    getMany: ()=>Promise.reject(new Error('getMany is not implemented')),
    getManyReference: ()=>Promise.reject(new Error('getManyReference is not implemented')),
    update: () => Promise.reject(new Error('facets are read-only')),
    updateMany: () => Promise.reject(new Error('facets are read-only')),
    create: () => Promise.reject(new Error('facets are read-only')),
    delete: () => Promise.reject(new Error('factes are read-only')),
    deleteMany: () => Promise.reject(new Error('facets are read-only')),
};

export default biosamplesFacetsDataProvider;
