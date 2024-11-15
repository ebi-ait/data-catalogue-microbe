import React from 'react';
import { Admin, Resource, List, Datagrid, TextField } from 'react-admin';
import biosamplesDataProvider from './biosamplesDataProvider';


const SampleList: React.FC = (props) => (
    <List {...props}>
        <Datagrid rowClick="show">
            <TextField source="characteristics.center[0].text" label="Centre"/>
            <TextField source="characteristics.time point[0].text" label="Time Point"/>
            <TextField source="characteristics.cryoprotectant[0].text" label="Cryoprotectant" />
            <TextField source="characteristics.freezing method[0].text" label="Freezing Method" />
            <TextField source="characteristics.preservation temperature[0].text" label="Preservation Temperature" />
            <TextField source="characteristics.targets[0].text" label="Targets" />
            <TextField source="accession" />
        </Datagrid>
    </List>
);

const App: React.FC = () => (
    <Admin dataProvider={biosamplesDataProvider}>
        <Resource name="samples" list={SampleList} />
    </Admin>
);

export default App;
