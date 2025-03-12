import {Biotech, ScatterPlot, Terrain, Tsunami} from "@mui/icons-material";
import {stringify} from "query-string";
import React from "react";
import {AppBar, Layout, Menu, MenuItemLink, Sidebar, TitlePortal} from "react-admin";
import {Box} from '@mui/material';
import logo from './assets/Microbe_RGB.png';

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
        <Box sx={{flex: "1"}}/>
        <Box sx={{flex: "1"}}>
            <img
                alt={'Microbe Logo'}
                title={'Microbe Logo'}
                height={80}
                src={logo}
            />
        </Box>
        <Box sx={{flex: "1"}}/>
    </AppBar>
);
const FilteredResourceLink = (props: { resource, filter, icon, primaryText }) => {
    return <MenuItemLink
        to={{
            pathname: '/' + props.resource,
            search: stringify({
                filter: JSON.stringify(props.filter),
            }),
        }}
        primaryText={props.primaryText}
        leftIcon={props.icon}
    />;
};
const FieldFilterLink = (props:{resource, field, value, icon}) => {
    return <FilteredResourceLink resource={props.resource}
                                 filter={{[props.field]: props.value}}
                                 primaryText={props.value}
                                 icon={props.icon}/>
};
export const MyMenu = () => {
    return (
        <Menu>
            {/*<Menu.DashboardItem/>*/}
            <Menu.Item to="/samples" primaryText="Samples" leftIcon={<Biotech/>}/>
            <FieldFilterLink resource="samples"
                             field={`attr:organism`}
                             value={'marine metagenome'}
                             icon={<Tsunami/>}/>
            <FieldFilterLink resource="samples"
                             field={`attr:organism`}
                             value={'seed metagenome'}
                             icon={<ScatterPlot/>}/>
            <FieldFilterLink resource="samples"
                             field={`attr:organism`}
                             value={'soil metagenome'}
                             icon={<Terrain/>}/>
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
