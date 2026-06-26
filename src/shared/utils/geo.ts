import type { GeoPoint } from '@/domain/entities'

export function parseWKBPoint(wkb: string | null | undefined): GeoPoint | null {
  if (!wkb || typeof wkb !== 'string') return null

  if (wkb.startsWith('{') || wkb.startsWith('[')) {
    try {
      const parsed = JSON.parse(wkb)
      if (parsed.coordinates) {
        return { lat: parsed.coordinates[1], lng: parsed.coordinates[0] }
      }
    } catch { /* not JSON */ }
  }

  if (/^[0-9A-Fa-f]+$/.test(wkb) && wkb.length >= 42) {
    try {
      const buf = hexToBytes(wkb)
      const littleEndian = buf[0] === 1

      const view = new DataView(buf.buffer)
      let offset = 1

      const wkbType = littleEndian
        ? view.getUint32(offset, true)
        : view.getUint32(offset, false)
      offset += 4

      if (wkbType === 0x20000001 || wkbType === 0x10000001) {
        offset += 4
      }

      const lng = littleEndian
        ? view.getFloat64(offset, true)
        : view.getFloat64(offset, false)
      offset += 8

      const lat = littleEndian
        ? view.getFloat64(offset, true)
        : view.getFloat64(offset, false)

      if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
        return { lat, lng }
      }
    } catch { /* WKB parse failed */ }
  }

  return null
}

function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2)
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16)
  }
  return bytes
}

export function parseLocationField(row: Record<string, unknown>): Record<string, unknown> {
  const loc = row.location
  if (!loc) return row

  if (typeof loc === 'object' && loc !== null && 'lat' in loc && 'lng' in loc) {
    return row
  }

  if (typeof loc === 'object' && loc !== null && 'coordinates' in loc) {
    const coords = (loc as { coordinates: number[] }).coordinates
    return { ...row, location: { lat: coords[1], lng: coords[0] } }
  }

  if (typeof loc === 'string') {
    const parsed = parseWKBPoint(loc)
    if (parsed) {
      return { ...row, location: parsed }
    }
  }

  return row
}
