import {Card, CardContent} from "@mui/material";
import React from "react";
import {Button, Datagrid, FilterButton, List, TextField, TopToolbar, useListContext, WrapperField} from "react-admin";
import {DynamicFilterList} from "./DynamicFilterList";

const CharacteristicField = props => {
    const {source} = props;
    return <WrapperField>
        <TextField source={`characteristics.${source}[0].text`}/>
        &nbsp;
        <TextField source={`characteristics.${source}[0].unit`}/>
    </WrapperField>
};

const ClearFilterButton = () => {
    const {setFilters} = useListContext();

    const clearFilters = () => {
        setFilters({}, {}); // Pass empty objects to clear all filters
    };

    return <Button label="Clear Filters" onClick={clearFilters}/>;
};
const filters = [
    // <SearchInput source="q" alwaysOn />,
];
const ListActions = () => (
    <TopToolbar>
        <FilterButton/>
        {/*<SelectColumnsButton />*/}
        <ClearFilterButton/>
        {/*<ExportButton/>*/}
    </TopToolbar>
);
export const SampleFilterSidebar = (props) => {
    return (
        <Card>
            <CardContent>
                <DynamicFilterList source={'center'}
                                   values={['CABI', 'AIT', 'INRAE', 'HMGU', 'Station Biologique de Roscoff']}/>
                <DynamicFilterList source={'freezing method'}
                                   values={['Progressive freezer', 'Controlled Rate Freezer', 'Ultra Low Temperature Freezer', 'none']}/>
                <DynamicFilterList source={'organism'}/>

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
        <Datagrid rowClick="show">
            <CharacteristicField source="center"/>
            <CharacteristicField source="time point"/>
            <CharacteristicField source="cryoprotectant"/>
            <CharacteristicField source="freezing method"/>
            <CharacteristicField source="preservation temperature"/>
            <CharacteristicField source="targets"/>
            <TextField source="accession"/>
        </Datagrid>
    </List>
);
