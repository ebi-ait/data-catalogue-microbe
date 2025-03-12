import {
    defaultDarkTheme,
    defaultLightTheme,
    houseDarkTheme,
    houseLightTheme,
    nanoDarkTheme,
    nanoLightTheme,
    radiantDarkTheme,
    radiantLightTheme,
    RaThemeOptions,
} from 'react-admin';

// import { softDarkTheme, softLightTheme } from './softTheme';
// import { chiptuneTheme } from './chiptuneTheme';

export type ThemeName =
// | 'soft'
    | 'B&W'
    | 'default'
    | 'nano'
    | 'radiant'
    | 'house'
    | 'microbe'
// | 'chiptune'
    ;

export interface Theme {
    name: ThemeName;
    light: RaThemeOptions;
    dark?: RaThemeOptions;
}

const BW_SIDEBAR_OVERRIDE = {
    styleOverrides: {
        root: {
            '& .SubMenu .MuiMenuItem-root': {
                paddingLeft: 24,
            },
            '& .RaMenu-closed .SubMenu .MuiMenuItem-root': {
                paddingLeft: 8,
            },
        },
    },
};

export const themes: Theme[] = [
    // { name: 'soft', light: softLightTheme, dark: softDarkTheme },
    {name: 'default', light: defaultLightTheme, dark: defaultDarkTheme},
    {
        name: 'microbe',
        light: {
            ...defaultLightTheme,
            palette: {
                secondary: {
                    // light: '#6ec6ff',
                    main: '#5488c7',
                    // dark: '#0069c0',
                    contrastText: '#fff',
                },
                primary: {
                    // light: '#6ec6ff',
                    main: '#92c3de',
                    // dark: '#0069c0',
                    contrastText: '#fff',
                }
            },
            components: {
                ...defaultLightTheme.components,
                RaSidebar: BW_SIDEBAR_OVERRIDE,
            },
        },
        dark: {
            ...defaultDarkTheme,
            components: {
                ...defaultDarkTheme.components,
                RaSidebar: BW_SIDEBAR_OVERRIDE,
            },
        },
    },
    // {
    // name: 'B&W',
    // light: {
    //     ...bwLightTheme,
    //     components: {
    //         ...bwLightTheme.components,
    //         RaSidebar: BW_SIDEBAR_OVERRIDE,
    //     },
    // },
    // dark: {
    //     ...bwDarkTheme,
    //     components: {
    //         ...bwDarkTheme.components,
    //         RaSidebar: BW_SIDEBAR_OVERRIDE,
    //     },
    // },
    // },
    {name: 'nano', light: nanoLightTheme, dark: nanoDarkTheme},
    {name: 'radiant', light: radiantLightTheme, dark: radiantDarkTheme},
    {name: 'house', light: houseLightTheme, dark: houseDarkTheme},
    // { name: 'chiptune', light: chiptuneTheme },
];
