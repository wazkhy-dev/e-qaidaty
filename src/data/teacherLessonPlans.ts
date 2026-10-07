import { TeacherLessonPlan } from '../types';

export const TEACHER_LESSON_PLANS: TeacherLessonPlan[] = [
  {
    lessonId: 'bab-01',
    title: 'Kalimah dan Jumlah',
    jilid: 1,
    babNumber: 1,
    estimatedDuration: '45 Menit',
    tujuanPembelajaran: [
      'Santri mampu membedakan konsep kata tunggal (Kalimah) dan kalimat utuh (Jumlah).',
      'Santri mampu membaca contoh kalimat dasar Arab gundul dengan intonasi tepat.'
    ],
    poinPenting: [
      'Rumus inti: الكلمة + الكلمة = الجملة',
      'Kalimah tunggal belum memberikan pemahaman tuntas sebelum terangkai dalam Jumlah mufidah.'
    ],
    materiInti: [
      'Definisi Kalimah: Lafazh mufrad bermakna.',
      'Definisi Jumlah: Rangkaian 2 kata atau lebih yang menghasilkan faedah sempurna.',
      'Struktur Jumlah Ismiyyah (Mubtada\' + Khabar) dan Fi\'liyyah (Fi\'il + Fa\'il).'
    ],
    contohArab: [
      { arabic: 'قَامَ مُحَمَّدٌ فِي الفَصْلِ', makna: 'Muhammad telah berdiri di dalam kelas' },
      { arabic: 'مُحَمَّدٌ قَائِمٌ فِي الفَصْلِ', makna: 'Muhammad berdiri di dalam kelas' },
      { arabic: 'جَاهَدَ عُمَرُ فِي سَبِيلِ اللهِ', makna: 'Umar berjihad di jalan Allah' }
    ],
    pertanyaanPemantik: [
      'Jika Ustadz menulis kata "مُحَمَّدٌ" saja di papan tulis, apakah sudah bisa dipahami apa yang dilakukannya?',
      'Kapan susunan kata disebut kalimat sempurna dalam bahasa Arab?'
    ],
    aktivitasKelas: [
      '10 Menit: Ulasan rumus Kalimah + Kalimah = Jumlah.',
      '15 Menit: Latihan santri menyusun kartu kosakata menjadi 3 jumlah mufidah.',
      '15 Menit: Bedah bersama di papan tulis.',
      '5 Menit: Tanya jawab dan kesimpulan.'
    ],
    latihan: [
      'Sebutkan 3 kata tunggal dari kalimat: قَرَأَ مُحَمَّدٌ القُرْآنَ الكَرِيمَ فِي الغُرْفَةِ.',
      'Susun kata: [فِي / الفَصْلِ / قَامَ / زَيْدٌ] menjadi kalimat fi\'liyyah yang benar.'
    ],
    kesalahanUmum: [
      'Santri menganggap frasa tidak lengkap (seperti "فِي المَسْجِدِ" saja) sebagai Jumlah sempurna.',
      'Ragu membedakan apakah kata depan (Harf) termasuk bagian dari kalimah.'
    ],
    evaluasi: [
      'Tanya lisan acak kepada 4 santri.',
      'Pemberian kuis singkat 3 soal di aplikasi Qaidaty.'
    ]
  },
  {
    lessonId: 'bab-05',
    title: 'Tanda-Tanda Kalimah Isim & Bahar Rojaz',
    jilid: 1,
    babNumber: 5,
    estimatedDuration: '45 Menit',
    tujuanPembelajaran: [
      'Santri hafal luar kepala 8 tanda kalimah Isim dengan senandung Bahar Rojaz.',
      'Santri dapat mengenali Isim dalam potongan ayat Al-Qur\'an gundul.'
    ],
    poinPenting: [
      'Isim dominan dikenali dari tandanya (bukan bentuk shighoh semata).',
      'Irama Bahar Rojaz mempercepat retensi hafalan kaidah.'
    ],
    materiInti: [
      '8 Tanda Isim: 1. Ma-mi-mu, 2. Al-, 3. Tanwin, 4. Nida, 5. Harf Nashab, 6. Harf Jar, 7. Idhofah, 8. Ta Marbuthah.',
      'Lantunan Bahar Rojaz: "Tanda Isim jumlahnya ada delapan / Ma-mi-mu al- tanwin dan nida di depan..."'
    ],
    contohArab: [
      { arabic: 'مَسْجِدٌ ، مِفْتَاحٌ ، مُؤْمِنٌ', makna: 'Contoh awalan Ma/Mi/Mu' },
      { arabic: 'البَيْتُ ، الرَّجُلُ', makna: 'Contoh Alif Lam' },
      { arabic: 'يَا مُحَمَّدُ ، يَا رَحْمٰنُ', makna: 'Contoh Harf Nida' },
      { arabic: 'عَبْدُ اللهِ ، بَابُ العِلْمِ', makna: 'Contoh Idhofah' }
    ],
    pertanyaanPemantik: [
      'Bagaimana cara cepat kita tahu bahwa kata "مَسْجِد" bukan kata kerja?',
      'Bisakah kata yang ber-Alif Lam menerima Tanwin sekaligus?'
    ],
    aktivitasKelas: [
      '10 Menit: Bersama-sama melantunkan Bahar Rojaz 5 kali.',
      '20 Menit: Bedah Surah Al-Fatihah, santri melingkari semua Isim dan menyebutkan tandanya.',
      '15 Menit: Latihan interaktif di modul Qaidaty.'
    ],
    latihan: [
      'Tentukan tanda Isim pada kata: 1. مَدْرَسَةٌ, 2. فِي المَسْجِدِ, 3. إِنَّ اللهَ, 4. كِتَابُ الجِهَادِ.'
    ],
    kesalahanUmum: [
      'Menggabungkan Al- dan Tanwin dalam satu kata (misal *البَيْتٌ* - ini salah fatal).',
      'Lupa bahwa nama orang tanpa Al/tanwin (seperti عُمَرُ atau فَاطِمَةُ) tetaplah Isim.'
    ],
    evaluasi: [
      'Uji hafalan Bahar Rojaz per kelompok santri.',
      'Kuis klasifikasi tanda Isim.'
    ]
  },
  {
    lessonId: 'bab-07',
    title: 'Wazan, Mauzun & Kaidah Tashrif',
    jilid: 1,
    babNumber: 7,
    estimatedDuration: '45 Menit',
    tujuanPembelajaran: [
      'Santri memahami konsep cetakan baku (Wazan) dan kata yang dicetak (Mauzun).',
      'Santri mampu membedakan huruf asli (Fa, \'Ain, Lam) dan 10 huruf tambahan (سألتمونيها).'
    ],
    poinPenting: [
      'Huruf asli diwakili ف-ع-ل.',
      'Huruf zaidah ditulis persis apa adanya dalam wazan.'
    ],
    materiInti: [
      'Konsep timbangan kata bahasa Arab.',
      'Tashrif Ishtilahi (perubahan makna antar shighoh) vs Tashrif Lughawi (perubahan dhomir).',
      '10 Huruf Zaidah: س - أ - ل - ت - م - و - ن - ي - هـ - ا.'
    ],
    contohArab: [
      { arabic: 'فَعَلَ ← كَتَبَ', makna: 'Wazan fa\'ala mencetak kataba' },
      { arabic: 'مَفْعُولٌ ← مَكْتُوبٌ', makna: 'Wazan maf\'ulun mencetak maktubun' },
      { arabic: 'مِفْعَالٌ ← مِفْتَاحٌ', makna: 'Wazan mif\'aalun mencetak miftaahun' }
    ],
    pertanyaanPemantik: [
      'Mengapa kata kâtib, maktûb, dan maktab memiliki akar kata yang sama?',
      'Huruf apa yang menjadi patokan asli setiap wazan?'
    ],
    aktivitasKelas: [
      '15 Menit: Demonstrasi timbangan wazan menggunakan analogi cetakan kue.',
      '15 Menit: Latihan santri mencocokkan kartu wazan dengan kartu mauzun.',
      '15 Menit: Praktik Bedah Kalimah di aplikasi Qaidaty.'
    ],
    latihan: [
      'Tentukan wazan dari: 1. عَلِمَ, 2. أَكْرَمَ, 3. اِسْتَخْرَجَ, 4. مَنْصُورٌ.'
    ],
    kesalahanUmum: [
      'Salah menempatkan harakat \'Ain fi\'il pada mauzun.',
      'Mengira huruf zaidah seperti Sin atau Mim adalah huruf akar kata asli.'
    ],
    evaluasi: [
      'Kuis Wazan Matching di aplikasi Qaidaty.',
      'Pengecekan portofolio Bedah Kalimah santri.'
    ]
  },
  {
    lessonId: 'bab-20',
    title: 'Tabel Lengkap I\'rab Isim Mu\'rab',
    jilid: 1,
    babNumber: 20,
    estimatedDuration: '45 Menit',
    tujuanPembelajaran: [
      'Santri menguasai tanda Rofa\', Nashab, dan Jar untuk 8 kelompok Isim Mu\'rab.',
      'Santri mampu menerapkan harakat akhir yang tepat pada teks Arab gundul.'
    ],
    poinPenting: [
      'I\'rab adalah perubahan akhir kata karena faktor amil.',
      'Ada I\'rab dengan harakat asli dan ada I\'rab dengan huruf pengganti (niyabah).'
    ],
    materiInti: [
      'Master Tabel I\'rab Qaidaty (Mufrad, Mutsanna, Jama\' Mudzakkar, Jama\' Muannats, Jama\' Taksir, Asmaul Khamsah, Ghair Munsharif, Maqshur/Manqush).',
      'Pengecualian: Ghair Munsharif Jar dengan Fathah, Jama\' Muannats Nashab dengan Kasrah.'
    ],
    contohArab: [
      { arabic: 'جَاءَ الرَّجُلَانِ ، رَأَيْتُ الرَّجُلَيْنِ', makna: 'Contoh Mutsanna Rofa (Alif) & Nashab (Ya)' },
      { arabic: 'صَلَّى المُسْلِمُونَ ، سَلَّمْتُ عَلَى المُسْلِمِينَ', makna: 'Contoh Jama Mudzakkar Rofa (Wawu) & Jar (Ya)' },
      { arabic: 'خَلَقَ اللهُ السَّمَاوَاتِ', makna: 'Jama Muannats Salim manshub dengan kasrah' }
    ],
    pertanyaanPemantik: [
      'Mengapa kita membaca "المُسْلِمُونَ" di satu tempat dan "المُسْلِمِينَ" di tempat lain?',
      'Apa tanda khusus Isim Ghair Munsharif saat berposisi Jar?'
    ],
    aktivitasKelas: [
      '15 Menit: Mengkaji bagan pohon I\'rab Isim di layar proyektor.',
      '15 Menit: Latihan memberi harakat akhir pada 5 kalimat gundul.',
      '15 Menit: Drill tanya-jawab cepat seputar tanda I\'rab.'
    ],
    latihan: [
      'Tentukan tanda I\'rab dan kedudukan kata bergaris bawah pada: قَالَ أَبُوكَ لِأَخِيكَ.'
    ],
    kesalahanUmum: [
      'Memberikan harakat kasrah pada Isim Ghair Munsharif yang tidak ber-Al.',
      'Tertukar antara akhiran Mutsanna (-aini) dan Jama\' Mudzakkar Salim (-iina).'
    ],
    evaluasi: [
      'Kuis I\'rob Selection level mahir.',
      'Evaluasi tugas mandiri membaca 1 paragraf Arab gundul.'
    ]
  }
];
