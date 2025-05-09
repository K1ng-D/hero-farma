import { NextResponse } from "next/server";
import { TfIdf } from "natural";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function POST(request: Request) {
  const { keluhan, kategori, durasi, riwayatPenyakit } = await request.json();

  const snapshot = await getDocs(collection(db, "obat"));

  const dataObat = snapshot.docs.map((doc) => ({
    ...(doc.data() as any),
  }));

  const tfidf = new TfIdf();
  dataObat.forEach((obat) => {
    const deskripsi = `${obat.namaObat} ${obat.kategoriObat} ${obat.indikasiObat} ${obat.efekSamping} ${obat.bentukObat}`;
    tfidf.addDocument(deskripsi);
  });

  const query = `${keluhan} ${kategori} ${durasi} ${riwayatPenyakit}`;
  const hasil = dataObat.map((obat, index) => {
    const score = tfidf.tfidf(query, index);
    return { ...obat, similarity: score };
  });

  const sorted = hasil.sort((a, b) => b.similarity - a.similarity);
  return NextResponse.json(sorted.slice(0, 5));
}
