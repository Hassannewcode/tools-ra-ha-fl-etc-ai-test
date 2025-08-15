import { GoogleGenAI, Type } from "@google/genai";
import type { DeviceDetails } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    description: {
      type: Type.STRING,
      description: "A concise, one-paragraph technical description of the device, its primary purpose, and key features."
    },
    useCases: {
      type: Type.ARRAY,
      description: "A list of 3-5 common use cases in electronics, IoT, or security research.",
      items: { type: Type.STRING }
    },
    codeExample: {
      type: Type.OBJECT,
      description: "A simple but functional code snippet that a beginner could run.",
      properties: {
        language: {
          type: Type.STRING,
          description: "The programming language of the code snippet (e.g., Python, C++, Bash, MicroPython)."
        },
        code: {
          type: Type.STRING,
          description: "The source code of the example. For example, blinking an LED, printing to serial, or a basic network scan."
        },
        simulatedOutput: {
          type: Type.STRING,
          description: "A short, one or two-line example of the console output that this code would produce when run successfully."
        }
      },
      required: ['language', 'code', 'simulatedOutput']
    }
  },
  required: ['description', 'useCases', 'codeExample']
};


export async function getDeviceDetails(deviceName: string): Promise<DeviceDetails> {
  const prompt = `For the hardware device "${deviceName}", provide a technical overview, common use cases, and a simple "hello world" style code example. For the code example, also provide a simulated console output. The target audience is a hardware hobbyist.`;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      }
    });
    
    const resultJson = JSON.parse(response.text);
    return resultJson as DeviceDetails;

  } catch (error) {
    console.error(`Error fetching details for ${deviceName}:`, error);
    throw new Error('Failed to communicate with the Gemini API.');
  }
}
