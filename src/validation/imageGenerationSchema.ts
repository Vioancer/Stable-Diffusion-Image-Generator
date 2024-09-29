import { z } from "zod";

export const imageGenerationSchema = z.object({
  prompt: z.string().min(5, "Prompt must be at least 5 characters long."),
  negative_prompt: z.string().optional(),
  width: z
    .number()
    .min(64, "Width must be at least 64px.")
    .max(2048, "Width cannot exceed 2048px."),
  height: z
    .number()
    .min(64, "Height must be at least 64px.")
    .max(2048, "Height cannot exceed 2048px."),
  num_outputs: z
    .number()
    .min(1, "Must generate at least 1 image.")
    .max(4, "Cannot generate more than 4 images."),
  image: z.string().url().optional(),
  mask: z.string().url().optional(),
  prompt_strength: z.number().min(0).max(1).optional(),
});
