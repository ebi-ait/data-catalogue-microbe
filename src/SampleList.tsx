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
        <Card sx={{ order: -1, mr: 2, mt: 8, width: '25vw' }}>
            <CardContent>
                <DynamicFilterList source={'organism'}/>
                <DynamicFilterList source={'center'}/>
                {/* TODO: freezing is hard coded because it is not available in the
                          facets resource
                */}
                <DynamicFilterList source={'freezing method'}
                                   values={[
                                       'Controlled Rate Freezer',
                                       'Encapsulation',
                                       'Liquid nitrogen',
                                       'MrFrosty',
                                       'Progressive freezer',
                                       'Ultra Low Temperature Freezer',
                                       'none',
                                       'not provided'
                                   ]}/>
                <DynamicFilterList source={'targets'}
                                   values={['-195.0',
                                       '16S bact',
                                       '16S bacteria',
                                       '16S bact, 16S Archaea, IST',
                                       'IST'
                                   ]}
                />
                <DynamicFilterList source={'checklist'}
                                   values={['ERC000020','ERC000024']}
                />
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
            <CharacteristicField source="checklist"/>
            <TextField source="accession"/>
        </Datagrid>
    </List>
);
