import { createWorker, type Worker } from "tesseract.js";

let workerPromise: Promise<Worker> | null = null;

async function getWorker(): Promise<Worker> {
  if (!workerPromise) {
    workerPromise = createWorker("eng");
  }
  return workerPromise;
}

export function preprocessForOcr(source: HTMLCanvasElement | HTMLImageElement): HTMLCanvasElement {
  const width = source instanceof HTMLImageElement ? source.naturalWidth : source.width;
  const height = source instanceof HTMLImageElement ? source.naturalHeight : source.height;
  const scale = 3;
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(width * scale);
  canvas.height = Math.round(height * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
  const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const { data } = image;

  const lumas: number[] = [];
  let total = 0;
  for (let i = 0; i < data.length; i += 4) {
    const luma = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    lumas.push(luma);
    total += luma;
  }
  const invert = total / lumas.length < 128;
  const prepared = lumas.map((luma) => (invert ? 255 - luma : luma));
  const sorted = [...prepared].sort((a, b) => a - b);
  const p5 = sorted[Math.floor(sorted.length * 0.05)] ?? 0;
  const p95 = sorted[Math.floor(sorted.length * 0.95)] ?? 255;
  const span = Math.max(24, p95 - p5);

  for (let i = 0; i < prepared.length; i += 1) {
    const stretched = Math.max(0, Math.min(255, ((prepared[i] - p5) / span) * 255));
    const value = stretched > 188 ? 255 : stretched < 80 ? 0 : stretched;
    const offset = i * 4;
    data[offset] = data[offset + 1] = data[offset + 2] = value;
    data[offset + 3] = 255;
  }

  ctx.putImageData(image, 0, 0);
  return canvas;
}

export async function recognizeItemImage(source: HTMLCanvasElement | HTMLImageElement): Promise<string> {
  const prepared = preprocessForOcr(source);
  const worker = await getWorker();
  const result = await worker.recognize(prepared);
  return result.data.text ?? "";
}

export async function imageFileToImage(file: File): Promise<HTMLImageElement> {
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  await image.decode();
  return image;
}
