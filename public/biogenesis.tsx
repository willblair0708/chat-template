import * as React from 'react';
import type { SVGProps } from 'react';

interface SvgKpProps extends SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
}

const IconBiogenesis: React.FC<SvgKpProps> = ({ size, className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || 1014}
    height={size || 1042}
    preserveAspectRatio="xMidYMid meet"
    version="1.0"
    viewBox="0 0 1014 1042"
    className={className}>
    <g fill="currentColor" stroke="none" transform="translate(0.000000,1042.000000) scale(0.100000,-0.100000)">
      <path d="M2020 9554 c-346 -55 -654 -190 -912 -401 -36 -29 -111 -100 -165
      -156 -256 -268 -416 -587 -485 -967 -29 -162 -29 -438 0 -600 71 -392 234
      -710 507 -986 130 -132 234 -213 389 -305 138 -81 276 -137 531 -214 288 -87
      421 -132 645 -220 917 -362 1630 -877 2200 -1588 436 -544 773 -1191 1095
      -2103 86 -243 123 -331 201 -484 202 -397 459 -677 794 -863 161 -89 407 -164
      617 -187 144 -16 467 -8 586 14 573 108 1067 476 1322 986 98 196 160 401 185
      612 18 152 8 442 -20 573 -139 652 -588 1164 -1210 1380 -58 20 -190 56 -295
      81 -226 53 -334 82 -498 133 -797 251 -1468 660 -2029 1239 -624 645 -1057
      1430 -1347 2439 -63 218 -117 361 -196 522 -293 590 -739 959 -1310 1081 -134
      29 -463 37 -605 14z"/>
      <path d="M7370 9550 c-296 -54 -570 -173 -799 -345 -103 -78 -297 -271 -372
      -370 -173 -228 -305 -542 -348 -832 -16 -107 -14 -450 4 -558 119 -727 646
      -1304 1366 -1494 173 -46 262 -54 528 -48 212 4 247 7 341 31 165 42 275 81
      415 149 480 235 828 654 970 1172 51 187 58 259 52 530 -4 212 -7 252 -30 345
      -63 263 -181 515 -336 719 -75 98 -264 285 -364 360 -204 152 -479 274 -744
      332 -147 31 -534 37 -683 9z"/>
      <path d="M2091 4149 c-801 -84 -1458 -681 -1620 -1471 -98 -474 2 -977 274
      -1383 244 -365 605 -626 1035 -750 177 -51 299 -67 500 -67 196 0 324 16 495
      62 737 196 1278 831 1355 1589 55 544 -127 1066 -510 1465 -157 163 -318 278
      -534 381 -223 107 -423 159 -671 176 -161 10 -208 10 -324 -2z"/>
    </g>
  </svg>
);
export default IconBiogenesis;