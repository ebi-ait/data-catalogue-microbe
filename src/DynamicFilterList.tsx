import React from "react";
import {FilterList, FilterListItem} from "react-admin";

export const DynamicFilterList = (props: { source: string, values: string[] }) => {
    const {source, values} = props;
    let {label} = props;
    if (!label) {
        label = source;
    }
    return <FilterList source={source} label={label}>
        {
            values.map(
                value => {
                    var filterItemValue = Object.fromEntries([
                        ['attr:' + source, value]]);
                    return (
                        <FilterListItem label={value}
                                        key={value}
                                        value={filterItemValue}/>);
                }
            )
        }
    </FilterList>;
};

