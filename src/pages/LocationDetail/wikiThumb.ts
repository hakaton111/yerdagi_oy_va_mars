// Wikimedia Commons asl rasmlari juda katta (3840px gacha, bir necha MB).
// Demo tez ochilishi uchun ularning thumbnail versiyasini so'raymiz:
//   .../commons/a/ab/File.jpg  →  .../commons/thumb/a/ab/File.jpg/1280px-File.jpg
// Agar thumbnail ochilmasa, komponent asl URL'ga qaytadi (onError).

const COMMONS = /^(https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/)([0-9a-f]\/[0-9a-f]{2}\/)([^/]+)$/;

// Wikimedia tavsiya qilgan standart kengliklar
export type ThumbWidth = 330 | 960 | 1280;

export function wikiThumb(url: string, width: ThumbWidth): string {
  const m = url.match(COMMONS);
  if (!m) return url;
  const [, base, hash, file] = m;
  return `${base}thumb/${hash}${file}/${width}px-${file}`;
}
