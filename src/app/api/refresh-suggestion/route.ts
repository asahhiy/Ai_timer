import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
console.log("API key is from enviroment", GEMINI_API_KEY);
if (!GEMINI_API_KEY) {
  console.log('API入ってないよ( ´∀｀ )')
}

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export async function GET() {
  const prompt = `
  #命令
  作業の合間にできるリフレッシュ方法を１つ提案してください

  #制約事項
-1～2分程度でできること
-室内でできること
-体を動かすこと
-絵文字を１つ含めること
-簡潔に１文に収めること
-「～しよう」のように提案する形で終わらせること
-

  #出力例
-大きく背伸びしてみよう☻
`;



  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });
  //console.log(response.text);
  return NextResponse.json({ suggetion: response.text }, { status: 200 });
}
