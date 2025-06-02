import { FormEvent, useState, useEffect } from "react";
import NavBar from "@/components/navbar";
import RootLayout from "@/components/layout";
import Spinner from "@/components/spinner";
import { GoogleGenAI, Modality } from "@google/genai";
import * as cheerio from "cheerio";
import axios from "axios";
import Image from "next/image";
import Toast from "@/components/toast";
import { initTooltip, showToast } from "@/helper";

const ImageTry = () => {
  let bootstrap: NodeJS.Require;
  useEffect(() => {
    /* eslint-disable */
    bootstrap = require("bootstrap/dist/js/bootstrap.bundle.js");
    initTooltip(bootstrap);
  });

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  // Input image
  const [baseImageURL, setBaseImageURL] = useState("/placeholder.png");
  const onBaseImageChange = (event: FormEvent) => {
    if ((event.target as HTMLInputElement).files) {
      setBaseImageURL(URL.createObjectURL((event.target as HTMLInputElement).files![0]));
    }
  };
  // Outfit image
  const [outfitImageURL, setOutfitImageURL] = useState("/placeholder.png");
  const onOutfitImageChange = (event: FormEvent) => {
    if ((event.target as HTMLInputElement).files) {
      setOutfitImageURL(URL.createObjectURL((event.target as HTMLInputElement).files![0]));
    }
  }

  // Shop URL
  const [shopURL, setShopURL] = useState("");
  const importFromShop = () => {
    if (shopURL.length === 0) {
      showToast(bootstrap, "shopErrorToast");
      return;
    }

    axios.get(`https://api.cors.lol/?url=${shopURL}`, {
      method: "GET",
    })
      .then(response => {
        const $ = cheerio.load(response.data);
        const results: string[] = [];
        let src: string = "";

        // Handle multiple shop domains
        try {
          const host = new URL(shopURL).hostname;
          const shop = host.split(".")[1];
          if (shop === "amazon") {
            // Amazon
            const images = $("#main-image-container").find("img");
            images.each((_index: number, image) => {
              const src = $(image).attr("src");
              results.push(src ?? "");
            });
            src = results[results.length - 1] ?? "";
          } else if (shop === "ebay") {
            // Ebay
            const images = $(".ux-image-carousel-item").find("img");
            images.each((_index: number, image) => {
              const src = $(image).attr("src");
              results.push(src ?? "");
            });
            src = results[0];
          } else if (shop === "etsy") {
            // TODO: Etsy
            return;
          } else if (shop === "hottopic") {
            const images = $("#primary-image").find("img");
            images.each((_index: number, image) => {
              const src = $(image).attr("src");
              results.push(src ?? "");
            });
            src = results[0];
          } else {
            // If shop not supported then return
            showToast(bootstrap, "shopErrorToast");
            return;
          }
        } catch (error) {
          showToast(bootstrap, "shopErrorToast");
          return;
        }
        setOutfitImageURL(src);
        showToast(bootstrap, "outfitToast");
      })
      .catch(error => {
        console.error(error);
      });
  };

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
    if (outfitImageURL === "/placeholder.png") {
      showToast(bootstrap, "noOutfitToast");
      return;
    };
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
        const data = Buffer.from(part.inlineData.data as string, "base64").toString("base64");
        setOutputImageData(data);
        setOutputImageURL(`data:image/jpeg;base64,${data}`);
      }
    }
  };

  // Add image to wardrobe
  const addToWardrobe = (data: string) => {
    // Guard clauses
    if (data.length == 0) return;

    // Save to local storage
    const savedWardrobe = localStorage.getItem("wardi_ardrobe") ?? "";
    localStorage.setItem("wardi_wardrobe", `${savedWardrobe};${data}`);

    // Show message
    showToast(bootstrap, "addToast");
  };

  return (
    <RootLayout>
      <NavBar activePage="image-try" />
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

              {/* Outfit image uploader */}
              <div className="m-2">
                <label htmlFor="outfitImageInput" className="form-label">
                  Upload outfit image <i className="bi bi-upload m-1"></i>
                </label>
                <input
                  type="file"
                  className="form-control"
                  aria-label="outfitImageInput"
                  id="outfitImageInput"
                  onChange={(onOutfitImageChange)}
                />
              </div>
              <div className="m-2">
                <div className="form-floating">
                  <input
                    type="url"
                    className="form-control"
                    id="linkInput"
                    placeholder="https://www.nothing.com"
                    value={shopURL}
                    onChange={(event) => setShopURL(event.target.value)}
                  />
                  <label htmlFor="linkInput">Shop link</label>
                </div>
              </div>
              <div className="m-2">
                <button
                  type="button"
                  className="btn btn-secondary me-2"
                  onClick={() => setOutfitImageURL("/shirt.jpg")}>Use sample <i className="bi bi-image"></i></button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => importFromShop()}
                  data-bs-toggle="tooltip"
                  data-bs-title="Supported shops: Amazon, Ebay, Etsy, HotTopic"
                  data-bs-placement="right"
                >Import from shop <i className="bi bi-bag-fill"></i></button>
              </div>

              {/* Outfit image display */}
              <div className="m-2 text-center">
                <Image src={outfitImageURL} width={100} height={100} unoptimized={true} className="img-thumbnail rounded display-img" alt="baseImage" />
                {
                  outfitImageURL === "/shirt.jpg"
                    ?
                    <p className="text-body-tertiary">Image provided by Anna Nekrashevich via Pexels</p>
                    :
                    <div></div>
                }
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
      </div>

      <Toast id="noImageToast" header="Error" message="Please upload a base image!" isError={true} />
      <Toast id="noOutfitToast" header="Error" message="Please upload an outfit image!" isError={true} />
      <Toast id="noProfileToast" header="Error" message="No profile image set!" isError={true} />
      <Toast id="shopErrorToast" header="Error" message="Shop URL not supported!" isError={true} />
      <Toast id="outfitToast" header="Imported" message="Outfit imported from shop!" />
      <Toast id="addToast" header="Added" message="Item added to wardrobe!" />
    </RootLayout>
  )
};

export default ImageTry;