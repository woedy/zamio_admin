import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';

import DefaultLayout from './layout/DefaultLayout';
import SignUp from './pages/Authentication/SignUp';
import AudioMatch from './pages/Project/AudioMatch';
import ArtistDetails from './pages/Admin/Artists/ArtistDetails';
import AddArtist from './pages/Admin/Artists/AddArtist';
import UploadTrack from './pages/Admin/Artists/UploadTrack';
import ZamIOLandingPage from './pages/Landing/LandingPage';
import SignIn from './pages/Authentication/SignIn';
import VerifyEmail from './pages/Authentication/VerifyEmail';
import ForgotPassword from './pages/Authentication/Password/ForgotPassword';
import ConfirmPasswordOTP from './pages/Authentication/Password/ConfirmPasswordOTP';
import NewPassword from './pages/Authentication/Password/NewPassword';
import Dashboard from './pages/Dashboard/Dashboard';
import AllArtistsPage from './pages/ArtistManagement/AllArtistsPge';
import AllStationsPage from './pages/StationManagement/AllStationsPage';
import ArtistTracksView from './pages/Song&DetectionManagement/SongManager';
import AllFansPage from './pages/FanManagement/AllFansPage';

const hiddenOnRoutes = [
  '/',
  '/sign-up',
  '/verify-email',
  '/sign-in',
  '/forgot-password',
  '/new-password-reset',
  '/confirm-password-otp',
  '/audio-match',
];

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // Determine if the current route should skip the layout
  const shouldUseDefaultLayout = !hiddenOnRoutes.includes(location.pathname);

  return loading ? (
    <Loader />
  ) : shouldUseDefaultLayout ? (
    <DefaultLayout hiddenOnRoutes={hiddenOnRoutes}>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <>
              <PageTitle title="Admin Dasboard | ZamIO-Admin" />
              <Dashboard />
            </>
          }
        />

        <Route
          path="/all-artists"
          element={
            <>
              <PageTitle title="All Artist | Admin | ZamIO-Admin" />
              <AllArtistsPage />
            </>
          }
        />
        <Route
          path="/artist-details"
          element={
            <>
              <PageTitle title="Artist Details | Admin | ZamIO-Admin" />
              <ArtistDetails />
            </>
          }
        />
        <Route
          path="/add-artist"
          element={
            <>
              <PageTitle title="Add Artist | Admin | ZamIO-Admin" />
              <AddArtist />
            </>
          }
        />

        <Route
          path="/all-stations"
          element={
            <>
              <PageTitle title="All Stations | Admin | ZamIO-Admin" />
              <AllStationsPage />
            </>
          }
        />

        <Route
          path="/all-artist-tracks"
          element={
            <>
              <PageTitle title="All Artist Tracks | Admin | ZamIO-Admin" />
              <ArtistTracksView />
            </>
          }
        />
        <Route
          path="/all-fans"
          element={
            <>
              <PageTitle title="All Fans | Admin | ZamIO-Admin" />
              <AllFansPage />
            </>
          }
        />

        <Route
          path="/uploads"
          element={
            <>
              <PageTitle title="Upload | Admin | ZamIO-Admin" />
              <UploadTrack />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  ) : (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="Home | ZamIO-Admin" />
              <ZamIOLandingPage />
            </>
          }
        />

        <Route
          path="/audio-match"
          element={
            <>
              <PageTitle title="Sign Up | ZamIO-Admin" />
              <AudioMatch />
            </>
          }
        />

        <Route
          path="/sign-in"
          element={
            <>
              <PageTitle title="Sign In | ZamIO-Admin" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/sign-up"
          element={
            <>
              <PageTitle title="Sign Up | ZamIO-Admin" />
              <SignUp />
            </>
          }
        />
        <Route
          path="/verify-email"
          element={
            <>
              <PageTitle title="Verify Email | ZamIO-Admin" />
              <VerifyEmail />
            </>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <>
              <PageTitle title="Forgot Password | ZamIO-Admin" />
              <ForgotPassword />
            </>
          }
        />
        <Route
          path="/confirm-password-otp"
          element={
            <>
              <PageTitle title="Confirm Password OTP | ZamIO-Admin" />
              <ConfirmPasswordOTP />
            </>
          }
        />
        <Route
          path="/new-password-reset"
          element={
            <>
              <PageTitle title="New Password Reset | ZamIO-Admin" />
              <NewPassword />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
