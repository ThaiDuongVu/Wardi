import NavBar from "@/components/navbar";
import RootLayout from "@/components/layout";
import "@/styles/global.css";
import { useEffect, useState } from "react";


const Wardrobe = () => {
  const [wardrobe, setWardrobe] = useState<string[]>([]);
  useEffect(() => {
    const images = localStorage.getItem("wardrobe")?.split(";") ?? [];
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      if (image.length == 0) continue;
      setWardrobe(wardrobe => [...wardrobe, image]);
    }
  }, []);

  const wardrobeDisplay = (src: string) => {
    return (
      <div>
        <div className="card" key={src}>
          <img src={`data:image/jpeg;base64,${src}`} className="card-img-top img-thumbnail rounded" alt="wardrobeImage" />
          <div className="card-body container">
            <div className="row">
              <div className="col">
                <a type="button" className="btn btn-primary" href={`data:image/jpeg;base64,${src}`} download={true}>Download <i className="bi bi-download m-1"></i></a>
              </div>
              <div className="col">
                <button type="button" className="btn btn-primary">Remove <i className="bi bi-trash-fill"></i></button>
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
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  :
                  wardrobe.map(src =>
                    wardrobeDisplay(src)
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