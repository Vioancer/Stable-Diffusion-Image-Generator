"use client";

import { useState, useCallback, useEffect } from "react";
import {
  useImageGeneration,
  ImageGenerationOptions,
} from "../hooks/useImageGeneration";
import { imageGenerationSchema } from "../validation/imageGenerationSchema";

import InputField from "@/components/FormFields/InputField";
import FileInputField from "@/components/FormFields/FileInputField";
import DimensionField from "@/components/FormFields/DimensionField";
import SelectField from "@/components/FormFields/SelectField";
import PromptStrengthField from "@/components/FormFields/PromptStrengthField";

import LoadingCircle from "@/components/LoadingCircle";

import Image from "next/image";
import { Download } from "lucide-react";

interface HistoryEntry {
  prompt: string;
  output: string[] | null;
}

const Home = () => {
  const [prompt, setPrompt] = useState("");
  const [negative_prompt, setNegativePrompt] = useState("");
  const [advancedOptions, setAdvancedOptions] = useState(false);
  const [width, setWidth] = useState(768);
  const [height, setHeight] = useState(768);
  const [num_outputs, setNumOutputs] = useState(1);
  const [image, setImageUrl] = useState("");
  const [mask, setMaskUrl] = useState("");
  const [prompt_strength, setPromptStrength] = useState(0.8);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [errorMessages, setErrorMessages] = useState<string[] | null>([]);

  const { output, generateImage, loading, error } = useImageGeneration();

  const downloadImage = async (url: string) => {
    const response = await fetch(url);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = "generated_image.png";
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(blobUrl);
        resolve("Image downloaded successfully");
      };
      reader.onerror = () => {
        reject(new Error("Failed to download image"));
      };
      reader.readAsDataURL(blob);
    });
  };

  const handleSubmit = useCallback(() => {
    const formData = {
      prompt,
      negative_prompt,
      width,
      height,
      num_outputs,
      image,
      mask,
      prompt_strength,
    };

    const validationResult = imageGenerationSchema.safeParse(formData);

    if (validationResult.success) {
      const imageGenerationOptions: ImageGenerationOptions =
        validationResult.data;
      generateImage(imageGenerationOptions);
      setErrorMessages(null);
    } else {
      console.error("Validation error:", validationResult.error);
      setErrorMessages(
        validationResult.error.errors.map((error) => error.message)
      );
    }
  }, [
    prompt,
    negative_prompt,
    width,
    height,
    num_outputs,
    image,
    mask,
    prompt_strength,
  ]);

  useEffect(() => {
    if (output?.length) {
      const newEntry: HistoryEntry = {
        prompt,
        output,
      };
      setHistory((prevHistory) => [newEntry, ...prevHistory]);
    } else {
      setHistory([]);
    }
  }, [output]);

  return (
    <div className="items-center min-h-screen py-2">
      <h1 className="mt-6 mb-12 md:mt-8 md:mb-16 text-3xl md:text-4xl font-bold text-purple-600 text-center transition-all">
        Let's make your creativity reality!
      </h1>
      <div className="flex justify-center">
        <div className="px-4 flex max-w-7xl w-full flex-wrap gap-4 justify-center">
          <div className="md:flex-1 w-full sm:min-w-[14rem] lg:min-w-[28rem] grow lg:grow-0 items-center text-center">
            <div className="w-full p-8 bg-white shadow-lg rounded-lg border">
              <h2 className="text-xl font-semibold mb-4">
                Stable Diffusion AI Image Generator
              </h2>
              <hr className="mb-8 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25" />
              {errorMessages?.length! > 0 && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                  role="alert"
                >
                  <strong className="font-bold">
                    Oops! Validation Errors:
                  </strong>
                  <ul className="mt-2">
                    {errorMessages?.map((message, index) => (
                      <li key={index} className="text-sm">
                        • {message}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <InputField
                label="Prompt"
                value={prompt}
                onChange={setPrompt}
                placeholder="Input prompt"
              />

              <DimensionField
                width={width}
                height={height}
                setWidth={setWidth}
                setHeight={setHeight}
              />

              <SelectField
                label="Number of Outputs"
                options={[1, 2, 3, 4]}
                value={num_outputs}
                onChange={setNumOutputs}
              />

              {advancedOptions && (
                <>
                  <InputField
                    label="Negative Prompt (Optional)"
                    value={negative_prompt}
                    onChange={setNegativePrompt}
                    placeholder="Input negative prompt"
                  />

                  <FileInputField
                    label="Image (Optional)"
                    description="(Input image for img2img or inpaint mode.)"
                    onChange={setImageUrl}
                    value={image}
                  />

                  <FileInputField
                    label="Mask (Optional)"
                    description="(Input mask for inpaint mode.)"
                    onChange={setMaskUrl}
                    value={mask}
                  />

                  <PromptStrengthField
                    onChange={setPromptStrength}
                    value={prompt_strength}
                  />
                </>
              )}

              <button
                className="text-purple-600 mb-4 hover:underline"
                onClick={() => setAdvancedOptions(!advancedOptions)}
              >
                {advancedOptions
                  ? "Hide Advanced Options"
                  : "Show Advanced Options"}
              </button>

              <button
                className="bg-purple-600 hover:bg-purple-600/70 text-white p-2 rounded w-full"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Generating..." : "Generate"}
              </button>
            </div>
          </div>
          <div className="md:flex-1 grow flex flex-col gap-4 flex-wrap items-center">
            {loading && (
              <div className="p-8 bg-white shadow-lg rounded-lg border w-full">
                <label className="block text-left mb-2 bg-slate-200 rounded-md px-3.5 py-1.5">
                  ✨ {prompt}
                </label>
                <div className="my-4 flex flex-wrap gap-4">
                  <div className="w-full flex items-center justify-center">
                    <LoadingCircle />
                  </div>
                </div>
              </div>
            )}
            {history.length ? (
              history.map((frame, index) => (
                <div
                  key={index}
                  className="p-8 bg-white shadow-lg rounded-lg border w-full"
                >
                  <label className="block text-left mb-2 bg-slate-200 rounded-md px-3.5 py-1.5">
                    ✨ {frame.prompt}
                  </label>
                  <div className="my-4 flex flex-wrap gap-4">
                    {frame?.output?.map((url, index) => (
                      <div className="relative rounded-md grow overflow-hidden group">
                        <Image
                          className="w-full"
                          key={index}
                          src={url}
                          width={300}
                          height={300}
                          alt="image"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                        <button
                          className="absolute bottom-2 right-2 bg-purple-600 text-white rounded-md px-2 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          onClick={() => {
                            downloadImage(url)
                              .then((message) => {
                                console.log(message);
                              })
                              .catch((error) => {
                                console.error(error);
                              });
                          }}
                        >
                          <Download />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 bg-white shadow-lg rounded-lg border w-full">
                <label className="block text-left mb-2 bg-slate-200 rounded-md px-3.5 py-1.5">
                  ✨ An astronaut riding a rainbow unicorn, cinematic, dramatic
                </label>
                <div className="my-4 flex flex-wrap gap-4">
                  <div className="relative rounded-md grow overflow-hidden group">
                    <Image
                      className="w-full"
                      src="https://pbxt.replicate.delivery/YXbcLudoHBIYHV6L0HbcTx5iRzLFMwygLr3vhGpZI35caXbE/out-0.png"
                      width={300}
                      height={300}
                      alt="image"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
