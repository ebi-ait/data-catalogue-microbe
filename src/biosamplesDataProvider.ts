import {stringify} from 'query-string';
import {DataProvider, fetchUtils} from 'react-admin';
import {defaultFilter} from "./constants";
import {notImplemented} from "./delegatingDataProvider";

// TODO: read /microbe from config.js
const apiUrl = '/microbe/api/biosamples/samples';
const httpClient = fetchUtils.fetchJson;

const biosamplesDataProvider: DataProvider = {
    getList: (resource, params) => {
        const {page, perPage} = params.pagination;
        const {field, order} = params.sort;
        const {filter} = params;

        const query = {
            filter: structuredClone(defaultFilter),
            page:page-1, // spring boot is zero pased, react-admin os 1 based
            size: perPage
        };
        if(filter.q) {
            query['text'] = filter.q;
            delete filter.q;
        }
        if (filter) {
            Object.entries(filter)
                .map(([attr, value]) => `${attr}:${value}`)
                .forEach(s => query.filter.push(s));
        }
        const url = `${apiUrl}?${stringify(query, {encode: false})}`;
        return httpClient(url).then(({headers, json}) => {
            let data = json._embedded?.[resource] || [];
            return ({
                data: data.map((record: any) => {
                    return {
                        ...record,
                        id: record.accession,
                        // ...Object.entries(record.characteristics).map(x=>x[1][0].text)
                    };
                }),
                pageInfo: {
                    hasNextPage: Boolean(json._links.next),
                    hasPreviousPage: Boolean(json._links.previous)
                },
                total: json.page.totalElements

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
    update: notImplemented,
    updateMany: notImplemented,
    create: notImplemented,
    delete: notImplemented,
    deleteMany: notImplemented,
};

export default biosamplesDataProvider;
