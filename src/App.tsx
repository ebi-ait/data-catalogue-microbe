import {QueryClient} from '@tanstack/react-query';
import {ImageFieldClasses} from "ra-ui-materialui/src/field/ImageField";
import React from 'react';
import {Admin, AppBar, Layout, Resource, TitlePortal} from 'react-admin';
import {customDataProvider} from "./delegatingDataProvider";
import {SampleList} from "./SampleList";
import {Box} from '@mui/material';
import logo from './assets/Microbe_RGB.png';


export const MyLayout = ({ children }) => (
    <Layout appBar={MyAppBar}>
        {children}
    </Layout>
);

export const MyAppBar = () => (
    <AppBar color="primary">
        <TitlePortal />
        <Box sx={{ flex: "1",  }}>
            <img
                alt={'Microbe Logo'}
                title={'Microbe Logo'}
                height={100}
                src={logo}
            />
        </Box>
    </AppBar>
);

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
