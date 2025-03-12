import LaunchIcon from "@mui/icons-material/Launch";
import {Link} from "@mui/material";
import React from "react";
import {useFieldValue} from "react-admin";

export const SelfLinkField = (props) => {
    const linkHref = useFieldValue({...props, source: '_links.self.href'});
    const linkText = useFieldValue(props);

    return <Link href={linkHref}
                 sx={{textDecoration: "none"}}
                 color={'secondary'}
                 target={'_new'}>
        {linkText}
        <LaunchIcon sx={{fontSize: '1rem', ml: 1}}/>
    </Link>
    ;
};
