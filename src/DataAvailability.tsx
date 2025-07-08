import {useFieldValue} from "ra-core";
import React from "react";
import {Loading, useGetOne, useRecordContext} from "react-admin";

export const DataAvailability = (props: any) => {
    const value = useFieldValue(props);
    const record = useRecordContext();
    const {data, isPending} = useGetOne('ena', {id: record.accession});

    if (isPending) {
        return <Loading loadingSecondary={`Loading`}
                        loadingPrimary={''}/>;
    }
    if (value) {
        return <>Public</>;
    } else if (data) {
        return <>Private</>;
    } else {
        return <>Not Sequenced</>;
    }
}
