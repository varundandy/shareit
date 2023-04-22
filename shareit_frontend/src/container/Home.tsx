import { Outlet } from "react-router-dom";
import SidebarWrapper from "../components/SidebarWrapper";

const Home = () => {
  return (
    <div className="pb-2 flex-1 h screen overflow-y-scroll">
     <Outlet/>
      {/* TODO: ref attribute unused*/}
      {/*  <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={user && user} />} />
        </Routes> */}
    </div>
  );
};

export default Home;
