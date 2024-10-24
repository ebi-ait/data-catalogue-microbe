import React from 'react';
import { Admin, Resource, List, Datagrid, TextField } from 'react-admin';
import biosamplesDataProvider from './biosamplesDataProvider';


const SampleList: React.FC = (props) => (
    <List {...props}>
        <Datagrid rowClick="show">
            <TextField source="characteristics.organism[0].text" label="Organism"/>
            <TextField source="characteristics.soil type[0].text" label="Soil Type"/>
            <TextField source="characteristics.biome[0].text" label="Biome"/>
            <TextField source="accession" />
            <TextField source="characteristics.SRA accession[0].text" label="SRA Accession" />
            <TextField source="characteristics.environmental medium[0].text" label="Environmental Medium" />
            <TextField source="characteristics.geographic location (country and/or sea)[0].text" label="Country/Sea" />
        </Datagrid>
    </List>
);

const App: React.FC = () => (
    <Admin dataProvider={biosamplesDataProvider}>
        <Resource name="samples" list={SampleList} />
    </Admin>
);

export default App;
