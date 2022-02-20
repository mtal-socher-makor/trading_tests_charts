import React from 'react'

export const hourglass = 
< g id="hourglass">
    <path   d="M385,82.273V30h55V0h-55H70H15v30h55v52.273c0,64.95,39.319,120.71,95.45,144.796v0.864
                C109.319,252.018,70,307.777,70,372.727V425H15v30h55h315h55v-30h-55v-52.273c0-64.95-39.319-120.71-95.45-144.795v-0.864
                C345.681,202.982,385,147.223,385,82.273z"/>
</g>
           
export const basicGradient = (time, id, color1 ="var(--main)" , color2 = "#fff") => {
    return (
        <linearGradient
            id={`gradient${id}`}
            key={`gradient${id}`}
            x1="0%"
            y1="100%"
            x2="0%"
            y2="0%"
        >
            <stop
                offset="0%"
                stopColor={color1}
            />
            <stop
                offset={`${((+time?.toFixed(3)) / 1)*100}%`}
                stopColor={color1}
            />
            <stop
                offset={`${((+time?.toFixed(3)) / 1)*100}%`}
                stopColor={color2}
            />
            <stop
                offset="100%"
                stopColor={color2}
            />
        </linearGradient>
    )
}




