import React from "react";
import {
    DatagridConfigurable,
    ExportButton,
    FilterButton,
    List,
    SelectColumnsButton,
    TextField,
    TopToolbar,
    WrapperField
} from "react-admin";
import {ClearFilterButton} from "./ClearFilterButton";
import {SamplesFilterSidebar} from "./SamplesFilterSidebar";
import {SelfLinkField} from "./SelfLinkField";


const CharacteristicField = props => {
    const {source, label, ...rest} = props;
    return <WrapperField label={label}>
        <TextField source={`characteristics.${source}[0].text`}
                   label={label}
                   {...rest}/>
        &nbsp;
        <TextField source={`characteristics.${source}[0].unit`} {...rest}/>
    </WrapperField>
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
        </DatagridConfigurable>
    </List>
);
