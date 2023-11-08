import React, {useContext} from "react";

import Navbar from "../components/Navbar";
import MainDashboard from "../components/MainDashboard";

import { AuthContext } from "../contexts/authContext";

function Dashboard() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div>
      <Navbar />
      <MainDashboard currentUser={currentUser}/>
    </div>
  );
}

export default Dashboard;
