import {QueryClient} from '@tanstack/react-query';
import React from 'react';
import {Admin, Resource} from 'react-admin';
import {customDataProvider} from "./delegatingDataProvider";
import {SampleList} from "./SampleList";


const App: React.FC = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 5 * 60 * 1000, // 5 minutes
            },
        },
    });
    return (

        <Admin dataProvider={customDataProvider}
               queryClient={queryClient}>
            <Resource name="Soil samples" list={SampleList}/>
            <Resource name="Seed samples" list={SampleList}/>
            <Resource name="Marine samples" list={SampleList}/>
        </Admin>
    );
};

export default App;
