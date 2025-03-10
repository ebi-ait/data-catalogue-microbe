import {Card, CardContent} from "@mui/material";
import React from "react";
import {FilterLiveSearch, SavedQueriesList} from "react-admin";
import {DynamicFilterList} from "./DynamicFilterList";

export const SamplesFilterSidebar = (props) => {
    return (
        <Card sx={{order: -1, mr: 2, mt: 8, width: '25vw'}}>
            <CardContent>
                <FilterLiveSearch source="q"
                                  label="Search"
                                  placeholder={"exact search phrase"}/>
                <SavedQueriesList />
                <DynamicFilterList source={'organism'}/>
                <DynamicFilterList source={'center'}
                                   defaultValues={['AIT', 'CABI', 'INRAE', 'Station Biologique de Roscoff']}/>

                <DynamicFilterList source={'freezing method'}
                                   defaultValues={[
                                       'Controlled Rate Freezer',
                                       'Encapsulation',
                                       'Liquid nitrogen',
                                       'MrFrosty',
                                       'Progressive freezer',
                                       'Ultra Low Temperature Freezer',
                                       'none',
                                       'not provided'
                                   ]}/>
                <DynamicFilterList source={'targets'}
                                   defaultValues={[
                                       '-195.0',
                                       '16S bact',
                                       '16S bacteria',
                                       '16S bact, 16S Archaea, IST',
                                       'IST'
                                   ]}
                />
                <DynamicFilterList source={'checklist'}
                                   defaultValues={['ERC000020', 'ERC000022', 'ERC000024']}
                />
            </CardContent>
        </Card>
    )
};
