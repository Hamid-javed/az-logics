import { useEffect } from "react";
import Lottie from "lottie-react";
import { ToastContainer } from "react-toastify";
import { Navigate, Route, Routes } from "react-router-dom";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Animation from "./assets/splashAnimation.json";

import Home from "./pages/Home";
import Detail from "./components/Detail";
import ProtectedRoute from "./ProtectedRoute";
import EmailList from "./components/EmailList";
import VerifyEmail from "./components/VerifyEmail";
import CreateEmail from "./components/CreateEmail";
import Authentication from "./pages/Authentication";
import MobileNewMessage from "./pages/MobileNewMessage";
import MobileEmailDetail from "./pages/MobileEmailDetail";
import ShowOriginal from "./components/ShowOriginal";

import { useAuth } from "./AuthContext";
import useGetMails from "./hooks/useGetMails";
import useMailExtensions from "./hooks/useMailExtensions";
import useGetAiEmailTemplate from "./hooks/useGetAiEmailTemplate";
import useCheckAuthenticated from "./hooks/useCheckAuthenticated";

function App() {
  const {
    isDesktop = true,
    isLoading,        // ✅ iframe auth check
    isAuthenticated,
    setEmailData,
    setExtensions,
    setUserMailBox,
    setAiTemplates,
  } = useAuth() || {};

  const { mutate: getMailExtensions } = useMailExtensions();
  const { mutate: getAiTemplates } = useGetAiEmailTemplate();
  const { mutate: getMails, isPending: getMailsLoading } = useGetMails();
  const { mutate, isPending: authCheckLoading } = useCheckAuthenticated();


  useEffect(() => {
    if (!isAuthenticated) return; // ✅ don't fetch if not logged in

    getMails({}, {
      onSuccess: (data) => {
        setUserMailBox(data);
        if (!data?.results.find(
          (mail) => mail.id === localStorage.getItem("email_id")
        )) {
          if (data.count > 0) {
            localStorage.setItem("email_id", data.results[0].id);
            setEmailData(data.results[0]);
          }
        }
      },
      onError: () => setUserMailBox({}),
    });

    getMailExtensions({}, {
      onSuccess: (data) => setExtensions(data),
      onError:   ()     => setExtensions({}),
    });

    getAiTemplates({}, {
      onSuccess: (data) => {
        setAiTemplates((prevTemplates) => {
          const newTemplates  = Array.isArray(data) ? data : [];
          const existingIds   = new Set(prevTemplates.map((t) => t.id));
          const filtered      = newTemplates.filter((t) => !existingIds.has(t.id));
          return [...prevTemplates, ...filtered];
        });
      },
      onError: () => {},
    });
  }, [isAuthenticated]);



  return (
    <>
      {authCheckLoading || getMailsLoading ? (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "#f6f8fc",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Lottie
            animationData={Animation}
            loop={false}
            style={{ width: "250px", height: "250px" }}
          />
        </div>
      ) : (
        <>
          <ToastContainer />

          <Routes>
            <Route path="/login" element={<Authentication />} />
            <Route path="/register" element={<Authentication />} />

            {/* Protected routes */}
            <Route path="/" element={<ProtectedRoute element={<Home />} />}>
              <Route index element={<EmailList />} />

              {isDesktop && (
                <Route
                  path="/email-detail"
                  element={<ProtectedRoute element={<Detail />} />}
                />
              )}
            </Route>

            <Route
              path="/create-mail"
              element={<ProtectedRoute element={<CreateEmail />} />}
            />
            <Route
              path="/verify-email"
              element={<ProtectedRoute element={<VerifyEmail />} />}
            />
            <Route
              path="/show-original"
              element={<ProtectedRoute element={<ShowOriginal />} />}
            />

            {/* Mobile-only routes */}
            {!isDesktop && (
              <>
                <Route
                  path="/email-detail"
                  element={<ProtectedRoute element={<MobileEmailDetail />} />}
                />
                <Route
                  path="/new-message"
                  element={<ProtectedRoute element={<MobileNewMessage />} />}
                />
              </>
            )}

            {/* Redirect for invalid URLs */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;