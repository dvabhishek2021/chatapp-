import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import animationData from "@/assets/react.svg"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
};


export const colors = [
  "bg-[#712c4a57] text-[#ff006e] border-[1px] border-[#ff006faa]",
  "bg-[#ff660a2a] text-[#ff006a] border-[1px] border-[#ff660abb]",
  "bg-[#86d6a02a] text-[#86d6a0] border-[1px] border-[#86d6a0bb]",
  "bg-[#4cc9f02a] text-[#4cc9f0] border-[1px] border-[#4cc9f0bb]",
];

export const getColor = (color)=>{
  if(color >= 0 && color <colors.length){
    return colors[color];
  }
  return colors[0];
};

export const animation = {
  loop:true,
  autoplay:true,
  animationData:animationData,
}
