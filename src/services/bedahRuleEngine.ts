import { BedahKalimahAnalysis, BedahSentenceResult } from '../types';

export function normalizeArabic(text: string): string {
  if (!text) return '';
  return text
    .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, '') // Remove harakat / tashkeel
    .replace(/[أإآء]/g, 'ا') // Normalize alefs for matching
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .trim();
}

export function cleanArabicDisplay(text: string): string {
  return text.trim();
}

const HARF_JAR_MAP: Record<string, { name: string; makna: string }> = {
  'من': { name: 'Harf Jar (مِنْ)', makna: 'Dari / Termasuk' },
  'الى': { name: 'Harf Jar (إِلَى)', makna: 'Ke / Kepada / Sampai' },
  'عن': { name: 'Harf Jar (عَنْ)', makna: 'Dari / Tentang' },
  'علي': { name: 'Harf Jar (عَلَى)', makna: 'Di atas / Wajib atas' },
  'في': { name: 'Harf Jar (فِي)', makna: 'Di / Di dalam' },
  'رب': { name: 'Harf Jar (رُبَّ)', makna: 'Banyak / Sedikit' },
  'ب': { name: 'Harf Jar (بِـ)', makna: 'Dengan / Demi' },
  'ك': { name: 'Harf Jar (كَـ)', makna: 'Seperti / Seumpama' },
  'ل': { name: 'Harf Jar (لِـ)', makna: 'Untuk / Milik' },
  'حتي': { name: 'Harf Jar (حَتَّى)', makna: 'Hingga / Sampai' }
};

const HARF_NASHAB_MAP: Record<string, { name: string; makna: string }> = {
  'ان': { name: 'Harf Taukid & Nashab (إِنَّ)', makna: 'Sesungguhnya' },
  'انّ': { name: 'Harf Taukid & Nashab (إِنَّ)', makna: 'Sesungguhnya' },
  'انّها': { name: 'Harf Nashab + Isim Inna', makna: 'Sesungguhnya dia' },
  'كان': { name: 'Harf Tasybih & Nashab (كَأَنَّ)', makna: 'Seakan-akan' },
  'لكن': { name: 'Harf Istidrak & Nashab (لَكِنَّ)', makna: 'Akan tetapi' },
  'ليت': { name: 'Harf Tamanni & Nashab (لَيْتَ)', makna: 'Sekiranya / Andaikan' },
  'لعل': { name: 'Harf Tarajji & Nashab (لَعَلَّ)', makna: 'Semoga / Agar' }
};

const AMIL_JAZIM_MAP: Record<string, { name: string; makna: string }> = {
  'لم': { name: 'Amil Jazim (لَمْ)', makna: 'Tidak / Belum (lampau)' },
  'لما': { name: 'Amil Jazim (لَمَّا)', makna: 'Belum' },
  'لا': { name: 'La Nahyi Jazim (لَا)', makna: 'Janganlah' },
  'ان': { name: 'Harf Syarat Jazim (إِنْ)', makna: 'Jika / Apabila' }
};

