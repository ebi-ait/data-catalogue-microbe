import CancelIcon from "@mui/icons-material/CancelOutlined";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Accordion, AccordionDetails, AccordionSummary, Chip, Stack, Typography} from '@mui/material';
import {useListFilterContext} from "ra-core";
import React, {useState} from "react";
import {FilterList, FilterListItem, Loading, useGetList, useTranslate} from "react-admin";


interface DynamicFilterListProps {
    source: string;
    label?: string; // Optional
    defaultValues?: string[]; // Optional
}

interface FacetLabelCount {
    label: string;
    count?: number;
}

interface Facet {
    label: string;
    type: string;
    count: number;
    content: FacetLabelCount[];
}

interface UseFacetValuesValue {
    facetValues: FacetLabelCount[];
    isPending: boolean;
    error?: Error|null;
}

const useFacetValues= (source: string, defaultFacetValues?: string[]) : UseFacetValuesValue  => {
    const { filterValues } = useListFilterContext();

    const {data, isPending, error} = useGetList<Facet>('facets', {
        filter: {
            facet: source,
            ...filterValues
        }
    });

    const extracted: (v: string) => FacetLabelCount = (v: string): FacetLabelCount => ({label: v});

    if (data) {
        const facetValues: FacetLabelCount[] = data
            .filter(facet => facet.label === source)
            .flatMap(facet => facet.content);
        if (facetValues.length == 0) {
            return {
                facetValues: defaultFacetValues?.map(extracted),
                isPending: false
            }
        }
        return {facetValues, isPending, error};
    }
    return {facetValues: [], isPending, error};
};


export const DynamicFilterList = ({source, label, defaultValues}: DynamicFilterListProps) => {
    const {facetValues, isPending, error} = useFacetValues(source, defaultValues);
    const [expanded, setExpanded] = useState(false);
    const translate = useTranslate();

    const { filterValues, setFilters } = useListFilterContext();

    const toggleFilter = (value, filters) => {
        const isSelected = filters[Object.keys(value)]==Object.values(value);

        if (isSelected) {
            const keysToRemove = Object.keys(value);
            return Object.keys(filters).reduce(
                (acc, key) =>
                    keysToRemove.includes(key)
                        ? acc
                        : { ...acc, [key]: filters[key] },
                {}
            );
        }

        return { ...filters, ...value };
    };

    const handleDeleteFilter = (value) => {
        setFilters(toggleFilter({ [`attr:${source}`] : value }, filterValues));
    };


    if (isPending) {
        return <Loading loadingSecondary={`Loading ${source}`}
                        loadingPrimary={''}/>;
    }
    if (error) {
        console.error(`Error fetching values for column ${source} of facets: ${error.message}`);
        return <p>Could not load filter values for {source}</p>;
    }

    function shouldShowSelectedValues() {
        return (filterValues.hasOwnProperty('attr:' + source) && !expanded);
    }

    return (
        <Accordion expanded={expanded}
                   onChange={() => setExpanded(!expanded)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                <Stack>
                    <Typography component="span">{translate(label || source)}</Typography>
                    {shouldShowSelectedValues()
                    ?<Chip label={filterValues['attr:' + source]}
                           onDelete={event => {
                               event.stopPropagation();
                               handleDeleteFilter(filterValues['attr:' + source]);
                           }}
                           deleteIcon={<CancelIcon/>}/>
                    :''}
                </Stack>
            </AccordionSummary>
            {/*TODO: move to a css file */}
            <AccordionDetails sx={{
                maxHeight: "200px", // Limit height
                overflowY: "scroll",  // Enable scrolling if content exceeds max height
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
                    {facetValues
                        ?.sort((a, b) => a.label.localeCompare(b.label))
                        .map(value => {
                            const filterItemValue = {[`attr:${source}`]: value.label};
                            return (
                                <FilterListItem
                                    key={value.label}
                                    label={`${translate(value.label)} (${value.count})`}
                                    value={filterItemValue}
                                    toggleFilter={toggleFilter}
                                />
                            );
                        })}
                </FilterList>
            </AccordionDetails>
        </Accordion>
    );
};

