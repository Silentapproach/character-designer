export function createDesignerData(rowCount: number, byteCount: number, pixelCount: number) {
    return new Array(rowCount).fill(
        new Array(byteCount).fill(
            new Array(pixelCount).fill(false)
        )
    )
}