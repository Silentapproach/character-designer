import React, {useCallback, useEffect} from 'react'
import {Column} from "@/app/components/Column";
import {generateHex} from "@/app/utils/generateHex";
import {createDesignerData} from "@/app/utils/createDesignerData";

type CharacterDesignerProps = {
    pixelCount?: number
    byteCount?: number
    rowCount?: number
}

export function CharacterDesigner({pixelCount = 8, byteCount = 3, rowCount = 12}: CharacterDesignerProps) {
    const [byte, setByte] = React.useState<number[]>([])
    const [clicked, setClicked] = React.useState<boolean[][][]>(
        createDesignerData(rowCount, byteCount, pixelCount)
    )

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
        setClicked(createDesignerData(rowCount, byteCount, pixelCount))
    }

    const generateByte = useCallback(() => {
        let bytes: number[] = []

        for (let i = 0; i < clicked.length; i++) {
            for (let j = 0; j < clicked[i].length; j++) {
                let newByte = 0
                for (let k = 0; k < clicked[i][j].length; k++) {
                    if (!clicked[i][j][k]) continue
                    newByte += Math.pow(2, k)
                }
                bytes.push(newByte)
            }

        }
        setByte(bytes)
    }, [clicked])

    useEffect(() => {
        generateByte()
    }, [clicked, generateByte]);

    return <div>
                <div className='flex flex-row justify-center'>
                    {[...Array(rowCount)].map((_, index) => <Column key={index} clicked={clicked[index]} setClickedAtIndex={setClickedAtIndex(index)}/>)}
                </div>
                <div className="flex flex-col">
                    <button onClick={clear}>
                        Clear Designer
                    </button>
                    {byte.map((byte, index) => generateHex(byte) + " ")}
                </div>
    </div>
}
