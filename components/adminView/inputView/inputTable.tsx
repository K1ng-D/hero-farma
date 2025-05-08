"use client";

import { obatsCollection } from "@/lib/firebase";
import { deleteDoc, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ObatForm from "./formInput";

interface Obat {
  id: string;
  namaObat: string;
  kategoriObat: string;
  imageUrl: string;
  indikasiObat: string;
  efekSamping: string;
  bentukObat: string;
  harga: string;
}

export default function EventTable() {
  const [obats, setObats] = useState<Obat[]>([]);
  const [selectedObat, setSelectedObat] = useState<Obat | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDocs(obatsCollection);
      setObats(data.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Obat)));
    };
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(obatsCollection, id));
      setObats(obats.filter((obat) => obat.id !== id));
      toast.success("Data berhasil dihapus!");
    } catch (error) {
      toast.error("Gagal menghapus data!");
    }
  };

  return (
    <div className="p-6 bg-slate-100 h-screen md:ml-[300px]">
      <button
        onClick={() => {
          setSelectedObat(undefined);
          setIsOpen(true);
        }}
        className="mb-4 bg-[#374785] text-white px-4 py-2 rounded"
      >
        Tambah Obat
      </button>

      {isOpen && (
        <ObatForm
          existingData={selectedObat}
          onClose={() => {
            setIsOpen(false);
            location.reload();
          }}
        />
      )}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-[#374785] text-black">
            <th className="border p-2">Nama Obat</th>
            <th className="border p-2">Kategori</th>
            <th className="border p-2">Indikasi</th>
            <th className="border p-2">Efek Samping</th>
            <th className="border p-2">Bentuk</th>
            <th className="border p-2">Harga</th>
            <th className="border p-2">Gambar</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {obats.map((obat) => (
            <tr className="bg-white text-black" key={obat.id}>
              <td className="border p-2 text-center">{obat.namaObat}</td>
              <td className="border p-2 text-center">{obat.kategoriObat}</td>
              <td className="border p-2 text-center">{obat.indikasiObat}</td>
              <td className="border p-2 text-center">{obat.efekSamping}</td>
              <td className="border p-2 text-center">{obat.bentukObat}</td>
              <td className="border p-2 text-center">{obat.harga}</td>
              <td className="border p-2 flex items-center justify-center text-center">
                <img
                  src={obat.imageUrl}
                  alt={obat.namaObat}
                  className="h-12 "
                />
              </td>
              <td className="border p-2 items-center justify-center text-center">
                <button
                  onClick={() => {
                    setSelectedObat(obat);
                    setIsOpen(true);
                  }}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(obat.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
