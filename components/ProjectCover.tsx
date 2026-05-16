'use client';

import { useState } from 'react';

/**
 * ProjectCover — img wrapper that gracefully hides itself when the
 * source fails to load (so Kyle's placeholder slugs render as dark
 * surface blocks until he drops in real cover art).
 *
 * Exists as a client component because the onError handler can't
 * exist on JSX inside a Server Component.
 */
export default function ProjectCover({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [hide, setHide] = useState(false);

  if (hide) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setHide(true)}
    />
  );
}
