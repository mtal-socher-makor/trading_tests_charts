import React from 'react'

function Legend( {arrayNames, colorScale}) {
  return (
    <>
      {arrayNames.map((name, index) => (
        <svg>
            <g>
              <circle cx={`${index*20 + 10}`} cy={100} r='8' fill={colorScale(arrayNames[index])}/>
              <text x={`${index*20 + 25}`} y={106} fill={colorScale(arrayNames[index])}style={{fontSize: 18}}>{name} </text>
            
            </g>
        </svg>
      ))
        
      }
    </>
  )
}

export default Legend

        
// {arrayNames.length &&
//   arrayNames.map((name, index) => {
//     console.log("arrayNames[index]",colorScale(arrayNames[index]))
//     return (
//       <foreignobject>
//         <div>
//           <svg>
//             <g transform={`translate(200px,200px)`}>
//               <circle cx={`${200 + index*40}`} cy={innerHeight} r='6' fill={colorScale(arrayNames[index])} />
//               <text x={`${200 + index*40 + 10}`} y="0" >{name} </text>
//             </g>
//           </svg>
//         </div>
//       </foreignobject>
      
//     )
//   })}      
