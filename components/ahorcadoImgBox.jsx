import React from 'react'
import {
  Typography,

} from "@mui/material";

const AhorcadoBox = ({ status, style }) => {
  return (
    <div>
      <Typography variant={"h6"}>
        <strong>
          Vidas: {6 - status}
        </strong>
      </Typography>
      <svg width="clamp(30px, 25vw, 400px)" viewBox="0 0 394 471" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M391.5 451.5C391.5 452.852 390.446 454.765 386.961 456.981C383.596 459.121 378.561 461.141 372.116 462.874C359.262 466.332 341.366 468.5 321.5 468.5C301.634 468.5 283.738 466.332 270.884 462.874C264.439 461.141 259.404 459.121 256.039 456.981C252.554 454.765 251.5 452.852 251.5 451.5C251.5 450.148 252.554 448.235 256.039 446.019C259.404 443.879 264.439 441.859 270.884 440.126C283.738 436.668 301.634 434.5 321.5 434.5C341.366 434.5 359.262 436.668 372.116 440.126C378.561 441.859 383.596 443.879 386.961 446.019C390.446 448.235 391.5 450.148 391.5 451.5Z" fill="#935029" stroke="#5F3426" strokeWidth="5" />
        <path d="M45 106.5V4C45 3.44772 45.4477 3 46 3H344C344.552 3 345 3.44772 345 4.00001V454C345 454.552 344.552 455 344 455H304.569C304.017 455 303.569 454.552 303.569 454V39.5303C303.569 38.9781 303.121 38.5303 302.569 38.5303H80.9418C80.3895 38.5303 79.9418 38.9781 79.9418 39.5303V106.5C79.9418 107.052 79.494 107.5 78.9418 107.5H46C45.4477 107.5 45 107.052 45 106.5Z" fill="#935029" stroke="#5F3426" strokeWidth="6" strokeLinecap="round" />
        <g id="vectorBody">
        {
          status > 0 ?
            <circle cx="60.0044" cy="149.004" r="46" transform="rotate(1.66629 60.0044 149.004)" stroke="white" strokeWidth="13" /> : ""}
        {
          status > 1 ?
            <path d="M58.6086 196.984L55.4689 321.446" stroke="white" strokeWidth="15" strokeLinecap="round" />
            : ""}
        {
          status > 2 ? <path id="lHand" d="M106.817 224.898L60.4352 254.562" stroke="white" strokeWidth="15" strokeLinecap="round" /> : ""}
        {
          status > 3 ?
            <path id="rHand" d="M8.24268 226.032L60.4352 254.562" stroke="white" strokeWidth="15" strokeLinecap="round" />
            : ""}
        {
          status > 4 ?
            <path d="M55.4882 321.446L19.5253 388.429" id="rFeet" stroke="white" strokeWidth="15" strokeLinecap="round" />

            : ""}
        {
          status > 5 ?
            <path d="M55.4882 321.446L95.0751 370.618" id="lFeet" stroke="white" strokeWidth="15" strokeLinecap="round" />
            : ""}
        </g>
      </svg>
    </div>
  )
}
      //<img style={style} src={`./images/Ahorcado-${status}.png`} />

export default AhorcadoBox