import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Accordion, AccordionDetails, AccordionSummary, Typography} from '@mui/material';
import React, {useState} from "react";
import {FilterList, FilterListItem, Loading, useGetList, useTranslate} from "react-admin";

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

    const {data, isPending, error} = useGetList<Facet>('facets');
    if (data) {
        const facetValues = data
            .filter(facet => facet.label === source)
            .flatMap(facet => facet.content);
        if (facetValues.length == 0) {
            return {facetValues: defaultFacetValues.map(v=>({label:v})), isPending: false, error: null}
        }
        return {facetValues, isPending, error};
    }
    return {facetValues: [], isPending, error};
};


export const DynamicFilterList = ({source, label, defaultValues}: DynamicFilterListProps) => {
    const {facetValues, isPending, error} = useFacetValues(source, defaultValues);
    const [expanded, setExpanded] = useState(true);
    const translate = useTranslate();

    if (isPending) {
        return <Loading loadingPrimary={''} loadingSecondary={`Loading ${source}`}/>;
    }
    if (error) {
        console.error(`Error fetching values for column ${source} of facets: ${error.message}`);
        return <p>Could not load filter values for {source}</p>;
    }
    return (
        <Accordion expanded={expanded}
                   onChange={() => setExpanded(!expanded)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                <Typography>{translate(label || source)}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <FilterList source={source}
                            label="">
                    {facetValues.map(value => {
                        const filterItemValue = {[`attr:${source}`]: value.label};
                        return (
                            <FilterListItem
                                key={value.label}
                                label={translate(value.label)}
                                value={filterItemValue}
                            />
                        );
                    })}
                </FilterList>
            </AccordionDetails>
        </Accordion>
    );
};

