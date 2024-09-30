"use client";

import { useImageGeneration } from "../hooks/useImageGeneration";
import { useFormManagement } from "../hooks/useFormManagement";
import { useHistory } from "../hooks/useHistory";

import FormContainer from "@/components/FormContainer";
import HistoryList from "@/components/HistoryList";
import LoadingCircle from "@/components/LoadingCircle";

const Home = () => {
  const { output, generateImage, loading } = useImageGeneration();
  const formState = useFormManagement(generateImage);
  const history = useHistory(output, formState.prompt);

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

  return (
    <div className="items-center min-h-screen py-2">
      <h1 className="mt-6 mb-12 md:mt-8 md:mb-16 text-3xl md:text-4xl font-bold text-purple-600 text-center transition-all">
        Let's make your creativity reality!
      </h1>
      <div className="flex justify-center">
        <div className="px-4 flex max-w-7xl w-full flex-wrap gap-4 justify-center">
          <FormContainer formState={formState} loading={loading} />
          <div className="md:flex-1 grow flex flex-col gap-4 flex-wrap items-center">
            {loading && (
              <div className="p-8 bg-white shadow-lg rounded-lg border w-full">
                <label className="block text-left mb-2 bg-slate-200 rounded-md px-3.5 py-1.5">
                  ✨ {formState.prompt}
                </label>
                <div className="my-4 flex flex-wrap gap-4">
                  <div className="w-full flex items-center justify-center">
                    <LoadingCircle />
                  </div>
                </div>
              </div>
            )}
            <HistoryList
              loading={loading}
              history={history}
              downloadImage={downloadImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
