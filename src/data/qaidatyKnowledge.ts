import { Lesson } from '../types';

export type QaidatyChunk = {
  id: string;
  lessonId: string;
  babNumber: number;
  title: string;
  arabicTitle: string;
  pageReference: string;
  content: string;
};

export const QAIDATY_METADATA = {
  title: 'QAIDATY',
  subtitle: 'Platform Pembelajaran Kitab Qaidaty',
  tagline: 'Belajar • Memahami • Berlatih • Menguasai',
  author: 'Yasin Muthohar',
  bookTitle: 'Jilid 1 Qaidaty (Pembelajaran Praktis Baca Arab Gundul)',
  totalBabs: 23,
  description: 'Metode terstruktur mempelajari kaidah membaca teks Arab tanpa harakat (Arab Gundul) menggabungkan shorof dan nahwu praktis.'
};

export const QAIDATY_LESSONS: Lesson[] = [
  {
    id: 'bab-01',
    jilid: 1,
    babNumber: 1,
    title: 'Kalimah dan Jumlah',
    arabicTitle: 'الكلمة والجملة',
    category: 'Pengantar',
    pageReference: 'Hal. 2-3',
    summary: 'Memahami konsep dasar kata (Kalimah) dan kalimat sempurna (Jumlah) dalam bahasa Arab.',
    objectives: [
      'Memahami definisi Kalimah (الكلمة) sebagai kata satuan.',
      'Memahami definisi Jumlah (الجملة) sebagai gabungan kata yang berfaedah.',
      'Mengenal contoh pembentukan kalimat dasar seperti محمد قائم.'
    ],
    explanation: 'Dalam kaidah Qaidaty, bahasa Arab tersusun dari Kalimah (kata). Ketika dua atau lebih kalimah digabungkan dan membentuk makna yang sempurna, ia disebut Jumlah (kalimat). Rumus dasar: الكلمة + الكلمة = الجملة.',
    rules: [
      'الكلمة (Kalimah) adalah lafazh mufrad yang mempunyai arti mandiri.',
      'الجملة (Jumlah) adalah susunan dua kalimah atau lebih yang memberikan pengertian sempurna (kalam mufid).',
      'Contoh penggabungan: مُحَمَّدٌ (kata 1) + قَائِمٌ (kata 2) = مُحَمَّدٌ قَائِمٌ (Muhammad berdiri).'
    ],
    examples: [
      { arabic: 'قَامَ مُحَمَّدٌ فِي الفَصْلِ', translation: 'Muhammad telah berdiri di dalam kelas', analysis: 'Jumlah Fi\'liyyah tersusun dari Fi\'il (قَامَ), Isim Fa\'il (مُحَمَّدٌ), Harf (فِي), dan Isim Majrur (الفَصْلِ).' },
      { arabic: 'مُحَمَّدٌ قَائِمٌ فِي الفَصْلِ', translation: 'Muhammad berdiri di dalam kelas', analysis: 'Jumlah Ismiyyah tersusun dari Mubtada\' (مُحَمَّدٌ), Khabar (قَائِمٌ), Harf (فِي), dan Isim (الفَصْلِ).' },
      { arabic: 'جَاهَدَ عُمَرُ فِي سَبِيلِ اللهِ', translation: 'Umar telah berjihad di jalan Allah', analysis: 'Jumlah Fi\'liyyah.' },
      { arabic: 'عُمَرُ مُجَاهِدٌ فِي سَبِيلِ اللهِ', translation: 'Umar adalah seorang pejuang di jalan Allah', analysis: 'Jumlah Ismiyyah.' },
      { arabic: 'قَرَأَ مُحَمَّدٌ القُرْآنَ الكَرِيمَ فِي الغُرْفَةِ', translation: 'Muhammad telah membaca Al-Qur\'an yang mulia di dalam kamar', analysis: 'Kalimat lengkap dengan objek (Maf\'ul Bih) dan sifat.' },
      { arabic: 'مُحَمَّدٌ قَارِئُ القُرْآنِ الكَرِيمِ فِي الغُرْفَةِ', translation: 'Muhammad adalah pembaca Al-Qur\'an yang mulia di dalam kamar', analysis: 'Susunan Isim Fa\'il dan Idhofah.' }
    ],
    notes: [
      'Kumpulan kosakata yang merupakan Kalimah tunggal: محمد ، قائم ، قام ، في ، الفصل ، عمر ، مجاهد ، جاهد ، سبيل الله ، قارئ ، قرأ ، القرآن ، الكريم ، الغرفة.'
    ],
    estimatedMinutes: 20
  },
  {
    id: 'bab-02',
    jilid: 1,
    babNumber: 2,
    title: '5 Langkah Membaca Arab Gundul',
    arabicTitle: 'خمس خطوات لقراءة النص العربي',
    category: 'Pengantar',
    pageReference: 'Hal. 4',
    summary: 'Lima langkah sistematis metode Qaidaty untuk membaca teks Arab tanpa harakat.',
    objectives: [
      'Menghafal dan mempraktikkan 5 langkah urutan membaca Arab gundul.',
      'Memahami korelasi antara identifikasi kalimah, amil sebelumnya, i\'rob, jabatan, dan makna.'
    ],
    explanation: 'Untuk dapat membaca teks Arab tanpa harakat secara tepat dan percaya diri, metode Qaidaty merumuskan 5 langkah pasti yang harus dilalui oleh setiap pembelajar secara berurutan.',
    rules: [
      '1. Identifikasi Kalimah: Tentukan apakah kata tersebut Isim (kata benda/nama), Fi\'il (kata kerja), atau Harf (kata depan/penghubung).',
      '2. Mengetahui Jenis Kalimah Sebelumnya: Mengetahui jenis kalimah yang terletak persis sebelum kalimah yang akan dibaca (mengecek ada tidaknya amil).',
      '3. Mengetahui Perubahan Akhir Kalimah (I\'rob): Menentukan harakat akhir kata (Rofa\'/Dhommah, Nashab/Fathah, Jar/Kasrah, Jazm/Sukun).',
      '4. Mengetahui Jabatan Kalimah: Menentukan posisi gramatikal dalam kalimat (Fa\'il, Mubtada\', Khabar, Maf\'ul Bih, Mudhaf Ilaih, Majrur, dsb).',
      '5. Mengetahui Makna Kalimah: Merujuk pada kamus dan Kaidah Tashrif (perubahan bangunan kata).'
    ],
    examples: [
      { arabic: 'ضَرَبَ زَيْدٌ عَمْرًا', translation: 'Zaid telah memukul Amr', analysis: '1. ضَرَبَ (Fi\'il), زَيْدٌ (Isim), عَمْرًا (Isim). 2. زيد didahului fi\'il. 3. I\'rob: Rofa\' (dhommah) & Nashab (fathah). 4. Jabatan: Fi\'il, Fa\'il, Maf\'ul Bih. 5. Makna: memukul.' }
    ],
    estimatedMinutes: 25
  },
  {
    id: 'bab-03',
    jilid: 1,
    babNumber: 3,
    title: 'Pembagian Kalimah (Isim, Fi\'il, Harf)',
    arabicTitle: 'أقسام الكلمة : اسم وفعل وحرف',
    category: 'Kalimah',
    pageReference: 'Hal. 5-7',
    summary: 'Mengenal tiga komponen pembentuk bahasa Arab: Isim, Fi\'il, dan Harf serta cara membacanya.',
    objectives: [
      'Membedakan definisi Isim (kata benda/nama), Fi\'il (kata kerja), dan Harf (kata depan).',
      'Memahami pembacaan bangunan kalimah melalui Shorof dan pembacaan akhir kalimah melalui Nahwu.',
      'Mengetahui bahwa Harf dibaca bangunannya berdasarkan Kamus (Sima\'i).'
    ],
    explanation: 'Seluruh kosakata dalam bahasa Arab tidak lepas dari 3 jenis: Isim, Fi\'il, atau Harf. Cara membaca kalimah Isim & Fi\'il: huruf awal hingga sebelum akhir (bangunan) ditentukan oleh ilmu Shorof, sedangkan harakat huruf terakhir ditentukan oleh ilmu Nahwu. Adapun Harf: bangunannya berasal dari Kamus dan akhirnya ditentukan oleh Nahwu.',
    rules: [
      'Isim (اسم): Kata benda, nama-nama, sifat yang memiliki makna mandiri dan TIDAK terikat oleh waktu. Contoh: بَيْتٌ، البَيْتُ، مُحَمَّدٌ، عِلْمٌ، العِلْمُ.',
      'Fi\'il (فعل): Kata kerja dan yang semakna yang memiliki makna mandiri dan TERIKAT oleh waktu (lampau, sekarang, atau yang akan datang). Contoh: نَصَرَ، يَنْصُرُ، اُنْصُرْ، لَا تَنْصُرْ.',
      'Harf (حرف): Kata depan / perangkai yang maknanya tidak mandiri (hanya bisa dipahami setelah digabung dengan Isim atau Fi\'il). Contoh: مِنْ، فِي، إِلَى، عَلَى، فَـ، ثُمَّ.'
    ],
    tables: [
      {
        title: 'Matriks Cara Membaca Kalimah',
        headers: ['Jenis Kalimah', 'Bagian Bangunan (Awal - Sebelum Akhir)', 'Bagian Huruf Terakhir'],
        rows: [
          { col1: 'Isim (الاسم)', col2: 'Ditentukan oleh Shorof (Wazan)', col3: 'Ditentukan oleh Nahwu (I\'rob)' },
          { col1: 'Fi\'il (الفعل)', col2: 'Ditentukan oleh Shorof (Wazan/Tashrif)', col3: 'Ditentukan oleh Nahwu (Amil Jazm/Nashab)' },
          { col1: 'Harf (الحرف)', col2: 'Ditentukan oleh Kamus (Mabni)', col3: 'Ditentukan oleh Nahwu' }
        ]
      }
    ],
    examples: [
      { arabic: 'بَيْتٌ ، البَيْتُ ، مُحَمَّدٌ', translation: 'Rumah, Rumah itu, Muhammad', analysis: 'Isim (Kata benda & nama)' },
      { arabic: 'نَصَرَ ، يَنْصُرُ ، اُنْصُرْ ، لَا تَنْصُرْ', translation: 'Telah menolong, Sedang menolong, Tolonglah!, Jangan tolong!', analysis: 'Fi\'il (Kata kerja 4 bentuk)' },
      { arabic: 'مِنْ ، فِي ، إِلَى ، عَلَى ، فَـ ، ثُمَّ', translation: 'Dari, Di dalam, Ke/Kepada, Di atas, Maka, Kemudian', analysis: 'Harf (Kata depan / penghubung)' }
    ],
    estimatedMinutes: 25
  },
  {
    id: 'bab-04',
    jilid: 1,
    babNumber: 4,
    title: 'Perbedaan Nahwu dan Shorof',
    arabicTitle: 'الفرق بين النحو والصرف',
    category: 'Pengantar',
    pageReference: 'Hal. 8-11',
    summary: 'Membedakan domain ilmu Shorof (bangunan kata & makna mufrod) dan ilmu Nahwu (akhir kata & makna kalimat).',
    objectives: [
      'Memahami fungsi ilmu Shorof untuk membaca bangunan kata (huruf awal sampai sebelum akhir).',
      'Memahami fungsi ilmu Nahwu untuk membaca harakat akhir kalimah saat digabungkan dalam kalimat.',
      'Mengenal 10 bentuk (shighoh) kalimah turunan dari Fi\'il.'
    ],
    explanation: 'Shorof adalah ilmu yang membahas perubahan bentuk kalimah (mutasharrif) untuk menghasilkan makna-makna tertentu. Objek shorof adalah bangunan kata (huruf awal sampai sebelum akhir). Nahwu adalah ilmu yang membahas perubahan harakat huruf terakhir kalimah ketika terjadi penggabungan dengan kalimah lain untuk memahami makna jumlah (tarkib).',
    rules: [
      'Shorof = Membaca Bangunan Kalimah (huruf 1 s.d. sebelum akhir) → Untuk memahami makna mufrod / kosakata.',
      'Nahwu = Membaca Akhir Kalimah → Berlaku saat penggabungan kalimah untuk memahami struktur kalimat (tarkib).',
      '10 Bentuk Kalimah (Shighoh): Fi\'il Madhi, Fi\'il Mudhari\', Fi\'il Amar, Fi\'il Nahyi, Mashdar, Isim Fa\'il, Isim Maf\'ul, Isim Zaman, Isim Makan, Isim Alat.'
    ],
    tables: [
      {
        title: 'Tabel 10 Bentuk Shighoh & Makna yang Dituju',
        headers: ['Makna yang Dituju', 'Bentuk Kalimah (Shighoh)', 'Contoh نَصَرَ', 'Contoh كَتَبَ'],
        rows: [
          { col1: 'Pekerjaan di waktu lampau', col2: 'Fi\'il Madhi', col3: 'نَصَرَ (Telah menolong)', col4: 'كَتَبَ (Telah menulis)' },
          { col1: 'Pekerjaan di masa kini / akan datang', col2: 'Fi\'il Mudhari\'', col3: 'يَنْصُرُ (Sedang menolong)', col4: 'يَكْتُبُ (Sedang menulis)' },
          { col1: 'Perintah melakukan pekerjaan', col2: 'Fi\'il Amar', col3: 'اُنْصُرْ (Tolonglah!)', col4: 'اُكْتُبْ (Tulislah!)' },
          { col1: 'Larangan melakukan pekerjaan', col2: 'Fi\'il Nahyi', col3: 'لَا تَنْصُرْ (Jangan menolong!)', col4: 'لَا تَكْتُبْ (Jangan menulis!)' },
          { col1: 'Pekerjaan tidak terikat waktu', col2: 'Mashdar', col3: 'نَصْرًا (Pertolongan)', col4: 'كَتْبًا / كِتَابَةً (Penulisan/tulisan)' },
          { col1: 'Pelaku pekerjaan', col2: 'Isim Fa\'il', col3: 'نَاصِرٌ (Penolong)', col4: 'كَاتِبٌ (Penulis)' },
          { col1: 'Objek yang dikenai pekerjaan', col2: 'Isim Maf\'ul', col3: 'مَنْصُورٌ (Yang ditolong)', col4: 'مَكْتُوبٌ (Yang ditulis)' },
          { col1: 'Waktu terjadinya pekerjaan', col2: 'Isim Zaman', col3: 'مَنْصَرٌ (Waktu menolong)', col4: 'مَكْتَبٌ (Waktu menulis)' },
          { col1: 'Tempat terjadinya pekerjaan', col2: 'Isim Makan', col3: 'مَنْصَرٌ (Tempat menolong)', col4: 'مَكْتَبٌ (Meja / Tempat menulis)' },
          { col1: 'Alat untuk melakukan pekerjaan', col2: 'Isim Alat', col3: 'مِنْصَارٌ (Alat menolong)', col4: 'مِكْتَابٌ (Alat tulis)' }
        ]
      }
    ],
    examples: [
      { arabic: 'بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ', translation: 'Dengan menyebut nama Allah yang Maha Pengasih lagi Maha Penyayang', analysis: 'Penerapan Nahwu pada akhir kalimah: Bism-i, Allāh-i, ar-Rahmān-i, ar-Rahīm-i.' },
      { arabic: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ العَلِيِّ العَظِيمِ', translation: 'Tiada daya dan upaya kecuali dengan pertolongan Allah yang Maha Tinggi lagi Maha Agung', analysis: 'Penerapan harakat akhir Nahwu & shighoh Shorof.' }
    ],
    estimatedMinutes: 30
  },
  {
    id: 'bab-05',
    jilid: 1,
    babNumber: 5,
    title: 'Tanda-Tanda Kalimah Isim & Bahar Rojaz',
    arabicTitle: 'علامات الاسم وبحر الرجز',
    category: 'Isim',
    pageReference: 'Hal. 12-19',
    summary: 'Menghafal dan mengidentifikasi 8 tanda khas kalimah Isim melalui senandung Bahar Rojaz.',
    objectives: [
      'Menghafal 8 tanda kalimah Isim dalam metode Qaidaty.',
      'Melantunkan Bahar Rojaz tanda Isim untuk mempermudah ingatan.',
      'Mengidentifikasi Isim dari awalan Ma/Mi/Mu, Al-, Tanwin, Ta Marbuthah, Harf Jar, Harf Nida, Harf Nashab, dan Idhofah.'
    ],
    explanation: 'Untuk membedakan kalimah, Isim dominan dikenali dengan tanda-tandanya. Qaidaty merumuskan 8 tanda Isim yang dirangkai dalam bait Bahar Rojaz.',
    rules: [
      '1. Diawali Ma-, Mi-, atau Mu- (Contoh: مَسْجِدٌ، مِفْتَاحٌ، مُسْلِمٌ).',
      '2. Dibubuhi Alif Lam (Al-) (Contoh: الإِسْلَامُ، البَيْتُ، الرَّجُلُ).',
      '3. Dibubuhi Tanwin (-un, -an, -in) (Contoh: بَيْتٌ، رَجُلٌ، قَمَرٌ).',
      '4. Diakhiri Ta Marbuthah (ـة / ة) (Contoh: مَدْرَسَةٌ، دَوْلَةٌ، بَقَرَةٌ).',
      '5. Didahului Harf Jar (مِنْ، إِلَى، عَنْ، عَلَى، فِي، رُبَّ، بِـ، كَـ، لِـ) yang membuat kata setelahnya berharakat Kasrah / Jar.',
      '6. Didahului Harf Nida (kata seru: يَا، أَيُّ، أَيَا) (Contoh: يَا مُحَمَّدُ، يَا رَحْمٰنُ).',
      '7. Didahului Harf Nashab (إِنَّ، أَنَّ، كَأَنَّ، لَكِنَّ، لَيْتَ، لَعَلَّ) (Contoh: إِنَّ اللهَ، لَيْتَ الشَّبَابَ).',
      '8. Di-idhofahkan (disandarkan / digabung dengan kata setelahnya) (Contoh: عَبْدُ اللهِ، كِتَابُ الجِهَادِ، بَابُ العِلْمِ).'
    ],
    baharRojaz: {
      arabicMeter: 'مُسْتَفْعِلُنْ مُسْتَفْعِلُنْ مُسْتَفْعِلُنْ # مُسْتَفْعِلُنْ مُسْتَفْعِلُنْ مُسْتَفْعِلُنْ',
      poem: [
        'Tanda Isim jumlahnya ada delapan',
        'Ma-mi-mu al- tanwin dan nida di depan',
        'Haraf nashab haraf jar serta idhofah',
        'Tanda yang terakhir itu ta marbuthah'
      ],
      meaning: 'Senandung Bahar Rojaz Qaidaty untuk menghafal 8 tanda kalimah Isim dengan irama timbangan mustaf\'ilun.'
    },
    tables: [
      {
        title: 'Tabel 8 Tanda Kalimah Isim & Contohnya',
        headers: ['Tanda Isim', 'Penjelasan Singkat', 'Contoh Kosakata Arab'],
        rows: [
          { col1: '1. Diawali Ma/Mi/Mu', col2: 'Bentuk awalan mim mashdar, isim makan/alat/fail', col3: 'مَغْرِب ، مَسْجِد ، مِفْتَاح ، مِصْبَاح ، مُسْلِم ، مُؤْمِن ، مُجَاهِد' },
          { col1: '2. Dibubuhi Al-', col2: 'Pemberi sifat definitif (Ma\'rifah)', col3: 'الإِسْلَام ، الحَمْد ، البَيْت ، الرَّجُل ، الوَلَد ، القَمَر ، الشَّمْس' },
          { col1: '3. Dibubuhi Tanwin', col2: 'Harakat kembar dhommatain, fathatain, kasratain', col3: 'إِسْلَامٌ ، حَمْدٌ ، بَيْتٌ ، رَجُلٌ ، قَمَرٌ ، شَمْسٌ ، دَوْلَةٌ' },
          { col1: '4. Diakhiri Ta Marbuthah', col2: 'Huruf ة penanda muannats', col3: 'دَوْلَة ، مَدْرَسَة ، مَصْلَحَة ، قَرْيَة ، سَبُّورَة ، فَاتِحَة ، بَقَرَة' },
          { col1: '5. Didahului Harf Jar', col2: 'Menyebabkan kata berharakat Jar/Kasrah', col3: 'مِنْ رَبِّهِمْ ، عَلَى مُحَمَّدٍ ، إِلَى المَسْجِدِ ، عَنْ صَلَاتِهِمْ' },
          { col1: '6. Didahului Harf Nida', col2: 'Kata seru panggilan', col3: 'يَا مُحَمَّدُ ، يَا رَحْمٰنُ ، يَا رَحِيمُ ، يَا أَيُّهَا الَّذِينَ آمَنُوا' },
          { col1: '7. Didahului Harf Nashab', col2: 'Inna dan saudaranya', col3: 'إِنَّ اللهَ ، أَنَّ مُحَمَّدًا ، لَعَلَّكُمْ ، لَيْتَ الشَّبَابَ ، لَكِنَّ اللهَ' },
          { col1: '8. Di-idhofahkan', col2: 'Disandarkan membentuk frasa kepemilikan', col3: 'عَبْدُ اللهِ ، كِتَابُ الجِهَادِ ، بَابُ العِلْمِ ، مَقَامُ إِبْرَاهِيمَ' }
        ]
      }
    ],
    examples: [
      { arabic: 'مَسْجِدٌ كَبِيرٌ', translation: 'Masjid yang besar', analysis: 'مَسْجِدٌ diawali Ma- dan bertanwin (Isim), كَبِيرٌ bertanwin (Isim).' },
      { arabic: 'فِي بَيْتِ اللهِ', translation: 'Di rumah Allah', analysis: 'بَيْتِ didahului Harf Jar فِي dan di-idhofahkan ke الله (Isim).' }
    ],
    estimatedMinutes: 30
  },
  {
    id: 'bab-06',
    jilid: 1,
    babNumber: 6,
    title: 'Kalimah Fi\'il, 4 Bentuk & Tandanya',
    arabicTitle: 'الكلمة الفعل وعلاماتها وبحر الرجز',
    category: 'Fiil & Shorof',
    pageReference: 'Hal. 20-22',
    summary: 'Mengenal 4 pembagian Fi\'il, hierarki kelahiran kata kerja, tanda Fi\'il Madhi dan Mudhari\' via Bahar Rojaz.',
    objectives: [
      'Memahami 4 bentuk Fi\'il: Madhi, Mudhari\', Amar, Nahyi.',
      'Mengetahui pohon kelahiran: Fi\'il Madhi melahirkan Mudhari\', lalu melahirkan Amar, Nahyi, dan Isim-isim musytaq.',
      'Menghafal tanda Fi\'il Madhi (Ta Fa\'il, Qod, Laqod, Ta Ta\'nits Sukun) dan tanda Mudhari\' (Anita, Lam, Alam, Qod, Sa, Saufa) lewat Bahar Rojaz.'
    ],
    explanation: 'Kalimah Fi\'il bermakna kata kerja atau sifat yang terikat waktu. Bentuk dasarnya adalah Fi\'il Madhi. Dari Madhi lahir Mudhari\', dan dari Mudhari\' lahir Amar, Nahyi, serta bentuk-bentuk Isim Musytaq.',
    rules: [
      'Fi\'il Madhi: Kata kerja / sifat lampau (contoh: نَصَرَ).',
      'Fi\'il Mudhari\': Kata kerja / sifat bentuk sedang / akan datang (contoh: يَنْصُرُ).',
      'Fi\'il Amar: Kata perintah (contoh: اُنْصُرْ).',
      'Fi\'il Nahyi: Kata larangan (contoh: لَا تَنْصُرْ).',
      'Tanda Fi\'il Madhi: 1. Ta Fa\'il (تَ، تُمَا، تُمْ، تِ، تُمَا، تُنَّ، تُ), 2. Ta Ta\'nits Sukun (تْ), 3. لَقَدْ, 4. قَدْ.',
      'Tanda Fi\'il Mudhari\': 1. Huruf Mudhara\'ah (أَنَيْتَ: Alif, Nun, Ya, Ta), 2. لَمْ / أَلَمْ, 3. سَـ / سَوْفَ, 4. قَدْ.'
    ],
    baharRojaz: {
      arabicMeter: 'مُسْتَفْعِلُنْ مُسْتَفْعِلُنْ مُسْتَفْعِلُنْ # مُسْتَفْعِلُنْ مُسْتَفْعِلُنْ مُسْتَفْعِلُنْ',
      poem: [
        'Fi\'il itu ada empat hai pelajar # Madhi Mudhari Nahyi dan Amar',
        'Tanda madhi tiga mari kita susun # Ta fail qod laqod ta ta\'nits yang sukun',
        'Tanda fiil mudhari:',
        'Anita lam alam qod sa dan saufa # Itu tanda mudhori janganlah lupa'
      ],
      meaning: 'Syair Bahar Rojaz Qaidaty untuk menghafal pembagian fi\'il dan tanda-tanda fi\'il madhi & mudhari\'.'
    },
    tables: [
      {
        title: 'Tabel Tanda Fi\'il Madhi vs Fi\'il Mudhari\'',
        headers: ['Tanda Fi\'il Madhi', 'Contoh Madhi', 'Tanda Fi\'il Mudhari\'', 'Contoh Mudhari\''],
        rows: [
          { col1: 'Ta Fa\'il (تَ، تُمَا، تُمْ، تِ، تُ)', col2: 'سَمِعْتُ رَسُولَ اللهِ ، كَتَبْتَ', col3: 'Huruf Mudhara\'ah (أَنَيْتَ)', col4: 'يَنْصُرُ ، تَنْصُرُ ، أَنْصُرُ ، نَنْصُرُ' },
          { col1: 'Ta Ta\'nits Sukun (ـتْ)', col2: 'ضَرَبَتْ هِنْدٌ أُخْتَهَا', col3: 'Lam Jazm (لَمْ)', col4: 'لَمْ يَلِدْ وَلَمْ يُولَدْ' },
          { col1: 'Laqod (لَقَدْ)', col2: 'لَقَدْ كَانَ لَكُمْ', col3: 'Sin & Saufa (سَـ / سَوْفَ)', col4: 'سَيَعْلَمُونَ ، سَوْفَ تَعْلَمُونَ' },
          { col1: 'Qod (قَدْ)', col2: 'قَدْ أَفْلَحَ مَنْ تَزَكَّى', col3: 'Qod (قَدْ)', col4: 'قَدْ يَصْدُقُ الكَذُوبُ' }
        ]
      }
    ],
    examples: [
      { arabic: 'سَمِعْتُ رَسُولَ اللهِ يَقُولُ', translation: 'Aku telah mendengar Rasulullah bersabda', analysis: 'سَمِعْتُ adalah Fi\'il Madhi dengan Ta Fa\'il (تُ).' },
      { arabic: 'لَمْ يَلِدْ وَلَمْ يُولَدْ', translation: 'Dia tidak beranak dan tidak pula diperanakkan', analysis: 'يَلِدْ dan يُولَدْ adalah Fi\'il Mudhari\' karena didahului amil jazm لَمْ.' }
    ],
    estimatedMinutes: 30
  },
  {
    id: 'bab-07',
    jilid: 1,
    babNumber: 7,
    title: 'Wazan, Mauzun & Kaidah Tashrif',
    arabicTitle: 'الوزن والموزون وقواعد التصريف',
    category: 'Fiil & Shorof',
    pageReference: 'Hal. 23-28',
    summary: 'Prinsip cetakan baku (Wazan), kata yang dicetak (Mauzun), Tashrif Ishtilahi & Lughawi, serta 10 Harf Zaidah (سألتمونيها).',
    objectives: [
      'Memahami fungsi Wazan sebagai acuan membaca bentuk/bangunan kalimah.',
      'Membedakan Tashrif Ishtilahi (perubahan antar shighoh) dan Tashrif Lughawi (perubahan berdasarkan dhomir pelaku).',
      'Mengenal 3 huruf asli (Fa, Ain, Lam) dan 10 huruf tambahan (سألتمونيها).'
    ],
    explanation: 'Membaca bangunan kalimah fi\'il mengikuti bentuk standar baku (Wazan). Wazan mewakili huruf asli dengan huruf Fa (ف), Ain (ع), dan Lam (ل). Huruf tambahan (Harf Zaidah) ditulis apa adanya. Jumlah huruf zaidah ada 10 yang terangkum dalam ungkapan: سَأَلْتُمُونِيهَا (Sin, Hamzah, Lam, Ta, Mim, Wawu, Nun, Ya, Ha, Alif).',
    rules: [
      'Wazan: Cetakan standar untuk membaca bangunan kalimah bahasa Arab.',
      'Mauzun: Kata yang dibaca mengikuti wazan tertentu (misal: كَتَبَ mengikuti فَعَلَ).',
      'Tashrif Ishtilahi: Perubahan dari satu shighoh ke shighoh lain (Fi\'il Madhi → Mudhari\' → Amar → Mashdar → Isim Fa\'il → Isim Maf\'ul → Isim Zaman/Makan → Isim Alat).',
      'Tashrif Lughawi: Perubahan bentuk kata mengikuti pelakunya (dhamir 14: هُوَ، هُمَا، هُمْ ... أَنَا، نَحْنُ).'
    ],
    tables: [
      {
        title: 'Contoh Wazan dan Mauzun Dasar',
        headers: ['Wazan (الوزن)', 'Mauzun (الموزون)', 'Shighoh', 'Makna'],
        rows: [
          { col1: 'فَعَلَ', col2: 'كَتَبَ', col3: 'Fi\'il Madhi', col4: 'Telah menulis' },
          { col1: 'يَفْعُلُ', col2: 'يَكْتُبُ', col3: 'Fi\'il Mudhari\'', col4: 'Sedang menulis' },
          { col1: 'اُفْعُلْ', col2: 'اُكْتُبْ', col3: 'Fi\'il Amar', col4: 'Tulislah!' },
          { col1: 'لَا تَفْعُلْ', col2: 'لَا تَكْتُبْ', col3: 'Fi\'il Nahyi', col4: 'Jangan menulis!' },
          { col1: 'فَاعِلٌ', col2: 'كَاتِبٌ', col3: 'Isim Fa\'il', col4: 'Penulis' },
          { col1: 'مَفْعُولٌ', col2: 'مَكْتُوبٌ', col3: 'Isim Maf\'ul', col4: 'Yang ditulis' },
          { col1: 'مَفْعَلٌ', col2: 'مَكْتَبٌ', col3: 'Isim Makan/Zaman', col4: 'Meja / Tempat menulis' },
          { col1: 'مِفْعَالٌ', col2: 'مِكْتَابٌ', col3: 'Isim Alat', col4: 'Alat tulis' },
          { col1: 'فِعَالَةٌ', col2: 'كِتَابَةٌ', col3: 'Mashdar', col4: 'Penulisan' }
        ]
      }
    ],
    examples: [
      { arabic: 'فَعَلَ ← كَتَبَ', translation: 'Wazan fa\'ala → mauzun kataba', analysis: 'Huruf Fa=Kaf, Ain=Ta, Lam=Ba (semua berharakat fathah).' },
      { arabic: 'مَفْعُولٌ ← مَكْتُوبٌ', translation: 'Wazan maf\'ulun → mauzun maktubun', analysis: 'Huruf zaidah adalah Mim di awal dan Wawu sebelum akhir.' }
    ],
    estimatedMinutes: 35
  },
  {
    id: 'bab-08',
    jilid: 1,
    babNumber: 8,
    title: 'Tabel Harf Zaidah (Huruf Tambahan)',
    arabicTitle: 'جدول الحروف الزائدة',
    category: 'Fiil & Shorof',
    pageReference: 'Hal. 29-30',
    summary: 'Mengenali posisi dan pola kemunculan 10 huruf tambahan dalam kalimah.',
    objectives: [
      'Mengidentifikasi pola huruf zaidah: Hamzah di awal, awalan Ista-, awalan In-, Ta ketiga berhamzah, Mim awal, dsb.',
      'Membedakan huruf asli akar kata (3 huruf) dari huruf imbuhan/tambahan.'
    ],
    explanation: 'Huruf Zaidah adalah huruf tambahan di luar huruf asli akar kata yang memberikan perubahan makna dan wazan.',
    rules: [
      '1. Hamzah di awal dan setelahnya ada 3 huruf atau lebih: أَكْرَمَ، اِسْتِغْفَار، اِجْتَهَدَ.',
      '2. Awalan Ista- (اِسْتـ): Hamzah, Sin, Ta: اِسْتَغْفَرَ، اِسْتَخْرَجَ.',
      '3. Awalan In- (اِنْـ): Hamzah dan Nun: اِنْكَسَرَ، اِنْبَسَطَ.',
      '4. Ta huruf ke-3 dalam kalimah berawalan hamzah: اِجْتَهَدَ، اِقْتَصَدَ.',
      '5. Mim di awal dan setelahnya ada 3 huruf atau lebih: مَنْصُور، مَدْرَسَة، مِفْتَاح، مَسْجِد، مُجَاهِد.',
      '6. Alif, Wawu, atau Ya bersama 3 huruf asal atau lebih: فَاعِل، مَفْعُول، فَعِيل، مِفْعَال.',
      '7. Lam pada isim isyarah: ذٰلِكَ، تِلْكَ، هُنَالِكَ، أُولٰئِكَ.',
      '8. Ha saktah / waqaf / nudbah: قِهْ، اِرْمِهْ، لِمَهْ، وَازَيْدَاهْ.'
    ],
    tables: [
      {
        title: 'Tabel Pola Harf Zaidah',
        headers: ['Karakteristik Harf Zaidah', 'Contoh Kalimah'],
        rows: [
          { col1: 'Hamzah di awal + ≥3 huruf', col2: 'أَكْرَمَ ، اِسْتِغْفَار ، اِجْتَهَدَ ، اِنْصِرَام' },
          { col1: 'Awalan Ista- (اِسْتـ)', col2: 'اِسْتَغْفَرَ ، اِسْتَغْفَارًا ، اِسْتَخْرَجَ ، اِسْتِخْرَاجًا' },
          { col1: 'Awalan In- (اِنْـ)', col2: 'اِنْكَسَرَ ، اِنْكِسَارًا ، اِنْتَحَلَ ، اِنْبَسَطَ' },
          { col1: 'Ta ke-3 diawali Hamzah', col2: 'اِجْتَهَدَ ، اِجْتِهَادًا ، اِقْتَصَدَ ، اِقْتِصَادًا' },
          { col1: 'Mim di awal + ≥3 huruf', col2: 'مَنْصُور ، مَدْرَسَة ، مِفْتَاح ، مَسْجِد ، مُصْبَاح ، مُجَاهِد' },
          { col1: 'Alif / Wawu / Ya + 3 huruf asal', col2: 'فَاعِل ، مَفْعُول ، فَعِيل ، مِفْعَال ، جَالِس ، رَحِيم' },
          { col1: 'Lam pada Isim Isyarah', col2: 'ذٰلِكَ ، تِلْكَ ، هُنَالِكَ ، أُولٰئِكَ' },
          { col1: 'Ha Waqaf / Nudbah', col2: 'قِهْ ، اِرْمِهْ ، لِمَهْ ، وَازَيْدَاهْ' }
        ]
      }
    ],
    examples: [
      { arabic: 'اِسْتَغْفَرَ', translation: 'Telah memohon ampun', analysis: 'Huruf zaidah: Hamzah, Sin, Ta. Huruf asli: Ghoin, Fa, Ro (غ-ف-ر).' },
      { arabic: 'مِفْتَاحٌ', translation: 'Kunci (alat pembuka)', analysis: 'Huruf zaidah: Mim dan Alif. Huruf asli: Fa, Ta, Ha (ف-ت-ح).' }
    ],
    estimatedMinutes: 25
  },
  {
    id: 'bab-09',
    jilid: 1,
    babNumber: 9,
    title: 'Bentuk (Shighoh) Fi\'il Madhi: Tsulatsi, Ruba\'i, Khumasi, Sudasi',
    arabicTitle: 'صيغ الفعل الماضي : الثلاثي والرباعي والخماسي والسداسي',
    category: 'Fiil & Shorof',
    pageReference: 'Hal. 32-54',
    summary: 'Klasifikasi lengkap wazan Fi\'il Madhi dari 3 huruf (Tsulatsi) hingga 6 huruf (Sudasi) beserta ratusan kosakata contoh.',
    objectives: [
      'Menguasai 3 wazan dasar Tsulatsi: فَعَلَ، فَعِلَ، فَعُلَ.',
      'Menguasai wazan Ruba\'i: أَفْعَلَ، فَعَّلَ، فَاعَلَ، فَعْلَلَ.',
      'Menguasai wazan Khumasi: اِنْفَعَلَ، اِفْتَعَلَ، اِفْعَلَّ، تَفَعَّلَ، تَفَاعَلَ.',
      'Menguasai wazan Sudasi: اِسْتَفْعَلَ، تَفَعْلَلَ.',
      'Membaca ratusan kata kerja Arab gundul tanpa ragu sesuai pola wazannya.'
    ],
    explanation: 'Fi\'il Madhi dikelompokkan berdasarkan jumlah huruf penyusunnya: Tsulatsi (3 huruf), Ruba\'i (4 huruf), Khumasi (5 huruf), dan Sudasi (6 huruf). Setiap kelompok memiliki wazan baku.',
    rules: [
      'Tsulatsi Mujarrad (3 huruf): 1. فَعَلَ (contoh: نَصَرَ، كَتَبَ), 2. فَعِلَ (contoh: عَلِمَ، فَرِحَ), 3. فَعُلَ (contoh: حَسُنَ، كَبُرَ).',
      'Ruba\'i (4 huruf): 1. أَفْعَلَ (أَكْرَمَ), 2. فَعَّلَ (كَرَّمَ), 3. فَاعَلَ (قَاتَلَ), 4. فَعْلَلَ (دَحْرَجَ).',
      'Khumasi (5 huruf): 1. اِنْفَعَلَ (اِنْكَسَرَ), 2. اِفْتَعَلَ (اِجْتَمَعَ), 3. اِفْعَلَّ (اِحْمَرَّ), 4. تَفَعَّلَ (تَكَلَّمَ), 5. تَفَاعَلَ (تَبَاعَدَ).',
      'Sudasi (6 huruf): 1. اِسْتَفْعَلَ (اِسْتَخْرَجَ), 2. تَفَعْلَلَ (تَدَحْرَجَ).'
    ],
    tables: [
      {
        title: 'Ringkasan Wazan Fi\'il Madhi Qaidaty',
        headers: ['Kategori', 'Wazan', 'Contoh Mauzun', 'Arti Kosakata'],
        rows: [
          { col1: 'Tsulatsi (3)', col2: 'فَعَلَ', col3: 'خَلَقَ ، نَصَرَ ، دَخَلَ ، قَتَلَ', col4: 'Mencipta, Menolong, Masuk, Membunuh' },
          { col1: 'Tsulatsi (3)', col2: 'فَعِلَ', col3: 'عَلِمَ ، فَهِمَ ، سَمِعَ ، فَرِحَ', col4: 'Mengetahui, Memahami, Mendengar, Senang' },
          { col1: 'Tsulatsi (3)', col2: 'فَعُلَ', col3: 'حَسُنَ ، كَبُرَ ، بَعُدَ ، قَرُبَ', col4: 'Bagus, Besar, Jauh, Dekat' },
          { col1: 'Ruba\'i (4)', col2: 'أَفْعَلَ', col3: 'أَكْرَمَ ، أَحْسَنَ ، أَجْمَلَ ، أَدْخَلَ', col4: 'Memuliakan, Berbuat baik, Memperindah, Memasukkan' },
          { col1: 'Ruba\'i (4)', col2: 'فَعَّلَ', col3: 'كَرَّمَ ، عَلَّمَ ، فَهَّمَ ، صَدَّرَ', col4: 'Memuliakan, Mengajarkan, Memahamkan, Menerbitkan' },
          { col1: 'Ruba\'i (4)', col2: 'فَاعَلَ', col3: 'قَاتَلَ ، جَاهَدَ ، سَاعَدَ ، شَارَكَ', col4: 'Memerangi, Berjihad, Membantu, Bersekutu' },
          { col1: 'Ruba\'i (4)', col2: 'فَعْلَلَ', col3: 'دَحْرَجَ ، بَعْثَرَ ، زَلْزَلَ ، بَسْمَلَ', col4: 'Menggelindingkan, Mencerai-beraikan, Mengguncang, Baca Bismillah' },
          { col1: 'Khumasi (5)', col2: 'اِنْفَعَلَ', col3: 'اِنْكَسَرَ ، اِنْفَتَحَ ، اِنْطَلَقَ', col4: 'Pecah, Terbuka, Berangkat' },
          { col1: 'Khumasi (5)', col2: 'اِفْتَعَلَ', col3: 'اِجْتَمَعَ ، اِجْتَهَدَ ، اِخْتَبَرَ', col4: 'Berkumpul, Bersungguh-sungguh, Menguji' },
          { col1: 'Khumasi (5)', col2: 'اِفْعَلَّ', col3: 'اِحْمَرَّ ، اِبْيَضَّ ، اِسْوَدَّ', col4: 'Menjadi merah, Menjadi putih, Menjadi hitam' },
          { col1: 'Khumasi (5)', col2: 'تَفَعَّلَ', col3: 'تَكَلَّمَ ، تَعَلَّمَ ، تَقَدَّمَ', col4: 'Berbicara, Belajar, Maju' },
          { col1: 'Khumasi (5)', col2: 'تَفَاعَلَ', col3: 'تَبَاعَدَ ، تَعَاوَنَ ، تَسَامَحَ', col4: 'Saling menjauh, Saling tolong, Bertoleransi' },
          { col1: 'Sudasi (6)', col2: 'اِسْتَفْعَلَ', col3: 'اِسْتَخْرَجَ ، اِسْتَغْفَرَ ، اِسْتَقْبَلَ', col4: 'Mengeluarkan, Memohon ampun, Menyambut' },
          { col1: 'Sudasi (6)', col2: 'تَفَعْلَلَ', col3: 'تَدَحْرَجَ ، تَزَلْزَلَ', col4: 'Terguling, Berguncang' }
        ]
      }
    ],
    examples: [
      { arabic: 'اِسْتَغْفَرَ التَّائِبُ رَبَّهُ', translation: 'Orang yang bertaubat memohon ampun kepada Tuhannya', analysis: 'اِسْتَغْفَرَ adalah Fi\'il Madhi Sudasi wazan اِسْتَفْعَلَ.' },
      { arabic: 'تَعَاوَنَ المُسْلِمُونَ عَلَى البِرِّ', translation: 'Kaum muslimin saling tolong-menolong dalam kebaikan', analysis: 'تَعَاوَنَ adalah Fi\'il Madhi Khumasi wazan تَفَاعَلَ.' }
    ],
    estimatedMinutes: 40
  },
  {
    id: 'bab-10',
    jilid: 1,
    babNumber: 10,
    title: 'Pembentukan Fi\'il Mudhari\'',
    arabicTitle: 'كيفية صياغة الفعل المضارع',
    category: 'Fiil & Shorof',
    pageReference: 'Hal. 55-58',
    summary: 'Kaidah pembentukan Fi\'il Mudhari\' dari Tsulatsi, Ruba\'i, berawalan Ta, dan berawalan Hamzah Kasrah.',
    objectives: [
      'Mengetahui rumus pembentukan Fi\'il Mudhari\' dari Fi\'il Tsulatsi (yaf\'ulu, yaf\'alu, yaf\'ilu).',
      'Mengetahui rumus Fi\'il Mudhari\' dari Ruba\'i (huruf mudhara\'ah berharakat Dhommah dan sebelum akhir Kasrah: يُفَعِّلُ، يُفَاعِلُ، يُفْعِلُ، يُفَعْلِلُ).',
      'Menguasai kaidah mudhari\' yang diawali Ta dan Hamzah Kasrah.'
    ],
    explanation: 'Pembentukan Fi\'il Mudhari\' dilakukan dengan menambahkan huruf mudhara\'ah (أ-ن-ي-ت). Untuk Tsulatsi, huruf mudhara\'ah berharakat fathah. Untuk Ruba\'i (4 huruf), huruf mudhara\'ah WAJIB berharakat dhommah dan huruf sebelum akhir dikasrahkan. Untuk yang diawali Ta, huruf mudhara\'ah fathah dan sebelum akhir fathah.',
    rules: [
      'Tsulatsi: Tambah huruf mudhara\'ah fathah, sukunkan Fa fi\'il, harakatkan \'Ain (dhommah/fathah/kasrah sesuai sima\'i), dhommahkan akhirnya. Contoh: نَصَرَ → يَنْصُرُ، ضَرَبَ → يَضْرِبُ، فَتَحَ → يَفْتَحُ.',
      'Ruba\'i (4 huruf): Huruf mudhara\'ah WAJIB dhommah, kasrahkan sebelum akhir, dhommahkan akhir. Contoh: أَكْرَمَ → يُكْرِمُ، فَرَّحَ → يُفَرِّحُ، قَاتَلَ → يُقَاتِلُ، دَحْرَجَ → يُدَحْرِجُ.',
      'Yang Diawali Ta (تَفَعَّلَ / تَفَاعَلَ / تَفَعْلَلَ): Huruf mudhara\'ah fathah, dhommahkan akhirnya (tetap fathah sebelum akhir). Contoh: تَكَلَّمَ → يَتَكَلَّمُ، تَبَاعَدَ → يَتَبَاعَدُ، تَدَحْرَجَ → يَتَدَحْرَجُ.',
      'Yang Diawali Hamzah Kasrah (اِنْفَعَلَ / اِفْتَعَلَ / اِسْتَفْعَلَ): Ganti hamzah dengan huruf mudhara\'ah fathah, kasrahkan sebelum akhir, dhommahkan akhir. Contoh: اِنْكَسَرَ → يَنْكَسِرُ، اِجْتَمَعَ → يَجْتَمِعُ، اِسْتَغْفَرَ → يَسْتَغْفِرُ.'
    ],
    tables: [
      {
        title: 'Tabel Komparasi Pembentukan Fi\'il Mudhari\'',
        headers: ['Pola Madhi', 'Pola Mudhari\'', 'Contoh Perubahan', 'Catatan Harakat'],
        rows: [
          { col1: 'فَعَلَ (Tsulatsi)', col2: 'يَفْعُلُ / يَفْعِلُ / يَفْعَلُ', col3: 'نَصَرَ → يَنْصُرُ ، ضَرَبَ → يَضْرِبُ', col4: 'Mudhara\'ah fathah' },
          { col1: 'أَفْعَلَ (Ruba\'i)', col2: 'يُفْعِلُ', col3: 'أَكْرَمَ → يُكْرِمُ ، أَحْسَنَ → يُحْسِنُ', col4: 'Mudhara\'ah dhommah, sblm akhir kasrah' },
          { col1: 'فَعَّلَ (Ruba\'i)', col2: 'يُفَعِّلُ', col3: 'عَلَّمَ → يُعَلِّمُ ، كَرَّمَ → يُكَرِّمُ', col4: 'Mudhara\'ah dhommah, sblm akhir kasrah' },
          { col1: 'فَاعَلَ (Ruba\'i)', col2: 'يُفَاعِلُ', col3: 'قَاتَلَ → يُقَاتِلُ ، جَاهَدَ → يُجَاهِدُ', col4: 'Mudhara\'ah dhommah, sblm akhir kasrah' },
          { col1: 'تَفَعَّلَ (Khumasi)', col2: 'يَتَفَعَّلُ', col3: 'تَكَلَّمَ → يَتَكَلَّمُ ، تَعَلَّمَ → يَتَعَلَّمُ', col4: 'Mudhara\'ah fathah, sblm akhir tetap fathah' },
          { col1: 'اِسْتَفْعَلَ (Sudasi)', col2: 'يَسْتَفْعِلُ', col3: 'اِسْتَغْفَرَ → يَسْتَغْفِرُ ، اِسْتَخْرَجَ → يَسْتَخْرِجُ', col4: 'Mudhara\'ah fathah, sblm akhir kasrah' }
        ]
      }
    ],
    examples: [
      { arabic: 'يُعَلِّمُ الأُسْتَاذُ الطُّلَّابَ', translation: 'Guru itu sedang mengajarkan para murid', analysis: 'يُعَلِّمُ adalah Fi\'il Mudhari\' dari Madhi Ruba\'i عَلَّمَ.' },
      { arabic: 'يَسْتَغْفِرُ المُؤْمِنُ رَبَّهُ', translation: 'Orang mukmin memohon ampun kepada Tuhannya', analysis: 'يَسْتَغْفِرُ adalah Fi\'il Mudhari\' dari Madhi Sudasi اِسْتَغْفَرَ.' }
    ],
    estimatedMinutes: 35
  },
  {
    id: 'bab-11',
    jilid: 1,
    babNumber: 11,
    title: 'Pembentukan Fi\'il Amar (Kata Perintah)',
    arabicTitle: 'صياغة فعل الأمر',
    category: 'Fiil & Shorof',
    pageReference: 'Hal. 59-62',
    summary: 'Kaidah pembentukan Fi\'il Amar dari Tsulatsi (uf\'ul, if\'al, if\'il), Ruba\'i, pola awalan Ta, dan pola Hamzah Kasrah.',
    objectives: [
      'Menentukan wazan Fi\'il Amar Tsulatsi berdasarkan harakat ain mudhari\'-nya.',
      'Membentuk Fi\'il Amar Ruba\'i dengan mengkasrahkan huruf sebelum akhir dan mensukunkan akhirnya.',
      'Membentuk Fi\'il Amar dari kelompok Ta dan Hamzah Kasrah.'
    ],
    explanation: 'Fi\'il Amar adalah kata kerja perintah. Dari Tsulatsi, bentuk amar ditentukan oleh harakat \'Ain mudhari\'-nya: jika mudhari\' berwazan يَفْعُلُ maka amar berwazan اُفْعُلْ (uf\'ul); jika يَفْعَلُ maka اِفْعَلْ (if\'al); jika يَفْعِلُ maka اِفْعِلْ (if\'il).',
    rules: [
      '1. Tsulatsi jika mudhari\' يَفْعُلُ → Amar اُفْعُلْ (contoh: يَنْصُرُ → اُنْصُرْ، يَكْتُبُ → اُكْتُبْ).',
      '2. Tsulatsi jika mudhari\' يَفْعَلُ → Amar اِفْعَلْ (contoh: يَفْتَحُ → اِفْتَحْ، يَقْرَأُ → اِقْرَأْ).',
      '3. Tsulatsi jika mudhari\' يَفْعِلُ → Amar اِفْعِلْ (contoh: يَضْرِبُ → اِضْرِبْ، يَجْلِسُ → اِجْلِسْ).',
      '4. Ruba\'i dibentuk dari Fi\'il Madhi dengan mengkasrahkan sebelum akhir dan mensukunkan akhir (أَكْرَمَ → أَكْرِمْ، فَرَّحَ → فَرِّحْ، قَاتَلَ → قَاتِلْ).',
      '5. Awalan Ta: Disukunkan huruf akhirnya saja (تَكَلَّمَ → تَكَلَّمْ، تَعَاوَنَ → تَعَاوَنْ).',
      '6. Awalan Hamzah Kasrah: Kasrahkan sebelum akhir dan sukunkan akhir (اِنْكَسَرَ → اِنْكَسِرْ، اِجْتَمَعَ → اِجْتَمِعْ، اِسْتَغْفَرَ → اِسْتَغْفِرْ).'
    ],
    tables: [
      {
        title: 'Tabel Wazan Fi\'il Amar',
        headers: ['Madhi', 'Mudhari\'', 'Fi\'il Amar', 'Contoh Kata'],
        rows: [
          { col1: 'فَعَلَ', col2: 'يَفْعُلُ', col3: 'اُفْعُلْ', col4: 'نَصَرَ → يَنْصُرُ → اُنْصُرْ ، دَخَلَ → اُدْخُلْ' },
          { col1: 'فَعَلَ', col2: 'يَفْعِلُ', col3: 'اِفْعِلْ', col4: 'ضَرَبَ → يَضْرِبُ → اِضْرِبْ ، جَلَسَ → اِجْلِسْ' },
          { col1: 'فَعَلَ / فَعِلَ', col2: 'يَفْعَلُ', col3: 'اِفْعَلْ', col4: 'فَتَحَ → يَفْتَحُ → اِفْتَحْ ، عَلِمَ → يَعْلَمُ → اِعْلَمْ' },
          { col1: 'أَفْعَلَ', col2: 'يُفْعِلُ', col3: 'أَفْعِلْ', col4: 'أَكْرَمَ → أَكْرِمْ ، أَحْسَنَ → أَحْسِنْ' },
          { col1: 'فَعَّلَ', col2: 'يُفَعِّلُ', col3: 'فَعِّلْ', col4: 'عَلَّمَ → عَلِّمْ ، قَدَّمَ → قَدِّمْ' },
          { col1: 'اِسْتَفْعَلَ', col2: 'يَسْتَفْعِلُ', col3: 'اِسْتَفْعِلْ', col4: 'اِسْتَغْفَرَ → اِسْتَغْفِرْ ، اِسْتَخْرَجَ → اِسْتَخْرِجْ' }
        ]
      }
    ],
    examples: [
      { arabic: 'اِقْرَأْ بِاسْمِ رَبِّكَ', translation: 'Bacalah dengan menyebut nama Tuhanmu', analysis: 'اِقْرَأْ adalah Fi\'il Amar Tsulatsi wazan اِفْعَلْ (mudhari\': يَقْرَأُ).' },
      { arabic: 'اِسْتَغْفِرْ لِذَنْبِكَ', translation: 'Mohonlah ampunan atas dosamu', analysis: 'اِسْتَغْفِرْ adalah Fi\'il Amar Sudasi wazan اِسْتَفْعِلْ.' }
    ],
    estimatedMinutes: 30
  },
  {
    id: 'bab-12',
    jilid: 1,
    babNumber: 12,
    title: 'Fi\'il Nahyi (Kata Larangan)',
    arabicTitle: 'فعل النهي (النهي)',
    category: 'Fiil & Shorof',
    pageReference: 'Hal. 63',
    summary: 'Kaidah pembentukan Fi\'il Nahyi (larangan) dengan menambahkan La Nahyi (لَا) dan mensukunkan huruf akhir.',
    objectives: [
      'Memahami definisi Fi\'il Nahyi sebagai ungkapan larangan (artinya: janganlah...).',
      'Membentuk Fi\'il Nahyi dari Fi\'il Mudhari\' mukhatab dengan menambahkan لَا dan jazm sukun di akhir.'
    ],
    explanation: 'Fi\'il Nahyi adalah kata kerja larangan yang bermakna "janganlah...". Dibentuk dari Fi\'il Mudhari\' yang diawali huruf Ta (mukhatab) dengan mendahuluinya menggunakan La Nahyi (لَا) dan harakat huruf terakhirnya dibaca sukun (jazm).',
    rules: [
      'Rumus: لَا + Fi\'il Mudhari\' (huruf awal ت) + Sukun pada huruf akhir.',
      'Contoh Tsulatsi: لَا تَنْصُرْ (jangan menolong), لَا تَكْتُبْ (jangan menulis), لَا تَجْلِسْ (jangan duduk).',
      'Contoh Ruba\'i/Khumasi/Sudasi: لَا تُكْرِمْ (jangan memuliakan), لَا تُقَاتِلْ (jangan memerangi), لَا تَتَكَلَّمْ (jangan bicara), لَا تَسْتَخْرِجْ (jangan mengeluarkan).'
    ],
    examples: [
      { arabic: 'لَا تَكْتُبْ عَلَى الجِدَارِ', translation: 'Janganlah kamu menulis di atas dinding', analysis: 'لَا adalah La Nahyi jazim, تَكْتُبْ adalah Fi\'il Nahyi majzum dengan sukun.' },
      { arabic: 'لَا تَجْتَمِعُوا عَلَى البَاطِلِ', translation: 'Janganlah kalian berkumpul dalam kebatilan', analysis: 'Fi\'il Nahyi jamak.' }
    ],
    estimatedMinutes: 20
  },
  {
    id: 'bab-13',
    jilid: 1,
    babNumber: 13,
    title: 'Fi\'il Ma\'lum & Fi\'il Majhul (Aktif & Pasif)',
    arabicTitle: 'الفعل المعلوم والفعل المجهول',
    category: 'Fiil & Shorof',
    pageReference: 'Hal. 64-65',
    summary: 'Kaidah pembentukan bentuk aktif (Ma\'lum) dan pasif (Majhul) pada Fi\'il Madhi dan Mudhari\'.',
    objectives: [
      'Memahami konsep Fi\'il Ma\'lum (aktif, melakukan) dan Fi\'il Majhul (pasif, dikenai tindakan / bermakna "di-...").',
      'Menerapkan kaidah Majhul Madhi: Dhommah huruf awal & kasrah huruf sebelum akhir.',
      'Menerapkan kaidah Majhul Mudhari\': Dhommah huruf awal & fathah huruf sebelum akhir.',
      'Mengetahui bahwa hanya Fi\'il Muta\'addi yang dapat dibentuk menjadi Majhul.'
    ],
    explanation: 'Fi\'il Ma\'lum tidak bermakna "di-..." dan huruf awalnya tidak dhommah. Fi\'il Majhul bermakna pasif ("di-..."). Catatan penting Qaidaty: Fi\'il Majhul HANYA dibentuk dari Fi\'il Muta\'addi (kata kerja transitif). Fi\'il lazim (intransitif) tidak memiliki majhul kecuali setelah dijadikan muta\'addi.',
    rules: [
      'Fi\'il Madhi Majhul: 1. Harakat huruf awal Dhommah. 2. Harakat huruf sebelum akhir Kasrah. 3. Harf ke-2 & ke-3 yang berharakat harus didhommahkan seperti huruf awal. Contoh: نَصَرَ → نُصِرَ، دَحْرَجَ → دُحْرِجَ، قَاتَلَ → قُوتِلَ، اِسْتَخْرَجَ → أُسْتُخْرِجَ.',
      'Fi\'il Mudhari\' Majhul: 1. Harakat huruf awal pasti Dhommah. 2. Harakat huruf sebelum akhir Fathah. Contoh: يَنْصُرُ → يُنْصَرُ، يُدَحْرِجُ → يُدَحْرَجُ، يُقَاتِلُ → يُقَاتَلُ، يَسْتَخْرِجُ → يُسْتَخْرَجُ.'
    ],
    tables: [
      {
        title: 'Tabel Perbandingan Ma\'lum & Majhul',
        headers: ['Madhi Ma\'lum', 'Mudhari\' Ma\'lum', 'Madhi Majhul (Pasif)', 'Mudhari\' Majhul (Pasif)', 'Arti'],
        rows: [
          { col1: 'نَصَرَ', col2: 'يَنْصُرُ', col3: 'نُصِرَ', col4: 'يُنْصَرُ', col5: 'Menolong → Ditolong' },
          { col1: 'دَحْرَجَ', col2: 'يُدَحْرِجُ', col3: 'دُحْرِجَ', col4: 'يُدَحْرَجُ', col5: 'Menggelindingkan → Digelindingkan' },
          { col1: 'قَاتَلَ', col2: 'يُقَاتِلُ', col3: 'قُوتِلَ', col4: 'يُقَاتَلُ', col5: 'Memerangi → Diperangi' },
          { col1: 'تَكَلَّمَ', col2: 'يَتَكَلَّمُ', col3: 'تُكُلِّمَ', col4: 'يُتَكَلَّمُ', col5: 'Membicarakan → Dibicarakan' },
          { col1: 'اِسْتَخْرَجَ', col2: 'يَسْتَخْرِجُ', col3: 'أُسْتُخْرِجَ', col4: 'يُسْتَخْرَجُ', col5: 'Mengeluarkan → Dikeluarkan' }
        ]
      }
    ],
    examples: [
      { arabic: 'كُتِبَ عَلَيْكُمُ الصِّيَامُ', translation: 'Telah diwajibkan atas kalian berpuasa', analysis: 'كُتِبَ adalah Fi\'il Madhi Majhul wazan فُعِلَ.' },
      { arabic: 'يُنْصَرُ المَظْلُومُ', translation: 'Orang yang terzalimi sedang ditolong', analysis: 'يُنْصَرُ adalah Fi\'il Mudhari\' Majhul wazan يُفْعَلُ.' }
    ],
    estimatedMinutes: 30
  },
  {
    id: 'bab-14',
    jilid: 1,
    babNumber: 14,
    title: 'Fi\'il Lazim & Fi\'il Muta\'addi',
    arabicTitle: 'الفعل اللازم والفعل المتعدي',
    category: 'Fiil & Shorof',
    pageReference: 'Hal. 66-69',
    summary: 'Perbedaan kata kerja intransitif (Lazim) dan transitif (Muta\'addi) serta 2 cara mengubah Lazim menjadi Muta\'addi.',
    objectives: [
      'Membedakan Fi\'il Lazim (tidak butuh objek/makna berhenti pada pelaku) dan Fi\'il Muta\'addi (membutuhkan objek / Maf\'ul Bih).',
      'Mengenal wazan yang pasti bermakna Lazim: فَعُلَ، اِنْفَعَلَ، اِفْتَعَلَ، اِفْعَلَّ، تَفَعَّلَ، تَفَاعَلَ.',
      'Memahami 2 cara mengubah Lazim menjadi Muta\'addi: 1. Diubah ke wazan muta\'addi (أَفْعَلَ / فَعَّلَ), 2. Ditambah Harf Jar setelahnya.'
    ],
    explanation: 'Fi\'il Lazim adalah kata kerja yang maknanya cukup pada pelaku saja (biasanya bermakna sifat/keadaan). Fi\'il Muta\'addi adalah kata kerja yang membutuhkan objek agar maknanya sempurna.',
    rules: [
      'Wazan yang PASTI bermakna Lazim: فَعُلَ (حَسُنَ), اِنْفَعَلَ (اِنْكَسَرَ), اِفْتَعَلَ (اِجْتَمَعَ), اِفْعَلَّ (اِحْمَرَّ), تَفَعَّلَ (تَكَلَّمَ), تَفَاعَلَ (تَقَاتَلَ).',
      'Wazan yang PASTI bermakna Muta\'addi (me-...-kan): أَفْعَلَ (أَكْرَمَ), فَعَّلَ (فَرَّحَ).',
      'Cara 1 Mengubah Lazim ke Muta\'addi: Mengubah wazan ke أَفْعَلَ atau فَعَّلَ (contoh: كَرُمَ [mulia] → أَكْرَمَ / كَرَّمَ [memuliakan]; جَلَسَ [duduk] → أَجْلَسَ [mendudukkan]).',
      'Cara 2 Mengubah Lazim ke Muta\'addi: Menambahkan Harf Jar setelahnya (contoh: رَغِبَ فِي [mencintai], رَغِبَ عَنْ [membenci], ذَهَبَ بِـ [memberangkatkan], تَابَ إِلَى [taubat kepada], تَابَ عَلَى [menerima taubat]).'
    ],
    tables: [
      {
        title: 'Tabel Transformasi Lazim ke Muta\'addi via Wazan',
        headers: ['Fi\'il Lazim', 'Arti Lazim', 'Fi\'il Muta\'addi (أَفْعَلَ / فَعَّلَ)', 'Arti Muta\'addi'],
        rows: [
          { col1: 'كَرُمَ', col2: 'Mulia', col3: 'أَكْرَمَ / كَرَّمَ', col4: 'Memuliakan' },
          { col1: 'حَسُنَ', col2: 'Bagus', col3: 'أَحْسَنَ / حَسَّنَ', col4: 'Membaguskan' },
          { col1: 'جَمُلَ', col2: 'Indah', col3: 'أَجْمَلَ / جَمَّلَ', col4: 'Memperindah' },
          { col1: 'دَخَلَ', col2: 'Masuk', col3: 'أَدْخَلَ', col4: 'Memasukkan' },
          { col1: 'جَلَسَ', col2: 'Duduk', col3: 'أَجْلَسَ', col4: 'Mendudukkan' },
          { col1: 'فَرِحَ', col2: 'Senang', col3: 'أَفْرَحَ / فَرَّحَ', col4: 'Menyenangkan' },
          { col1: 'كَبُرَ', col2: 'Besar', col3: 'أَكْبَرَ / كَبَّرَ', col4: 'Membesarkan' },
          { col1: 'بَعُدَ', col2: 'Jauh', col3: 'أَبْعَدَ', col4: 'Menjauhkan' }
        ]
      },
      {
        title: 'Tabel Transformasi Lazim ke Muta\'addi via Harf Jar',
        headers: ['Fi\'il + Harf Jar', 'Perubahan Makna Menjadi Muta\'addi'],
        rows: [
          { col1: 'رَغِبَ فِي (raghiba fī)', col2: 'Mencintai / Menginginkan' },
          { col1: 'رَغِبَ عَنْ (raghiba \'an)', col2: 'Membenci / Berpaling dari' },
          { col1: 'ذَهَبَ بِـ (dzahaba bi)', col2: 'Memberangkatkan / Membawa pergi' },
          { col1: 'جَاءَ بِـ (jā-a bi)', col2: 'Mendatangkan / Membawa serta' },
          { col1: 'تَابَ إِلَى (tāba ilā)', col2: 'Bertaubat kepada...' },
          { col1: 'تَابَ عَلَى (tāba \'alā)', col2: 'Menerima taubat (mengampuni)' },
          { col1: 'أَذِنَ لِـ (adzina li)', col2: 'Memberikan izin kepada...' }
        ]
      }
    ],
    examples: [
      { arabic: 'أَدْخَلَ اللهُ المُؤْمِنَ الجَنَّةَ', translation: 'Allah memasukkan orang mukmin ke dalam surga', analysis: 'أَدْخَلَ adalah fi\'il muta\'addi dengan 2 objek (المُؤْمِنَ dan الجَنَّةَ).' },
      { arabic: 'رَغِبَ الشَّابُّ فِي العِلْمِ', translation: 'Pemuda itu menyukai ilmu pengetahuan', analysis: 'Fi\'il lazim dimuta\'addikan dengan harf jar فِي.' }
    ],
    estimatedMinutes: 35
  },
  {
    id: 'bab-15',
    jilid: 1,
    babNumber: 15,
    title: 'Pembagian Kalimah Isim: Mudzakkar, Muannats, Ma\'rifah & Nakirah',
    arabicTitle: 'أقسام الاسم : المذكر والمؤنث ، المعرفة والنكرة',
    category: 'Isim',
    pageReference: 'Hal. 70-74',
    summary: 'Peta komprehensif kalimah Isim: Jenis (Mudzakkar vs Muannats) dan Makna (Ma\'rifah tertentu vs Nakirah tidak tentu).',
    objectives: [
      'Membedakan Isim Mudzakkar (laki-laki) dan Muannats (perempuan) beserta tanda-tanda muannats.',
      'Memahami 6 jenis Isim Ma\'rifah: Nama, Ber-Al, Dhamir, Isim Isyarah, Isim Maushul, dan Mudhaf ke Ma\'rifah.',
      'Memahami bahwa selain 6 jenis ma\'rifah adalah Isim Nakirah (umum/tidak tertentu).'
    ],
    explanation: 'Kalimah Isim dapat ditinjau dari 5 sudut: 1. Jenisnya (Mudzakkar & Muannats), 2. Maknanya (Ma\'rifah & Nakirah), 3. Bacaan akhirnya (Mu\'rob & Mabni), 4. Pembentukannya (Jamid & Musytaq), 5. Jumlahnya (Mufrad, Mutsanna, Jama\').',
    rules: [
      'Mudzakkar: Isim yang menunjukkan jenis laki-laki (contoh: مُحَمَّدٌ، طَالِبٌ، أَسَدٌ، مَسْجِدٌ).',
      'Muannats: Isim perempuan, bercirikan: 1. Nama wanita (فَاطِمَة، مَرْيَم), 2. Ta Marbuthah (مَدْرَسَة), 3. Alif Ta\'nits (فُضْلَى، حَمْرَاء), 4. Anggota tubuh berpasangan (يَد، عَيْن، أُذُن، رِجْل), 5. Ditetapkan oleh bangsa Arab (شَمْس، نَار، جَهَنَّم، نَفْس، أَرْض، سَمَاء).',
      '6 Macam Isim Ma\'rifah (makna tertentu):',
      '1. Nama (Alam): مُحَمَّدٌ، عُمَرُ، مَكَّةُ.',
      '2. Ber-Alif Lam (Al-): البَيْتُ، المَسْجِدُ، الرَّجُلُ.',
      '3. Dhamir (Kata Ganti): هُوَ، هِيَ، أَنْتَ، أَنَا، نَحْنُ.',
      '4. Isim Isyarah (Kata Tunjuk): هٰذَا، هٰذِهِ، ذٰلِكَ، تِلْكَ.',
      '5. Isim Maushul (Kata Sambung): الَّذِي، الَّتِي، الَّذِينَ.',
      '6. Digabung (Idhofah) dengan Ma\'rifah: غُلَامُ مُحَمَّدٍ، قُبَّةُ المَسْجِدِ، عَبْدُهُ.',
      'Isim Nakirah: Isim yang maknanya umum/tidak tentu (selain 6 di atas), umumnya bertanwin: رَجُلٌ، بَيْتٌ، مَسْجِدٌ.'
    ],
    examples: [
      { arabic: 'طَلَعَتِ الشَّمْسُ', translation: 'Matahari telah terbit', analysis: 'الشَّمْسُ adalah muannats majazi (bangsa Arab) dan ma\'rifah ber-Al.' },
      { arabic: 'كِتَابُ الطَّالِبِ جَدِيدٌ', translation: 'Buku murid itu baru', analysis: 'كِتَابُ menjadi ma\'rifah karena diidhafahkan ke الطَّالِبِ.' }
    ],
    estimatedMinutes: 35
  },
  {
    id: 'bab-16',
    jilid: 1,
    babNumber: 16,
    title: 'Isim Jamid dan Isim Musytaq',
    arabicTitle: 'الاسم الجامد والاسم المشتق',
    category: 'Isim',
    pageReference: 'Hal. 75-78',
    summary: 'Membedakan Isim Jamid (kata benda asal) dan Isim Musytaq (kata turunan dari Fi\'il) beserta cabangnya.',
    objectives: [
      'Memahami definisi Isim Jamid (tidak dibentuk dari Fi\'il).',
      'Memahami definisi Isim Musytaq (dibentuk dari Fi\'il).',
      'Mengklasifikasikan Isim Musytaq ke dalam Isim Sifat (Washfi) dan Isim Non Sifat (Ghair al-Washfi).'
    ],
    explanation: 'Berdasarkan pembentukannya, Isim terbagi menjadi Jamid (kata dasar yang tidak memiliki akar kata kerja) dan Musytaq (kata turunan dari kata kerja). Isim Musytaq terbagi menjadi kelompok Sifat (Isim Fa\'il, Isim Maf\'ul, Isim Tafdhil, Shighah Mubalaghah, Sifat Musyabbahah) dan Non Sifat (Mashdar, Isim Zaman, Isim Makan, Isim Alat).',
    rules: [
      'Isim Jamid: Kalimah Isim yang tidak dibentuk dari Kalimah Fi\'il (Contoh: قَلْب، عَيْن، أَنْف، رَجُل، بَيْت، حَجَر، مَاء، أَسَد).',
      'Isim Musytaq: Kalimah Isim yang dibentuk dari Kalimah Fi\'il.',
      'Isim Musytaq Sifat (Washfi): Isim Fa\'il (فَاضِل), Isim Maf\'ul (مَفْضُول), Isim Tafdhil (أَفْضَل), Shighah Mubalaghah (مِفْضَال), Sifat Musyabbahah (حَسَن).',
      'Isim Musytaq Non-Sifat (Ghair Washfi): Isim Zaman (مَفْضَل), Isim Makan (مَفْضَل), Isim Alat (مِصْبَاح), Mashdar (فَضْلًا).'
    ],
    examples: [
      { arabic: 'الحَجَرُ جَامِدٌ وَالكَاتِبُ مُشْتَقٌّ', translation: 'Batu adalah isim jamid, sedangkan penulis adalah isim musytaq', analysis: 'حَجَر tidak ada fi\'il dasarnya, كَاتِب turunan dari كَتَبَ.' }
    ],
    estimatedMinutes: 25
  },
  {
    id: 'bab-17',
    jilid: 1,
    babNumber: 17,
    title: 'Mashdar (Mim, Ghair Mim, Taukid, Marrah, Hai\'ah)',
    arabicTitle: 'المصدر (الميمي وغير الميمي ، التوكيد والمرة والهيئة)',
    category: 'Isim',
    pageReference: 'Hal. 79-87',
    summary: 'Kaidah lengkap Mashdar (kata kerja abstrak/pe-...-an/ke-...-an), Mashdar Mim, Ghair Mim (Sima\'i & Qiyasi), serta Mashdar Taukid, Marrah & Hai\'ah.',
    objectives: [
      'Memahami definisi Mashdar sebagai kata benda yang berarti pekerjaan tanpa batasan waktu.',
      'Membedakan Mashdar Mim (awalan mim) dan Mashdar Ghair Mim.',
      'Memahami Mashdar Taukid (penegas), Mashdar Marrah (frekuensi satu kali: فَعْلَة), dan Mashdar Hai\'ah (gaya/cara: فِعْلَة).'
    ],
    explanation: 'Mashdar adalah kalimah Isim yang menunjukkan makna perbuatan tanpa ikatan waktu (berarti: pe-...-an, ke-...-an).',
    rules: [
      'Mashdar Mim Tsulatsi: Berwazan مَفْعَل (مَنْصَرًا، مَفْتَحًا) atau مَفْعِل jika Fa fi\'ilnya Wawu (مَوْعِدًا).',
      'Mashdar Mim Ghair Tsulatsi: Sama persis dengan bentuk Isim Maf\'ul-nya (أَكْرَمَ → مُكْرَمًا).',
      'Mashdar Ghair Mim Tsulatsi: Bersifat Sima\'i (merujuk kamus). Wazan populer: فَعْلًا (نَصْرًا), فِعْلًا (عِلْمًا), فِعَالَة (كِتَابَة), فَعَالَة (كَرَامَة), فُعُولًا (جُلُوسًا), فُعُولَة (سُهُولَة), فَعَلًا (فَرَحًا).',
      'Mashdar Ghair Mim Ruba\'i/Khumasi/Sudasi: Bersifat Qiyasi (أَفْعَلَ → إِفْعَالًا، فَعَّلَ → تَفْعِيلًا، فَاعَلَ → مُفَاعَلَةً/فِعَالًا، اِسْتَفْعَلَ → اِسْتِفْعَالًا).',
      'Mashdar Marrah (menunjukkan 1 kali): Wazan فَعْلَة (ضَرْبَة = satu pukulan, نَصْرَة = satu pertolongan).',
      'Mashdar Hai\'ah (menunjukkan cara/keadaan): Wazan فِعْلَة (جِلْسَة = cara duduk, مِيتَة = cara mati).'
    ],
    examples: [
      { arabic: 'ضَرَبْتُهُ ضَرْبَةً وَاحِدَةً', translation: 'Aku memukulnya dengan satu kali pukulan', analysis: 'ضَرْبَةً adalah Mashdar Marrah wazan فَعْلَة.' },
      { arabic: 'مَاتَ مِيتَةً حَسَنَةً', translation: 'Ia wafat dengan cara kematian yang baik', analysis: 'مِيتَةً adalah Mashdar Hai\'ah wazan فِعْلَة.' }
    ],
    estimatedMinutes: 35
  },
  {
    id: 'bab-18',
    jilid: 1,
    babNumber: 18,
    title: 'Isim Fa\'il dan Isim Maf\'ul',
    arabicTitle: 'اسم الفاعل واسم المفعول',
    category: 'Isim',
    pageReference: 'Hal. 88-93',
    summary: 'Kaidah pembentukan Isim Fa\'il (pelaku/yang me-...) dan Isim Maf\'ul (objek/yang di-...) dari Tsulatsi & Ghair Tsulatsi.',
    objectives: [
      'Membentuk Isim Fa\'il Tsulatsi (فَاعِلٌ seperti نَاصِرٌ, فَعِيلٌ seperti عَلِيمٌ, فَعُولٌ seperti غَفُورٌ).',
      'Membentuk Isim Maf\'ul Tsulatsi (مَفْعُولٌ seperti مَنْصُورٌ، مَكْتُوبٌ).',
      'Membentuk Isim Fa\'il & Maf\'ul Ghair Tsulatsi: Ganti awalan dengan Mim Dhommah (مُـ), kasrah sebelum akhir untuk Fa\'il (مُكْرِمٌ) dan fathah sebelum akhir untuk Maf\'ul (مُكْرَمٌ).'
    ],
    explanation: 'Isim Fa\'il menunjukkan pelaku pekerjaan. Isim Maf\'ul menunjukkan pihak yang dikenai pekerjaan.',
    rules: [
      'Isim Fa\'il Tsulatsi: Wazan فَاعِلٌ (كَاتِبٌ، قَارِئٌ), فَعِيلٌ (عَلِيمٌ، رَحِيمٌ), فَعُولٌ (صَبُورٌ، غَفُورٌ).',
      'Isim Maf\'ul Tsulatsi: Wazan مَفْعُولٌ (مَنْصُورٌ، مَكْتُوبٌ، مَقْرُوءٌ، مَظْلُومٌ).',
      'Ghair Tsulatsi (Ruba\'i, Khumasi, Sudasi): Awalan diubah menjadi Mim Dhommah (مُـ). Huruf sebelum akhir: KASRAH untuk Isim Fa\'il (مُسْلِمٌ، مُجَاهِدٌ، مُسْتَغْفِرٌ), FATHAH untuk Isim Maf\'ul (مُسْلَمٌ، مُجَاهَدٌ، مُسْتَغْفَرٌ).'
    ],
    tables: [
      {
        title: 'Tabel Perbandingan Isim Fa\'il vs Isim Maf\'ul Ghair Tsulatsi',
        headers: ['Fi\'il Madhi', 'Isim Fa\'il (Pelaku)', 'Isim Maf\'ul (Objek)', 'Makna'],
        rows: [
          { col1: 'أَكْرَمَ', col2: 'مُكْرِمٌ', col3: 'مُكْرَمٌ', col4: 'Yang memuliakan / Yang dimuliakan' },
          { col1: 'أَسْلَمَ', col2: 'مُسْلِمٌ', col3: 'مُسْلَمٌ', col4: 'Yang berserah diri' },
          { col1: 'جَاهَدَ', col2: 'مُجَاهِدٌ', col3: 'مُجَاهَدٌ', col4: 'Pejuang / Yang diperjuangkan' },
          { col1: 'اِجْتَمَعَ', col2: 'مُجْتَمِعٌ', col3: 'مُجْتَمَعٌ', col4: 'Yang berkumpul / Tempat berkumpul' },
          { col1: 'اِسْتَغْفَرَ', col2: 'مُسْتَغْفِرٌ', col3: 'مُسْتَغْفَرٌ', col4: 'Pemohon ampun / Yang dimintai ampun' }
        ]
      }
    ],
    examples: [
      { arabic: 'اللهُ غَافِرُ الذَّنْبِ وَقَابِلُ التَّوْبِ', translation: 'Allah adalah Pengampun dosa dan Penerima taubat', analysis: 'غَافِرُ dan قَابِلُ adalah Isim Fa\'il wazan فَاعِلُ.' },
      { arabic: 'الكِتَابُ مَقْرُوءٌ فِي المَسْجِدِ', translation: 'Buku itu dibaca di dalam masjid', analysis: 'مَقْرُوءٌ adalah Isim Maf\'ul wazan مَفْعُولٌ.' }
    ],
    estimatedMinutes: 30
  },
  {
    id: 'bab-19',
    jilid: 1,
    babNumber: 19,
    title: 'Isim Zaman, Isim Makan dan Isim Alat',
    arabicTitle: 'اسم الزمان واسم المكان واسم الآلة',
    category: 'Isim',
    pageReference: 'Hal. 94-96',
    summary: 'Pola pembentukan nama penunjuk waktu (Zaman), tempat (Makan), dan peralatan (Alat).',
    objectives: [
      'Membentuk Isim Zaman & Makan Tsulatsi: Wazan مَفْعَل (مَكْتَب) atau مَفْعِل jika mudhari\' يَفْعِلُ (مَجْلِس، مَسْجِد).',
      'Membentuk Isim Zaman & Makan Ghair Tsulatsi (sama dengan Isim Maf\'ul: مُسْتَشْفَى).',
      'Membentuk Isim Alat: Wazan مِفْعَل (مِبْرَد), مِفْعَال (مِفْتَاح), مِفْعَلَة (مِمْسَحَة), dan فَعَّالَة (غَسَّالَة، ثَلَّاجَة).'
    ],
    explanation: 'Isim Zaman menunjukkan waktu terjadinya perbuatan, Isim Makan menunjukkan tempat terjadinya perbuatan, dan Isim Alat menunjukkan perabot/alat untuk melakukan perbuatan.',
    rules: [
      'Isim Zaman & Makan Tsulatsi: Berwazan مَفْعَلٌ (مَسْكَن، مَدْخَل، مَقْعَد، مَكْتَب). Berwazan مَفْعِلٌ jika mudhari\'-nya berharakat kasrah pada \'ain (مَجْلِس، مَضْرِب، مَدْفِن، مَعْرِض، مَسْجِد).',
      'Isim Zaman & Makan Ghair Tsulatsi: Sama persis dengan Isim Maf\'ul-nya (مُجْتَمَع، مُسْتَقَرّ).',
      'Isim Alat Tsulatsi: Diawali Mim Kasrah (مِـ): 1. مِفْعَلٌ (مِبْرَدٌ، مِقَصٌّ), 2. مِفْعَالٌ (مِفْتَاحٌ، مِصْبَاحٌ), 3. مِفْعَلَةٌ (مِكْنَسَةٌ، مِمْسَحَةٌ، مِسْطَرَةٌ), 4. Wazan modern فَعَّالَةٌ (نَظَّارَةٌ، ثَلَّاجَةٌ، غَسَّالَةٌ، سَخَّانَةٌ).'
    ],
    examples: [
      { arabic: 'صَلَّيْنَا فِي مَسْجِدِ القَرْيَةِ', translation: 'Kami shalat di masjid desa', analysis: 'مَسْجِد adalah Isim Makan wazan مَفْعِل.' },
      { arabic: 'فَتَحْتُ البَابَ بِالمِفْتَاحِ', translation: 'Aku membuka pintu dengan kunci', analysis: 'مِفْتَاح adalah Isim Alat wazan مِفْعَال.' }
    ],
    estimatedMinutes: 25
  },
  {
    id: 'bab-20',
    jilid: 1,
    babNumber: 20,
    title: 'Tabel Lengkap I\'rab Isim Mu\'rab',
    arabicTitle: 'جدول إعراب الأسماء المعربة',
    category: 'Irob & Bina',
    pageReference: 'Hal. 97-122',
    summary: 'Tabel pamungkas I\'rab 8 jenis Isim Mu\'rab pada posisi Rofa\', Nashab, dan Jar (dengan Harakat & Huruf).',
    objectives: [
      'Menguasai tanda I\'rob Isim Mufrad, Jama\' Taksir, Jama\' Muannats Salim, Isim Ghair Munsharif, Mutsanna, Jama\' Mudzakkar Salim, Asmaul Khamsah (Isim Lima), Isim Maqshur, dan Isim Manqush.',
      'Membedakan I\'rob dengan Harakat (Dhommah, Fathah, Kasrah) dan dengan Huruf (Alif, Wawu, Ya).'
    ],
    explanation: 'Isim Mu\'rab adalah kalimah Isim yang bacaan akhirnya dapat berubah-ubah karena pengaruh amil. I\'rab Isim terbagi 3: Rofa\', Nashab, dan Jar.',
    rules: [
      '1. Isim Mufrad: Rofa\' = Dhommah (البَيْتُ / بَيْتٌ), Nashab = Fathah (البَيْتَ / بَيْتًا), Jar = Kasrah (البَيْتِ / بَيْتٍ).',
      '2. Jama\' Taksir: Rofa\' = Dhommah (البُيُوتُ), Nashab = Fathah (البُيُوتَ), Jar = Kasrah (البُيُوتِ).',
      '3. Isim Ghair Munsharif (tanpa tanwin): Rofa\' = Dhommah (أَحْمَدُ), Nashab = Fathah (أَحْمَدَ), Jar = FATHAH (أَحْمَدَ). *Catatan: Jika ber-Al atau di-idhafahkan, Jarnya kembali Kasrah (مِنَ المَسَاجِدِ).*',
      '4. Jama\' Muannats Salim: Rofa\' = Dhommah (المُسْلِمَاتُ), Nashab = KASRAH (المُسْلِمَاتِ), Jar = Kasrah (المُسْلِمَاتِ).',
      '5. Mutsanna (Dua): Rofa\' = ALIF (الرَّجُلَانِ), Nashab = YA (الرَّجُلَيْنِ), Jar = YA (الرَّجُلَيْنِ).',
      '6. Jama\' Mudzakkar Salim: Rofa\' = WAWU (المُسْلِمُونَ), Nashab = YA (المُسْلِمِينَ), Jar = YA (المُسْلِمِينَ).',
      '7. Asmaul Khamsah (Isim Lima: أَبُو، أَخُو، حَمُو، فُو، ذُو): Rofa\' = WAWU (أَبُوكَ), Nashab = ALIF (أَبَاكَ), Jar = YA (أَبِيكَ).',
      '8. Isim Maqshur (akhiran alif lazimah: مُوسَى): I\'rob Muqoddaroh (tersembunyi pada semua posisi).',
      '9. Isim Manqush (akhiran ya lazimah: القَاضِي): Rofa\'/Jar Muqoddaroh, Nashab Zhahirah Fathah (رَأَيْتُ قَاضِيًا).'
    ],
    tables: [
      {
        title: 'Master Tabel I\'rab Isim Mu\'rab (Qaidaty Jilid 1)',
        headers: ['Jenis Isim', 'Tanda Rofa\'', 'Tanda Nashab', 'Tanda Jar / Khofadh', 'Contoh (Rofa / Nashab / Jar)'],
        rows: [
          { col1: 'Isim Mufrad', col2: 'Dhommah (-ُ / -ٌ)', col3: 'Fathah (-َ / -ً)', col4: 'Kasrah (-ِ / -ٍ)', col5: 'البَيْتُ / البَيْتَ / البَيْتِ' },
          { col1: 'Jama\' Taksir', col2: 'Dhommah (-ُ / -ٌ)', col3: 'Fathah (-َ / -ً)', col4: 'Kasrah (-ِ / -ٍ)', col5: 'البُيُوتُ / البُيُوتَ / البُيُوتِ' },
          { col1: 'Isim Ghair Munsharif', col2: 'Dhommah (-ُ)', col3: 'Fathah (-َ)', col4: 'Fathah (-َ)', col5: 'أَحْمَدُ / أَحْمَدَ / مِنْ أَحْمَدَ' },
          { col1: 'Jama\' Muannats Salim', col2: 'Dhommah (-َاتُ)', col3: 'Kasrah (-َاتِ)', col4: 'Kasrah (-َاتِ)', col5: 'المُسْلِمَاتُ / المُسْلِمَاتِ / المُسْلِمَاتِ' },
          { col1: 'Isim Mutsanna', col2: 'Alif (-َانِ)', col3: 'Ya (-َيْنِ)', col4: 'Ya (-َيْنِ)', col5: 'البَيْتَانِ / البَيْتَيْنِ / البَيْتَيْنِ' },
          { col1: 'Jama\' Mudzakkar Salim', col2: 'Wawu (-ُونَ)', col3: 'Ya (-ِينَ)', col4: 'Ya (-ِينَ)', col5: 'المُسْلِمُونَ / المُسْلِمِينَ / المُسْلِمِينَ' },
          { col1: 'Asmaul Khamsah (Isim Lima)', col2: 'Wawu (أَبُوكَ)', col3: 'Alif (أَبَاكَ)', col4: 'Ya (أَبِيكَ)', col5: 'أَبُوكَ / أَبَاكَ / أَبِيكَ' },
          { col1: 'Isim Maqshur', col2: 'Dhommah Muqoddaroh', col3: 'Fathah Muqoddaroh', col4: 'Kasrah Muqoddaroh', col5: 'جَاءَ مُوسَى / رَأَيْتُ مُوسَى / مِنْ مُوسَى' },
          { col1: 'Isim Manqush', col2: 'Dhommah Muqoddaroh', col3: 'Fathah Zhahirah', col4: 'Kasrah Muqoddaroh', col5: 'جَاءَ القَاضِي / رَأَيْتُ قَاضِيًا / مِنَ القَاضِي' }
        ]
      }
    ],
    examples: [
      { arabic: 'قَالَ أَبُو مُحَمَّدٍ لِأَبِيكَ', translation: 'Abu Muhammad telah berkata kepada ayahmu', analysis: 'أَبُو marfu\' dengan Wawu (Fa\'il), أَبِيكَ majrur dengan Ya (didahului Harf Jar لِـ).' },
      { arabic: 'خَلَقَ اللهُ السَّمَاوَاتِ وَالأَرْضَ', translation: 'Allah telah menciptakan langit dan bumi', analysis: 'السَّمَاوَاتِ manshub dengan Kasrah karena Jama\' Muannats Salim.' }
    ],
    estimatedMinutes: 45
  },
  {
    id: 'bab-21',
    jilid: 1,
    babNumber: 21,
    title: 'Isim Mabni & Peta Dhamir Lengkap',
    arabicTitle: 'الاسم المبني وخريطة الضمائر',
    category: 'Irob & Bina',
    pageReference: 'Hal. 123-134',
    summary: 'Mengenal Isim Mabni (4 bina: Dhommah, Fathah, Kasrah, Sukun) dan Peta Lengkap Dhamir (Bariz, Mustatir, Muttashil, Munfashil).',
    objectives: [
      'Memahami definisi Isim Mabni (bacaan akhir tetap tidak berubah oleh amil).',
      'Mengenal 4 jenis Bina: Bina Dhommah (حَيْثُ), Bina Fathah (أَنْتَ), Bina Kasrah (أَنْتِ), Bina Sukun (مَنْ، مَا).',
      'Menguasai Peta Dhamir: Dhamir Muttashil (marfu\', manshub, majrur) dan Dhamir Munfashil (marfu\', manshub).'
    ],
    explanation: 'Isim Mabni adalah kata yang harakat huruf akhirnya tetap dan tidak mengalami perubahan i\'rob. Pembagian Isim Mabni mencakup: Isim Dhamir, Isim Isyarah, Isim Maushul, Isim Istifham, Isim Syarat, dan Isim Fi\'il.',
    rules: [
      'Bina Dhommah: حَيْثُ، مُنْذُ، ضَرَبْتُ.',
      'Bina Fathah: أَنْتَ، كَـ، ضَرَبْتَ.',
      'Bina Kasrah: أَنْتِ، كِـ، ضَرَبْتِ.',
      'Bina Sukun: مَنْ، مَا، إِذَا.',
      'Dhamir Muttashil Fi Mahalli Rof\'in (menyatu dengan fi\'il jadi fa\'il): تـُ (aku), نَا (kami), تَ (kamu lk), تُمَا (kalian berdua), تُمْ (kalian jamak lk), تِ (kamu pr), تُنَّ (kalian jamak pr), ا (alif itsnain), و (wawu jama\'ah), نَ (nun niswah).',
      'Dhamir Muttashil Fi Mahalli Nashbin (menyatu dgn fi\'il jadi objek / harf nashab): ـهُ، ـهُمَا، ـهُمْ، ـهَا، ـكَ، ـكُمَا، ـكُمْ، ـكِ، ـكُنَّ، ـنِي، ـنَا.',
      'Dhamir Muttashil Fi Mahalli Jarrin (menyatu dgn Isim jadi mudhaf ilaih / Harf jar): كِتَابُهُ، كِتَابُكَ، لَهُ، فِيهِ.',
      'Dhamir Munfashil Fi Mahalli Rof\'in (terpisah, biasanya jadi mubtada\'): هُوَ، هُمَا، هُمْ، هِيَ، هُمَا، هُنَّ، أَنْتَ، أَنْتُمَا، أَنْتُمْ، أَنْتِ، أَنْتُمَا، أَنْتُنَّ، أَنَا، نَحْنُ.',
      'Dhamir Munfashil Fi Mahalli Nashbin (terpisah, jadi objek maf\'ul bih): إِيَّاهُ، إِيَّاهُمَا، إِيَّاهُمْ ... إِيَّاكَ (Hanya kepada-Mu).'
    ],
    examples: [
      { arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ', translation: 'Hanya kepada-Mu kami menyembah dan hanya kepada-Mu kami memohon pertolongan', analysis: 'إِيَّاكَ adalah Dhamir Munfashil fi mahalli nashbin maf\'ul bih muqaddam.' },
      { arabic: 'كَتَبْتُ الدَّرْسَ بِيَدِي', translation: 'Aku telah menulis pelajaran dengan tanganku', analysis: 'Dhamir تُ (fa\'il) dan dhamir ي (mudhaf ilaih).' }
    ],
    estimatedMinutes: 40
  },
  {
    id: 'bab-22',
    jilid: 1,
    babNumber: 22,
    title: 'Isim Isyarah & Isim Maushul (Kata Tunjuk & Sambung)',
    arabicTitle: 'اسم الإشارة واسم الموصول',
    category: 'Isim',
    pageReference: 'Hal. 135-141',
    summary: 'Kaidah lengkap Isim Isyarah (dekat/jauh/tempat, Musyar Ilaih) dan Isim Maushul (Shilah & \'Aa-id).',
    objectives: [
      'Menguasai Isim Isyarah dekat (هٰذَا، هٰذَانِ، هٰؤُلَاءِ، هٰذِهِ، هَاتَانِ) dan jauh (ذٰلِكَ، ذَانِكَ، أُولٰئِكَ، تِلْكَ، تَانِكَ) serta tempat (هُنَا، هُنَاكَ، هُنَالِكَ).',
      'Menguasai Isim Maushul Nash (الَّذِي، اللَّذَانِ، الَّذِينَ، الَّتِي، اللَّتَانِ، اللَّاتِي/اللَّائِي) dan Musytarak (مَنْ، مَا، أَيُّ).',
      'Memahami rukun Shilah dan dhamir \'Aa-id yang kembali ke isim maushul.'
    ],
    explanation: 'Isim Isyarah adalah kata tunjuk. Kalimah setelahnya disebut Musyar Ilaih. Isim Maushul adalah kata sambung yang menghubungkan kalimat; kalimat setelahnya disebut Shilah yang wajib mengandung dhamir \'Aa-id.',
    rules: [
      'Isim Isyarah Dekat: هٰذَا (1 lk), هٰذَانِ (2 lk), هٰؤُلَاءِ (jamak), هٰذِهِ (1 pr), هَاتَانِ (2 pr).',
      'Isim Isyarah Jauh: ذٰلِكَ (1 lk), ذَانِكَ (2 lk), أُولٰئِكَ (jamak), تِلْكَ (1 pr), تَانِكَ (2 pr).',
      'Isim Isyarah Tempat: هُنَا / هٰهُنَا (di sini), هُنَاكَ / هُنَالِكَ (di sana).',
      'Isim Maushul Khusus (Nash): الَّذِي (1 lk), اللَّذَانِ (2 lk), الَّذِينَ (jamak lk), الَّتِي (1 pr), اللَّتَانِ (2 pr), اللَّاتِي / اللَّائِي (jamak pr).',
      'Isim Maushul Musytarak: مَنْ (siapa yang / berakal), مَا (apa yang / tidak berakal), أَيُّ (mana saja).',
      'Shilah: Kalimat (jumlah fi\'liyyah/ismiyyah/syibhul jumlah) penjelas setelah isim maushul.',
      '\'Aa-id: Dhamir yang kembali merujuk kepada isim maushul.'
    ],
    examples: [
      { arabic: 'اللهُ الَّذِي خَلَقَ السَّمَاوَاتِ وَالأَرْضَ', translation: 'Allah yang telah menciptakan langit dan bumi', analysis: 'الَّذِي adalah Isim Maushul, خَلَقَ السَّمَاوَاتِ adalah Shilah, dhamir mustatir pada خَلَقَ adalah \'Aa-id.' },
      { arabic: 'هٰذَا كِتَابٌ مُفِيدٌ', translation: 'Ini adalah buku yang berfaedah', analysis: 'هٰذَا adalah Isim Isyarah mabni fi mahalli rof\'in mubtada\'.' }
    ],
    estimatedMinutes: 30
  },
  {
    id: 'bab-23',
    jilid: 1,
    babNumber: 23,
    title: 'Isim Istifham & Isim Fi\'il',
    arabicTitle: 'اسم الاستفهام واسم الفعل',
    category: 'Isim',
    pageReference: 'Hal. 142-148',
    summary: 'Mengenal kata tanya (Isim Istifham) dan Isim yang bermakna Fi\'il (Isim Fi\'il Murtajal & Manqul).',
    objectives: [
      'Menguasai Isim Istifham: مَا/مَاذَا (apa), مَنْ/مَنْ ذَا (siapa), أَيْنَ (di mana), مَتَى (kapan), كَيْفَ (bagaimana), كَمْ (berapa).',
      'Mengetahui bahwa kalimah isim setelah Istifham dibaca Rofa\', KECUALI setelah كَمْ (Kam) yang dibaca Nashab.',
      'Memahami Isim Fi\'il (mabni, beramal seperti fi\'il) jenis Madhi (هَيْهَاتَ، شَتَّانَ), Mudhari\' (أُفٍّ، وَيْ، آهِ), dan Amar (صَهْ، مَهْ، آمِينَ، حَيَّ، هَيَّا، هَلُمَّ، عَلَيْكَ، إِلَيْكَ، رُوَيْدَكَ، وَرَاءَكَ).'
    ],
    explanation: 'Isim Istifham digunakan untuk bertanya. Kaidah khusus: Isim setelah كَمْ harus Nashab (tamyiz). Isim Fi\'il adalah isim yang memiliki makna dan fungsi seperti fi\'il (merofakan fa\'il dan menashabkan maf\'ul bih) namun berhukum mabni.',
    rules: [
      'Isim Istifham: مَا / مَاذَا (apa), مَنْ / مَنْ ذَا (siapa), أَيْنَ (di mana), مَتَى (kapan), كَيْفَ (bagaimana), كَمْ (berapa).',
      'Kaidah Istifham: Kata setelah istifham dibaca Rofa\' (مَنْ مُحَمَّدٌ؟)، KECUALI setelah كَمْ dibaca Nashab (كَمْ رَجُلًا فِي الدَّارِ؟).',
      'Isim Fi\'il Madhi: هَيْهَاتَ (jauh sekali / بَعُدَ), شَتَّانَ (berbeda jauh / اِفْتَرَقَ), سُرْعَانَ (cepat sekali / سَرُعَ).',
      'Isim Fi\'il Mudhari\': أُفٍّ (aku berkeluh kesah / أَتَضَجَّرُ), قَطْ (cukup bagiku / يَكْفِي), آهِ (aku merasa sakit / أَتَوَجَّعُ), وَيْ (aku kagum / أَتَعَجَّبُ).',
      'Isim Fi\'il Amar: صَهْ (diamlah / اُسْكُتْ), مَهْ (hentikanlah / اُكْفُفْ), آمِينَ (kabulkanlah / اِسْتَجِبْ), حَيَّ (kemarilah / أَقْبِلْ), هَيَّا (ayo bergegas / أَسْرِعْ), هَلُمَّ إِلَى (kemarilah / تَعَالَ), عَلَيْكَ (tetapilah / اِلْزَمْ), إِلَيْكَ كَذَا (ambillah / خُذْ), رُوَيْدَكَ (perlahanlah / تَمَهَّلْ).'
    ],
    tables: [
      {
        title: 'Daftar Isim Fi\'il Populer Beserta Maknanya',
        headers: ['Isim Fi\'il', 'Jenis Waktu', 'Makna Fi\'il Padanan', 'Contoh Penggunaan'],
        rows: [
          { col1: 'هَيْهَاتَ', col2: 'Madhi', col3: 'بَعُدَ (Sangat jauh)', col4: 'هَيْهَاتَ هَيْهَاتَ لِمَا تُوعَدُونَ' },
          { col1: 'شَتَّانَ', col2: 'Madhi', col3: 'اِفْتَرَقَ (Sangat berbeda)', col4: 'شَتَّانَ مَا بَيْنَ العِلْمِ وَالجَهْلِ' },
          { col1: 'أُفٍّ', col2: 'Mudhari\'', col3: 'أَتَضَجَّرُ (Aku berkeluh kesah)', col4: 'أُفٍّ لَكُمْ وَلِمَا تَعْبُدُونَ' },
          { col1: 'صَهْ', col2: 'Amar', col3: 'اُسْكُتْ (Diamlah!)', col4: 'صَهْ عَمَّا يَشِينُكَ مِنَ الكَلَامِ' },
          { col1: 'حَيَّ', col2: 'Amar', col3: 'أَقْبِلْ (Marilah!)', col4: 'حَيَّ عَلَى الصَّلَاةِ ، حَيَّ عَلَى الفَلَاحِ' },
          { col1: 'عَلَيْكَ', col2: 'Amar (Manqul)', col3: 'اِلْزَمْ (Wajibkan/tetapilah)', col4: 'عَلَيْكَ بِالرِّفْقِ فِي مُعَامَلَةِ الحَيَوَانِ' }
        ]
      }
    ],
    examples: [
      { arabic: 'حَيَّ عَلَى الصَّلَاةِ', translation: 'Marilah mendirikan shalat', analysis: 'حَيَّ adalah Isim Fi\'il Amar yang bermakna أَقْبِلْ (kemarilah).' },
      { arabic: 'كَمْ كِتَابًا قَرَأْتَ؟', translation: 'Berapa buku yang telah engkau baca?', analysis: 'كِتَابًا dibaca nashab karena terletak setelah isim istifham كَمْ.' }
    ],
    estimatedMinutes: 30
  }
];

export const QAIDATY_KNOWLEDGE_CHUNKS = QAIDATY_LESSONS.map((lesson) => ({
  id: `chunk-${lesson.id}`,
  lessonId: lesson.id,
  babNumber: lesson.babNumber,
  title: lesson.title,
  arabicTitle: lesson.arabicTitle,
  pageReference: lesson.pageReference,
  content: `Bab ${lesson.babNumber}: ${lesson.title} (${lesson.arabicTitle}) - Sumber: Qaidaty Jilid 1 ${lesson.pageReference}
Kaidah Inti:
${lesson.rules.join('\n')}
${lesson.baharRojaz ? `Bahar Rojaz: ${lesson.baharRojaz.poem.join(' / ')}` : ''}
Ringkasan: ${lesson.explanation}
Contoh:
${lesson.examples.map(e => `- ${e.arabic} (${e.translation}) [Analisis: ${e.analysis}]`).join('\n')}`
}));
