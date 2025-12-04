import { GoogleGenAI, Type, Schema } from "@google/genai";
import { GeneratedSite, SectionType } from "../types";

const apiKey = process.env.API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

const colorPaletteSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    primary: { type: Type.STRING, description: "Main brand color (Hex code)" },
    secondary: { type: Type.STRING, description: "Secondary brand color (Hex code)" },
    background: { type: Type.STRING, description: "Background color (Hex code, usually light)" },
    text: { type: Type.STRING, description: "Text color (Hex code, usually dark)" },
    accent: { type: Type.STRING, description: "Accent color for buttons/highlights" },
  },
  required: ["primary", "secondary", "background", "text", "accent"],
};

const sectionContentSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    headline: { type: Type.STRING },
    subheadline: { type: Type.STRING },
    bodyText: { type: Type.STRING },
    ctaButtonText: { type: Type.STRING },
    items: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          iconName: { type: Type.STRING, description: "A suggested icon name (e.g., 'star', 'user', 'settings') representing the item" },
        },
      },
    },
  },
  required: ["headline"],
};

const siteSectionSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    type: {
      type: Type.STRING,
      enum: [
        SectionType.HERO,
        SectionType.FEATURES,
        SectionType.ABOUT,
        SectionType.TESTIMONIALS,
        SectionType.CONTACT,
        SectionType.GALLERY,
        SectionType.FAQ,
      ],
    },
    content: sectionContentSchema,
  },
  required: ["type", "content"],
};

const sitePageSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    slug: { type: Type.STRING },
    sections: {
      type: Type.ARRAY,
      items: siteSectionSchema,
    },
  },
  required: ["title", "slug", "sections"],
};

const generatedSiteSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    siteName: { type: Type.STRING },
    tagline: { type: Type.STRING },
    description: { type: Type.STRING },
    palette: colorPaletteSchema,
    pages: {
      type: Type.ARRAY,
      items: sitePageSchema,
    },
  },
  required: ["siteName", "palette", "pages", "tagline"],
};

export const generateWebsite = async (userPrompt: string): Promise<GeneratedSite> => {
  try {
    const modelId = "gemini-2.5-flash"; // Efficient for JSON generation
    
    const response = await ai.models.generateContent({
      model: modelId,
      contents: `You are a highly creative and innovative Arabic web designer and consultant.
      The user will provide a basic idea for a website. 
      
      YOUR TASK:
      1. Analyze the user's idea: "${userPrompt}".
      2. EXPAND on this idea creatively. Do not just strictly follow what they said. Invent new features, catchy marketing copy, and professional structures that make sense for this type of site.
      3. Create a catchy Site Name if they didn't provide one.
      4. Generate a complete website structure including navigation, color palette, and high-quality Arabic content for 3-5 pages.
      
      Ensure the content is in Arabic and culturally appropriate.
      The output must strictly follow the JSON schema provided.
      The 'type' of sections must correspond to standard web components like Hero, Features, About, etc.
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: generatedSiteSchema,
        temperature: 0.85, // Higher temperature for more creativity
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as GeneratedSite;
    }
    throw new Error("No response text from Gemini");
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw error;
  }
};