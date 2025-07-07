import React from "react";
import {
    DatagridConfigurable,
    ExportButton,
    FilterButton,
    List,
    SelectColumnsButton,
    TextField,
    TopToolbar
} from "react-admin";
import {CharacteristicField} from "./CharacteristicField";
import {ClearFilterButton} from "./components/ClearFilterButton";
import {SamplesFilterSidebar} from "./components/SamplesFilterSidebar";
import {SelfLinkField} from "./components/SelfLinkField";
import {DataAvailability} from "./DataAvailability";


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
                              omit={[
                                  'checklist',
                                  'collection date',
                                  'description',
                                  'environmental medium',
                                  'name',
                                  'organism',
                                  'SRA accession',
                              ]}>
            <TextField source="name"/>
            <SelfLinkField source="accession"/>
            <CharacteristicField source="SRA accession" label="SRA Accession"/>
            <CharacteristicField source="center"/>
            <CharacteristicField source="description"/>
            <CharacteristicField source="organism"/>
            <CharacteristicField source="environmental medium"/>
            <CharacteristicField source="time point"/>
            <CharacteristicField source="cryoprotectant"/>
            <CharacteristicField source="freezing method"/>
            <CharacteristicField source="preservation temperature"/>
            <CharacteristicField source="targets"/>
            <CharacteristicField source="checklist"/>
            <CharacteristicField source="collection date"/>
            <DataAvailability source='externalReferences[0].url'
                              label='Data Status'/>
        </DatagridConfigurable>
    </List>
);
