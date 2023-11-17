import Pixel from "@/app/components/Pixel";
import React from "react";

type PixelByteProps = {
    clicked: boolean[]
    setClickedAtIndex: (index: number) => (clicked: boolean) => void
}

export function PixelByte({clicked, setClickedAtIndex}: PixelByteProps) {
    return <div className='flex flex-col mb-1'>
        {clicked.map((clicked, index) => <Pixel key={index} clicked={clicked} setClicked={setClickedAtIndex(index)}/>)}
    </div>
}