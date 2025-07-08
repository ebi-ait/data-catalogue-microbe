import {Box, Card, CardContent} from "@mui/material";
import React from "react";
import {SavedQueriesList} from "react-admin";
import logo from "../assets/Microbe_RGB.png";
import {ClearFilterButton} from "./ClearFilterButton";
import {DynamicFilterList} from "./DynamicFilterList";

export const SamplesFilterSidebar = (props) => {
    return (
        <Card sx={{order: -1, mr: 2, mt: 8, width: '25vw'}}>
            <CardContent>
                <Box sx={{flex: "1"}}>
                    <img
                        alt={'Microbe Logo'}
                        title={'Microbe Logo'}
                        height={50}
                        src={logo}
                    />
                </Box>
                <SavedQueriesList />
                <ClearFilterButton/>
                <DynamicFilterList source={'organism'}/>
                <DynamicFilterList source={'time point'}/>
                <DynamicFilterList source={'center'}/>
                <DynamicFilterList source={'freezing method'}/>
                <DynamicFilterList source={'targets'}/>
                <DynamicFilterList source={'checklist'}/>
            </CardContent>
        </Card>
    )
};
