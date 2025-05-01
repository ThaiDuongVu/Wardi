import NavBar from "@/components/navbar";
import RootLayout from "@/components/layout";
import "@/styles/global.css";

const Profile = () => {
  return (
    <RootLayout>
      <NavBar activePage="profile" />
      <br />
      <div className="container root-content">
        <div className="row">
          <h4 className="text-center">Profile</h4>
          <div className="col"></div>
        </div>
      </div>
    </RootLayout>
  )
};

export default Profile;