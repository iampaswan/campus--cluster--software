import './App.css'
import { Provider } from 'react-redux'
import { store } from './store/store';
// import PublicRoute from './routes/PublicRoutes'
// import ProtectedRoute from './routes/ProtectedRoutes';
import { BrowserRouter } from 'react-router-dom'
// import AuthPage from './components/authentication/authPage'
// import LandingPage from './components/authentication/landingPage';
// import { UserDashboardPage } from './components/pages/userDashboard';
// import OAuthSuccess from './components/pages/Oauth';
import AppRoutes from './routes/AppRoutes';

function App() {

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>

          {/* <Routes>

            < Route path="/" element={<LandingPage />} />

            <Route element={<PublicRoute />}>

              <Route path="/login" element={<AuthPage />} />
              <Route path="/register" element={<AuthPage />} />

            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<UserDashboardPage />} />
            </Route>





            <Route
              path="/oauth-success"
              element={<OAuthSuccess />}
            />

            <Route path="*" element={<Navigate to="/login" />} />

          </Routes> */}

          <AppRoutes />

        </BrowserRouter>
      </Provider>


    </>
  )
}

export default App
