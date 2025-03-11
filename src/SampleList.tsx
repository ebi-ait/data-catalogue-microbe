import React from "react";
import {
    Button,
    DatagridConfigurable,
    ExportButton,
    FilterButton,
    List,
    SelectColumnsButton,
    TextField,
    UrlField,
    TopToolbar,
    useListContext,
    WrapperField
} from "react-admin";
import {SamplesFilterSidebar} from "./SamplesFilterSidebar";
import {SelfLinkField} from "./SelfLinkField";
// import {SamplesFilterSidebar} from "./SamplesFilterSidebar";


const CharacteristicField = props => {
    const {source} = props;
    return <WrapperField>
        <TextField source={`characteristics.${source}[0].text`}/>
        &nbsp;
        <TextField source={`characteristics.${source}[0].unit`}/>
    </WrapperField>
};

const ClearFilterButton = () => {
    const {filterValues, setFilters} = useListContext();

    // Check if any filter is applied
    const hasFilters = Object.keys(filterValues).length > 0;

    if (!hasFilters) return null;

    const clearFilters = () => {
        setFilters({}, {}); // Pass empty objects to clear all filters
    };

    return <Button label="Clear Filters"
                   onClick={clearFilters}/>;
};
const filters = [
];
const ListActions = () => (
    <TopToolbar>
        <FilterButton/>
        <SelectColumnsButton/>
        <ClearFilterButton/>
        <ExportButton/>
    </TopToolbar>
);

export const SampleList: React.FC = (props) => (
    <List {...props}
          actions={<ListActions/>}
          aside={<SamplesFilterSidebar/>}
          filters={filters}
          emptyWhileLoading
    >
        <DatagridConfigurable rowClick="show"
                              omit={['name', 'description', 'collection date']}>
            <TextField source="name"/>
            <SelfLinkField source="accession"/>
            <CharacteristicField source="center"/>
            <CharacteristicField source="description"/>
            <CharacteristicField source="time point"/>
            <CharacteristicField source="cryoprotectant"/>
            <CharacteristicField source="freezing method"/>
            <CharacteristicField source="preservation temperature"/>
            <CharacteristicField source="targets"/>
            <CharacteristicField source="checklist"/>
            <CharacteristicField source="collection date"/>
        </DatagridConfigurable>
    </List>
);
