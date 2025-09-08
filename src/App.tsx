import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';

import DefaultLayout from './layout/DefaultLayout';
import ProtectedRoute from './components/ProtectedRoute';
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
import StationDetails from './pages/Admin/Stations/StationDetails';
import AllPublishersPage from './pages/PublisherManagement/AllPublishersPage';
import PublisherDetails from './pages/Admin/Publishers/PublisherDetails';
import ArtistTracksView from './pages/Song&DetectionManagement/SongManager';
import AdminTrackDetails from './pages/Song&DetectionManagement/TrackDetails';
import AllFansPage from './pages/FanManagement/AllFansPage';
import AdminCompleteProfile from './pages/Authentication/Onboarding/AdminCompleteProfile';
import DisputesList from './pages/Disputes/DisputesList';
import DisputeDetails from './pages/Disputes/DisputeDetails';
import RoyaltiesList from './pages/Royalties/RoyaltiesList';
import ArtistRoyaltyDetails from './pages/Royalties/ArtistRoyaltyDetails';
import PlatformAnalytics from './pages/PlatformAnalytics/PlatformAnalytics';

const hiddenOnRoutes = [
  '/',
  '/sign-up',
  '/verify-email',
  '/sign-in',
  '/onboarding/profile',
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
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
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
          path="/station-details"
          element={
            <>
              <PageTitle title="Station Details | Admin | ZamIO-Admin" />
              <StationDetails />
            </>
          }
        />
        <Route
          path="/all-publishers"
          element={
            <>
              <PageTitle title="All Publishers | Admin | ZamIO-Admin" />
              <AllPublishersPage />
            </>
          }
        />
        <Route
          path="/publisher-details"
          element={
            <>
              <PageTitle title="Publisher Details | Admin | ZamIO-Admin" />
              <PublisherDetails />
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
          path="/track-details"
          element={
            <>
              <PageTitle title="Track Details | Admin | ZamIO-Admin" />
              <AdminTrackDetails />
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
        <Route
          path="/disputes"
          element={
            <>
              <PageTitle title="Dispute Resolution Panel | ZamIO-Admin" />
              <DisputesList />
            </>
          }
        />
        <Route
          path="/disputes/:id"
          element={
            <>
              <PageTitle title="Dispute Details | ZamIO-Admin" />
              <DisputeDetails />
            </>
          }
        />
        <Route
          path="/royalties"
          element={
            <>
              <PageTitle title="Royalty & Payments Oversight | ZamIO-Admin" />
              <RoyaltiesList />
            </>
          }
        />
        <Route
          path="/royalties/:artist_id"
          element={
            <>
              <PageTitle title="Artist Royalty Details | ZamIO-Admin" />
              <ArtistRoyaltyDetails />
            </>
          }
        />
        <Route
          path="/analytics"
          element={
            <>
              <PageTitle title="Platform Analytics | ZamIO-Admin" />
              <PlatformAnalytics />
            </>
          }
        />
        </Route>
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
          path="/onboarding/profile"
          element={
            <>
              <PageTitle title="Complete Profile | ZamIO-Admin" />
              <AdminCompleteProfile />
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
