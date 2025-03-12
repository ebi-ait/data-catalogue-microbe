import {Box} from '@mui/material';
import {QueryClient} from '@tanstack/react-query';
import React from 'react';
import {Admin, AppBar, Layout, Menu, Resource, Sidebar, TitlePortal, useCreatePath} from 'react-admin';
import logo from './assets/Microbe_RGB.png';
import {customDataProvider} from "./delegatingDataProvider";
import {SampleList} from "./SampleList";
import {Terrain, Tsunami, ScatterPlot, Biotech} from '@mui/icons-material'
import {stringify} from 'query-string';


export const MyLayout = ({children}) => (
    <Layout appBar={MyAppBar}
            menu={MyMenu}
            appBarAlwaysOn={true}
            sidebar={MySidebar}>
        {children}
    </Layout>
);

export const MyAppBar = () => (
    <AppBar color="primary">
        <TitlePortal/>
        {/*<Box sx={{flex: "1"}}/>*/}
        {/*<Box sx={{flex: "1"}}>*/}
        {/*    <img*/}
        {/*        alt={'Microbe Logo'}*/}
        {/*        title={'Microbe Logo'}*/}
        {/*        height={80}*/}
        {/*        src={logo}*/}
        {/*    />*/}
        {/*</Box>*/}
        {/*<Box sx={{flex: "1"}}/>*/}
    </AppBar>
);

// menu:   http://localhost:5173/microbe#/samples?filter=attr%3Aorganism%3Asoil%20metagenome
// filter: http://localhost:5173/microbe#/samples?filter=%7B%22attr%3Aorganism%22%3A%22soil%20metagenome%22%7D&order=ASC&page=1&perPage=10&sort=id
const FilteredResourceLink = (props: { resource, filter, icon }) => {
    const createPath = useCreatePath();
    const filterQueryString = JSON.stringify({filter:props.filter});
    const filterPath = createPath({resource: props.resource, type: "list"})+'?'+filterQueryString;
    return <Menu.Item
        to={filterPath}
        leftIcon={props.icon}
    />;
};

export const MyMenu = () => {
    return (
        <Menu>
            {/*<Menu.DashboardItem/>*/}
            <Menu.Item to="/samples" primaryText="Samples" leftIcon={<Biotech/>}/>
            {/*<FilteredResourceLink resource="samples" filter={{filter: "attr:organism:soil metagenome"}} icon={<Terrain/>}/>*/}
            {/*<FilteredResourceLink resource="samples" filter={{filter: "attr:organism:marine metagenome"}} icon={<Tsunami/>}/>*/}
            {/*<FilteredResourceLink resource="samples" filter={{filter: "attr:organism:seed metagenome"}} icon={<ScatterPlot/>}/>*/}
        </Menu>
    );
};

const MySidebar = (props) => (
    <Sidebar
        sx={{
            "& .RaSidebar-drawerPaper": {
                backgroundColor: "red",
            },
        }}
        {...props}
    />
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
