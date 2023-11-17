export function generateHex(byte: number) {
    let hex = byte.toString(16)
    if (hex.length === 1) hex = '0' + hex
    return hex.toUpperCase()
}