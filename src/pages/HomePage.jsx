import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardDocumentCheckIcon, ClockIcon } from '@heroicons/react/24/solid';
import Button from '../components/Common/Button';
import bgPattern from '../assets/bg-pattern.svg';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-white relative">
      <div 
        className="fixed inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: `url(${bgPattern})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      ></div>

      <div className="relative z-10 flex-1">
        <div className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-16 shadow-md">
          <div className="text-center">
            <div className="inline-block bg-white/20 px-4 py-2 rounded-full mb-4">
              <p className="text-sm font-semibold">Quiz Submodul</p>
            </div>
            <h1 className="text-5xl font-bold mb-3">LearnCheck!</h1>
            <p className="text-lg italic text-blue-100">"Let's have some fun and test your understanding"</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Penerapan AI dalam Dunia Nyata
              </h2>
              <p className="text-gray-700 text-base leading-relaxed mb-8">
                Pelajari bagaimana AI mengubah cara kita bekerja, belajar, dan hidup setiap hari.
              </p>

              <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-blue-500">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">
                  Penerapan AI dalam Dunia Nyata
                </h3>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    <ClipboardDocumentCheckIcon className="w-6 h-6 text-blue-500" />
                    <p className="text-gray-700">
                      <span className="font-semibold">Jumlah Soal:</span> 
                      <span className="font-bold ml-1">3 Soal</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <ClockIcon className="w-6 h-6 text-blue-500" />
                    <p className="text-gray-700">
                      <span className="font-semibold">Durasi:</span>
                      <span className="font-bold ml-1">30 detik/soal</span>
                    </p>
                  </div>
                </div>

                <Button 
                  onClick={() => navigate('/quiz')}
                  variant="primary"
                  className="w-full py-3 text-base font-bold"
                >
                  Mulai Kuis →
                </Button>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-20">
                <h3 className="text-lg font-bold text-gray-900 mb-5">
                  Daftar Submodul
                </h3>

                <div className="space-y-1 max-h-80 overflow-y-auto pr-2">
                  {[
                    { name: 'Penerapan AI dalam Dunia Nyata', active: true },
                    { name: 'Pengenalan AI', active: false },
                    { name: 'Taksonomoni AI', active: false },
                    { name: 'AI Workflow', active: false },
                    { name: '[Story] Belajar Mempermudah Pekerjaan dengan AI', active: false },
                    { name: 'Pengenalan Data', active: false },
                    { name: 'Kriteria Data untuk AI', active: false },
                    { name: 'Infrastruktur Data di Industri', active: false },
                  ].map((item, idx) => (
                    <div 
                      key={idx}
                      className={`py-2 px-3 rounded cursor-pointer transition-colors border-l-4 ${
                        item.active
                          ? 'bg-blue-50 border-blue-600'
                          : 'border-transparent hover:bg-gray-50'
                      }`}
                    >
                      <p className={`text-sm leading-snug ${
                        item.active
                          ? 'text-blue-700 font-semibold'
                          : 'text-gray-700'
                      }`}>
                        {item.active && '✓ '}
                        {item.name}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t">
                  <p className="text-center text-blue-600 font-semibold text-xs hover:text-blue-700 cursor-pointer">
                    Pengenalan AI →
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 bg-gray-900 text-gray-400 py-6 text-center">
        <p className="text-sm">© 2025 LearnCheck. Semua hak cipta dilindungi.</p>
      </div>
    </div>
  );
};

export default HomePage;