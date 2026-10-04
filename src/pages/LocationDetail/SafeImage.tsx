import { useCallback, useState } from 'react';
import { wikiThumb } from './wikiThumb';
import type { ThumbWidth } from './wikiThumb';

// Rasm: avval Wikimedia thumbnail, ochilmasa asl URL, u ham ochilmasa
// joy nomi yozilgan zaxira blok. Yuklanish paytida `is-loading` klassi.

type Stage = 'thumb' | 'original' | 'failed';

export default function SafeImage({
  src,
  alt,
  width = 1280,
  lazy = false,
}: {
  src: string;
  alt: string;
  width?: ThumbWidth;
  lazy?: boolean;
}) {
  const thumb = wikiThumb(src, width);
  const [stage, setStage] = useState<Stage>(thumb === src ? 'original' : 'thumb');
  const [loaded, setLoaded] = useState(false);

  // Keshdan kelgan rasm uchun onLoad ba'zan ishlamaydi — ref orqali tekshiramiz
  const checkComplete = useCallback((el: HTMLImageElement | null) => {
    if (el?.complete && el.naturalWidth > 0) setLoaded(true);
  }, []);

  if (stage === 'failed') {
    return (
      <div className="img-fallback" role="img" aria-label={alt}>
        <span>{alt}</span>
        <small>Rasm yuklanmadi</small>
      </div>
    );
  }

  return (
    <img
      key={stage}
      ref={checkComplete}
      src={stage === 'thumb' ? thumb : src}
      alt={alt}
      draggable={false}
      loading={lazy ? 'lazy' : undefined}
      className={loaded ? 'is-loaded' : 'is-loading'}
      onLoad={() => setLoaded(true)}
      onError={() => setStage(stage === 'thumb' ? 'original' : 'failed')}
    />
  );
}
