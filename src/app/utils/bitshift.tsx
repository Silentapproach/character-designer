export function bitshift(byteArray: number[][], shift: number, direction: 'left') {
    let byteArrayCloneStr = JSON.stringify(byteArray)
    let byteArrayClone = JSON.parse(byteArrayCloneStr)
    for (let i = 0; i < byteArrayClone.length; i++) {
        for (let j = 0; j < byteArrayClone[i].length; j++) {
            if (direction === 'left') {
                let valueAfterShift = byteArrayClone[i][j] << shift;
                if (valueAfterShift > 255) {
                    valueAfterShift = valueAfterShift - 256;
                    if (j > 0 &&  j % 3 !== 0) {
                        byteArrayClone[i][j - 1] += 1;
                    }
                }
                byteArrayClone[i][j] = valueAfterShift;
            }
        }
    }
    return byteArrayClone;
}