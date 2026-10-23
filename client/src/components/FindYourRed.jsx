import { useEffect, useRef, useState } from "react";
import findYourRedImage from "../assets/images/find-your-red.webp";

function FindYourRed({ redRoom }) {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const canvasRef = useRef(null);

  // Handle image upload
  function handleImageUpload(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    setUploadedImage(imageUrl);
    setFileName(file.name);
  }

  // Release temporary image URLs when replaced or unmounted
  useEffect(() => {
    if (!uploadedImage) return;

    return () => URL.revokeObjectURL(uploadedImage);
  }, [uploadedImage]);

  // Download the uploaded photo with a red-light effect
  function handleDownload() {
    if (!uploadedImage) return;

    const image = new Image();

    image.onload = () => {
      const canvas = canvasRef.current;

      if (!canvas) return;

      const context = canvas.getContext("2d");

      if (!context) return;

      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      // Draw the original image
      context.drawImage(image, 0, 0);

      // Apply a red overlay
      context.fillStyle = "rgba(255, 0, 0, 0.35)";
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Add a darker cinematic gradient
      const gradient = context.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height,
      );

      gradient.addColorStop(0, "rgba(0, 0, 0, 0.15)");
      gradient.addColorStop(1, "rgba(40, 0, 0, 0.65)");

      context.fillStyle = gradient;
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Convert the canvas to an image
      canvas.toBlob((blob) => {
        if (!blob) return;

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = "redline-photo.png";
        document.body.appendChild(link);
        link.click();
        link.remove();

        URL.revokeObjectURL(url);
      }, "image/png");
    };

    image.src = uploadedImage;
  }

  function handleRemove() {
    setUploadedImage(null);
    setFileName("");
  }

  return (
    <section
      id="find-your-red"
      className={`
        grid grid-cols-1 text-[#f5f5f1]
        transition-colors duration-400
        md:grid-cols-1
        lg:min-h-[650px] lg:grid-cols-2
        ${redRoom ? "bg-[#0a0000]" : "bg-[#121212]"}
      `}
    >
      {/* Original image — desktop and tablet */}
      <div
        className="
          relative hidden overflow-hidden
          bg-[#250000]
          md:block md:h-[400px]
          lg:h-auto lg:min-h-[650px]
        "
      >
        <img
          src={findYourRedImage}
          alt="Close-up portrait partially obscured by red shadows"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {redRoom && (
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute inset-0
              bg-red-600/15 mix-blend-multiply
            "
          />
        )}
      </div>

      {/* Content */}
      <div
        className="
          flex min-w-0 flex-col items-start justify-center
          px-5 py-20
          md:p-12
          lg:px-[10%] lg:py-[100px]
        "
      >
        {/* Section label */}
        <p
          className={`
            mb-2 font-body text-xs font-bold
            tracking-[1px]
            md:tracking-[2px]
            lg:mb-4 lg:text-sm lg:tracking-[4px]
            ${redRoom ? "text-[#ff0000]" : "text-[#c40000]"}
          `}
        >
          SIGNATURE EFFECT
        </p>

        {/* Heading */}
        <h2
          className="
            mb-6 font-heading text-[48px]
            font-normal leading-[0.95]
            md:text-[60px]
            lg:mb-8 lg:text-[96px]
          "
        >
          FIND YOUR{" "}
          <span
            className={`
              transition-[color,text-shadow] duration-400
              ${
                redRoom
                  ? "text-[#ff0000] [text-shadow:0_0_30px_rgba(255,0,0,0.6)]"
                  : "text-[#c40000]"
              }
            `}
          >
            RED.
          </span>
        </h2>

        {/* Original image — mobile */}
        <div
          className="
            relative mb-8 aspect-square w-full
            overflow-hidden bg-[#250000]
            md:hidden
          "
        >
          <img
            src={findYourRedImage}
            alt="Close-up portrait partially obscured by red shadows"
            loading="lazy"
            className="h-full w-full object-cover"
          />

          {redRoom && (
            <div
              aria-hidden="true"
              className="
                pointer-events-none absolute inset-0
                bg-red-600/15 mix-blend-multiply
              "
            />
          )}
        </div>

        {/* Description */}
        <p
          className="
            mb-6 max-w-[480px]
            font-body text-base font-light
            leading-[1.8] text-[#a0a0a0]
            md:mb-10 md:max-w-none
            lg:mb-12 lg:max-w-[480px]
          "
        >
          Step into the red light. Upload your photo and experience the{" "}
          <span className="inline-flex font-semibold">
            <span className={redRoom ? "text-[#ff0000]" : "text-[#c40000]"}>
              RED
            </span>
            <span className="text-[#f5f5f1]">LINE</span>
          </span>{" "}
          aesthetic.
        </p>

        {/* Upload area */}
        {!uploadedImage ? (
          <label
            htmlFor="photo-upload"
            className="
              flex min-h-[96px] w-full cursor-pointer
              flex-col items-center justify-center gap-2
              border border-dashed border-white/30
              bg-white/[0.02] px-5 py-5 text-center
              transition-all duration-300
              hover:border-[#c40000]
              hover:bg-red-600/[0.06]
              focus-within:outline-2
              focus-within:outline-offset-4
              focus-within:outline-[#c40000]
              md:min-h-[128px] md:gap-3 md:p-6
              lg:min-h-[190px] lg:p-8
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`mb-1 ${
                redRoom ? "text-[#ff0000]" : "text-[#c40000]"
              }`}
              aria-hidden="true"
            >
              <path d="M12 16V4" />
              <path d="m7 9 5-5 5 5" />
              <path d="M20 16.5v2.25A2.25 2.25 0 0 1 17.75 21h-11.5A2.25 2.25 0 0 1 4 18.75V16.5" />
            </svg>

            <span
              className="
                font-body text-xs font-bold
                tracking-[2px] text-[#f5f5f1]
              "
            >
              UPLOAD YOUR PHOTO
            </span>

            <small className="font-body text-xs text-[#a0a0a0]">
              Click to choose an image
            </small>

            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="sr-only"
            />
          </label>
        ) : (
          <div className="w-full">
            {/* Uploaded image preview */}
            <div className="relative aspect-square w-full overflow-hidden bg-black">
              <img
                src={uploadedImage}
                alt="Your uploaded photo with REDLINE effect"
                className="h-full w-full object-contain"
              />

              {/* Red-light preview effect */}
              <div
                aria-hidden="true"
                className="
                  pointer-events-none absolute inset-0
                  bg-[linear-gradient(135deg,rgba(255,0,0,0.35),rgba(40,0,0,0.65))]
                "
              />
            </div>

            <p className="mt-3 truncate font-body text-xs text-[#a0a0a0]">
              {fileName}
            </p>

            {/* Action buttons */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleDownload}
                className={`
                  flex-1 cursor-pointer px-6 py-4
                  font-body text-xs font-bold tracking-[2px]
                  text-white transition-all duration-300
                  ${
                    redRoom
                      ? "bg-[#ff0000] hover:bg-[#ff3030]"
                      : "bg-[#c40000] hover:bg-[#ff0000]"
                  }
                `}
              >
                DOWNLOAD PHOTO
              </button>

              <button
                type="button"
                onClick={handleRemove}
                className="
                  flex-1 cursor-pointer border border-white/20
                  px-6 py-4 font-body text-xs font-bold
                  tracking-[2px] text-white
                  transition-all duration-300
                  hover:bg-white hover:text-black
                "
              >
                REMOVE PHOTO
              </button>
            </div>
          </div>
        )}

        {/* Hidden canvas for image processing */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </section>
  );
}

export default FindYourRed;
