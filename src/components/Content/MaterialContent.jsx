import React from 'react';
import { useLocation } from 'react-router-dom';

const MaterialContent = () => {
  const location = useLocation();
  const { submodule } = location.state || {};

  // Fallback data jika tidak ada state
  const materialTitle = submodule?.name || 'Penerangan AI dalam Dunia Nyata';

  return (
    <div className="space-y-8">
      {/* Material Header */}
      <h1 className="text-4xl font-bold text-blue-600 pb-4 border-b-2 border-blue-200">
        {materialTitle}
      </h1>

      {/* Material Content */}
      <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
        <p>
          Mari kita mulai pembelajaran ini dengan mengenal penerangan AI di dunia nyata. Menurut laporan McKinsey yang berjudul The state of AI in 2022, rata-rata penggunaan AI di industri meningkat dari 20% pada tahun 2017 menjadi 50% pada tahun 2022. Laporan tersebut juga menyatakan bahwa 31% industri memanfaatkan teknologi AI untuk meningkatkan kualitas produk dan layanan mereka. Hal ini menunjukkan bahwa penerangan AI sudah ada di berbagai bidang industri saat ini. Berikut merupakan contoh-contoh industri yang sudah menerapkan AI.
        </p>

        {/* AI Applications Diagram */}
        <div className="my-8 p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl flex justify-center">
          <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
            {/* Center AI Circle */}
            <div className="absolute w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center text-3xl font-bold shadow-lg z-10">
              AI
            </div>

            {/* Surrounding Applications */}
            <div className="relative w-full h-full">
              {/* Game */}
              <div className="absolute top-4 right-8 text-center">
                <div className="text-2xl mb-1">🎮</div>
                <p className="text-xs font-bold text-gray-600">Game</p>
              </div>

              {/* Kesehatan */}
              <div className="absolute top-16 right-4 text-center">
                <div className="text-2xl mb-1">🏥</div>
                <p className="text-xs font-bold text-gray-600">Kesehatan</p>
              </div>

              {/* Transportasi */}
              <div className="absolute bottom-16 right-4 text-center">
                <div className="text-2xl mb-1">🚗</div>
                <p className="text-xs font-bold text-gray-600">Transportasi</p>
              </div>

              {/* Pertanian */}
              <div className="absolute bottom-4 right-8 text-center">
                <div className="text-2xl mb-1">🌾</div>
                <p className="text-xs font-bold text-gray-600">Pertanian</p>
              </div>

              {/* Toko Online */}
              <div className="absolute bottom-4 left-8 text-center">
                <div className="text-2xl mb-1">🛒</div>
                <p className="text-xs font-bold text-gray-600">Toko Online</p>
              </div>

              {/* Hiburan */}
              <div className="absolute bottom-16 left-4 text-center">
                <div className="text-2xl mb-1">🎬</div>
                <p className="text-xs font-bold text-gray-600">Hiburan</p>
              </div>

              {/* Robotika */}
              <div className="absolute top-16 left-4 text-center">
                <div className="text-2xl mb-1">🤖</div>
                <p className="text-xs font-bold text-gray-600">Robotika</p>
              </div>

              {/* Otomotif */}
              <div className="absolute top-4 left-8 text-center">
                <div className="text-2xl mb-1">🚙</div>
                <p className="text-xs font-bold text-gray-600">Otomotif</p>
              </div>
            </div>
          </div>
        </div>

        <p>
          Dari contoh-contoh industri di atas, kita dapat melihat bahwa AI telah menjadi bagian penting dalam berbagai sektor. Teknologi ini membantu meningkatkan efisiensi, produktivitas, dan kualitas layanan dalam setiap industri.
        </p>
      </div>
    </div>
  );
};

export default MaterialContent;