const ISIM_FIIL_MAP: Record<string, { subType: string; maknaFiil: string; qaidatyRef: string }> = {
  'هيهات': { subType: 'Isim Fi\'il Madhi', maknaFiil: 'بَعُدَ (Sangat jauh)', qaidatyRef: 'Bab 23, Hal. 144' },
  'شتان': { subType: 'Isim Fi\'il Madhi', maknaFiil: 'اِفْتَرَقَ (Sangat berbeda jauh)', qaidatyRef: 'Bab 23, Hal. 144' },
  'سرعان': { subType: 'Isim Fi\'il Madhi', maknaFiil: 'سَرُعَ (Sangat cepat)', qaidatyRef: 'Bab 23, Hal. 146' },
  'اف': { subType: 'Isim Fi\'il Mudhari\'', maknaFiil: 'أَتَضَجَّرُ (Aku berkeluh kesah/bosan)', qaidatyRef: 'Bab 23, Hal. 146' },
  'قط': { subType: 'Isim Fi\'il Mudhari\'', maknaFiil: 'يَكْفِي (Cukup bagiku)', qaidatyRef: 'Bab 23, Hal. 146' },
  'اه': { subType: 'Isim Fi\'il Mudhari\'', maknaFiil: 'أَتَوَجَّعُ (Aku merasa sakit)', qaidatyRef: 'Bab 23, Hal. 146' },
  'وي': { subType: 'Isim Fi\'il Mudhari\'', maknaFiil: 'أَتَعَجَّبُ (Aku merasa kagum/heran)', qaidatyRef: 'Bab 23, Hal. 146' },
  'واها': { subType: 'Isim Fi\'il Mudhari\'', maknaFiil: 'أَتَعَجَّبُ (Aku kagum)', qaidatyRef: 'Bab 23, Hal. 146' },
  'صه': { subType: 'Isim Fi\'il Amar', maknaFiil: 'اُسْكُتْ (Diamlah!)', qaidatyRef: 'Bab 23, Hal. 147' },
  'مه': { subType: 'Isim Fi\'il Amar', maknaFiil: 'اُكْفُفْ (Hentikanlah!)', qaidatyRef: 'Bab 23, Hal. 147' },
  'امين': { subType: 'Isim Fi\'il Amar', maknaFiil: 'اِسْتَجِبْ (Kabulkanlah permohonan kami)', qaidatyRef: 'Bab 23, Hal. 147' },
  'حي': { subType: 'Isim Fi\'il Amar', maknaFiil: 'أَقْبِلْ (Marilah / Datanglah!)', qaidatyRef: 'Bab 23, Hal. 147' },
  'هيا': { subType: 'Isim Fi\'il Amar', maknaFiil: 'أَسْرِعْ (Ayo cepat / Bersegeralah!)', qaidatyRef: 'Bab 23, Hal. 147' },
  'هلم': { subType: 'Isim Fi\'il Amar', maknaFiil: 'تَعَالَ (Kemarilah!)', qaidatyRef: 'Bab 23, Hal. 147' },
  'عليك': { subType: 'Isim Fi\'il Amar (Manqul dari Jar Majrur)', maknaFiil: 'اِلْزَمْ (Pegang teguhlah / Wajibkanlah!)', qaidatyRef: 'Bab 23, Hal. 148' },
  'اليك': { subType: 'Isim Fi\'il Amar (Manqul)', maknaFiil: 'تَبَاعَدْ (Menjauhlah) / خُذْ (Ambillah)', qaidatyRef: 'Bab 23, Hal. 148' },
  'رويدك': { subType: 'Isim Fi\'il Amar (Manqul)', maknaFiil: 'تَمَهَّلْ (Perlahan-lahanlah)', qaidatyRef: 'Bab 23, Hal. 148' },
  'وراءك': { subType: 'Isim Fi\'il Amar (Manqul dari Zhorof)', maknaFiil: 'تَأَخَّرْ (Mundurlah!)', qaidatyRef: 'Bab 23, Hal. 148' }
};

