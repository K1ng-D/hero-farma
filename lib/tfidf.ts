export function tfidfVectorize(
  query: string,
  docs: string[]
): [number[], number[][]] {
  const allDocs = [query, ...docs];
  const terms = new Set<string>();

  // Tokenize dan kumpulkan semua kata
  allDocs.forEach((doc) =>
    doc
      .toLowerCase()
      .split(/\W+/)
      .forEach((word) => word && terms.add(word))
  );
  const vocab = Array.from(terms);
  const tf = allDocs.map((doc) => {
    const words = doc.toLowerCase().split(/\W+/);
    return vocab.map(
      (term) => words.filter((w) => w === term).length / words.length
    );
  });

  const df = vocab.map((term, idx) =>
    tf.map((vec) => (vec[idx] > 0 ? 1 : 0)).reduce((a, b) => a + b, 0)
  );

  const idf = df.map((d) => Math.log(allDocs.length / (d || 1)));

  const tfidf = tf.map((vec) => vec.map((tfval, i) => tfval * idf[i]));

  return [tfidf[0], tfidf.slice(1)];
}

export function cosineSimilarity(a: number[], b: number[]): number {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return magA && magB ? dot / (magA * magB) : 0;
}
