"use client";

import { useEffect, useRef } from "react";
import { mountPiece, PIECES } from "./art-pieces";

export default function AngelArt() {
  const ref = useRef(null);

  useEffect(() => mountPiece(ref.current, PIECES.angel, "/angel.webp"), []);

  return <div ref={ref} className="artist-credit__frame" />;
}
