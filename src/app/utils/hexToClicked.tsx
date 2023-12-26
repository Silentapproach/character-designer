export function hexToClicked(hexString: string): boolean[][][]{
    const hexArray = hexString.split(' ');
    let newClicked: boolean[][][] = [];
    let newOuterClicked: boolean[][] = [];
    let newInnerClicked: boolean[] = [];

    hexArray.forEach((hex, index) => {
        let binary = parseInt(hex, 16).toString(2);
        while (binary.length < 8) {
            binary = '0' + binary;
        }
        for (let i = 0; i < 8; i++) {
            newInnerClicked.push(binary[i] === '1');
        }
        newOuterClicked.push(newInnerClicked);
        newInnerClicked = [];
        if ((index + 1) % 3 === 0) {
            newClicked.push(newOuterClicked);
            newOuterClicked = [];
        }
    });

    if (newInnerClicked.length > 0) {
        newOuterClicked.push(newInnerClicked);
    }
    if (newOuterClicked.length > 0) {
        newClicked.push(newOuterClicked);
    }

    return newClicked;
}