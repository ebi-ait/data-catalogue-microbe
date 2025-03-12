import {QueryClient} from '@tanstack/react-query';
import React from 'react';
import {Admin, Resource, useStore} from 'react-admin';
import {customDataProvider} from "./delegatingDataProvider";
import {MyLayout} from "./layout";
import {SampleList} from "./SampleList";
import { themes, ThemeName } from './themes/themes';

const App: React.FC = () => {
    const [themeName] = useStore<ThemeName>('themeName', 'microbe');
    const lightTheme = themes.find(theme => theme.name === themeName)?.light;
    const darkTheme = themes.find(theme => theme.name === themeName)?.dark;
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
               disableTelemetry
               lightTheme={lightTheme}
               darkTheme={darkTheme}
               defaultTheme="light"
        >
            <Resource name="samples" list={SampleList}/>
        </Admin>
    );
};

export default App;
