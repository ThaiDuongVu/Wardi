import NavBar from "@/components/navbar";
import { FormEvent, useEffect, useState } from "react";
import RootLayout from "@/components/layout";
import Spinner from "@/components/spinner";
import { GoogleGenAI, Modality } from "@google/genai";
import Image from "next/image";
import Toast from "@/components/toast";
import { showToast } from "@/helper";

const TextTry = () => {
  let bootstrap: NodeJS.Require;
  useEffect(() => {
    /* eslint-disable */
    bootstrap = require("bootstrap/dist/js/bootstrap.bundle.js");
  });
  const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

  // Input image
  const [baseImageURL, setBaseImageURL] = useState("/placeholder.png");
  const onBaseImageChange = (event: FormEvent) => {
    if ((event.target as HTMLInputElement).files) {
      setBaseImageURL(URL.createObjectURL((event.target as HTMLInputElement).files![0]));
    }
  };
  // Outfit prompt
  const [outfitPrompt, setOutfitPrompt] = useState("");

  // Output image
  const [outputImageData, setOutputImageData] = useState("");
  const [outputImageURL, setOutputImageURL] = useState("/placeholder.png");

  // Submit data to model
  const submit = async (event: FormEvent) => {
    event.preventDefault();

    // Guard clauses
    if (baseImageURL === "/placeholder.png") {
      showToast(bootstrap, "noImageToast");
      return;
    }
    if (outfitPrompt === "") {
      showToast(bootstrap, "noOutfitToast");
      return;
    }
    setOutputImageURL("...");

    // Create and convert base image data
    const baseImage = await fetch(baseImageURL);
    const baseImageArrayBuffer = await baseImage.arrayBuffer();
    const baseImageData = Buffer.from(baseImageArrayBuffer).toString("base64");

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
          text: `Show this person wearing ${outfitPrompt}`,
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
        const data = Buffer.from(part.inlineData.data as string, "base64").toString("base64");
        setOutputImageData(data);
        setOutputImageURL(`data:image/jpeg;base64,${data}`);
      }
    }
  };

  // Add image to wardrobe
  const addToWardrobe = (data: string) => {
    // Guard clauses
    if (outputImageData.length == 0) return;

    // Save to local storage
    const savedWardrobe = localStorage.getItem("wardi_wardrobe") ?? "";
    localStorage.setItem("wardi_wardrobe", `${savedWardrobe};${data}`);

    // Show message
    showToast(bootstrap, "addToast");
  };

  return (
    <RootLayout>
      <NavBar activePage="text-try" />
      <br />
      <div className="container root-content">
        {/* Input */}
        <div className="row">
          <h4 className="text-center">Input</h4>
          <div className="col">
            <form action="submit" onSubmit={submit}>
              {/* Base image uploader */}
              <div className="m-2">
                <label htmlFor="baseImageInput" className="form-label">
                  Upload base image <i className="bi bi-upload m-1"></i>
                </label>
                <input
                  type="file"
                  className="form-control"
                  aria-label="baseImageInput"
                  id="baseImageInput"
                  onChange={(onBaseImageChange)}
                />
              </div>
              <div className="m-2">
                <button
                  type="button"
                  className="btn btn-secondary me-2"
                  onClick={() => setBaseImageURL("/man.jpg")}>Use sample <i className="bi bi-image"></i></button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    const data = localStorage.getItem("wardi_profile");
                    if (!data) {
                      showToast(bootstrap, "noProfileToast");
                      return;
                    }
                    setBaseImageURL(`data:image/jpeg;base64,${data}`);
                  }}>Use profile <i className="bi bi-person-circle"></i></button>
              </div>

              {/* Base image display */}
              <div className="m-2 text-center">
                <Image src={baseImageURL} width={100} height={100} unoptimized={true} className="img-thumbnail rounded display-img" alt="baseImage" />
                {
                  baseImageURL === "/man.jpg"
                    ?
                    <p className="text-body-tertiary">Image provided by zaid mohammed via Pexels</p>
                    :
                    <div></div>
                }
              </div>

              {/* Prompts */}
              <div className="m-2">
                <label htmlFor="outfitPromptTextArea" className="form-label">
                  Outfit
                </label>
                <textarea
                  className="form-control"
                  id="outfitPromptTextArea"
                  placeholder="white t-shirt with blue stripes"
                  required
                  value={outfitPrompt}
                  onChange={event => setOutfitPrompt(event.target.value)}>
                </textarea>
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

        {/* Output */}
        <div className="row">
          <h4 className="text-center">Output</h4>
          <div className="col">
            <div className="m-2 text-center">
              <div className="card">
                {/* Image output display */}
                {
                  outputImageURL === "..."
                    ?
                    <Spinner />
                    :
                    <Image src={outputImageURL} width={100} height={100} unoptimized={true} className="card-img-top img-thumbnail rounded" alt="outputImage" />
                }
                <div className="card-body container">
                  <div className="row">
                    <div className="col">
                      {/* Download button */}
                      <a type="button" className="btn btn-success" href={outputImageURL} download={true}>Download <i className="bi bi-download m-1"></i></a>
                    </div>
                    <div className="col">
                      {/* Add to wardrobe button */}
                      <button type="button" className="btn btn-primary" onClick={() => addToWardrobe(outputImageData)}>Add <i className="bi bi-heart-fill m-1"></i></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >

      <Toast id="noImageToast" header="Error" message="Please upload a base image!" isError={true} />
      <Toast id="noOutfitToast" header="Error" message="Please fill out an outfit!" isError={true} />
      <Toast id="noProfileToast" header="Error" message="No profile image set!" isError={true} />
      <Toast id="addToast" header="Added" message="Item added to wardrobe!" />
    </RootLayout >
  )
};

export default TextTry;