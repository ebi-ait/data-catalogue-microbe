import React from "react";
import {Button, useListContext} from "react-admin";
import {FilterAltOff} from "@mui/icons-material";

export const ClearFilterButton = () => {
    const {filterValues, setFilters} = useListContext();

    // Check if any filter is applied
    const hasFilters = Object.keys(filterValues).length > 0;

    if (!hasFilters) return null;

    const clearFilters = () => {
        setFilters({}, {}); // Pass empty objects to clear all filters
    };

    return <Button label="Clear Filters"
                   onClick={clearFilters}
                   startIcon={<FilterAltOff/>}/>;
};
