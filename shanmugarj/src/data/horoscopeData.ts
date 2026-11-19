import { RasiProfile, RemedyItem } from "../types/horoscope";

export const QUESTION_FOCUSES = [
  {
    id: "Board Exam Survival",
    labelEn: "Board Exam Survival",
    labelTa: "பொதுத் தேர்வு பிழைப்பு",
  },
  {
    id: "Practical Lab Viva",
    labelEn: "Practical Lab Viva",
    labelTa: "பிராக்டிகல் வைவா அதிர்ஷ்டம்",
  },
  {
    id: "Tuition Sir's Mood",
    labelEn: "Tuition Sir's Mood",
    labelTa: "டியூஷன் சார் மனநிலை",
  },
  {
    id: "Canteen & Samosa Luck",
    labelEn: "Canteen & Samosa Luck",
    labelTa: "கேண்டீன் & சமோசா யோகம்",
  },
] as const;

export const RASI_PROFILES: RasiProfile[] = [
  {
    id: "mesham",
    englishName: "Mesham",
    westernSign: "Aries",
    tamilName: "மேஷம்",
    element: "Fire",
    streamAffinity: "cs",
    luckyRoll: 7,
    vivaOdds: 78,
    forecastEn:
      "You will confidently tell your friends you finished two chapters, when in reality you only highlighted the headings in neon yellow.",
    forecastTa:
      "இரண்டு பாடம் முடிச்சிட்டேன்னு நண்பர்களிடம் சவால் விடுவீர்கள்; ஆனால் ஹைலைட்டர் போட்டு தலைப்பை மட்டுமே வாசித்திருப்பீர்கள்.",
    remedyEn: "Keep one spare blue ballpoint pen for the topper sitting next to you.",
    remedyTa: "பக்கத்தில் உட்காரும் டாப்பருக்கு ஒரு எக்ஸ்ட்ரா நீலப் பேனா எடுத்து வைக்கவும்.",
  },
  {
    id: "rishabam",
    englishName: "Rishabam",
    westernSign: "Taurus",
    tamilName: "ரிஷபம்",
    element: "Earth",
    streamAffinity: "biomaths",
    luckyRoll: 14,
    vivaOdds: 84,
    forecastEn:
      "Your 5 AM study alarm will lose gracefully to your blanket. Fortunately, tuition tea-break snacks will restore your focus.",
    forecastTa:
      "காலை 5 மணி அலாரம் உங்கள் போர்வையிடம் தோற்றுப் போகும். ஆனால் டியூஷன் இடைவேளை வடை உங்கள் மூளையை மீண்டும் இயக்கும்.",
    remedyEn: "Never open social media right before revising Organic Chemistry reactions.",
    remedyTa: "ஆர்கானிக் கெமிஸ்ட்ரி படிக்கும் முன் ஐந்து நிமிடம் மட்டும் போன் பார்ப்பதைத் தவிர்க்கவும்.",
  },
  {
    id: "mithunam",
    englishName: "Mithunam",
    westernSign: "Gemini",
    tamilName: "மிதுனம்",
    element: "Air",
    streamAffinity: "cs",
    luckyRoll: 23,
    vivaOdds: 69,
    forecastEn:
      "A mysterious missing semicolon or indentation error will humble you during lab practice, right as the external examiner walks past.",
    forecastTa:
      "எக்ஸ்டர்னல் சார் நடந்து வரும் நேரத்தில் மட்டும் உங்கள் பைத்தான் கோடில் ஒரு சின்ன இண்டென்டேஷன் பிழை ஒளிந்திருக்கும்.",
    remedyEn: "Whisper a quick thank-you to whoever shares the working program printout.",
    remedyTa: "சரியான புரோகிராம் பிரிண்ட்-அவுட் கொடுக்கும் நண்பனுக்கு மனதார நன்றி சொல்லவும்.",
  },
  {
    id: "kadagam",
    englishName: "Kadagam",
    westernSign: "Cancer",
    tamilName: "கடகம்",
    element: "Water",
    streamAffinity: "biomaths",
    luckyRoll: 19,
    vivaOdds: 88,
    forecastEn:
      "You will draw a gorgeous neat diagram in Biology, then spend three full minutes wondering which side the label arrows point.",
    forecastTa:
      "பயாலஜி படம் அழகாக வரைந்துவிட்டு, அம்புக்குறி எந்தப் பக்கம் போடணும்னு மூன்று நிமிடம் தியானம் செய்வீர்கள்.",
    remedyEn: "Carry a sharpened pencil and a ruler that isn't cracked down the middle.",
    remedyTa: "உடையாத ஸ்கேலும் கூர்மையான பென்சிலும் எப்போதும் பையில் வைத்திருக்கவும்.",
  },
  {
    id: "simmam",
    englishName: "Simmam",
    westernSign: "Leo",
    tamilName: "சிம்மம்",
    element: "Fire",
    streamAffinity: "cs",
    luckyRoll: 1,
    vivaOdds: 91,
    forecastEn:
      "Tuition Sir will ask a random surprise question to the quietest bench—your best strategy is maintaining intense eye contact with your notebook.",
    forecastTa:
      "சார் திடீரென்று கேள்வி கேட்கும்போது, நோட்டுப் புத்தகத்தை மிக ஆழமாகப் பார்ப்பது போல் நடிப்பது உங்கள் ராஜதந்திரம்.",
    remedyEn: "Sit in the third row: close enough to look sincere, far enough to dodge chalk dust.",
    remedyTa: "மூன்றாவது வரிசையில் அமரவும்—ஆர்வமுள்ள மாணவன் போல் தெரியும், சாக்பீஸ் தூளும் படாது.",
  },
  {
    id: "kanni",
    englishName: "Kanni",
    westernSign: "Virgo",
    tamilName: "கன்னி",
    element: "Earth",
    streamAffinity: "biomaths",
    luckyRoll: 32,
    vivaOdds: 93,
    forecastEn:
      "Your color-coded Physics formula sheet will become a priceless black-market treasure among The Dominators WhatsApp group.",
    forecastTa:
      "நீங்கள் வண்ணம் தீட்டி எழுதிய இயற்பியல் ஃபார்முலா தாள், நண்பர்கள் குரூப்பில் தங்கத்தை விட அதிக மதிப்பு பெறும்.",
    remedyEn: "Watermark your handwritten PDF notes before sharing them in the group chat.",
    remedyTa: "நோட்ஸ் பிடிஎஃப் அனுப்பும் முன் ஓரத்தில் உங்கள் கையெழுத்தை மறக்காமல் போடவும்.",
  },
  {
    id: "thulam",
    englishName: "Thulam",
    westernSign: "Libra",
    tamilName: "துலாம்",
    element: "Air",
    streamAffinity: "cs",
    luckyRoll: 44,
    vivaOdds: 74,
    forecastEn:
      "Half of your evening goes into deciding whether to revise Maths Integration or Computer Networking. Neither gets opened before dinner.",
    forecastTa:
      "கணக்கு இன்டெக்ரேஷன் படிக்கலாமா அல்லது நெட்வொர்க்கிங் படிக்கலாமா என்று யோசித்தே இரவு சாப்பாடு நேரம் வந்துவிடும்.",
    remedyEn: "Flip a coin, then start whichever chapter has fewer pages.",
    remedyTa: "நாணயம் சுண்டிப் பார்த்து, குறைவான பக்கங்கள் உள்ள பாடத்தை முதலில் தொடங்கவும்.",
  },
  {
    id: "viruchigam",
    englishName: "Viruchigam",
    westernSign: "Scorpio",
    tamilName: "விருச்சிகம்",
    element: "Water",
    streamAffinity: "biomaths",
    luckyRoll: 58,
    vivaOdds: 81,
    forecastEn:
      "You silently claim you have studied nothing at all, yet somehow pull off an unexpected top-five score on Sunday's slip test.",
    forecastTa:
      "ஒண்ணுமே படிக்கலடா என்று சொல்லிக்கொண்டே, ஞாயிறு ஸ்லிப் டெஸ்டில் டாப் 5 மதிப்பெண் எடுத்து அதிர்ச்சி தருவீர்கள்.",
    remedyEn: "Treat the squad to lemon soda when your secret preparation gets exposed.",
    remedyTa: "உங்கள் ரகசியப் படிப்பு மாட்டிக்கொண்டால் நண்பர்களுக்கு லெமன் சோடா வாங்கித் தரவும்.",
  },
  {
    id: "dhanusu",
    englishName: "Dhanusu",
    westernSign: "Sagittarius",
    tamilName: "தனுசு",
    element: "Fire",
    streamAffinity: "cs",
    luckyRoll: 27,
    vivaOdds: 72,
    forecastEn:
      "A spontaneous post-tuition bike ride or cricket debate will add 45 minutes to your commute home, delaying tonight's timetable by one whole day.",
    forecastTa:
      "டியூஷன் முடிந்ததும் நண்பர்களுடன் பேசும் கிரிக்கெட் விவாதம், இன்றைய படிப்புத் திட்டத்தை நாளைக்குத் தள்ளிப்போடும்.",
    remedyEn: "Write tomorrow's to-do list on paper, not in a phone note you never reopen.",
    remedyTa: "நாளைப் படிக்கும் பட்டியலை போனில் அல்லாமல் நோட்டின் முதல் பக்கத்தில் எழுதவும்.",
  },
  {
    id: "makaram",
    englishName: "Makaram",
    westernSign: "Capricorn",
    tamilName: "மகரம்",
    element: "Earth",
    streamAffinity: "biomaths",
    luckyRoll: 86,
    vivaOdds: 89,
    forecastEn:
      "Steady discipline saves you this week: while everyone panics over derivations, your solved example notebook quietly carries you through.",
    forecastTa:
      "எல்லோரும் டெரிவேஷன் பார்த்து மிரளும்போது, நீங்கள் ஏற்கனவே போட்டுப் பார்த்த கணக்கு நோட்டு உங்களைக் காப்பாற்றும்.",
    remedyEn: "Take a 10-minute walk after two hours of numericals so your calculator gets a rest.",
    remedyTa: "இரண்டு மணி நேரம் கணக்குப் போட்ட பிறகு பத்து நிமிடம் ஓய்வு எடுத்து கால்குலேட்டருக்கும் ரெஸ்ட் கொடுக்கவும்.",
  },
  {
    id: "kumbam",
    englishName: "Kumbam",
    westernSign: "Aquarius",
    tamilName: "கும்பம்",
    element: "Air",
    streamAffinity: "cs",
    luckyRoll: 64,
    vivaOdds: 77,
    forecastEn:
      "You will invent a genius shortcut to solve a 5-mark SQL or Differential Equation problem, then forget the middle step inside the exam hall.",
    forecastTa:
      "5 மதிப்பெண் கணக்குக்குப் புது ஷார்ட்கட் கண்டுபிடித்துவிட்டு, தேர்வு அறையில் நடு ஸ்டெப்பை மட்டும் மறந்துவிடுவீர்கள்.",
    remedyEn: "Write every intermediate formula step clearly—partial marks are your cosmic shield.",
    remedyTa: "நடுவில் உள்ள ஃபார்முலா ஸ்டெப்களைத் தெளிவாக எழுதவும்—ஸ்டெப் மார்க் தான் நமது கவசம்.",
  },
  {
    id: "meenam",
    englishName: "Meenam",
    westernSign: "Pisces",
    tamilName: "மீனம்",
    element: "Water",
    streamAffinity: "biomaths",
    luckyRoll: 95,
    vivaOdds: 82,
    forecastEn:
      "Daydreaming about post-board-exam college life peaks around 8 PM, right in the middle of Chemistry equation balancing.",
    forecastTa:
      "இரவு 8 மணிக்கு கெமிஸ்ட்ரி சமன்பாடு போடும்போது, எக்ஸாம் முடிந்த பிறகு போகும் டூர் பற்றிய கனவு வரும்.",
    remedyEn: "Keep a chilled glass of water nearby and tackle five short answers before daydreaming.",
    remedyTa: "கனவு காண்பதற்கு முன் குறைந்தது ஐந்து இரண்டு-மதிப்பெண் கேள்விகளை முடித்துவிடவும்.",
  },
];

