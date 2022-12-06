import React from 'react';
import styles from './profileprocess.module.css';
import LinearProgressBar from '../../progressbar/linear/linearprogressbar';
import Box from "@mui/material/Box";
import InfoCard from '../infocard/infocard';

const ProfileProcess = ({infoBtns,editInfoPage}) => {
    const progress = infoBtns.filter(e=>e.isWritten === true).length;
    const progressTheme = {
        width: "100%",
        '& .MuiLinearProgress-root':{ 
            backgroundColor:'#efefef'
        },
        '& .MuiLinearProgress-bar':{
            backgroundColor:'#ed7733'
        } 
    }
    
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <p>당근알바 프로필을 완성해주세요.</p>
                <Box sx={progressTheme}>
                    <LinearProgressBar value={progress}/>
                </Box>
            </div>
            <div className={styles.middle}>
                {infoBtns.map((info)=>(
                    <InfoCard
                        key={info.id}
                        info={info}
                        editInfoPage={editInfoPage}
                    />
                ))}
            </div>
        </div>
    );
}
export default ProfileProcess;