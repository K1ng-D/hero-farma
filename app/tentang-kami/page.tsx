"use client";

export default function AboutUsPage() {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-teal-500 w-full h-screen flex items-center justify-center py-12 px-4 md:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center text-[#1F2937] mb-8">
          Tentang Kami
        </h1>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Visi */}
          <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col justify-between h-full">
            <h2 className="text-2xl font-semibold text-[#1F2937] mb-4">Visi</h2>
            <p className="text-lg text-gray-700 flex-grow">
              Menjadi apotek terpercaya yang memberikan pelayanan kesehatan
              terbaik, berkualitas, dan mudah diakses oleh seluruh lapisan
              masyarakat.
            </p>
          </div>

          {/* Misi */}
          <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col justify-between h-full">
            <h2 className="text-2xl font-semibold text-[#1F2937] mb-4">Misi</h2>
            <ul className="space-y-4 list-disc pl-6 text-lg text-gray-700 flex-grow">
              <li>
                Menyediakan obat-obatan, vitamin, dan produk kesehatan yang
                lengkap, asli, dan berkualitas.
              </li>
              <li>
                Memberikan pelayanan yang ramah, cepat, dan profesional kepada
                setiap pelanggan.
              </li>
              <li>
                Menyediakan layanan konsultasi apoteker untuk membantu
                masyarakat memahami penggunaan obat secara tepat.
              </li>
            </ul>
          </div>
        </div>

        <section className="mt-12">
          <h2 className="text-3xl font-semibold text-[#1F2937] mb-4">
            Komitmen Kami
          </h2>
          <p className="text-lg text-gray-700">
            Kami berkomitmen untuk selalu memberikan pelayanan terbaik, serta
            produk kesehatan yang terjamin kualitasnya. Dengan pendekatan yang
            modern, kami siap melayani kebutuhan kesehatan Anda kapan saja dan
            di mana saja.
          </p>
        </section>

        <div className="text-center mt-8">
          <p className="text-lg text-gray-700">
            Terima kasih telah memilih kami sebagai mitra kesehatan Anda.
          </p>
        </div>
      </div>
    </div>
  );
}
