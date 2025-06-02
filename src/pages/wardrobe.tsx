import { useEffect, useState } from "react";
import NavBar from "@/components/navbar";
import RootLayout from "@/components/layout";
import { removeStringFromArray } from "@/helper";
import Image from "next/image";
import Toast from "@/components/toast";
import { showToast } from "@/helper";

const Wardrobe = () => {
  let bootstrap: NodeJS.Require;
  useEffect(() => {
    /* eslint-disable */
    bootstrap = require("bootstrap/dist/js/bootstrap.bundle.js");
  });

  const [wardrobe, setWardrobe] = useState<string[]>([]);
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (init) return;
    getWardrobe();
    setInit(true);
  }, [init]);

  // Get saved images from local storage
  const getWardrobe = () => {
    setWardrobe([]);
    const images = localStorage.getItem("wardi_wardrobe")?.split(";") ?? [];
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      if (image.length == 0) continue;
      setWardrobe(wardrobe => [...wardrobe, image]);
    }
  }

  // Remove image from wardrobe
  const removeFromWardrobe = (data: string) => {
    const newWardrobe = removeStringFromArray(data, wardrobe);
    let newItem = "";
    newWardrobe.forEach((image) => {
      newItem += image;
      newItem += ";";
    });
    localStorage.setItem("wardi_wardrobe", newItem);
    // Refresh wardrobe
    getWardrobe();

    // Show message
    showToast(bootstrap, "removeToast");
  }

  // Card display of wardrobe item
  const wardrobeItem = (data: string) => {
    return (
      <div key={data}>
        <div className="card">
          <Image src={`data:image/jpeg;base64,${data}`} width={100} height={100} unoptimized={true} className="card-img-top img-thumbnail rounded" alt="wardrobeImage" />
          <div className="card-body container">
            <div className="row">
              <div className="col">
                <a type="button" className="btn btn-success" href={`data:image/jpeg;base64,${data}`} download={true}>Download <i className="bi bi-download m-1"></i></a>
              </div>
              <div className="col">
                <button type="button" className="btn btn-danger" onClick={() => removeFromWardrobe(data)}>Remove <i className="bi bi-trash-fill m-1"></i></button>
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>
    );
  }

  return (
    <RootLayout>
      <NavBar activePage="wardrobe" />
      <br />
      <div className="container root-content">
        <div className="row">
          <h4 className="text-center">My Wardrobe</h4>
          <div className="col">
            <div className="m-2 text-center">
              {
                wardrobe.length == 0
                  ?
                  <p className="text-body-tertiary">Items added to wardrobe will appear here</p>
                  :
                  wardrobe.map(data =>
                    wardrobeItem(data)
                  )
              }
            </div>
          </div>
        </div>
      </div>

      <Toast id="removeToast" header="Removed" message="Image removed from wardrobe" />
    </RootLayout>
  );
};

export default Wardrobe;