import {Card, CardContent} from '@mui/material';
import React from 'react';
import {
    Admin,
    Button,
    Datagrid,
    FilterButton,
    FilterList,
    FilterListItem,
    List,
    Resource,
    TextField,
    TopToolbar,
    useListContext,
    WrapperField
} from 'react-admin';
import {customDataProvider} from "./delegatingDataProvider";


const CharacteristicField = props => {
    const {source} = props;
    return <WrapperField>
        <TextField source={`characteristics.${source}[0].text`}/>
        &nbsp;
        <TextField source={`characteristics.${source}[0].unit`}/>
    </WrapperField>
};


function DynamicFilterList(props: { source: string, values: string[] }) {
    const {source, values} = props;
    let {label} = props;
    if(!label) {
        label=source;
    }
    return <FilterList source={source} label={label}>
        {
            values.map(
                value => {
                    var filterItemValue=Object.fromEntries([
                        ['attr:'+source, value]]);
                    return (
                        <FilterListItem label={value}
                                        key={value}
                                        value={filterItemValue}/>);
                }
            )
        }
    </FilterList>;
}

const SampleFilterSidebar = (props) => {
    return (
        <Card>
            <CardContent>
                <DynamicFilterList source={'center'}
                                   values={['CABI', 'AIT', 'INRAE', 'HMGU', 'Station Biologique de Roscoff']}/>
                <DynamicFilterList source={'freezing method'}
                                   values={['Progressive freezer','Controlled Rate Freezer','Ultra Low Temperature Freezer','none']}/>
            </CardContent>
        </Card>
    )
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
const SampleList: React.FC = (props) => (
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

const App: React.FC = () => (
    <Admin dataProvider={customDataProvider}>
        <Resource name="samples" list={SampleList}/>
    </Admin>
);

export default App;