const ISIM_ISYARAH_SET: Record<string, { type: string; distance: string; gender: string }> = {
  'هذا': { type: 'Isim Isyarah', distance: 'Dekat', gender: 'Mudzakkar Mufrad (Ini - 1 lk)' },
  'هذه': { type: 'Isim Isyarah', distance: 'Dekat', gender: 'Muannats Mufrad (Ini - 1 pr)' },
  'هذان': { type: 'Isim Isyarah', distance: 'Dekat', gender: 'Mutsanna Mudzakkar (Ini - 2 lk)' },
  'هاتان': { type: 'Isim Isyarah', distance: 'Dekat', gender: 'Mutsanna Muannats (Ini - 2 pr)' },
  'هؤلاء': { type: 'Isim Isyarah', distance: 'Dekat', gender: 'Jama\' (Ini - mereka/semua)' },
  'ذلك': { type: 'Isim Isyarah', distance: 'Jauh', gender: 'Mudzakkar Mufrad (Itu - 1 lk)' },
  'تلك': { type: 'Isim Isyarah', distance: 'Jauh', gender: 'Muannats Mufrad (Itu - 1 pr)' },
  'ذانك': { type: 'Isim Isyarah', distance: 'Jauh', gender: 'Mutsanna Mudzakkar (Itu - 2 lk)' },
  'تانك': { type: 'Isim Isyarah', distance: 'Jauh', gender: 'Mutsanna Muannats (Itu - 2 pr)' },
  'اولئك': { type: 'Isim Isyarah', distance: 'Jauh', gender: 'Jama\' (Itu - mereka semua)' },
  'هنا': { type: 'Isim Isyarah Tempat', distance: 'Dekat', gender: 'Tempat (Di sini)' },
  'ههنا': { type: 'Isim Isyarah Tempat', distance: 'Dekat', gender: 'Tempat (Di sini)' },
  'هناك': { type: 'Isim Isyarah Tempat', distance: 'Jauh', gender: 'Tempat (Di sana)' },
  'هنالك': { type: 'Isim Isyarah Tempat', distance: 'Jauh', gender: 'Tempat (Di sana)' }
};

const ISIM_MAUSHUL_SET: Record<string, { type: string; target: string }> = {
  'الذي': { type: 'Isim Maushul Nash', target: 'Mufrad Mudzakkar (Yang - 1 lk)' },
  'التي': { type: 'Isim Maushul Nash', target: 'Mufrad Muannats (Yang - 1 pr)' },
  'اللذان': { type: 'Isim Maushul Nash', target: 'Mutsanna Mudzakkar (Yang - 2 lk)' },
  'اللتان': { type: 'Isim Maushul Nash', target: 'Mutsanna Muannats (Yang - 2 pr)' },
  'الذين': { type: 'Isim Maushul Nash', target: 'Jama\' Mudzakkar (Yang - mereka lk)' },
  'اللاتي': { type: 'Isim Maushul Nash', target: 'Jama\' Muannats (Yang - mereka pr)' },
  'الالئي': { type: 'Isim Maushul Nash', target: 'Jama\' Muannats (Yang - mereka pr)' },
  'الالتي': { type: 'Isim Maushul Nash', target: 'Jama\' Muannats (Yang - mereka pr)' }
};

const DHAMIR_MUNFASHIL_ROFA: Record<string, string> = {
  'هو': 'Orang ke-3 tunggal lk (Dia 1 lk)',
  'هما': 'Orang ke-3/ke-2 ganda (Mereka/Kalian berdua)',
  'هم': 'Orang ke-3 jamak lk (Mereka semua lk)',
  'هي': 'Orang ke-3 tunggal pr (Dia 1 pr)',
  'هن': 'Orang ke-3 jamak pr (Mereka semua pr)',
  'انت': 'Orang ke-2 tunggal lk (Kamu 1 lk) / pr (Kamu 1 pr)',
  'انتما': 'Orang ke-2 ganda (Kamu berdua)',
  'انتم': 'Orang ke-2 jamak lk (Kalian semua lk)',
  'انتن': 'Orang ke-2 jamak pr (Kalian semua pr)',
  'انا': 'Orang ke-1 tunggal (Aku / Saya)',
  'نحن': 'Orang ke-1 jamak (Kami / Kita)'
};

