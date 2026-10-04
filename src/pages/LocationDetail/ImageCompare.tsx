import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { KeyboardEvent, PointerEvent } from 'react';
import type { EarthLocation } from '../../types/location';
import SafeImage from './SafeImage';

// Yer va Oy/Mars rasmlarini taqqoslash: "Slider" (divider) va "Yonma-yon"
// rejimlari + istalgan rasmni katta ko'rinishda ochuvchi lightbox.

type Mode = 'slider' | 'side';

interface CompareImage {
  src: string;
  alt: string;
  caption: string;
  tone: 'earth' | 'ref';
}

const PLANET_NAME: Record<EarthLocation['analogPlanet'], string> = {
  moon: 'Oy',
  mars: 'Mars',
  both: 'Oy / Mars',
};

function ExpandIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Lightbox({
  images,
  index,
  onClose,
  onChange,
}: {
  images: CompareImage[];
  index: number;
  onClose: () => void;
  onChange: (i: number) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const img = images[index];

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onChange((index + 1) % images.length);
      if (e.key === 'ArrowLeft') onChange((index - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [index, images.length, onClose, onChange]);

  return createPortal(
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={img.caption} onClick={onClose}>
      <figure className="lightbox__figure" onClick={(e) => e.stopPropagation()}>
        <SafeImage src={img.src} alt={img.alt} />
        <figcaption>
          <span className={`lightbox__tag lightbox__tag--${img.tone}`}>
            {img.tone === 'earth' ? 'Yer' : 'Analog'}
          </span>
          {img.caption}
          <span className="lightbox__count">
            {index + 1} / {images.length}
          </span>
        </figcaption>
      </figure>

      <button
        ref={closeRef}
        type="button"
        className="lightbox__btn lightbox__close"
        aria-label="Yopish"
        onClick={onClose}
      >
        <span className="lightbox__x" />
      </button>
      <button
        type="button"
        className="lightbox__btn lightbox__nav lightbox__nav--prev"
        aria-label="Oldingi rasm"
        onClick={(e) => {
          e.stopPropagation();
          onChange((index - 1 + images.length) % images.length);
        }}
      >
        <span className="chevron chevron--left" />
      </button>
      <button
        type="button"
        className="lightbox__btn lightbox__nav lightbox__nav--next"
        aria-label="Keyingi rasm"
        onClick={(e) => {
          e.stopPropagation();
          onChange((index + 1) % images.length);
        }}
      >
        <span className="chevron chevron--right" />
      </button>
    </div>,
    document.body,
  );
}

export default function ImageCompare({ location }: { location: EarthLocation }) {
  const [mode, setMode] = useState<Mode>('slider');
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const planet = PLANET_NAME[location.analogPlanet];
  const images: CompareImage[] = [
    {
      src: location.earthImage,
      alt: location.name,
      caption: `Yer — ${location.name}, ${location.country}`,
      tone: 'earth',
    },
    {
      src: location.referenceImage,
      alt: location.referenceCaption,
      caption: location.referenceCaption,
      tone: 'ref',
    },
  ];

  const updateFromClientX = useCallback((clientX: number) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button')) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    updateFromClientX(e.clientX);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging) updateFromClientX(e.clientX);
  };

  const stopDrag = () => setDragging(false);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 2;
    if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - step));
    else if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + step));
    else if (e.key === 'Home') setPos(0);
    else if (e.key === 'End') setPos(100);
    else return;
    e.preventDefault();
  };

  const closeLightbox = useCallback(() => setLightbox(null), []);

  return (
    <div className="image-compare">
      <div className="image-compare__toolbar">
        <div className="image-compare__heading">
          <h2>Yer va {planet}: vizual taqqoslash</h2>
          <p>
            {mode === 'slider'
              ? "Chiziqni suring yoki strelka tugmalaridan foydalaning."
              : 'Rasmni kattaroq ko\'rish uchun ustiga bosing.'}
          </p>
        </div>
        <div className="segmented" role="tablist" aria-label="Taqqoslash rejimi">
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'slider'}
            className={mode === 'slider' ? 'is-active' : ''}
            onClick={() => setMode('slider')}
          >
            Slider
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'side'}
            className={mode === 'side' ? 'is-active' : ''}
            onClick={() => setMode('side')}
          >
            Yonma-yon
          </button>
        </div>
      </div>

      {mode === 'slider' ? (
        <div
          ref={stageRef}
          className={`compare-slider${dragging ? ' is-dragging' : ''}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={stopDrag}
          onPointerCancel={stopDrag}
          onKeyDown={onKeyDown}
          tabIndex={0}
          role="slider"
          aria-label="Yer va analog rasmini taqqoslash chizig'i"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-valuetext={`Yer ${Math.round(pos)}%, ${planet} ${100 - Math.round(pos)}%`}
        >
          <div className="compare-slider__layer">
            <SafeImage src={images[1].src} alt={images[1].alt} />
          </div>
          <div
            className="compare-slider__layer compare-slider__layer--top"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          >
            <SafeImage src={images[0].src} alt={images[0].alt} />
          </div>

          <span className="compare-slider__tag compare-slider__tag--earth">Yer</span>
          <span className="compare-slider__tag compare-slider__tag--ref">{planet}</span>

          <div className="compare-slider__divider" style={{ left: `${pos}%` }} aria-hidden="true">
            <span className="compare-slider__handle">
              <span className="chevron chevron--left" />
              <span className="chevron chevron--right" />
            </span>
          </div>

          <button
            type="button"
            className="compare-slider__expand"
            onClick={() => setLightbox(pos >= 50 ? 0 : 1)}
            aria-label="Katta ko'rinishda ochish"
          >
            <ExpandIcon />
          </button>
        </div>
      ) : (
        <div className="compare-side">
          {images.map((img, i) => (
            <button
              key={img.tone}
              type="button"
              className={`compare-card compare-card--${img.tone}`}
              onClick={() => setLightbox(i)}
              aria-label={`${img.caption} — kattalashtirish`}
            >
              <SafeImage src={img.src} alt={img.alt} />
              <span className="compare-card__zoom" aria-hidden="true">
                <ExpandIcon />
              </span>
              <span className="compare-card__label">
                <span className={`compare-card__tag compare-card__tag--${img.tone}`}>
                  {img.tone === 'earth' ? 'Yer' : planet}
                </span>
                {img.caption}
              </span>
            </button>
          ))}
        </div>
      )}

      {lightbox !== null && (
        <Lightbox images={images} index={lightbox} onClose={closeLightbox} onChange={setLightbox} />
      )}
    </div>
  );
}
