"use client";
import { obatsCollection } from "@/lib/firebase";
import { addDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { toast } from "react-toastify";
import { uploadToCloudinary } from "../../../app/api/upload";

type ObatFormProps = {
  existingData?: {
    namaObat: string;
    id: string;
    kategoriObat: string;
    imageUrl: string;
    indikasiObat: string;
    efekSamping: string;
    bentukObat: string;
    harga: string;
  };
  onClose: () => void;
};

export default function ObatForm({ existingData, onClose }: ObatFormProps) {
  const [namaObat, setNamaObat] = useState(existingData?.namaObat || "");
  const [kategoriObat, setKategoriObat] = useState(
    existingData?.kategoriObat || ""
  );
  const [indikasiObat, setIndikasiObat] = useState(
    existingData?.indikasiObat || ""
  );
  const [efekSamping, setEfekSamping] = useState(
    existingData?.efekSamping || ""
  );
  const [bentukObat, setBentukObat] = useState(existingData?.bentukObat || "");
  const [harga, setHarga] = useState(existingData?.harga || "");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = existingData?.imageUrl || "";

      if (image) {
        const uploadedImageUrl = await uploadToCloudinary(image);
        if (!uploadedImageUrl) throw new Error("Gagal mengunggah gambar.");
        imageUrl = uploadedImageUrl;
      }

      const timestamp = new Date().toISOString();

      if (existingData) {
        await updateDoc(doc(obatsCollection, existingData.id), {
          namaObat,
          kategoriObat,
          indikasiObat,
          efekSamping,
          bentukObat,
          harga,
          updatedAt: timestamp,
          ...(image && { imageUrl }),
        });
        toast.success("Data berhasil diperbarui!");
      } else {
        await addDoc(obatsCollection, {
          namaObat,
          kategoriObat,
          indikasiObat,
          efekSamping,
          bentukObat,
          harga,
          imageUrl,
          dateCreated: timestamp,
        });
        toast.success("Data berhasil ditambahkan!");
      }

      onClose();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Terjadi kesalahan saat menyimpan data!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white text-black p-4 rounded-lg shadow-md"
    >
      <h1>Nama Obat</h1>
      <input
        type="text"
        placeholder="Nama Obat"
        value={namaObat}
        onChange={(e) => setNamaObat(e.target.value)}
        className="w-full p-2 border rounded mb-2"
        required
      />
      <h1>Kategori</h1>
      <input
        type="text"
        value={kategoriObat}
        placeholder="Kategori"
        onChange={(e) => setKategoriObat(e.target.value)}
        className="w-full p-2 border rounded mb-2"
        required
      />
      <h1>Indikasi</h1>
      <input
        type="text"
        placeholder="Indikasi Obat"
        value={indikasiObat}
        onChange={(e) => setIndikasiObat(e.target.value)}
        className="w-full p-2 border rounded mb-2"
        required
      />

      <h1>Efek Samping</h1>
      <input
        type="text"
        placeholder="Efek Samping"
        value={efekSamping}
        onChange={(e) => setEfekSamping(e.target.value)}
        className="w-full p-2 border rounded mb-2"
        required
      />

      <h1>Bentuk Obat</h1>
      <input
        type="text"
        placeholder="Bentuk Obat"
        value={bentukObat}
        onChange={(e) => setBentukObat(e.target.value)}
        className="w-full p-2 border rounded mb-2"
        required
      />

      <h1>Harga</h1>
      <input
        type="text"
        placeholder="Harga"
        value={harga}
        onChange={(e) => setHarga(e.target.value)}
        className="w-full p-2 border rounded mb-2"
        required
      />

      <h1>Upload Gambar</h1>
      <input
        type="file"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
        className="w-full p-2 border rounded mb-2"
        accept="image/*"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        disabled={loading}
      >
        {loading ? "Loading..." : existingData ? "Update" : "Tambah"}
      </button>
    </form>
  );
}
