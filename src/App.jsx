import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes";
import { Provider, useDispatch } from "react-redux";
import store from "./store/store";
import { setCredentials } from "./store/slices/usersSlice";
import { useEffect } from "react";

function AppWrapper() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      //  تحديث الـ redux state من localStor
      dispatch(setCredentials({ token, user }));
    }
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

function App() {
  return (
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  );
}

export default App;

