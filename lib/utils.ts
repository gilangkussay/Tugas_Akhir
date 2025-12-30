import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price)
}

export function generateInvoiceNumber(): string {
  const timestamp = Date.now()
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `INV-${timestamp}-${random}`
}
