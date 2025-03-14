import { NextResponse } from 'next/server';

interface GenerationSettings {
  style: {
    architecturalStyle: string;
    buildingType: string;
    customStyleNotes: string;
  };
  materials: {
    primaryMaterial: string;
    secondaryMaterial: string;
    finishType: string;
  };
  lighting: {
    timeOfDay: number;
    weather: string;
    shadowIntensity: number;
  };
  technical: {
    controlNetMode: string;
    denoisingStrength: number;
    steps: number;
    cfgScale: number;
  };
}

function buildPrompt(settings: GenerationSettings, userPrompt: string): string {
  // Build materials description
  const materialsDesc = `${settings.materials.primaryMaterial} and ${settings.materials.secondaryMaterial} construction with ${settings.materials.finishType} finish`;
  
  // Build lighting description based on time of day
  const hour = settings.lighting.timeOfDay;
  let timeDesc = '';
  if (hour >= 5 && hour < 8) timeDesc = 'dawn lighting, morning atmosphere';
  else if (hour >= 8 && hour < 17) timeDesc = 'daylight, natural lighting';
  else if (hour >= 17 && hour < 20) timeDesc = 'dusk lighting, evening atmosphere';
  else timeDesc = 'night lighting, evening atmosphere';

  // Weather description
  const weatherDesc = {
    clear: "clear sky, natural lighting",
    overcast: "overcast sky, soft diffused lighting",
    rainy: "rainy atmosphere, moody lighting"
  }[settings.lighting.weather];

  // Use user's custom prompt if provided, otherwise build from settings
  const basePrompt = userPrompt || `${settings.style.architecturalStyle} ${settings.style.buildingType}, ${settings.style.customStyleNotes}`;
  
  // Combine descriptions, maintaining architectural focus
  return `${basePrompt}, ${materialsDesc}, ${timeDesc}, ${weatherDesc}, architectural visualization, detailed building features`.trim();
}

async function sendToAutomatic1111(settings: GenerationSettings, image: string, userPrompt: string) {
  try {
    // Reduce ControlNet weights to allow more creative freedom while maintaining structure
    const controlNetWeight = 
      settings.technical.controlNetMode === "Balanced" ? 0.6 :
      settings.technical.controlNetMode === "Prompt Focus" ? 0.4 : 0.8;

    // Adjust guidance values to allow more creative interpretation
    const shadowFactor = settings.lighting.shadowIntensity / 100;
    const guidanceStart = 0.2; // Start guidance later to allow more initial freedom
    const guidanceEnd = 0.7; // End guidance earlier to allow more creative freedom at the end

    const prompt = buildPrompt(settings, userPrompt);
    console.log('Sending request to API with payload:', {
      prompt,
      denoising_strength: settings.technical.denoisingStrength,
      steps: settings.technical.steps,
      cfg_scale: settings.technical.cfgScale
    });

    const response = await fetch('https://9404ea85c1c2d654ea.gradio.live/sdapi/v1/img2img', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        init_images: [image],
        prompt,
        negative_prompt: "unrealistic proportions, bad architecture, deformed structure, blurry, low quality, distorted perspective, plain surface, flat texture",
        steps: settings.technical.steps,
        cfg_scale: settings.technical.cfgScale,
        width: 768,
        height: 768,
        restore_faces: false,
        sampler_name: "DPM++ 2M Karras",
        denoising_strength: settings.technical.denoisingStrength,
        alwayson_scripts: {
          controlnet: {
            args: [{
              input_image: image,
              module: "canny",
              model: "control_v11p_sd15_canny [d14c016b]",
              weight: controlNetWeight,
              guidance_start: guidanceStart,
              guidance_end: guidanceEnd,
              processor_res: 768,
              threshold_a: 100,
              threshold_b: 200,
              control_mode: settings.technical.controlNetMode,
              pixel_perfect: true
            }]
          }
        }
      }),
    });

    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error('Server error response:', errorData);
      throw new Error(`HTTP error! status: ${response.status}, details: ${errorData}`);
    }

    const data = await response.json();
    console.log('Received response data structure:', Object.keys(data));
    
    if (!data.images || !data.images[0]) {
      console.error('Unexpected response format:', JSON.stringify(data));
      throw new Error('No image data in response');
    }
    return data.images[0]; // Base64 encoded image
  } catch (error: any) {
    console.error('Detailed error:', {
      message: error?.message || 'Unknown error',
      cause: error?.cause,
      stack: error?.stack
    });
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    const { settings, image, prompt } = await request.json();

    if (!settings || !image) {
      return NextResponse.json(
        { error: 'Settings and image are required' },
        { status: 400 }
      );
    }

    console.log('Received request with settings:', JSON.stringify(settings, null, 2));
    console.log('Image data length:', image.length);
    console.log('User prompt:', prompt);

    const generatedImage = await sendToAutomatic1111(settings, image, prompt);

    return NextResponse.json({ image: generatedImage });
  } catch (error: any) {
    console.error('Error in generate route:', {
      message: error?.message || 'Unknown error',
      cause: error?.cause,
      stack: error?.stack
    });
    return NextResponse.json(
      { error: 'Failed to generate image: ' + (error?.message || 'Unknown error') },
      { status: 500 }
    );
  }
} 