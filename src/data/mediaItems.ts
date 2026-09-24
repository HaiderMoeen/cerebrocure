import { MediaItem } from '../types/content';
import finalistInnovationImg from '../assets/milestones/finalist-innovation-factory.png';
import featuredExhibitorAiImg from '../assets/milestones/featured-exhibitor-ai-for-good.png';
import guestLectureMontRoseImg from '../assets/milestones/guest-lecture-mont-rose.jpg';
import finalistWomenTechFranceImg from '../assets/milestones/finalist-women-in-tech-france.jfif';
import exhibitorGitexDubaiImg from '../assets/milestones/exhibitor-gitex-global-dubai.jpg';
import gitexDubaiImg from '../assets/milestones/Gitex-dubai.jpeg';
import speaker10PearlsImg from '../assets/milestones/10pearls.jpg';
import aiSeekhoDayImg from '../assets/milestones/ai-seekho-day.jpeg';
import specialGuestSeePakImg from '../assets/milestones/special-guest-see-pakistan.jpeg';
import completionIncubatorImg from '../assets/milestones/completion-national-health-incubator.jpg';
import winnerWomenTechApacImg from '../assets/milestones/winner-women-in-tech-apac.jpg';
import nvidiaInceptionImg from '../assets/milestones/20181218-Nvidia-Inception.webp';
import keynoteImg from '../assets/milestones/Keynote.jpeg';
import googleStartupsImg from '../assets/milestones/Google-for-StartUps.jfif';
import pashaAwardsImg from '../assets/milestones/PASHA-Awards.jfif';
import nicDemoDayImg from '../assets/milestones/NIC.jfif';
import lahoreEvaluatorImg from '../assets/milestones/Lahore-Round-Evaluator.jfif';

