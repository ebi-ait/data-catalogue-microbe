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
                text: {
                    primary: '#00508C'
                },
                primary: {
                    main: '#92c3de',
                    contrastText: '#354982',
                },
                secondary: {
                    main: '#5488c7',
                    contrastText: '#fff',
                },
            },
            components: {
                ...defaultLightTheme.components,
                RaSidebar: BW_SIDEBAR_OVERRIDE,
                MuiSvgIcon: {
                    styleOverrides: {
                        root: {
                            color: "#265aa6", // Change default icon color
                        },
                    },
                },
                RaButton: {
                    styleOverrides: {
                        root: {
                            color: "#265aa6", // Change default icon color
                        },
                    },
                }
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
