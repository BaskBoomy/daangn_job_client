import React from 'react';
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const LinearProgressWithLabel = (props) => {
    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ width: "100%", mr: 3 }}>
            <LinearProgress variant="determinate" value={props.value/4*100} />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">{`${props.value}/4`}</Typography>
          </Box>
        </Box>
      );
}

export default LinearProgressWithLabel;