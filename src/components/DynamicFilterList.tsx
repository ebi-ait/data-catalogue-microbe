import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Accordion, AccordionDetails, AccordionSummary, Typography, Chip, Stack} from '@mui/material';
import {useListFilterContext} from "ra-core";
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
    const { filterValues } = useListFilterContext();

    const {data, isPending, error} = useGetList<Facet>('facets', {
        filter: {
            facet: source,
            ...filterValues
        }
    });
    if (data) {
        const facetValues = data
            .filter(facet => facet.label === source)
            .flatMap(facet => facet.content);
        if (facetValues.length == 0) {
            return {facetValues: defaultFacetValues.map(v => ({label: v})), isPending: false, error: null}
        }
        return {facetValues, isPending, error};
    }
    return {facetValues: [], isPending, error};
};


export const DynamicFilterList = ({source, label, defaultValues}: DynamicFilterListProps) => {
    const {facetValues, isPending, error} = useFacetValues(source, defaultValues);
    const [expanded, setExpanded] = useState(false);
    const translate = useTranslate();

    const { filterValues } = useListFilterContext();

    if (isPending) {
        return <Loading loadingSecondary={`Loading ${source}`}
                        loadingPrimary={''}/>;
    }
    if (error) {
        console.error(`Error fetching values for column ${source} of facets: ${error.message}`);
        return <p>Could not load filter values for {source}</p>;
    }
    return (
        <Accordion expanded={expanded}
                   onChange={() => setExpanded(!expanded)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                <Stack>
                    <Typography component="span">{translate(label || source)}</Typography>
                    {filterValues.hasOwnProperty('attr:'+source)?<Chip label={filterValues['attr:'+source]}/>:''}
                </Stack>
            </AccordionSummary>
            {/*TODO: move to a css file */}
            <AccordionDetails sx={{
                maxHeight: "200px", // Limit height
                overflowY: "auto",  // Enable scrolling if content exceeds max height
                padding: "8px",
                "&::-webkit-scrollbar": {
                    width: "8px",
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#bbb",
                    borderRadius: "4px",
                },

            }}>
                <FilterList source={source}
                            label="" icon="">
                    {facetValues.sort((a, b) => a.label.localeCompare(b.label))
                        .map(value => {
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

