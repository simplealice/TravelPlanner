import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';  // Import environment

@Injectable({
  providedIn: 'root'
})
export class DalleImageService {

  private apiKey: string = environment.openaiApiKey;  // Replace with your OpenAI API key
  private apiEndpoint: string = 'https://api.openai.com/v1/images/generations';

  constructor() { }

  async generateCartoonCharacterImage(): Promise<string> {
    try {
      const response = await axios.post(this.apiEndpoint, {
        prompt: 'human manga character, transparent background, warm colours, manga 2d style',
        n: 1,
        size: '256x256'
      }, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      const imageUrl = response.data.data[0].url;
      return imageUrl;
    } catch (error) {
      console.error('Error generating image:', error);
      throw new Error('Failed to generate image');
    }
  }
}
