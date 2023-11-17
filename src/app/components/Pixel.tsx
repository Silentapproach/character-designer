import React from "react";

type PixelProps = {
    clicked: boolean
    setClicked: (clicked: boolean) => void
}
export default function Pixel({clicked, setClicked}: PixelProps) {
    const onMove = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        event.stopPropagation()
        if (event.buttons === 1) {
            setClicked(!clicked)
        }
    }

    return <button
        className={`h-6 w-6 text-black border border-gray-500 ${clicked ? 'bg-black' : 'bg-white'}`}
        onMouseEnter={onMove}
        onMouseDown={onMove}
    />
}