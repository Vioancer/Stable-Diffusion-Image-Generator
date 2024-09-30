import Replicate from "replicate";
import { NextResponse } from "next/server";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
  userAgent: "https://www.npmjs.com/package/create-replicate",
});

const model =
  "stability-ai/sdxl:7762fd07cf82c948538e41f63f77d685e02b063e37e496e96eefd46c929f9bdc";

// Define a specific input type
interface Input {
  width: number;
  height: number;
  prompt: string;
  negative_prompt?: string;
  num_outputs?: number;
  image?: string;
  mask?: string;
  prompt_strength?: number;
  refine?: string;
  scheduler?: string;
  lora_scale?: number;
  guidance_scale?: number;
  apply_watermark?: boolean;
  high_noise_frac?: number;
  num_inference_steps?: number;
}

export async function POST(req: Request) {
  const {
    prompt,
    negative_prompt,
    width,
    height,
    num_outputs,
    image,
    mask,
    prompt_strength,
  } = await req.json();

  try {
    const input: Input = {
      prompt,
      negative_prompt,
      width,
      height,
      num_outputs,
      prompt_strength,
      refine: "expert_ensemble_refiner",
      scheduler: "K_EULER",
      lora_scale: 0.6,
      guidance_scale: 7.5,
      apply_watermark: false,
      high_noise_frac: 0.8,
      num_inference_steps: 25,
    };

    if (image.length) {
      input.image = image;
    }

    if (mask.length) {
      input.mask = mask;
    }

    console.log("Using model: %s", model);
    console.log("With input: %O", input);

    const output = await replicate.run(model, { input });
    return NextResponse.json({ output });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        error: "Failed to generate image",
      },
      { status: 500 }
    );
  }
}
