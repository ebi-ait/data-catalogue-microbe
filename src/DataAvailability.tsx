import {useFieldValue} from "ra-core";
import React from "react";
import {useDataProvider, useRecordContext} from "react-admin";

export const DataAvailability = (props: any) => {
    const value = useFieldValue(props);
    const record = useRecordContext();
    const dataProvider = useDataProvider();
    const [datahubRecord, setDatahubRecord] = React.useState<any | null>(null);

    React.useEffect(() => {
        if (record?.accession) {
            dataProvider.getOne('ena', {id: record.accession})
                .then(response => setDatahubRecord(response.data))
                .catch(() => setDatahubRecord(null));
        }
    }, [dataProvider, record?.accession]);

    if (value) {
        return <>Raw Sequence Data Available</>;
    } else if (datahubRecord) {
        return <>Private</>;
    } else {
        return <>Not Sequenced Yet</>;
    }
};
