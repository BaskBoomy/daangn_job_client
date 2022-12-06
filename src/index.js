import React from 'react';
import {BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import ImageUploader from './service/image_uploader';
import ImageFileInput from './components/image_file_input/image_file_input';
import InfoRepository from './service/info_repository';
import InputValidation from './service/input_validation';
import JobRepository from './service/job_repository';
import DateService from './service/date_service';
import TimeService from './service/time_service';
import LocationService from './service/location_service';
import AuthService from './service/auth';
import HttpClient from './network/http';
import { AuthProvider, fetchCsrfToken } from './context/AuthContext';
import { AuthErrorEventBus } from './context/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
const infoRepository = new InfoRepository();


const authErrorEventBus = new AuthErrorEventBus();
const baseURL = process.env.REACT_APP_BASE_URL;
const httpClient = new HttpClient(
  baseURL,
  authErrorEventBus
  );
const imageUploader = new ImageUploader(httpClient);
const authService = new AuthService(httpClient);
const jobRepository = new JobRepository(httpClient);

const inputValidation = new InputValidation();
const FileInput = props => (<ImageFileInput {...props} imageUploader={imageUploader} />);
const dateService = new DateService();
const timeService = new TimeService();
const locationService = new LocationService(httpClient);
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <AuthProvider
      authService={authService}
      locationService={locationService}
      authErrorEventBus={authErrorEventBus}>
      <App
        FileInput={FileInput}
        InfoRepository={infoRepository}
        InputValidation={inputValidation}
        JobRepository={jobRepository}
        DateService={dateService}
        TimeService={timeService}
        LocationService={locationService}
        AuthService={authService} 
        ImageUploader={imageUploader}
        imageUploader={imageUploader}/>
    </AuthProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