export const MEDIA_ITEMS: MediaItem[] = [
  // --- Company Milestones ---
  {
    id: 1,
    region: 'apac',
    year: 2024,
    glyph: 'medal',
    tag: 'Winner',
    title: 'Winner, Most Impactful Initiative, Women in Tech® APAC Award Malaysia 2024',
    description: 'Cerebrocure Technologies received the Most Impactful Initiative Award for its work in AI-driven stroke care innovation.',
    link: 'https://www.instagram.com/p/DBGgQLuqjRS/',
    image: winnerWomenTechApacImg,
  },
  {
    id: 2,
    region: 'global',
    year: 2025,
    glyph: 'medal',
    tag: 'Finalist',
    title: 'Finalist, Innovation Factory Pitching Competition',
    description: 'Selected as one of the top three finalists in the Women Entrepreneurs Pitching Competition at the AI for Good Global Summit 2025 in Geneva, organised by the United Nations and ITU.',
    link: 'https://www.linkedin.com/pulse/cerebrocure-pioneers-stroke-innovation-womens-djmue/',
    image: finalistInnovationImg,
  },
  {
    id: 13,
    region: 'mideast',
    year: 2024,
    glyph: 'medal',
    tag: 'Finalist',
    title: 'Top 17 Global Finalist: SuperNova Pitching at GITEX Dubai',
    description: 'Selected as a Top 17 Global Finalist in the SuperNova Pitching Competition at GITEX Global in Dubai, presenting Cerebrocure\'s AI-driven stroke care platform to international judges, investors, and technology leaders.',
    link: 'https://lnkd.in/p/du7eJKz9',
    image: gitexDubaiImg,
  },
  {
    id: 5,
    region: 'global',
    year: 2025,
    glyph: 'booth',
    tag: 'Exhibitor',
    title: 'Featured Exhibitor, AI for Good Summit, Geneva',
    description: 'Featured Exhibitor at the AI for Good Global Summit 2025, organised by the UN and ITU in Geneva, highlighting the mission to advance equitable healthcare through technology.',
    link: 'https://aiforgood.itu.int/summit25/exhibitors/',
    image: featuredExhibitorAiImg,
  },
  {
    id: 6,
    region: 'mideast',
    year: 2025,
    glyph: 'booth',
    tag: 'Exhibitor',
    title: 'Exhibitor, GITEX Global 2025, Startup Pod, Dubai',
    description: 'Exhibited in the Startup Pod at GITEX Global 2025 at the Dubai World Trade Centre, presenting AI-driven stroke care and meeting global investors, healthcare leaders and technology partners. The milestone supports the mission to democratise stroke care across low- and middle-income countries.',
    image: exhibitorGitexDubaiImg,
  },
  {
    id: 8,
    region: 'global',
    year: 2025,
    glyph: 'chip',
    tag: 'Accepted',
    title: 'NVIDIA Inception Program',
    description: 'Accepted into the NVIDIA Inception Program, a global platform supporting cutting-edge startups, with access to NVIDIA resources, expertise and ecosystem to accelerate the mission of transforming stroke care.',
    image: nvidiaInceptionImg,
  },
  {
    id: 14,
    region: 'global',
    year: 2026,
    glyph: 'chip',
    tag: 'Program',
    title: 'Google for Startups Cloud Program',
    description: 'Accepted into the Google for Startups Cloud Program, receiving Google Cloud credits and technical support to accelerate the development of Cerebrocure’s AI-powered healthcare technology platform.',
    link: 'https://www.linkedin.com/posts/cerebrocure-technologies-pvt-ltd_over-a-year-into-our-journey-with-our-acceptance-activity-7508202199420833793-pGnv?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFAa9M4Bi-KIJz-fkQrAPzImPgMUf1g4Va8',
    image: googleStartupsImg,
  },
  {
    id: 10,
    region: 'pk',
    year: 2023,
    glyph: 'cert',
    tag: 'Programme',
    title: 'National Health Incubator Programme',
    description: 'Awarded a Certificate of Participation by the National Health Incubator, an initiative of Aga Khan University and Accelerate Prosperity, covering design thinking, business model canvas, sales and marketing, financial analysis and pitch making.',
    image: completionIncubatorImg,
  },

  // --- Founder Milestones ---
  {
    id: 4,
    region: 'europe',
    year: 2024,
    glyph: 'medal',
    tag: 'Finalist',
    title: 'Global Finalist, Women in Tech® Global Awards, France',
    description: 'Recognised as a global finalist at the Women in Tech Global Awards 2024, held at the Résidence President of the National Assembly in Paris, for advancing equity in stroke care through AI-driven solutions.',
    link: 'https://www.linkedin.com/posts/womenintechorg_witga24-womenintech-womeninstem-activity-7260586547610079232-8_JO',
    image: finalistWomenTechFranceImg,
  },
  {
    id: 3,
    region: 'europe',
    year: 2025,
    glyph: 'mic',
    tag: 'Guest lecture',
    title: 'Guest Lecture, Department of Health and Social Care, Mont Rose College, UK',
    description: 'Invited by Mont Rose College, London, Dr. Saira Osama delivered a lecture titled "Using AI in Making Effective Healthcare / Clinical Diagnoses" on the transformative role of AI in healthcare.',
    link: 'https://www.facebook.com/photo.php?fbid=1146688600818571&id=100064323264131&set=a.559281679559269',
    image: guestLectureMontRoseImg,
  },
  {
    id: 9,
    region: 'europe',
    year: 2025,
    glyph: 'mic',
    tag: 'Keynote',
    title: 'Keynote Speaker, MRC Research Conference 2025',
    description: 'Invited as keynote speaker at the MRC Research Conference hosted by Mont Rose College, London, presenting pioneering research on using AI for stroke treatment in Pakistan.',
    link: 'https://mrcollege.ac.uk/research-conference-2025/',
    image: keynoteImg,
  },
  {
    id: 7,
    region: 'pk',
    year: 2025,
    glyph: 'mic',
    tag: 'Speaker',
    title: 'Speaker, 10Pearls Women Tech Quest 2025: Breaking Barriers: Women in AI and the Journey from Innovation to Leadership',
    description: 'Invited speaker at one of Pakistan\'s leading women-in-tech events, inspiring female professionals and students in technology and innovation.',
    link: 'https://www.facebook.com/10pearls.pakistan/posts/%F0%9D%91%A8%F0%9D%92%8F%F0%9D%92%8F%F0%9D%92%90%F0%9D%92%96%F0%9D%92%8F%F0%9D%92%84%F0%9D%92%8A%F0%9D%92%8F%F0%9D%92%88-%F0%9D%91%AB%F0%9D%92%93-%F0%9D%91%BA%F0%9D%92%82%F0%9D%92%8A%F0%9D%92%93%F0%9D%92%82-%F0%9D%91%B6%F0%9D%92%94%F0%9D%92%82%F0%9D%92%8E%F0%9D%92%82-%F0%9D%92%82%F0%9D%92%94-%F0%9D%92%82-%F0%9D%92%94%F0%9D%92%91%F0%9D%92%86%F0%9D%92%82%F0%9D%92%8C%F0%9D%92%86%F0%9D%92%93-%F0%9D%92%82%F0%9D%92%95-%F0%9D%91%BE%F0%9D%91%BB%F0%9D%91%B825-%F0%9D%91%B3%F0%9D%92%82%F0%9D%92%89%F0%9D%92%90%F0%9D%92%93%F0%9D%92%86-dr-saira-is-the-founder-c/949064724010885/',
    image: speaker10PearlsImg,
  },
  {
    id: 15,
    region: 'pk',
    year: 2026,
    glyph: 'cert',
    tag: 'Judge',
    title: 'Judge, PASHA Awards 2026',
    description: 'The Founder judged the Pakistan Software Houses Association for IT and ITES (PASHA) Awards 2026, celebrating and engaging with Pakistan’s growing technology, innovation, and entrepreneurial ecosystem.',
    link: 'https://www.linkedin.com/posts/saira-osama_picta2026-pashaawards2026-recognizecelebrateelevate-activity-7507703703865462784-IY7-?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFAa9M4Bi-KIJz-fkQrAPzImPgMUf1g4Va8',
    image: pashaAwardsImg,
  },
  {
    id: 16,
    region: 'pk',
    year: 2026,
    glyph: 'people',
    tag: 'Judge',
    title: 'Judge, NIC Sialkot Demo Day',
    description: 'The Founder was invited as a judge at National Incubation Center (NIC) Sialkot Demo Day, engaging with emerging founders and supporting the growth of Pakistan’s entrepreneurial and technology ecosystem.',
    link: 'https://www.linkedin.com/posts/saira-osama_it-was-a-privilege-to-be-invited-as-a-judge-activity-7492603800709402624-0E0w?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFAa9M4Bi-KIJz-fkQrAPzImPgMUf1g4Va8',
    image: nicDemoDayImg,
  },
  {
    id: 17,
    region: 'pk',
    year: 2026,
    glyph: 'cert',
    tag: 'Evaluator',
    title: 'Lahore Round Evaluator, World Startup Championship 2026',
    description: 'The Founder was selected as a Lahore Round Evaluator for the World Startup Championship 2026, bringing expertise from Cerebrocure Technologies to assess and engage with emerging startups and innovators.',
    link: 'https://www.linkedin.com/posts/saira-osama_activity-7480470833140981760-XbiZ?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFAa9M4Bi-KIJz-fkQrAPzImPgMUf1g4Va8',
    image: lahoreEvaluatorImg,
  },
  {
    id: 11,
    region: 'pk',
    year: 2025,
    glyph: 'people',
    tag: 'Special guest',
    title: 'Special Guest, SEE Pakistan',
    description: 'Honoured with a Special Guest invitation at SEE Pakistan, the country\'s premier entrepreneurship and innovation showcase.',
    image: specialGuestSeePakImg,
  },
  {
    id: 12,
    region: 'pk',
    year: 2025,
    glyph: 'mic',
    tag: 'Speaker',
    title: 'AI Seekho Day: Building AI Solutions for Social Impact',
    description: 'Delivered a session on building AI solutions for social impact, sharing the journey of developing AI-driven healthcare innovations and guiding students on applied AI.',
    link: 'https://www.facebook.com/10pearls.pakistan/',
    image: aiSeekhoDayImg,
  },
];
