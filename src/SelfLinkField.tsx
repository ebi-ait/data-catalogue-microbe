import LaunchIcon from "@mui/icons-material/Launch";
import {Link} from "@mui/material";
import React from "react";
import {useFieldValue} from "react-admin";

export const SelfLinkField = (props) => {
    const linkHref = useFieldValue({...props, source: '_links.self.href'});
    const linkText = useFieldValue(props);

    return <Link href={linkHref} sx={{textDecoration: "none"}} target={'_new'}>
        {linkText}
        <LaunchIcon sx={{fontSize: 15, ml: 1}}/>
    </Link>
    ;
};
