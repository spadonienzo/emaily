import { useEffect, useState } from "react";
import axios from "axios";
// import { useDispatch } from "react-redux"; // If you plan to use Redux

const Dashboard = () => {
  const [user, setUser] = useState(null);
  // const dispatch = useDispatch(); // Optional if you're using Redux

  useEffect(() => {
    axios.get("/api/current_user").then((res) => {
      setUser(res.data);
      // dispatch({ type: "FETCH_USER", payload: res.data }); // If using Redux
    });
  }, [user]);

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? (
        <p>You have {user.credits} credits</p>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
};

export default Dashboard;
