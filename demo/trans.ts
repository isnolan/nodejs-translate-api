import * as dotenv from 'dotenv';
import { Trans } from '../src';

dotenv.config();

(async () => {
  const trans = new Trans({ provider: 'azure-official', key: process.env.AZURE_KEY });

  const payload = {
    title: 'LinkedIn Posts',
    description: 'Compose a catchy post for LinkedIn',
    template: 'Write a LinkedIn post about',
    forms: {
      'reference links': {
        tips: 'e.g. www.example1.com, www.example2.com',
        label: 'Reference Links',
      },
      about: {
        tips: 'campus placement at a tech giant',
        label: 'About',
      },
      'target audience': {
        tips: 'e.g. working professionals, college students, etc.',
        label: 'Target audience',
      },
      tone: {
        tips: 'e.g. educational, casual, etc.',
        label: 'Tone',
      },
      language: {
        tips: '',
        label: 'Language',
      },
    },
    initialization: {
      system:
        '1. The output that you produce should be in a valid markdown format     2. The markdown should not have bold and/or italics styling     3. Validate that the markdown is correct.     4. Explicitly, dont mention any markdown in the output. 5 Do not add any extra information or comments to the output. keep it precise.',
      user: 'LinkedIn is a professional networking platform where you can share your thoughts, ideas, and experiences with your connections.Your post should be informative,engaging,and relevant to your target audience. Ensure that your post is error - free,factually correct,and follows LinkedIn community guidelines. LinkedIn Posts generally are around 100 to 200 words and not too long. The post never has any title,just the post.',
      sample:
        'It’s 1st of July, so here’s your checklist to finally get started on LinkedIn -\n1st on the list is “profile optimization” - prep work before you start creating great content. \n✅ Click a professional picture of yourself and set it as your profile picture\n✅ Banner - Your Banner should have a killer copy line that says what you do or results you have produced in the last few years and a CTA \n\n✅ Headline - Add a headline which is a combination of what you do, who you help, and how you help. Can also add a link in your bio (portfolio, calendly, etc)\n\n✅ Feature section is the first clickable thing on your profile. Don’t ADD your BEST POST. Add your website link, landing page, Calednly link, published article, basically something that either tells the visitor what you do or how they can connect. \n\n✅ About section - If you want to keep it simple, just add a few lines about TG’s (target audience) problems, what solutions you offer, and how they can benefit from your services. The second way is to talk about your present (what you do now), your future (your vision), and your past (results you’ve brought for other clients)End it with a CTA. \n\n✅ Experience - Add everything you’ve done in the past (internships, part-time, freelance, full-time) and include pointers are your responsibilities, achievements, promotions, etc. \n\n✅ Education - Make this section also detailed. Add relevant keywords for which you want to get ranked on LinkedIn. \n\n✅ Skills - Add skills related to your services and get them endorsed\n\n✅ Recommendations - Try to get a minimum of 3-4 recommendations from your colleagues, clients, or pals. This plays a huge role in building credibility.  \n\nAnd voila, you’re all set to start posting now! \n\nLet me know if you want me to create a post on how to generate ideas for content. \n\nP.S - some profiles for reference \nMatt Barker \nJasmin Alić \nLara Acosta \nLuke Matthews \n\n#content #personalbranding #socialmedia #b2b #founders #linkedincontent #ghostwriter',
    },
  };
  const res = await trans.translate(payload, 'zh-Hans');
  console.log(`->res`, res);
})();
