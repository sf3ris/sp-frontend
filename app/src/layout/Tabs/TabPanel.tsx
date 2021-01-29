import React from 'react';
import { Box, Typography } from '@material-ui/core';

interface ITabPanelProps {
    index : number;
    tab: number;
}

const TabPanel : React.FC<ITabPanelProps> = props => {

    const { index, tab } = props;

    return (

        <div
        role="tabpanel"
        hidden={tab !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
      >
          <Box p={3}>
            <Typography>{props.children}</Typography>
          </Box>
      </div>

    )

}

export default TabPanel;
