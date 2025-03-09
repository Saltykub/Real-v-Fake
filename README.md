<img alt="Real v Fake" src="/public/banner.png"/>
<h1 align="center">SCDS TechFest Hackathon 2025 - Team 9: Real v Fake</h1>

<p align="center">
  <a href="https://nextjs.org"><img alt="next" src="https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"/></a>
  <a href="https://react.dev/"><img alt="react" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/></a>
  <a href="https://www.typescriptlang.org/"><img alt="typescript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/></a>
  <a href="https://tailwindcss.com/"><img alt="tailwindcss" src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/></a>
  <a href="https://ui.shadcn.com/"><img alt="shadcn" src="https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white"/></a>
</p>
<p align="center">
  <a href="https://supabase.com"><img alt="supabase" src="https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=white"/></a>
  <a href="https://fastapi.tiangolo.com/"><img alt="fastapi" src="https://img.shields.io/badge/fastapi-109989?style=for-the-badge&logo=FASTAPI&logoColor=white"/></a>
  <a href="https://platform.openai.com/"><img alt="gpt" src="https://img.shields.io/badge/ChatGPT-74aa9c?style=for-the-badge&logo=openai&logoColor=white"/></a>
  <a href="https://huggingface.co/"><img alt="huggingface" src="https://img.shields.io/badge/-HuggingFace-FDEE21?style=for-the-badge&logo=HuggingFace&logoColor=black"/></a>
  <a href="https://www.python.org/"><img alt="python" src="https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue"/></a>
</p>

## Key Features

- **Authenthication:** users can register and login via email
- **Fake Shop/Product Detection:**
  - Product Review Sentimental Analysis: [Xenova/bert-base-multilingual-uncased-sentiment](https://huggingface.co/Xenova/bert-base-multilingual-uncased-sentiment)
  - Review Tone Analysis: [Xenova/distilbert-base-uncased-finetuned-sst-2-english](https://huggingface.co/Xenova/distilbert-base-uncased-finetuned-sst-2-english)
  - AI-Generated Detection: [openai-community/roberta-base-openai-detector](https://huggingface.co/openai-community/roberta-base-openai-detector)
  - Classification Model with ChatGPT Feature Engineering
![detect](public/detect.png)

- **Community Database:** users can report fake shops, which will be added to our database shown to all users
![community](/public/community.png)

## Demo

You can view a fully working demo at [demo-nextjs-with-supabase.vercel.app](https://demo-nextjs-with-supabase.vercel.app/).

## Visit Us

To try Real v Fake, visit our website: [https://realvfake.vercel.app](https://realvfake.vercel.app/).
> Due to privacy policies, our website can only be applied to Amazon website

> The sentimental analysis model may face Vercel server runtimes limit, so the results may not fully display

## Clone and run locally

1. You'll first need a Supabase project which can be made [via the Supabase dashboard](https://database.new)

2. Add environment variables in `.env.local`
   ```
   NEXT_PUBLIC_SUPABASE_URL=[INSERT SUPABASE PROJECT URL]
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[INSERT SUPABASE PROJECT API ANON KEY]
   NEXT_PUBLIC_OPENAI_API_KEY=[INSERT OPENAI API KEY]
   ```
3. Clone this repository

   ```bash
    git clone https://github.com/Saltykub/Real-v-Fake.git
   
    cd real-v-fake
    pnpm i
    pnpm dev
   ```


## Developers

From Nanyang Technological University, Singapore:
1. Peeranat Kongkijpipat
2. Plengpin Tongdon-ngao
3. Kulpatch Chananam
4. Nathan Juirnarongrit
