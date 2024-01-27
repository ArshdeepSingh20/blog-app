import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";

import authService from "./appwrite/auth";
import { login, logout } from "./features/authSlice";
import { AuthLayout, Footer, Header, Login, Signup } from "./components";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AllPosts from "./pages/AllPosts";
import AddPost from "./pages/AddPost";
import EditPost from "./pages/EditPost";
import Post from "./pages/Post";

function App() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <>loading</>;
  } else {
    return (
      <>
        <div className="min-h-screen flex flex-wrap content-between bg-gray-200">
          <div className="w-full block">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/login"
                  element={
                    <AuthLayout authentication={false}>
                      {" "}
                      <Login />{" "}
                    </AuthLayout>
                  }
                />

                <Route
                  path="/signup"
                  element={
                    <AuthLayout authentication={false}>
                      {" "}
                      <Signup />{" "}
                    </AuthLayout>
                  }
                />

                <Route
                  path="/all-posts"
                  element={
                    <AuthLayout authentication>
                      {" "}
                      <AllPosts />{" "}
                    </AuthLayout>
                  }
                />

                <Route
                  path="/add-post"
                  element={
                    <AuthLayout authentication>
                      {" "}
                      <AddPost />{" "}
                    </AuthLayout>
                  }
                />

                <Route
                  path="/edit-post/:slug"
                  element={
                    <AuthLayout authentication>
                      {" "}
                      <EditPost />{" "}
                    </AuthLayout>
                  }
                />

                <Route path="/post/:slug" element={<Post />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </div>
      </>
    );
  }
}

export default App;
