import os
import requests
from openai import OpenAI
from dotenv import load_dotenv
from datetime import datetime

# Load environment variables
load_dotenv()

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

def generate_startup_logos():
    # Create images directory if it doesn't exist
    if not os.path.exists('images'):
        os.makedirs('images')
    # List of prompts for DeskHero logo variations
    logo_prompts = [
        "A modern logo design for 'DeskHero' with a minimalist desk silhouette transforming into a soaring superhero cape, in shades of blue and silver on a clean white background",
        "A dynamic logo for 'DeskHero' featuring a circular emblem where a desk morphs into rising wings, using metallic blue and platinum gradients on a solid light gray background",
        "An innovative 'DeskHero' logo showing a desk viewed from above forming a star or compass shape, with radiating blue and silver elements on a pure white backdrop",
        "A bold 'DeskHero' logo design with a hexagonal frame containing a stylized desk that creates a lightning bolt effect, in deep blue and chrome on a crisp white background",
        "A contemporary 'DeskHero' logo featuring interlocking D and H letters formed by desk elements and heroic symbols, in royal blue and platinum gradients on an off-white background",
        "A mystical 'DeskHero' logo with a desk that transforms into a phoenix rising from geometric patterns, in vibrant purple and gold gradients on a solid white canvas",
        "An energetic 'DeskHero' design showing a desk exploding into particles that form a superhero mask, using electric green and obsidian black on a clean white surface",
        "A powerful 'DeskHero' emblem where office supplies orbit around a desk like an atom, in deep crimson and brushed silver on a minimalist white background",
        "A futuristic 'DeskHero' insignia featuring a holographic desk projecting a force field shield, in iridescent teal and rose gold on a pure white backdrop",
        "A dramatic 'DeskHero' logo where keyboard keys spiral into a tornado around a desk, in storm gray and electric copper on a simple white background"
    ]
    generated_logos = []
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    
    for i, prompt in enumerate(logo_prompts):
        try:
            response = client.images.generate(
                model="dall-e-3",
                prompt=prompt,
                size="1024x1024",
                quality="standard",
                n=1
            )
            
            image_url = response.data[0].url
            
            # Download and save image
            img_response = requests.get(image_url)
            if img_response.status_code == 200:
                filename = f'images/deskhero_logo_{i+1}_{timestamp}.png'
                with open(filename, 'wb') as f:
                    f.write(img_response.content)
                    
                generated_logos.append({
                    'prompt': prompt,
                    'url': image_url,
                    'local_path': filename
                })
            
        except Exception as e:
            print(f"Error generating logo for prompt '{prompt}': {str(e)}")
    
    return generated_logos

if __name__ == "__main__":
    logos = generate_startup_logos()
    for logo in logos:
        print(f"\nPrompt: {logo['prompt']}")
        print(f"Image URL: {logo['url']}")
        print(f"Saved to: {logo['local_path']}")
