import { useEffect, useState } from "react";
import NavBar from "@/components/navbar";
import RootLayout from "@/components/layout";
import Spinner from "@/components/spinner";
import { removeFromArray } from "@/helper";
import "@/styles/global.css";

const Wardrobe = () => {
  const [wardrobe, setWardrobe] = useState<any[]>([]);
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (init) return;
    getWardrobe();
    setInit(true);
  }, [init]);

  // Get saved images from local storage
  const getWardrobe = () => {
    setWardrobe([]);
    const images = localStorage.getItem("wardrobe")?.split(";") ?? [];
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      if (image.length == 0) continue;
      setWardrobe(wardrobe => [...wardrobe, image]);
    }
  }

  // Remove image from wardrobe
  const removeFromWardrobe = (data: string) => {
    const newWardrobe = removeFromArray(data, wardrobe);
    let newItem = "";
    newWardrobe.forEach((image) => {
      newItem += image;
      newItem += ";";
    });
    localStorage.setItem("wardrobe", newItem);
    // Refresh wardrobe
    getWardrobe();
  }

  // Card display of wardrobe item
  const wardrobeItem = (data: string) => {
    return (
      <div key={data}>
        <div className="card">
          <img src={`data:image/jpeg;base64,${data}`} className="card-img-top img-thumbnail rounded" alt="wardrobeImage" />
          <div className="card-body container">
            <div className="row">
              <div className="col">
                <a type="button" className="btn btn-primary" href={`data:image/jpeg;base64,${data}`} download={true}>Download <i className="bi bi-download m-1"></i></a>
              </div>
              <div className="col">
                <button type="button" className="btn btn-primary" onClick={_ => removeFromWardrobe(data)}>Remove <i className="bi bi-trash-fill"></i></button>
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
                  <Spinner />
                  :
                  wardrobe.map(data =>
                    wardrobeItem(data)
                  )
              }
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default Wardrobe;