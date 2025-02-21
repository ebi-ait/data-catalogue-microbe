import {Empty} from "ra-ui-materialui/src/list/Empty";
import {React, useState} from "react";
import {FilterList, FilterListItem, Loading, useGetList, useListContext, useGetListController, useRecordContext} from "react-admin";
import { Button, Menu, MenuItem } from '@mui/material';
import defaultfacetValues from '../facets.json'
import soilFacetValues from '../soil_facets.json'
import MarineFacetValues from '../marine_facets.json'
import SeedFacetValues from '../seed_facets.json'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


interface DynamicFilterListProps {
    source: string;
    label?: string; // Optional
    values?: string[]; // Optional
}
interface Facet {
    label: string;
    type: string;
    count: number;
    content: { label: string, count: number }[];
}

const useFacetValues = (source: string, values?: string[]) => {
    if (values) return { facetValues: values, isPending: false, error: null };
    const context = useListContext().defaultTitle;
    var facetValues = defaultfacetValues;
    switch (context) {
        case "Soil samples":
            facetValues = soilFacetValues;
            break
        case "Marine samples":
            facetValues = MarineFacetValues;
            break
        case "Seed samples":
            facetValues = SeedFacetValues;
            break
        };
    const data = facetValues
    const isPending = false;
    const error = null;
    if (data) {
        const facetValues = data
            .filter(facet => facet.label === source)
            .flatMap(facet => facet.content)
            .map(content => content.label);
        return { facetValues, isPending, error };
    }
    return { facetValues: [], isPending, error };
};



export const FilterDropdown = ({ source, values, label }) => {
    const { facetValues, isPending, error } = useFacetValues(source, values);
    const { filterValues } = useListContext(); // Get active filters
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // Check if the current filter is active
    const isActive = filterValues?.[`attr:${source}`] !== undefined;

    // Get the currently selected filter value
    const selectedValue = filterValues?.[`attr:${source}`];

    return (
        <div>
            <Button
                onClick={handleClick}
                variant={isActive ? "contained" : "outlined"} // Change style when active
                color={isActive ? "primary" : "inherit"} // Change color when active
                sx={{ width: 250, justifyContent: "space-between"}}
                endIcon={<ExpandMoreIcon />}
            >
                {label || source}
            </Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                <FilterList source={source} label={label || source}>
                    {facetValues.map((value) => {
                        const filterItemValue = { [`attr:${source}`]: value };
                        return (
                            <MenuItem key={value} onClick={handleClose}>
                                <FilterListItem
                                    key={value}
                                    label={value}
                                    value={filterItemValue}
                                />
                            </MenuItem>
                        );
                    })}
                </FilterList>
            </Menu>

            {/* Display the selected value below the button */}
            {isActive && (
                <div style={{ marginTop: 8, marginBottom: 8, fontSize: 14, color: "gray" }}>
                    Selected: {selectedValue}
                </div>
            )}
        </div>
    );
};