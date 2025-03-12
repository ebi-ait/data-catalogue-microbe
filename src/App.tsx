import {QueryClient} from '@tanstack/react-query';
import React from 'react';
import {Admin, Resource} from 'react-admin';
import {customDataProvider} from "./delegatingDataProvider";
import {MyLayout} from "./Layout";
import {SampleList} from "./SampleList";


const App: React.FC = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 60 * 1000, // 60 minutes
            },
        },
    });
    return (

        <Admin dataProvider={customDataProvider}
               queryClient={queryClient}
               layout={MyLayout}
        >
            <Resource name="samples" list={SampleList}/>
        </Admin>
    );
};

export default App;
