import { Routes, Route, useNavigate} from 'react-router-dom';
import React from "react";
// import styles from './app.module.css';
import AllJobs from './components/alljobs/alljobs';
import MyProfile from './components/my-profile/myprofile/myprofile';
import MyProfileDetail from './components/my-profile/myprofiledetail/myprofiledetail';
import SetProfilePicture from './components/setprofilepicture/setprofilepicture';
import WriteProfile from './components/my-profile/myprofiledetail/write/write';
import AddCareer from './components/my-profile/myprofiledetail/write/addcareer/addcareer';
import EditProfile from './components/my-profile/editprofile/editprofile';
import EditCareer from './components/my-profile/myprofiledetail/write/editcareer/editcareer';
import AddJob from './components/addjob/addjob';
import AddressPickerPage from './components/addresspicker/addresspickerpage';
import JobPostPreview from './components/jobpost/preview/jobpostpreview';
import JobPost from './components/jobpost/jobpost/jobpost';
import ChooseLocation from './components/choose_location/choose_location';
import VarifyPhoneNumber from './components/varifyphonenumber/varifyphonenumber';
import SetMyProfile from './components/setmyprofile/setmyprofile';
import { useAuth } from './context/AuthContext';
import NearAddress from './components/nearaddress/nearaddress';
export default function App(
  { FileInput,
    InfoRepository,
    InputValidation,
    JobRepository,
    DateService,
    TimeService,
    LocationService,
    AuthService,
    ImageUploader}) {
  const { user, logout,update } = useAuth();
  const navigate = useNavigate();
  const logoutHandler = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      navigate("/", { replace: true });
      logout();
    }
  }
  return (
    <Routes>
      <Route path='/' element={<AllJobs JobRepository={JobRepository} logoutHandler={logoutHandler} />} />
      <Route path='/my-profile' element={<MyProfile user={user} AuthService={AuthService}/>} />
      <Route path='/my-profile-detail' element={<MyProfileDetail InfoRepository={InfoRepository} user={user} />} />
      <Route path='/my-profile-detail/editprofile' element={<EditProfile user={user} update={update} InputValidation={InputValidation} />} />
      <Route path='/my-profile-detail/write' element={<WriteProfile FileInput={FileInput} InputValidation={InputValidation} ImageUploader={ImageUploader} />} />
      <Route path='/my-profile-detail/write/add-career' element={<AddCareer InputValidation={InputValidation} />} />
      <Route path='/my-profile-detail/write/edit-career' element={<EditCareer user={user} />} />
      <Route path='/profile-picture' element={<SetProfilePicture />} />
      <Route path='/add-job' element={<AddJob user={user} FileInput={FileInput} JobRepository={JobRepository} DateService={DateService} TimeService={TimeService} InputValidation={InputValidation} ImageUploader={ImageUploader}/>} />
      <Route path='/job-post-preview' element={<JobPostPreview  JobRepository={JobRepository} />} />
      <Route path='/job-post' element={<JobPost JobRepository={JobRepository} AuthService={AuthService}/>} />
      <Route path='/get-address' element={<AddressPickerPage JobRepository={JobRepository} />} />
      <Route path='/get-location' element={<ChooseLocation locationService={LocationService} />} />
      <Route path='/varify-phonenumber' element={<VarifyPhoneNumber AuthService={AuthService} />} />
      <Route path='/setMyProfile' element={<SetMyProfile AuthService={AuthService} ImageUploader={ImageUploader} />} />
      <Route path='/nearAddress' element={<NearAddress/>} />
    </Routes>
  );
}