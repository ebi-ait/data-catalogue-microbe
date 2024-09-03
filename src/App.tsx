import React from 'react';
import { Admin, Resource, List, Datagrid, TextField } from 'react-admin';
import biosamplesDataProvider from './biosamplesDataProvider';


const SampleList: React.FC = (props) => (
    <List {...props}>
        <Datagrid rowClick="show">
            <TextField source="characteristics.organism[0].text" label="Organism"/>
            <TextField source="characteristics.soil_type[0].text" label="Soil Type"/>
            <TextField source="characteristics.biome[0].text" label="Biome"/>
            <TextField source="accession" />
            <TextField source="characteristics.SRA accession[0].text" label="SRA Accession" />
        </Datagrid>
    </List>
);

const App: React.FC = () => (
    <Admin dataProvider={biosamplesDataProvider}>
        <Resource name="samples" list={SampleList} />
    </Admin>
);

export default App;
