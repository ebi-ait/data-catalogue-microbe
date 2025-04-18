import {Biotech, ScatterPlot, Terrain, Tsunami} from "@mui/icons-material";
import {stringify} from "query-string";
import React from "react";
import {AppBar, Layout, Menu, MenuItemLink, Sidebar, TitlePortal} from "react-admin";

export const MyLayout = ({children}) => (
    <Layout
        // appBar={MyAppBar}
        menu={MyMenu}
        appBarAlwaysOn={true}
        sidebar={MySidebar}>
        {children}
    </Layout>
);
export const MyAppBar = () => (
    <AppBar color="primary">
        <TitlePortal/>
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
const FieldFilterLink = (props: { resource, field, value, icon, title }) => {
    return <FilteredResourceLink resource={props.resource}
                                 filter={{[props.field]: props.value}}
                                 primaryText={props.title ?? props.value}
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
                             title={'Marine Samples'}
                             icon={<Tsunami/>}/>
            <FieldFilterLink resource="samples"
                             field={`attr:organism`}
                             value={'seed metagenome'}
                             title={'Seed Samples'}
                             icon={<ScatterPlot/>}/>
            <FieldFilterLink resource="samples"
                             field={`attr:organism`}
                             value={'soil metagenome'}
                             title={'Soil Samples'}
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
