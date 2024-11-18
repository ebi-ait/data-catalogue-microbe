import React, {useEffect, useState} from "react";
import {FilterList, FilterListItem, useDataProvider} from "react-admin";

export const DynamicFilterList = (props: { source: string }) => {
    const {source,values} = props;
    const [facetValues, setFacetValues] = useState<string[]>([]);

    const dataProvider = useDataProvider();
    useEffect(() => {
        const fetchFacetValues = async () => {
            let data;
            if(values) {
                setFacetValues(values);
            } else {
                try {
                    let {data} = await dataProvider.getList('facets',{})
                    data = data.filter(facet=>facet.label==source)
                        .flatMap(facet=>facet.content)
                        .map(facet=>facet.label);
                    setFacetValues(data);
                } catch (error) {
                    console.error(`Error fetching column values for column ${source} of facets: ${error.message}`);
                    throw error;
                }
            }
        };

        fetchFacetValues();
    }, [
        dataProvider,
        source
    ]);
    let {label} = props;
    if (!label) {
        label = source;
    }
    return <FilterList source={source} label={label}>
        {
            facetValues.map(
                value => {
                    var filterItemValue = Object.fromEntries([
                        ['attr:' + source, value]]);
                    return (
                        <FilterListItem label={value}
                                        key={value}
                                        value={filterItemValue}/>);
                }
            )
        }
    </FilterList>;
};

