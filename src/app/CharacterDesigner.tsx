import React, {useCallback, useEffect} from 'react'
import {Column} from "@/app/components/Column";
import {generateHex} from "@/app/utils/generateHex";
import {createDesignerData} from "@/app/utils/createDesignerData";
import {bitshift} from "@/app/utils/bitshift";
import {hexToClicked} from "@/app/utils/hexToClicked";

type CharacterDesignerProps = {
    pixelCount?: number
    byteCount?: number
    columnCount?: number
}

export function CharacterDesigner({pixelCount = 8, byteCount = 3, columnCount = 12}: CharacterDesignerProps) {
    const [bytes, setBytes] = React.useState<number[][]>([])
    const [clicked, setClicked] = React.useState<boolean[][][]>(
        createDesignerData(columnCount, byteCount, pixelCount)
    )
    const [hexInput, setHexInput] = React.useState('');

    const loadHexCharacter = () => {
        const newClicked = hexToClicked(hexInput);
        setClicked(newClicked);
    }
    const handleHexInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHexInput(event.target.value);
    }
    const setClickedAtIndex = (rowIndex: number) => (outerIndex: number) => (index: number) => (clickedValue: boolean) => {
        const newRowClicked = [...clicked]
        const newOuterClicked = [...newRowClicked[rowIndex]]
        const newClicked = [...newOuterClicked[outerIndex]]
        newClicked[index] = clickedValue
        newOuterClicked[outerIndex] = newClicked
        newRowClicked[rowIndex] = newOuterClicked
        setClicked(newRowClicked)
    }

    const clear = () => {
        setClicked(createDesignerData(columnCount, byteCount, pixelCount))
    }

    const convertBytesToClicked = useCallback((newBytes: number[][]) => {
        let newClicked: boolean[][][] = []
        for (let i = 0; i < newBytes.length; i++) {
            let newOuterClicked: boolean[][] = []
            for (let j = 0; j < newBytes[i].length; j++) {
                let newInnerClicked: boolean[] = []
                let binary = newBytes[i][j].toString(2);
                while (binary.length < 8) {
                    binary = '0' + binary;
                }
                for (let k = 0; k < 8; k++) {
                    newInnerClicked.push(binary[k] === '1');
                }
                newOuterClicked.push(newInnerClicked)
            }
            newClicked.push(newOuterClicked)
        }
        setClicked(newClicked)
        setBytes(newBytes)
    }, [])

    const generateByte = useCallback(() => {
        let bytes: number[][] = []

        for (let i = 0; i < clicked.length; i++) {
            let byteRow: number[] = [];
            for (let j = 0; j < clicked[i].length; j++) {
                let newByte = 0
                for (let k = 0; k < clicked[i][j].length; k++) {
                    if (!clicked[i][j][k]) continue
                    // take the current boolean array and convert it to a byte. The first entry is the most significant bit
                    newByte += Math.pow(2, (clicked[i][j].length - 1) - k)
                }
                byteRow.push(newByte);
            }
            bytes.push(byteRow);
        }
        setBytes(bytes)
    }, [clicked])

    useEffect(() => {
        generateByte()
    }, [clicked, generateByte]);

    const copyHexToClipboard = () => {
        const hexString = bytes.map(byteRow => byteRow.map(byte => generateHex(byte)).join(' ')).join(' ');
        navigator.clipboard.writeText(hexString);
    }

    return <div>
        <div className='flex flex-row justify-center'>
            {[...Array(columnCount)].map((_, index) => <Column key={index} clicked={clicked[index]}
                                                               setClickedAtIndex={setClickedAtIndex(index)}/>)}
        </div>
        <div className="flex flex-col">
            <button onClick={clear}>
                Clear Designer
            </button>
            {bytes.map((byteRow) => byteRow.map((byte) => generateHex(byte) + " "))}
        </div>
        <div className="flex flex-col">
            <button onClick={copyHexToClipboard}>Copy Hex to Clipboard</button>
        </div>
        <div className="flex flex-col">
            <input type="text" value={hexInput} onChange={handleHexInput}/>
            <button onClick={loadHexCharacter}> Load Hex Character</button>
        </div>
        <div  className="flex flex-col">
            <button onClick={(event) => {
                event.preventDefault()
                console.log(bitshift(bytes, 1, 'left'))
                convertBytesToClicked(bitshift(bytes, 1, 'left'))
            }}>
                Move Up
            </button>
        </div>
    </div>
}
