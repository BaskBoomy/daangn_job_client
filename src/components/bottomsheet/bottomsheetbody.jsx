import React from 'react';
// import styles from './body.module.css';
import { BottomSheet } from 'react-spring-bottom-sheet';
import BSPlace from './place.jsx';
import BSDate from './date.jsx';
import BSTime from './time.jsx';
import BSAlarmOn from './alarmon.jsx';
import BSAlarmOff from './alarmoff.jsx';
import BSProfileFix from './profilefix.jsx';
import BSEditBtns from './editbtns.jsx';
import BSWorkCategory from './workcategory.jsx';
const Body = ({ categoryNo, open, setOpen, AlarmHandler, careerId, deleteCareer, editBtnHandler, nearAddress, getPartAddress, getSliderValue, range,JobRepository,setJobs }) => {

    switch (categoryNo) {
        case 0:
            return (
                <BottomSheet open={open} onDismiss={() => setOpen(false)}>
                    <BSPlace 
                        setOpen={setOpen} 
                        nearAddress={nearAddress} 
                        getPartAddress={getPartAddress} 
                        getSliderValue={getSliderValue} 
                        range={range} 
                        JobRepository={JobRepository}
                        setJobs={setJobs}/>
                </BottomSheet>
            );
        case 1:
            return (
                <BottomSheet open={open} onDismiss={() => setOpen(false)}>
                    <BSDate 
                        JobRepository={JobRepository} 
                        setOpen={setOpen}
                        setJobs={setJobs}/>
                </BottomSheet>
            );
        case 2:
            return (
                <BottomSheet open={open} onDismiss={() => setOpen(false)}>
                    <BSTime 
                        setOpen={setOpen} 
                        JobRepository={JobRepository}
                        setJobs={setJobs}/>
                </BottomSheet>
            );
        case 3:
            return (
                <BottomSheet open={open} onDismiss={() => setOpen(false)}>
                    <BSAlarmOn 
                        setOpen={setOpen} 
                        AlarmHandler={AlarmHandler} />
                </BottomSheet>
            );
        case 4:
            return (
                <BottomSheet open={open} onDismiss={() => setOpen(false)}>
                    <BSAlarmOff 
                        setOpen={setOpen} 
                        AlarmHandler={AlarmHandler} />
                </BottomSheet>
            );
        case 5:
            return (
                <BottomSheet open={open} onDismiss={() => setOpen(false)}>
                    <BSProfileFix />
                </BottomSheet>
            );
        case 6:
            return (
                <BottomSheet open={open} onDismiss={() => setOpen(false)}>
                    <BSEditBtns 
                        editBtnHandler={editBtnHandler} 
                        setOpen={setOpen} 
                        careerId={careerId} 
                        deleteCareer={deleteCareer} />
                </BottomSheet>
            );
        case 7:
            return (
                <BottomSheet open={open} onDismiss={() => setOpen(false)}>
                    <BSWorkCategory 
                        JobRepository={JobRepository} 
                        setOpen={setOpen}
                        setJobs={setJobs}/>
                </BottomSheet>
            );
        default: return;
    }
}

export default Body;