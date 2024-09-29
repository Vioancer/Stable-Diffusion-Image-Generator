import { useState } from "react";

export interface ImageGenerationOptions {
  prompt: string;
  negative_prompt?: string;
  width?: number;
  height?: number;
  num_outputs?: number;
  image?: string | null;
  mask?: string | null;
  prompt_strength?: number;
}

export const useImageGeneration = () => {
  const [output, setOutput] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async ({
    prompt,
    negative_prompt,
    width = 768,
    height = 768,
    num_outputs = 1,
    image,
    mask,
    prompt_strength,
  }: ImageGenerationOptions) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          negative_prompt,
          width,
          height,
          num_outputs,
          image,
          mask,
          prompt_strength,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate image");
      }

      const data = await response.json();
      setOutput(data.output);
    } catch (err) {
      setError("Error generating image");
    } finally {
      setLoading(false);
    }
  };

  return { generateImage, output, loading, error };
};
