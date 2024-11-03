import OpenAI from "openai";
import {OPENAI_API_KEY} from './config'

const openai = new OpenAI({apiKey:OPENAI_API_KEY, dangerouslyAllowBrowser: true});

export async function enhanceText(input) {
  const completion = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    prompt: `Enhance the following text: "${input}"`,
    max_tokens: 80,
    temperature: 0.8,
  });

  return completion
}

