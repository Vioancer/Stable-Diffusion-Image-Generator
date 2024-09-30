import { useState, useCallback } from "react";
import { imageGenerationSchema } from "../validation/imageGenerationSchema";
import { ImageGenerationOptions } from "../hooks/useImageGeneration";

export interface FormState {
  prompt: string;
  setPrompt: (value: string) => void;
  negative_prompt: string;
  setNegativePrompt: (value: string) => void;
  advancedOptions: boolean;
  setAdvancedOptions: (value: boolean) => void;
  width: number;
  setWidth: (value: number) => void;
  height: number;
  setHeight: (value: number) => void;
  num_outputs: number;
  setNumOutputs: (value: number) => void;
  image: string;
  setImageUrl: (value: string) => void;
  mask: string;
  setMaskUrl: (value: string) => void;
  prompt_strength: number;
  setPromptStrength: (value: number) => void;
  errorMessages: string[];
  handleSubmit: () => void;
}

export const useFormManagement = (
  generateImage: (options: ImageGenerationOptions) => void
) => {
  const [prompt, setPrompt] = useState("");
  const [negative_prompt, setNegativePrompt] = useState("");
  const [advancedOptions, setAdvancedOptions] = useState(false);
  const [width, setWidth] = useState(768);
  const [height, setHeight] = useState(768);
  const [num_outputs, setNumOutputs] = useState(1);
  const [image, setImageUrl] = useState("");
  const [mask, setMaskUrl] = useState("");
  const [prompt_strength, setPromptStrength] = useState(0.8);
  const [errorMessages, setErrorMessages] = useState<string[] | null>([]);

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
    generateImage,
  ]);

  return {
    prompt,
    setPrompt,
    negative_prompt,
    setNegativePrompt,
    advancedOptions,
    setAdvancedOptions,
    width,
    setWidth,
    height,
    setHeight,
    num_outputs,
    setNumOutputs,
    image,
    setImageUrl,
    mask,
    setMaskUrl,
    prompt_strength,
    setPromptStrength,
    errorMessages,
    handleSubmit,
  } as FormState;
};
