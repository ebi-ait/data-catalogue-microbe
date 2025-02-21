import {Card, CardContent, CardHeader} from "@mui/material";
import React from "react";
import {SelectColumnsButton, Button, ExportButton, DatagridConfigurable, List, TextField, TopToolbar, useListContext, WrapperField, UrlField, FunctionField, SelectInput, FilterLiveSearch} from "react-admin";
import {FilterDropdown} from "./DynamicFilterList";

const CharacteristicField = props => {
    const {source} = props;
    return <WrapperField>
        <TextField source={`characteristics.${source}[0].text`}/>
        &nbsp;
        <TextField source={`characteristics.${source}[0].unit`}/>
    </WrapperField>
};

const AccessionRender = record => (
    <a target="_blank" href={`https://www.ebi.ac.uk/biosamples/samples/${record.accession}`}>
        {record.accession}
    </a>
    );


const BioSamplesAccessionField = (props) => {
    const {source} = props;
    return <WrapperField>
        <FunctionField
        label="Biosamples entry"
    render={AccessionRender}
/>
    </WrapperField>
};


const ClearFilterButton = () => {
    const {setFilters} = useListContext();
    const filters = useListContext().filterValues;
    if (Object.keys(filters).length === 0) {
        return null;
    }

    const clearFilters = () => {
        setFilters({}, {}); // Pass empty objects to clear all filters
    };

    return <Button label="Clear Filters" onClick={clearFilters}/>;
};
const filters = [
    // <SearchInput source="q" alwaysOn />,
];
const ListActions = () => (
    <TopToolbar sx={{ order: -1 }}>
        <SelectColumnsButton />
    </TopToolbar>
);
export const SampleFilterSidebar = (props) => {
    return (
        <Card sx={{ order: -1, mr: 2, mt: 9, width: 300 }} variant="outlined">
            <CardHeader title="Filters" subheader="Please select from the dropdown menus below to filter the samples"/>
            <CardContent>
                <FilterDropdown source={'environmental medium'}/>
                <FilterDropdown source={'time point'}/>
                <FilterDropdown source={'cryoprotectant'}/>
                <FilterDropdown source={'freezing method'}/>
                <FilterDropdown source={'preservation method'}/>
                <FilterDropdown source={'targets'}/>
                <br />
                <ClearFilterButton/>
            </CardContent>
        </Card>
    )
};


export const SampleList: React.FC = (props) => (
    <List {...props}
          actions={<ListActions/>}
          aside={<SampleFilterSidebar/>}
          filters={filters}

    >
        <DatagridConfigurable rowClick="show">
            <TextField source="name"/>
            <BioSamplesAccessionField source="accession" />
            <CharacteristicField source="center"/>
            <CharacteristicField source="time point"/>
            <CharacteristicField source="cryoprotectant"/>
            <CharacteristicField source="freezing method"/>
            <CharacteristicField source="preservation temperature"/>
            <CharacteristicField source="targets"/>
        </DatagridConfigurable>
    </List>
);
