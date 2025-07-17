import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../actions";

const Dashboard = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div>
      <h1>Dashboard</h1>
      {auth ? (
        <p>You have {auth.credits} credits</p>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
};

export default Dashboard;
