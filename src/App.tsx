import React from 'react';
import {Admin, Resource} from 'react-admin';
import {customDataProvider} from "./delegatingDataProvider";
import {SampleList} from "./SampleList";


const App: React.FC = () => (
    <Admin dataProvider={customDataProvider}>
        <Resource name="samples" list={SampleList}/>
    </Admin>
);

export default App;
