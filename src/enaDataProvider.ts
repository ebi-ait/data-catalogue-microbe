import {stringify} from 'query-string';
import {DataProvider, fetchUtils, GetOneParams} from 'react-admin';
import {microbeEnaFilter} from "./constants";

// TODO: read /microbe from config.js
const apiUrl = '/microbe/api/ena/portal/api/search';
const httpClient = fetchUtils.fetchJson;

class EnaDataProvider implements DataProvider {
    private defaultFilter: Record<string, string>;

    constructor(
        private apiUrl: string,
        private httpClient: (url: string) => Promise<any>,
        defaultFilter: Record<string, string> = {}
    ) {
        this.defaultFilter = defaultFilter;
    }

    private buildQuery(filter: Record<string, string>): string {
        const mergedFilter = {...this.defaultFilter, ...filter};

        const query = {
            result: 'sample',
            fields: 'sample_accession,status,datahub,project_name',
            format: 'json',
            query: Object.entries(mergedFilter)
                .map(([attr, value]) => `${attr}="${value}"`)
                .join(' AND '),
        };
        return `${this.apiUrl}?${stringify(query, {encode: false})}`;
    }

    getList = (resource: string, params: any) => {
        const {filter} = params;
        const url = this.buildQuery(filter);
        return this.httpClient(url)
            .then(({headers, json}) => {
                const data = json || [];
                return {
                    data: data.map((record: any) => ({
                        ...record,
                        id: record.sample_accession,
                    })),
                    total: data.length,
                };
            });
    };

    getOne = (resource: string, params: GetOneParams) => {
        const filter = {sample_accession: params.id};
        const url = this.buildQuery(filter);
        return this.httpClient(url)
            .then(({json}) => {
                const data = json || [];
                if (!Array.isArray(data) || data.length === 0) {
                    throw new Error(`Sample with accession ${params.id} not found`);
                }
                const record = data[0];
                return {
                    data: {
                        ...record,
                        id: record.sample_accession,
                    },
                };
            });
    };

    private notImplemented = () => {
        return Promise.reject('Not implemented');
    };
    getMany = this.notImplemented;
    getManyReference = this.notImplemented;
    update = this.notImplemented;
    updateMany = this.notImplemented;
    create = this.notImplemented;
    delete = this.notImplemented;
    deleteMany = this.notImplemented;

    private notImplemented = () => {
        return Promise.reject('Not implemented');
    };
}

const enaDataProvider = new EnaDataProvider(apiUrl, httpClient, microbeEnaFilter);

export default enaDataProvider;