export const REMEDY_LEDGER: RemedyItem[] = [
  {
    id: "record-note-ritual",
    indexLabel: "01.",
    titleEn: "The Midnight Record Note Ritual",
    titleTa: "நள்ளிரவு ரெக்கார்டு நோட் வழிபாடு",
    descriptionEn:
      "Complete your practical observation margins at least 12 hours before submission day instead of borrowing a red pen in the corridor.",
    descriptionTa:
      "சமர்ப்பிக்கும் அன்று காலையில் சிவப்புப் பேனா தேடுவதை விட்டுவிட்டு, முதல் நாள் இரவே ரெக்கார்டு மார்ஜின் கோடு போட்டு முடிக்கவும்.",
    karmaPoints: 25,
  },
  {
    id: "samosa-offering",
    indexLabel: "02.",
    titleEn: "The Canteen Samosa Offering",
    titleTa: "கேண்டீன் சமோசா தானம்",
    descriptionEn:
      "Share at least one hot samosa or bajji with the friend who always lends you their Physics guide right before the slip test.",
    descriptionTa:
      "ஸ்லிப் டெஸ்டுக்கு முன் ஃபிசிக்ஸ் கைடு கொடுக்கும் நண்பனுக்கு ஒரு சூடான சமோசா வாங்கித் தரவும்.",
    karmaPoints: 20,
  },
  {
    id: "backbench-buffer",
    indexLabel: "03.",
    titleEn: "The Third-Bench Alignment",
    titleTa: "மூன்றாவது பெஞ்ச் சாந்தி",
    descriptionEn:
      "Avoid both the extreme front bench (direct viva target) and the last bench (prime chalk-throw radius) during surprise revision.",
    descriptionTa:
      "முதல் பெஞ்சில் சிக்காமலும் கடைசி பெஞ்சில் மாட்டாமலும் நடு வரிசையில் சமநிலையுடன் அமரவும்.",
    karmaPoints: 30,
  },
  {
    id: "step-mark-shield",
    indexLabel: "04.",
    titleEn: "The Step-Mark Protection Mantra",
    titleTa: "ஸ்டெப்-மார்க் பாதுகாப்பு மந்திரம்",
    descriptionEn:
      "Even when the final numerical answer looks suspiciously like a phone number, box the given data and formula neatly.",
    descriptionTa:
      "விடை போன் நம்பர் போல் வந்தாலும், கிவன் டேட்டாவையும் ஃபார்முலாவையும் அழகாக பெட்டி போட்டு எழுதவும்.",
    karmaPoints: 25,
  },
];
