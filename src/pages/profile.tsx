import { FormEvent, useEffect, useState } from "react";
import NavBar from "@/components/navbar";
import RootLayout from "@/components/layout";
import { fileToBase64 } from "@/helper";
import Image from "next/image";
import Toast from "@/components/toast";
import { showToast } from "@/helper";

const Profile = () => {
  let bootstrap: NodeJS.Require;
  useEffect(() => {
    /* eslint-disable */
    bootstrap = require("bootstrap/dist/js/bootstrap.bundle.js");
  });

  // Input image
  const [profileImageURL, setProfileImageURL] = useState("/placeholder.png");
  const [profileImageFile, setProfileImageFile] = useState<File>();
  const onProfileImageChange = (event: FormEvent) => {
    if ((event.target as HTMLInputElement).files) {
      setProfileImageFile((event.target as HTMLInputElement).files![0]);
      setProfileImageURL(URL.createObjectURL((event.target as HTMLInputElement).files![0]));
    }
  };

  // Load saved profile image (if applicable)
  const [init, setInit] = useState(false);
  useEffect(() => {
    if (init) return;
    const data = localStorage.getItem("wardi_profile");
    if (data) setProfileImageURL(`data:image/jpeg;base64,${data}`);
    setInit(true);
  }, [init]);

  // Save profile image
  const submit = async (event: FormEvent) => {
    event.preventDefault();

    // Guard clauses
    if (!profileImageFile) return;

    // Save to local storage
    const profileImageData = await fileToBase64(profileImageFile);
    localStorage.removeItem("wardi_profile");
    localStorage.setItem("wardi_profile", profileImageData as string);

    // Show message
    showToast(bootstrap, "saveToast");
  };

  // Remove profile image
  const remove = () => {
    // Remove from local storage
    localStorage.removeItem("wardi_profile");
    setProfileImageURL("/placeholder.png");

    // Show message
    showToast(bootstrap, "removeToast");
  };

  return (
    <RootLayout>
      <NavBar activePage="wardi_profile" />
      <br />
      <div className="container root-content">
        <div className="row">
          <h4 className="text-center">Profile</h4>
          <div className="col">
            <form action="submit" onSubmit={submit}>
              {/* Profile image uploader */}
              <div className="m-2">
                <label htmlFor="profileImageInput" className="form-label">
                  Upload profile image <i className="bi bi-upload m-1"></i>
                </label>
                <input
                  type="file"
                  className="form-control"
                  aria-label="profileImageInput"
                  id="profileImageInput"
                  onChange={(onProfileImageChange)}
                />
              </div>

              {/* Base image display */}
              <div className="m-2 text-center">
                <Image src={profileImageURL} width={100} height={100} unoptimized={true} className="img-thumbnail rounded display-img" alt="profileImage" />
              </div>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col">
            {/* Submit */}
            <div className="m-2 text-center">
              <button type="button" className="btn btn-primary" onClick={submit}>
                Save <i className="bi bi-floppy-fill m-1"></i>
              </button>
            </div>
          </div>
          <div className="col">
            {/* Remove */}
            <div className="m-2 text-center">
              <button type="button" className="btn btn-danger" onClick={remove}>
                Remove <i className="bi bi-trash-fill m-1"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Toast id="saveToast" header="Saved" message="Image saved as profile" />
      <Toast id="removeToast" header="Removed" message="Image removed from profile" />
    </RootLayout>
  )
};

export default Profile;