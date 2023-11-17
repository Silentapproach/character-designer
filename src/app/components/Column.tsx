import {PixelByte} from "@/app/components/PixelByte";
import React from "react";

type ColumnProps = {
    clicked: boolean[][]
    setClickedAtIndex: (index: number) => (index: number) => (clicked: boolean) => void
}

export function Column({clicked, setClickedAtIndex}: ColumnProps) {
    return <div className='flex flex-col'>
        {clicked.map((_, index) => <PixelByte key={index} clicked={clicked[index]}
                                              setClickedAtIndex={setClickedAtIndex(index)}/>)}
    </div>
}