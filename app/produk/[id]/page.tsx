"use client";

import { app } from "@/lib/firebase";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Obat {
  id: string;
  namaObat: string;
  kategoriObat: string;
  imageUrl: string;
  indikasiObat: string;
  efekSamping: string;
  bentukObat: string;
  harga: string;
  deskripsiObat: string;
}

export default function ObatDetailPage() {
  const [obat, setObat] = useState<Obat | null>(null);
  const { id } = useParams();
  const router = useRouter();
  const db = getFirestore(app);

  useEffect(() => {
    if (!id) return;

    const fetchObatDetail = async () => {
      const obatDoc = await getDoc(doc(db, "obat", id as string));
      if (obatDoc.exists()) {
        setObat({ id: obatDoc.id, ...obatDoc.data() } as Obat);
      }
    };

    fetchObatDetail();
  }, [id]);

  if (!obat) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-lg text-gray-600">
        Memuat data obat...
      </div>
    );
  }

  return (
    <div className="w-full h-screen px-6 py-32 lg:px-32 bg-white text-gray-800 relative">
      <h1 className="text-4xl font-bold text-center mb-12 text-blue-700">
        {obat.namaObat}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <img
          src={obat.imageUrl}
          alt={obat.namaObat}
          className="w-full h-screen max-h-[500px] object-cover rounded-xl shadow-md"
        />

        <div className="space-y-4">
          <p className="text-gray-600">
            <span className="font-semibold">Kategori:</span> {obat.kategoriObat}
          </p>
          <p>
            <span className="font-semibold">Deskripsi:</span>{" "}
            {obat.deskripsiObat}
          </p>
          <p>
            <span className="font-semibold">Indikasi:</span> {obat.indikasiObat}
          </p>
          <p>
            <span className="font-semibold">Efek Samping:</span>{" "}
            {obat.efekSamping}
          </p>
          <p>
            <span className="font-semibold">Bentuk Obat:</span>{" "}
            {obat.bentukObat}
          </p>
          <p className="text-lg font-semibold text-green-700 pt-2">
            Harga: Rp. {Number(obat.harga).toLocaleString("id-ID")},00
          </p>
        </div>
      </div>

      {/* Tombol Back di pojok kiri bawah */}
      <button
        onClick={() => router.back()}
        className="absolute bottom-6 left-6 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        ← Kembali
      </button>
    </div>
  );
}
