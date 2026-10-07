import { QuizQuestion } from '../types';

export const QAIDATY_QUIZZES: QuizQuestion[] = [
  {
    id: 'q-01',
    lessonId: 'bab-03',
    type: 'word_classification',
    question: 'Tentukan jenis kalimah untuk lafazh berikut:',
    arabicPrompt: 'مِنْ',
    options: ['Isim (Kata Benda)', 'Fi\'il (Kata Kerja)', 'Harf (Kata Depan / Perangkai)'],
    correctAnswer: 'Harf (Kata Depan / Perangkai)',
    explanation: 'مِنْ (Min) adalah Kalimah Harf (Harf Jar). Maknanya tidak mandiri dan baru dapat dipahami secara sempurna saat digabungkan dengan Isim atau Fi\'il.',
    qaidatyCitation: 'Qaidaty Jilid 1 Bab 03, Hal. 5 & 14'
  },
  {
    id: 'q-02',
    lessonId: 'bab-07',
    type: 'wazan_matching',
    question: 'Tentukan Wazan (timbangan baku) untuk kata kerja lampau berikut:',
    arabicPrompt: 'كَتَبَ',
    options: ['فَعَلَ', 'فَعِلَ', 'فَعُلَ', 'أَفْعَلَ'],
    correctAnswer: 'فَعَلَ',
    explanation: 'Kata كَتَبَ (kataba) memiliki 3 huruf berharakat fathah semua, sehingga wazannya adalah فَعَلَ (fa\'ala).',
    qaidatyCitation: 'Qaidaty Jilid 1 Bab 07 & 09, Hal. 28, 33'
  },
  {
    id: 'q-03',
    lessonId: 'bab-05',
    type: 'multiple_choice',
    question: 'Menurut syair Bahar Rojaz dalam kitab Qaidaty, berapakah jumlah tanda kalimah Isim?',
    arabicPrompt: 'تَانْدَا إِسِمْ دَالَمْ بَحَر رَجَز',
    options: ['3 tanda', '5 tanda', '8 tanda', '10 tanda'],
    correctAnswer: '8 tanda',
    explanation: 'Bait Bahar Rojaz berbunyi: "Tanda Isim jumlahnya ada delapan / Ma-mi-mu al- tanwin dan nida di depan / Haraf nashab haraf jar serta idhofah / Tanda yang terakhir itu ta marbuthah".',
    qaidatyCitation: 'Qaidaty Jilid 1 Bab 05, Hal. 19'
  },
  {
    id: 'q-04',
    lessonId: 'bab-04',
    type: 'multiple_choice',
    question: 'Apakah objek fokus yang dipelajari dalam ilmu Shorof menurut Qaidaty?',
    arabicPrompt: 'عِلْمُ الصَّرْفِ',
    options: [
      'Membaca akhir kalimah saat kalimat digabungkan',
      'Membaca bangunan kalimah (huruf awal sampai sebelum akhir) untuk memahami makna kata',
      'Menentukan jumlah rakaat shalat',
      'Menghafal riwayat hadits'
    ],
    correctAnswer: 'Membaca bangunan kalimah (huruf awal sampai sebelum akhir) untuk memahami makna kata',
    explanation: 'Shorof membahas perubahan bentuk/bangunan kata dari huruf pertama hingga sebelum huruf terakhir untuk memahami makna mufrod / kosakata.',
    qaidatyCitation: 'Qaidaty Jilid 1 Bab 04, Hal. 8-10'
  },
  {
    id: 'q-05',
    lessonId: 'bab-06',
    type: 'multiple_choice',
    question: 'Manakah di antara berikut yang BUKAN merupakan tanda kalimah Fi\'il Madhi?',
    arabicPrompt: 'عَلَامَاتُ الفِعْلِ المَاضِي',
    options: [
      'Ta Fa\'il (تَ، تُمَا، تُمْ، تِ، تُ)',
      'Ta Ta\'nits Sukun (تْ)',
      'Awalan huruf Mudhara\'ah (أَنَيْتَ)',
      'Didahului kata لَقَدْ / قَدْ'
    ],
    correctAnswer: 'Awalan huruf Mudhara\'ah (أَنَيْتَ)',
    explanation: 'Awalan huruf mudhara\'ah (أَنَيْتَ) adalah tanda khas Fi\'il Mudhari\', bukan Fi\'il Madhi.',
    qaidatyCitation: 'Qaidaty Jilid 1 Bab 06, Hal. 21-22'
  },
  {
    id: 'q-06',
    lessonId: 'bab-10',
    type: 'multiple_choice',
    question: 'Bagaimanakah harakat huruf mudhara\'ah pada Fi\'il Ruba\'i (4 huruf) seperti أَكْرَمَ atau عَلَّمَ?',
    arabicPrompt: 'حَرَكَةُ حَرْفِ المُضَارَعَةِ فِي الرُّبَاعِيِّ',
    options: ['Fathah (يَـ)', 'Dhommah (يُـ)', 'Kasrah (يِـ)', 'Sukun'],
    correctAnswer: 'Dhommah (يُـ)',
    explanation: 'Kaidah Qaidaty: Pada fi\'il 4 huruf (Ruba\'i), huruf mudhara\'ah WAJIB berharakat Dhommah (يُكْرِمُ، يُعَلِّمُ، يُقَاتِلُ، يُدَحْرِجُ).',
    qaidatyCitation: 'Qaidaty Jilid 1 Bab 10, Hal. 56'
  },
  {
    id: 'q-07',
    lessonId: 'bab-13',
    type: 'multiple_choice',
    question: 'Bagaimana rumus mengubah Fi\'il Madhi Ma\'lum (aktif) menjadi Fi\'il Madhi Majhul (pasif / bermakna "di-...")?',
    arabicPrompt: 'صِيغَةُ المَاضِي المَجْهُولِ',
    options: [
      'Dhommah huruf awal dan kasrah huruf sebelum akhir (نُصِرَ)',
      'Fathah huruf awal dan dhommah huruf akhir',
      'Kasrah huruf awal dan sukun huruf akhir',
      'Tambah huruf sin di depan'
    ],
    correctAnswer: 'Dhommah huruf awal dan kasrah huruf sebelum akhir (نُصِرَ)',
    explanation: 'Kaidah Fi\'il Madhi Majhul: Harakat huruf pertama Dhommah dan huruf sebelum akhir Kasrah (contoh: نَصَرَ → نُصِرَ, كَتَبَ → كُتِبَ).',
    qaidatyCitation: 'Qaidaty Jilid 1 Bab 13, Hal. 64-65'
  },
  {
    id: 'q-08',
    lessonId: 'bab-18',
    type: 'wazan_matching',
    question: 'Apakah bentuk Isim Maf\'ul (objek yang dikenai perbuatan) dari kata kerja نَصَرَ (telah menolong)?',
    arabicPrompt: 'اِسْمُ المَفْعُولِ مِنْ "نَصَرَ"',
    options: ['نَاصِرٌ', 'مَنْصُورٌ', 'مَنْصَرٌ', 'مِنْصَارٌ'],
    correctAnswer: 'مَنْصُورٌ',
    explanation: 'Isim Maf\'ul dari fi\'il tsulatsi berwazan مَفْعُولٌ, sehingga نَصَرَ menjadi مَنْصُورٌ (yang ditolong).',
    qaidatyCitation: 'Qaidaty Jilid 1 Bab 18, Hal. 92'
  },
  {
    id: 'q-09',
    lessonId: 'bab-20',
    type: 'irob_selection',
    question: 'Apakah tanda I\'rob Rofa\' untuk Isim Mutsanna (menunjukkan 2 orang/benda) seperti البَيْتَانِ?',
    arabicPrompt: 'إِعْرَابُ المُثَنَّى فِي حَالَةِ الرَّفْعِ',
    options: ['Dhommah', 'Alif (ـَانِ)', 'Wawu (ـُونَ)', 'Kasrah'],
    correctAnswer: 'Alif (ـَانِ)',
    explanation: 'Isim Mutsanna ketika Rofa\' ditandai dengan ALIF (-aani, contoh: البَيْتَانِ), sedangkan ketika Nashab dan Jar ditandai dengan YA (-aini, contoh: البَيْتَيْنِ).',
    qaidatyCitation: 'Qaidaty Jilid 1 Bab 20, Hal. 99, 102'
  },
  {
    id: 'q-10',
    lessonId: 'bab-23',
    type: 'multiple_choice',
    question: 'Lafazh "هَيْهَاتَ" (Haihāta) termasuk dalam kelompok kalimah apa dan apa maknanya?',
    arabicPrompt: 'هَيْهَاتَ',
    options: [
      'Isim Fi\'il Madhi bermakna بَعُدَ (Sangat jauh)',
      'Fi\'il Amar bermakna اُكْتُبْ (Tulislah)',
      'Harf Jar bermakna فِي (Di dalam)',
      'Isim Isyarah bermakna ذٰلِكَ (Itu)'
    ],
    correctAnswer: 'Isim Fi\'il Madhi bermakna بَعُدَ (Sangat jauh)',
    explanation: 'هَيْهَاتَ adalah Isim Fi\'il Madhi berhukum mabni fathah yang bermakna بَعُدَ (sangat jauh / mustahil), sebagaimana dalam ayat: هَيْهَاتَ هَيْهَاتَ لِمَا تُوعَدُونَ.',
    qaidatyCitation: 'Qaidaty Jilid 1 Bab 23, Hal. 144, 146'
  }
];
