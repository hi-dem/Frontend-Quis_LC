const mockQuizzes = [
  {
    id: 1,
    title: 'Penerapan AI dalam Dunia Nyata',
    description: 'Pelajari bagaimana AI mengubah cara kita bekerja, belajar, dan hidup setiap hari.',
    durationPerQuestion: 30, 
    totalQuestions: 3, 
    questions: [
      {
        id: 1,
        question: 'Berapa hasil dari 15 × 8?',
        answers: ['100', '110', '120', '130'],
        correctAnswer: '120',
        explanation: '15 × 8 = 120. Ini adalah perkalian dasar yang menghasilkan 120.'
      },
      {
        id: 2,
        question: 'Apa itu bilangan prima?',
        answers: [
          'Bilangan yang lebih besar dari 10',
          'Bilangan yang hanya habis dibagi 1 dan dirinya sendiri',
          'Bilangan yang genap',
          'Bilangan yang negatif'
        ],
        correctAnswer: 'Bilangan yang hanya habis dibagi 1 dan dirinya sendiri',
        explanation: 'Bilangan prima adalah bilangan yang hanya habis dibagi oleh 1 dan dirinya sendiri. Contoh: 2, 3, 5, 7, 11, dst.'
      },
      {
        id: 3,
        question: 'Berapa 25% dari 200?',
        answers: ['25', '50', '75', '100'],
        correctAnswer: '50',
        explanation: '25% dari 200 = 0.25 × 200 = 50. Persentase dihitung dengan mengalikan nilai dengan persen yang dikonversi ke desimal.'
      },
      {
        id: 4,
        question: 'Jika a = 5 dan b = 3, berapa nilai dari 2a + 3b?',
        answers: ['19', '21', '23', '25'],
        correctAnswer: '19',
        explanation: '2a + 3b = 2(5) + 3(3) = 10 + 9 = 19.'
      },
      {
        id: 5,
        question: 'Apa fungsi utama dari Artificial Intelligence (AI)?',
        answers: [
          'Menggantikan semua pekerjaan manusia',
          'Memproses data dan membuat keputusan berdasarkan pola',
          'Hanya digunakan untuk permainan video',
          'Menciptakan robot yang berbicara'
        ],
        correctAnswer: 'Memproses data dan membuat keputusan berdasarkan pola',
        explanation: 'AI dirancang untuk memproses data besar dan mengidentifikasi pola untuk membuat keputusan atau prediksi yang lebih baik.'
      },
      {
        id: 6,
        question: 'Berapa hasil dari √144?',
        answers: ['10', '11', '12', '13'],
        correctAnswer: '12',
        explanation: '√144 = 12 karena 12 × 12 = 144. Akar kuadrat adalah kebalikan dari kuadrat.'
      },
      {
        id: 7,
        question: 'Apa kepanjangan dari CPU?',
        answers: [
          'Central Processing Unit',
          'Computer Personal Utility',
          'Central Power Unit',
          'Computer Process Utility'
        ],
        correctAnswer: 'Central Processing Unit',
        explanation: 'CPU (Central Processing Unit) adalah otak dari komputer yang memproses semua instruksi dan data.'
      },
      {
        id: 8,
        question: 'Jika sebuah persegi panjang memiliki panjang 8 cm dan lebar 5 cm, berapa luas persegi panjang tersebut?',
        answers: ['30 cm²', '40 cm²', '50 cm²', '60 cm²'],
        correctAnswer: '40 cm²',
        explanation: 'Luas persegi panjang = panjang × lebar = 8 × 5 = 40 cm².'
      },
      {
        id: 9,
        question: 'Manakah dari berikut yang BUKAN merupakan bahasa pemrograman?',
        answers: ['Python', 'JavaScript', 'HTML', 'Java'],
        correctAnswer: 'HTML',
        explanation: 'HTML adalah markup language untuk membuat struktur halaman web, bukan bahasa pemrograman. Python, JavaScript, dan Java adalah bahasa pemrograman.'
      },
      {
        id: 10,
        question: 'Berapa hasil dari 12² (12 kuadrat)?',
        answers: ['120', '132', '144', '156'],
        correctAnswer: '144',
        explanation: '12² = 12 × 12 = 144.'
      },
      {
        id: 11,
        question: 'Apa itu Machine Learning?',
        answers: [
          'Mesin yang belajar sendiri tanpa program',
          'Teknik membuat komputer belajar dari data tanpa diprogram secara eksplisit',
          'Pembelajaran mesin hanya untuk robot',
          'Sistem yang hanya membaca buku'
        ],
        correctAnswer: 'Teknik membuat komputer belajar dari data tanpa diprogram secara eksplisit',
        explanation: 'Machine Learning adalah cabang AI yang memungkinkan sistem komputer untuk belajar dan meningkat dari pengalaman tanpa diprogram secara langsung.'
      },
      {
        id: 12,
        question: 'Berapa 3/4 dalam bentuk desimal?',
        answers: ['0.50', '0.65', '0.75', '0.85'],
        correctAnswer: '0.75',
        explanation: '3/4 = 3 ÷ 4 = 0.75. Untuk mengubah pecahan ke desimal, bagikan pembilang dengan penyebut.'
      },
      {
        id: 13,
        question: 'Apa singkatan dari API?',
        answers: [
          'Application Programming Interface',
          'Advanced Programming Information',
          'Application Process Integration',
          'Advanced Program Interface'
        ],
        correctAnswer: 'Application Programming Interface',
        explanation: 'API (Application Programming Interface) adalah set aturan yang memungkinkan aplikasi berkomunikasi satu sama lain.'
      },
      {
        id: 14,
        question: 'Berapa KPK (Kelipatan Persekutuan Terkecil) dari 4 dan 6?',
        answers: ['10', '12', '14', '16'],
        correctAnswer: '12',
        explanation: 'KPK dari 4 dan 6 adalah 12. Kelipatan 4: 4, 8, 12, 16... Kelipatan 6: 6, 12, 18... KPK adalah 12.'
      },
      {
        id: 15,
        question: 'Apa perbedaan antara Frontend dan Backend dalam pengembangan web?',
        answers: [
          'Frontend dan Backend adalah hal yang sama',
          'Frontend adalah tampilan, Backend adalah logika server',
          'Frontend hanya untuk mobile, Backend untuk web',
          'Backend tidak memiliki database'
        ],
        correctAnswer: 'Frontend adalah tampilan, Backend adalah logika server',
        explanation: 'Frontend adalah bagian yang dilihat pengguna (UI/UX), sementara Backend adalah logika server dan database yang menjalankan aplikasi di belakang layar.'
      },
      {
        id: 16,
        question: 'Berapa hasil dari 7 × 9?',
        answers: ['61', '63', '65', '67'],
        correctAnswer: '63',
        explanation: '7 × 9 = 63. Ini adalah perkalian dasar.'
      },
      {
        id: 17,
        question: 'Apa itu algoritma?',
        answers: [
          'Sebuah jenis bahasa pemrograman',
          'Serangkaian langkah untuk menyelesaikan suatu masalah',
          'Nama aplikasi mobile',
          'Singkatan dari Artificial Logic'
        ],
        correctAnswer: 'Serangkaian langkah untuk menyelesaikan suatu masalah',
        explanation: 'Algoritma adalah prosedur atau serangkaian langkah terurut untuk menyelesaikan masalah atau mencapai tujuan tertentu.'
      }
    ]
  }
];

export default mockQuizzes;