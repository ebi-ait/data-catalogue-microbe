import React from "react";
import {TextField, WrapperField} from "react-admin";

export const CharacteristicField = props => {
    const {source, label, ...rest} = props;
    return <WrapperField label={label}>
        <TextField source={`characteristics.${source}[0].text`}
                   label={label}
                   {...rest}/>
        &nbsp;
        <TextField source={`characteristics.${source}[0].unit`} {...rest}/>
    </WrapperField>
};
