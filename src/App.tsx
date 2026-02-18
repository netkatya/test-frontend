import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { useEffect } from "react";
import { fetchMe } from "./features/auth/authSlice";
import { useAppDispatch } from "./shared/hooks/redux";
import { Toaster } from "react-hot-toast";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) dispatch(fetchMe());
  }, []);

  return (
    <>
      <RouterProvider router={router} />

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#b29f7e",
            color: "#fff",
            padding: "14px 18px",
            borderRadius: "8px",
          },
        }}
      />
    </>
  );
}

export default App;
