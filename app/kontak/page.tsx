"use client";

import { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "@/lib/firebase"; // pastikan sudah menginisialisasi Firebase app

export default function ContactPage() {
  const db = getFirestore(app);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSending, setIsSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setSuccessMessage("");

    try {
      await addDoc(collection(db, "pesan"), {
        ...formData,
        timestamp: new Date(),
      });

      setFormData({ name: "", email: "", message: "" });
      setSuccessMessage("Pesan berhasil dikirim!");
    } catch (error) {
      console.error("Gagal mengirim pesan:", error);
      alert("Terjadi kesalahan. Coba lagi nanti.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-teal-500 w-full min-h-screen flex items-center justify-center py-12 px-4 md:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center text-[#1F2937] mb-8">
          Kontak Kami
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Formulir Kontak */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-semibold text-[#1F2937] mb-4">
              Kirim Pesan
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700 mb-1"
                >
                  Nama
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Masukkan nama Anda"
                  className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-[#A7F3D0] outline-none"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Masukkan email Anda"
                  className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-[#A7F3D0] outline-none"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-gray-700 mb-1"
                >
                  Pesan
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tulis pesan Anda"
                  className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-[#A7F3D0] outline-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-[#1F2937] transition"
              >
                {isSending ? "Mengirim..." : "Kirim Pesan"}
              </button>

              {successMessage && (
                <p className="text-green-600 font-medium text-sm">
                  {successMessage}
                </p>
              )}
            </form>
          </div>

          {/* Informasi Kontak */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-semibold text-[#1F2937] mb-4">
              Informasi Kontak
            </h2>
            <ul className="space-y-6">
              <li>
                <strong className="text-lg">Alamat</strong>
                <p className="text-gray-700">
                  Jl. Sehat No.123, Colomadu, Indonesia
                </p>
              </li>
              <li>
                <strong className="text-lg">Telepon</strong>
                <p className="text-gray-700">+62 812 3456 7890</p>
              </li>
              <li>
                <strong className="text-lg">Email</strong>
                <p className="text-gray-700">Tiara@hero-farma.com</p>
              </li>
              <li>
                <strong className="text-lg">Jam Kerja</strong>
                <p className="text-gray-700">Senin - Jumat: 08:00 - 18:00</p>
                <p className="text-gray-700">Sabtu: 08:00 - 14:00</p>
                <p className="text-gray-700">Minggu: Tutup</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-lg text-gray-700">
            Kami akan segera menghubungi Anda setelah menerima pesan Anda.
            Terima kasih telah menghubungi kami!
          </p>
        </div>
      </div>
    </div>
  );
}
