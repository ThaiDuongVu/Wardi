import NavBar from "@/components/navbar";
import { FormEvent, useState } from "react";
import RootLayout from "./layout";
import { GoogleGenAI, Modality } from "@google/genai";
import "../styles/global.css";

const ImageTry = () => {
  const ai = new GoogleGenAI({ apiKey: process.env.apiKey });

  // Input image
  const [baseImageURL, setBaseImageURL] = useState("https://placehold.co/256?text=Base+image");
  const [noBaseImage, setNoBaseImage] = useState(false);
  const onBaseImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setBaseImageURL(URL.createObjectURL(event.target.files[0]));
    }
  };
  // Outfit image
  const [outfitImageURL, setOutfitImageURL] = useState("https://placehold.co/256?text=Outfit+image");
  const [noOutfitImage, setNoOutfitImage] = useState(false);
  const onOutfitImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setOutfitImageURL(URL.createObjectURL(event.target.files[0]));
    }
  }

  // Output image
  const [outputImageURL, setOutputImageURL] = useState("https://placehold.co/256?text=Output+image");

  const submit = async (event: FormEvent) => {
    event.preventDefault();

    // Guard clauses
    const noBase = baseImageURL === "https://placehold.co/256?text=Base+image";
    setNoBaseImage(noBase);
    const noOutfit = outfitImageURL === "https://placehold.co/256?text=Outfit+image";
    setNoOutfitImage(noOutfit);
    if (noBase || noOutfit) return;
    setOutputImageURL("...");

    // Create and convert base image data
    const baseImage = await fetch(baseImageURL);
    const baseImageArrayBuffer = await baseImage.arrayBuffer();
    const baseImageData = Buffer.from(baseImageArrayBuffer).toString("base64");

    // Create and convert outfit image data
    const outfitImage = await fetch(outfitImageURL);
    const outfitImageArrayBuffer = await outfitImage.arrayBuffer();
    const outfitImageData = Buffer.from(outfitImageArrayBuffer).toString("base64");

    // Submit data to model
    const response = await ai.models.generateContent({
      model: process.env.model as string,
      contents: [
        {
          inlineData: {
            data: baseImageData,
            mimeType: "image/jpeg",
          },
        },
        {
          inlineData: {
            data: outfitImageData,
            mimeType: "image/jpeg",
          },
        },
        {
          text: "Show this person wearing this item",
        }
      ],
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
      },
    });

    // Handle response
    const candidates = response.candidates ?? [];
    for (const part of candidates[0].content?.parts ?? []) {
      if (part.text) {
        console.log(part.text);
      } else if (part.inlineData) {
        const data = Buffer.from(part.inlineData.data ?? "", "base64").toString("base64");
        setOutputImageURL(`data:image/jpeg;base64,${data}`);
      }
    }
  };

  return (
    <RootLayout>
      <NavBar activePage="image-try" />
      <br />
      <div className="container root-content">
        <div className="row">
          <h4 className="text-center">Input</h4>
          <div className="col">
            <form action="submit" onSubmit={submit}>
              {/* Base image uploader */}
              <div className="m-2">
                <label htmlFor="baseImageInput" className="form-label">
                  Select base image <i className="bi bi-upload m-1"></i>
                </label>
                <input
                  type="file"
                  className="form-control"
                  aria-label="baseImageInput"
                  id="baseImageInput"
                  onChange={(onBaseImageChange)}
                />
                {
                  noBaseImage
                    ?
                    <div className="alert alert-danger" role="alert">
                      Please upload a base image
                    </div>
                    :
                    <div></div>
                }
              </div>
              <div className="m-2">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setBaseImageURL("/man.jpg")}>Use sample image</button>
              </div>

              {/* Base image display */}
              <div className="m-2 text-center">
                <img src={baseImageURL} className="img-thumbnail rounded pl display-img" alt="baseImage" />
              </div>

              {/* Outfit image uploader */}
              <div className="m-2">
                <label htmlFor="outfitImageInput" className="form-label">
                  Select outfit image <i className="bi bi-upload m-1"></i>
                </label>
                <input
                  type="file"
                  className="form-control"
                  aria-label="outfitImageInput"
                  id="outfitImageInput"
                  onChange={(onOutfitImageChange)}
                />
                {
                  noOutfitImage
                    ?
                    <div className="alert alert-danger" role="alert">
                      Please upload an outfit image
                    </div>
                    :
                    <div></div>
                }
              </div>
              <div className="m-2">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setOutfitImageURL("/shirt.jpg")}>Use sample image</button>
              </div>

              {/* Outfit image display */}
              <div className="m-2 text-center">
                <img src={outfitImageURL} className="img-thumbnail rounded pl display-img" alt="baseImage" />
              </div>

              {/* Submit */}
              <div className="m-2 text-center">
                <button type="submit" className="btn btn-primary" onClick={submit}>
                  Submit <i className="bi bi-arrow-right-circle-fill m-1"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
        <hr />

        <div className="row">
          <h4 className="text-center">Output</h4>
          <div className="col">
            {/* Image output display */}
            <div className="m-2 text-center">
              {
                outputImageURL === "..."
                  ?
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  :
                  <img src={outputImageURL} className="img-thumbnail rounded display-img" alt="outputImage" />
              }
            </div>

            {/* Download button */}
            <div className="m-2 text-center">
              {
                outputImageURL === "..."
                  ?
                  <div></div>
                  :
                  <a type="button" className="btn btn-primary" href={outputImageURL} download={true}>Download <i className="bi bi-download m-1"></i></a>
              }
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  )
};

export default ImageTry;