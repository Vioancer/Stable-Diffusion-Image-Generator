import Replicate from "replicate";
import { NextResponse } from "next/server";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
  userAgent: "https://www.npmjs.com/package/create-replicate",
});

const model =
  "stability-ai/sdxl:7762fd07cf82c948538e41f63f77d685e02b063e37e496e96eefd46c929f9bdc";

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
    const input: { [key: string]: any } = {
      width,
      height,
      prompt,
      negative_prompt,
      num_outputs,
      refine: "expert_ensemble_refiner",
      scheduler: "K_EULER",
      lora_scale: 0.6,
      guidance_scale: 7.5,
      apply_watermark: false,
      high_noise_frac: 0.8,
      prompt_strength,
      num_inference_steps: 25,
    };

    if (image) {
      input.image = image;
    }

    if (mask) {
      input.mask = mask;
    }

    console.log("Using model: %s", model);
    console.log("With input: %O", input);

    console.log("Running...");

    // const output = await replicate.run(model, { input });
    // console.log("Output: %O", output);
    // return NextResponse.json({ output });

    const output = [
      "https://replicate.delivery/pbxt/8PLRf8aYnSVnByYIFKCZ4Wug9ZVuPpxCsMxfpv1kSqqfCqDnA/out-0.png",
      "https://replicate.delivery/pbxt/SfjfHWROa1s9fJTo1910QltRT0Z6YwaaMx7LRT7Rqxw8jwCnA/out-0.png",
      "https://replicate.delivery/pbxt/SfjfHWROa1s9fJTo1910QltRT0Z6YwaaMx7LRT7Rqxw8jwCnA/out-0.png",
    ];
    return NextResponse.json({ output });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to generate image",
      },
      { status: 500 }
    );
  }
}
