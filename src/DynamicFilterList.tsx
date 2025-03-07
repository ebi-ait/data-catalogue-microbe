import React, {useCallback} from "react";
import {FilterList, FilterListItem, Loading, useGetList} from "react-admin";

interface DynamicFilterListProps {
    source: string;
    label?: string; // Optional
    defaultValues?: string[]; // Optional
}

interface Facet {
    label: string;
    type: string;
    count: number;
    content: { label: string, count: number }[];
}

const useFacetValues = (source: string, defaultFacetValues?: string[]) => {

    const {data, isPending, error} = useGetList<Facet>('facets', {});
    if (data) {
        const facetValues = data
            .filter(facet => facet.label === source)
            .flatMap(facet => facet.content)
            .map(content => content.label);
        if(facetValues.length==0){
            return {facetValues: defaultFacetValues, isPending: false, error: null}
        }
        return {facetValues, isPending, error};
    }
    return {facetValues: [], isPending, error};
};

export const DynamicFilterList = ({source, label, defaultValues}: DynamicFilterListProps) => {
    const {facetValues, isPending, error} = useFacetValues(source, defaultValues);

    if (isPending) {
        return <Loading loadingSecondary={`Loading ${source}`}/>;
    }
    if (error) {
        console.error(`Error fetching values for column ${source} of facets: ${error.message}`);
        return <p>Could not load filter values for {source}</p>;
    }
    return (
        <FilterList source={source}
                    label={label || source}>
            {facetValues.map(value => {
                const filterItemValue = {[`attr:${source}`]: value};
                return (
                    <FilterListItem
                        key={value}
                        label={value}
                        value={filterItemValue}
                    />
                );
            })}
        </FilterList>
    );
};