export function analyzeToken(rawWord: string, indexInSentence: number, allRawWords: string[]): BedahKalimahAnalysis {
  const word = cleanArabicDisplay(rawWord);
  const norm = normalizeArabic(word);
  const prevWord = indexInSentence > 0 ? cleanArabicDisplay(allRawWords[indexInSentence - 1]) : '';
  const normPrev = normalizeArabic(prevWord);

  // 1. Check Isim Fi'il
  if (ISIM_FIIL_MAP[norm]) {
    const info = ISIM_FIIL_MAP[norm];
    return {
      word,
      normalizedWord: norm,
      kalimahType: 'Isim Fi\'il',
      subType: info.subType,
      irobOrBina: 'Mabni Fathah',
      tandaIrob: 'Mabni (Hukum tetap)',
      jabatan: 'Isim yang beramal seperti Fi\'il',
      makna: info.maknaFiil,
      confidence: 'Tinggi (Kaidah Pasti)',
      qaidatyReference: `Qaidaty Jilid 1 ${info.qaidatyRef}`,
      explanation: `Lafazh ${word} adalah Isim Fi'il yang bermakna kata kerja "${info.maknaFiil}". Beramal merofakan Fa'il dan menashabkan Maf'ul bih, berhukum mabni.`
    };
  }

  // 2. Check Harf Jar
  if (HARF_JAR_MAP[norm]) {
    const info = HARF_JAR_MAP[norm];
    return {
      word,
      normalizedWord: norm,
      kalimahType: 'Harf',
      subType: info.name,
      irobOrBina: 'Mabni Sukun',
      tandaIrob: 'Mabni (Tidak ber-I\'rob)',
      jabatan: 'Amil Jar (Menjarkan kata setelahnya)',
      makna: info.makna,
      confidence: 'Tinggi (Kaidah Pasti)',
      qaidatyReference: 'Qaidaty Jilid 1 Bab 03 & 05 (Hal. 7, 15, 18)',
      explanation: `Huruf ${word} adalah Harf Jar 'Amilah. Fungsinya menjarkan kalimah Isim yang terletak setelahnya sehingga dibaca kasrah atau berakhiran tanda jar.`
    };
  }

  // 3. Check Harf Nashab
  if (HARF_NASHAB_MAP[norm]) {
    const info = HARF_NASHAB_MAP[norm];
    return {
      word,
      normalizedWord: norm,
      kalimahType: 'Harf',
      subType: info.name,
      irobOrBina: 'Mabni Fathah',
      tandaIrob: 'Mabni',
      jabatan: 'Amil Nashab (Menashabkan isim setelahnya)',
      makna: info.makna,
      confidence: 'Tinggi (Kaidah Pasti)',
      qaidatyReference: 'Qaidaty Jilid 1 Bab 05 & 15 (Hal. 16, 18)',
      explanation: `Lafazh ${word} adalah Harf Nashab (Inna & saudaranya). Kata Isim setelahnya dibaca nashab (Fathah) sebagai Isim Inna.`
    };
  }

  // 4. Check Amil Jazim
  if (AMIL_JAZIM_MAP[norm]) {
    const info = AMIL_JAZIM_MAP[norm];
    return {
      word,
      normalizedWord: norm,
      kalimahType: 'Harf',
      subType: info.name,
      irobOrBina: 'Mabni Sukun',
      tandaIrob: 'Mabni',
      jabatan: 'Amil Jazim (Menjazmkan Fi\'il Mudhari\')',
      makna: info.makna,
      confidence: 'Tinggi (Kaidah Pasti)',
      qaidatyReference: 'Qaidaty Jilid 1 Bab 06 & 12 (Hal. 16, 21, 63)',
      explanation: `Lafazh ${word} adalah Amil Jazim yang masuk ke Fi'il Mudhari' dan mensukunkan harakat akhirnya.`
    };
  }

  // 5. Check Isim Isyarah
  if (ISIM_ISYARAH_SET[norm]) {
    const info = ISIM_ISYARAH_SET[norm];
    return {
      word,
      normalizedWord: norm,
      kalimahType: 'Isim',
      subType: `${info.type} (${info.gender})`,
      irobOrBina: indexInSentence === 0 ? 'Marfu\'' : 'Mabni Sukun',
      tandaIrob: 'Mabni fi mahalli rof\'in / nashbin',
      jabatan: indexInSentence === 0 ? 'Mubtada\' (Subjek Pokok Kalimat)' : 'Isim Isyarah',
      makna: `Kata tunjuk: ${info.gender} (${info.distance})`,
      confidence: 'Tinggi (Kaidah Pasti)',
      qaidatyReference: 'Qaidaty Jilid 1 Bab 22, Hal. 135-137',
      explanation: `Lafazh ${word} adalah Isim Isyarah Ma'rifah (kata tunjuk). Kalimah Isim setelahnya disebut Musyar Ilaih.`
    };
  }

  // 6. Check Isim Maushul
  if (ISIM_MAUSHUL_SET[norm]) {
    const info = ISIM_MAUSHUL_SET[norm];
    return {
      word,
      normalizedWord: norm,
      kalimahType: 'Isim',
      subType: `${info.type} (${info.target})`,
      irobOrBina: 'Mabni Sukun',
      tandaIrob: 'Mabni',
      jabatan: 'Isim Maushul (Kata Sambung) / Na\'at',
      makna: 'Yang / Orang yang...',
      confidence: 'Tinggi (Kaidah Pasti)',
      qaidatyReference: 'Qaidaty Jilid 1 Bab 22, Hal. 138-141',
      explanation: `Lafazh ${word} adalah Isim Maushul. Kalimat setelahnya berkedudukan sebagai Shilah yang memiliki dhamir 'Aa-id yang merujuk padanya.`
    };
  }

  // 7. Check Dhamir Munfashil
  if (DHAMIR_MUNFASHIL_ROFA[norm]) {
    const meaning = DHAMIR_MUNFASHIL_ROFA[norm];
    return {
      word,
      normalizedWord: norm,
      kalimahType: 'Isim',
      subType: 'Dhamir Munfashil Fi Mahalli ar-Rof\'i',
      irobOrBina: 'Marfu\'',
      tandaIrob: 'Mabni fi mahalli rof\'in',
      jabatan: indexInSentence === 0 ? 'Mubtada\' (Subjek)' : 'Dhamir Munfashil',
      makna: meaning,
      confidence: 'Tinggi (Kaidah Pasti)',
      qaidatyReference: 'Qaidaty Jilid 1 Bab 21, Hal. 126, 133',
      explanation: `Lafazh ${word} adalah Dhamir Munfashil (kata ganti terpisah) yang berada pada kedudukan Rofa' (Fi Mahalli ar-Raf'i). Jika di awal kalimat berkedudukan sebagai Mubtada'.`
    };
  }

  // 8. Morphological matching for Fi'il & Isim
  // Check if preceded by Harf Jar
  const isPrecededByHarfJar = HARF_JAR_MAP[normPrev] !== undefined || normPrev.startsWith('ب') || normPrev.startsWith('ل');
  const isPrecededByInna = HARF_NASHAB_MAP[normPrev] !== undefined;
  const isPrecededByAmilJazim = AMIL_JAZIM_MAP[normPrev] !== undefined;

  // A. Check Sudasi: istaghfara / istakhraja
  if (norm.startsWith('است') && norm.length >= 5) {
    const isMudhari = norm.startsWith('يست') || norm.startsWith('تست') || norm.startsWith('است') || norm.startsWith('نست');
    if (isMudhari && norm.length >= 6) {
      return {
        word,
        normalizedWord: norm,
        kalimahType: 'Fi\'il',
        subType: 'Fi\'il Mudhari\' Sudasi',
        wazan: 'يَسْتَفْعِلُ',
        mauzun: word,
        harfZaidah: ['Hamzah/Ya mudhara\'ah', 'Sin', 'Ta'],
        irobOrBina: isPrecededByAmilJazim ? 'Majzum' : 'Marfu\'',
        tandaIrob: isPrecededByAmilJazim ? 'Sukun' : 'Dhommah zhahirah',
        jabatan: indexInSentence === 0 ? 'Fi\'il (Predikat awal kalimat fi\'liyyah)' : 'Fi\'il (Predikat)',
        makna: 'Memohon / mencari / menuntut perbuatan',
        confidence: 'Tinggi (Kaidah Pasti)',
        qaidatyReference: 'Qaidaty Jilid 1 Bab 09 & 10 (Hal. 32, 54, 58)',
        explanation: `Kata ${word} adalah Fi'il Mudhari' Sudasi (6 huruf) mengikuti wazan يَسْتَفْعِلُ dengan huruf zaidah hamzah/mudhara'ah, sin, dan ta.`
      };
    }

    return {
      word,
      normalizedWord: norm,
      kalimahType: 'Fi\'il',
      subType: 'Fi\'il Madhi Sudasi',
      wazan: 'اِسْتَفْعَلَ',
      mauzun: word,
      harfZaidah: ['Hamzah kasrah', 'Sin', 'Ta'],
      irobOrBina: 'Mabni Fathah',
      tandaIrob: 'Mabni Fathah zhahirah',
      jabatan: indexInSentence === 0 ? 'Fi\'il Madhi (Awal Jumlah Fi\'liyyah)' : 'Fi\'il Madhi',
      makna: 'Telah memohon / mengeluarkan / mengerjakan sesuatu',
      confidence: 'Tinggi (Kaidah Pasti)',
      qaidatyReference: 'Qaidaty Jilid 1 Bab 09, Hal. 32, 54',
      explanation: `Kata ${word} adalah Fi'il Madhi Sudasi (6 huruf) mengikuti wazan baku اِسْتَفْعَلَ.`
    };
  }

  // B. Check Isim with Alif Lam (Al-)
  if (norm.startsWith('ال') && norm.length >= 4) {
    const rootNorm = norm.substring(2);
    let irob: 'Marfu\'' | 'Manshub' | 'Majrur' = 'Marfu\'';
    let tanda = 'Dhommah zhahirah';
    let jabatan = 'Mubtada\' / Fa\'il';

    if (isPrecededByHarfJar) {
      irob = 'Majrur';
      tanda = norm.endsWith('ين') ? 'Ya (ـِينَ / ـَيْنِ)' : 'Kasrah zhahirah';
      jabatan = 'Majrur bi Harf Jar (Didahului Harf Jar)';
    } else if (isPrecededByInna) {
      irob = 'Manshub';
      tanda = norm.endsWith('ين') ? 'Ya' : 'Fathah zhahirah';
      jabatan = 'Isim Inna (Manshub)';
    } else if (indexInSentence > 0) {
      // If after a fiil
      jabatan = 'Fa\'il (Pelaku) / Maf\'ul Bih (Objek)';
      irob = 'Marfu\'';
    }

    let subType = 'Isim Mu\'rab Ma\'rifah (Ber-Al)';
    if (norm.endsWith('ون')) {
      subType = 'Jama\' Mudzakkar Salim';
      irob = 'Marfu\'';
      tanda = 'Wawu (ـُونَ)';
    } else if (norm.endsWith('ين')) {
      subType = isPrecededByHarfJar || isPrecededByInna ? 'Jama\' Mudzakkar Salim / Mutsanna' : 'Jama\' Mudzakkar Salim (Manshub/Majrur)';
      irob = isPrecededByHarfJar ? 'Majrur' : 'Manshub';
      tanda = 'Ya (ـِينَ)';
    } else if (norm.endsWith('ات')) {
      subType = 'Jama\' Muannats Salim';
      tanda = irob === 'Marfu\'' ? 'Dhommah' : 'Kasrah';
    }

    return {
      word,
      normalizedWord: norm,
      kalimahType: 'Isim',
      subType,
      irobOrBina: irob,
      tandaIrob: tanda,
      jabatan,
      makna: 'Kata benda tertentu (Ma\'rifah)',
      confidence: 'Tinggi (Kaidah Pasti)',
      qaidatyReference: 'Qaidaty Jilid 1 Bab 05, 15, 20 (Hal. 17, 72, 99-102)',
      explanation: `Kata ${word} memiliki tanda Isim yaitu dibubuhi Alif Lam (Al-), sehingga berstatus Ma'rifah (makna tertentu). I'robnya adalah ${irob} dengan tanda ${tanda}.`
    };
  }

  // C. Check Fi'il Mudhari' with Anita prefix
  const isMudhari3or4 = (norm.startsWith('ي') || norm.startsWith('ت') || norm.startsWith('ن')) && norm.length >= 4;
  if (isMudhari3or4 && !word.includes('ـة') && !norm.endsWith('ه')) {
    let wazan = 'يَفْعَلُ / يَفْعُلُ / يَفْعِلُ';
    if (norm.length === 4) wazan = 'يَفْعُلُ / يُفْعِلُ';
    if (norm.startsWith('يت') && norm.length >= 5) wazan = 'يَتَفَعَّلُ / يَتَفَاعَلُ';

    return {
      word,
      normalizedWord: norm,
      kalimahType: 'Fi\'il',
      subType: 'Fi\'il Mudhari\' (Sedang / Akan Datang)',
      wazan,
      mauzun: word,
      harfZaidah: ['Huruf Mudhara\'ah (أَنَيْتَ)'],
      irobOrBina: isPrecededByAmilJazim ? 'Majzum' : 'Marfu\'',
      tandaIrob: isPrecededByAmilJazim ? 'Sukun' : 'Dhommah zhahirah',
      jabatan: indexInSentence === 0 ? 'Fi\'il (Predikat awal)' : 'Fi\'il Mudhari\'',
      makna: 'Pekerjaan di waktu masa kini / akan datang',
      confidence: 'Tinggi (Kaidah Pasti)',
      qaidatyReference: 'Qaidaty Jilid 1 Bab 06 & 10 (Hal. 21, 55-58)',
      explanation: `Kata ${word} diawali oleh huruf Mudhara'ah (${norm[0]}), merupakan tanda pasti Fi'il Mudhari'. Hukum bacaan akhirnya marfu' dengan dhommah kecuali didahului amil nashib atau amil jazim.`
    };
  }

  // D. Check Tsulatsi Madhi (3 letters) e.g. قام, كتب, نصر, ضرب, فتح, علم, حسن
  if (norm.length === 3) {
    // If preceded by harf jar, it is an Isim
    if (isPrecededByHarfJar) {
      return {
        word,
        normalizedWord: norm,
        kalimahType: 'Isim',
        subType: 'Isim Mufrad Majrur',
        irobOrBina: 'Majrur',
        tandaIrob: 'Kasrah zhahirah / Kasratain',
        jabatan: 'Majrur bi Harf Jar',
        makna: 'Kata benda yang dijarkan',
        confidence: 'Tinggi (Kaidah Pasti)',
        qaidatyReference: 'Qaidaty Jilid 1 Bab 05 & 20 (Hal. 18, 99)',
        explanation: `Kata ${word} berstatus Isim Mufrad yang dijarkan oleh Harf Jar sebelumnya (${prevWord}), sehingga dibaca kasrah.`
      };
    }

    // Default to Fi'il Madhi Tsulatsi or Isim Mufrad
    const commonFiil3 = ['كتب', 'نصر', 'جلس', 'ضرب', 'قرا', 'فتح', 'علم', 'فهم', 'قام', 'ذهب', 'خلق', 'رزق', 'عبد', 'سجد', 'دخل', 'خرج', 'قتل', 'ذكر', 'شكر', 'كفر'];
    const isKnownFiil = commonFiil3.includes(norm);

    if (isKnownFiil || indexInSentence === 0) {
      return {
        word,
        normalizedWord: norm,
        kalimahType: 'Fi\'il',
        subType: 'Fi\'il Madhi Tsulatsi',
        wazan: 'فَعَلَ / فَعِلَ / فَعُلَ',
        mauzun: word,
        irobOrBina: 'Mabni Fathah',
        tandaIrob: 'Mabni Fathah zhahirah',
        jabatan: indexInSentence === 0 ? 'Fi\'il Madhi (Awal Jumlah Fi\'liyyah)' : 'Fi\'il Madhi',
        makna: 'Pekerjaan di waktu lampau (telah selesai)',
        confidence: 'Tinggi (Kaidah Pasti)',
        qaidatyReference: 'Qaidaty Jilid 1 Bab 06 & 09 (Hal. 20, 33-44)',
        explanation: `Kata ${word} tersusun dari 3 huruf asli (Tsulatsi Mujarrad) berwazan فَعَلَ / فَعِلَ / فَعُلَ. Merupakan Fi'il Madhi yang berhukum Mabni Fathah.`
      };
    }
  }

  // E. Fallback generic analysis with cautious confidence
  let fallbackIrob: 'Marfu\'' | 'Manshub' | 'Majrur' = 'Marfu\'';
  let fallbackTanda = 'Dhommah / Tanwin';
  let fallbackJabatan = 'Fa\'il / Mubtada\' / Khabar';

  if (isPrecededByHarfJar) {
    fallbackIrob = 'Majrur';
    fallbackTanda = 'Kasrah / Kasratain';
    fallbackJabatan = 'Majrur bi Harf Jar';
  } else if (isPrecededByInna) {
    fallbackIrob = 'Manshub';
    fallbackTanda = 'Fathah';
    fallbackJabatan = 'Isim Inna';
  }

  return {
    word,
    normalizedWord: norm,
    kalimahType: 'Isim',
    subType: 'Isim Mufrad (Berdasarkan Kaidah Umum Qaidaty)',
    wazan: 'فَعْلٌ / فَعَلٌ / فَاعِلٌ',
    mauzun: word,
    irobOrBina: fallbackIrob,
    tandaIrob: fallbackTanda,
    jabatan: fallbackJabatan,
    makna: 'Kata benda / nama dalam struktur kalimat',
    confidence: 'Sedang',
    qaidatyReference: 'Qaidaty Jilid 1 Bab 03 & 20 (Hal. 5, 99)',
    explanation: `Kata ${word} dianalisis sebagai Isim Mu'rab dengan status I'rob ${fallbackIrob} dan tanda ${fallbackTanda}. Analisis mendalam dapat diverifikasi dengan AI Tutor.`
  };
}

export function parseAndAnalyzeSentence(sentence: string): BedahSentenceResult {
  const trimmed = sentence.trim();
  if (!trimmed) {
    return {
      sentence: '',
      tokens: [],
      overallSummary: 'Kalimat kosong. Masukkan kata atau kalimat berbahasa Arab.',
      confidenceScore: 0,
      timestamp: new Date().toISOString()
    };
  }

  const tokensRaw = trimmed.split(/\s+/).filter(Boolean);
  const analyses = tokensRaw.map((tok, idx) => analyzeToken(tok, idx, tokensRaw));

  const hasHighConfidence = analyses.every(a => a.confidence.startsWith('Tinggi'));
  const overallSummary = `Kalimat terdiri dari ${analyses.length} kalimah: ${analyses.map(a => `${a.word} (${a.kalimahType}: ${a.subType || a.wazan || a.irobOrBina})`).join(' + ')}.`;

  return {
    sentence: trimmed,
    tokens: analyses,
    overallSummary,
    confidenceScore: hasHighConfidence ? 95 : 80,
    timestamp: new Date().toISOString()
  };
}
