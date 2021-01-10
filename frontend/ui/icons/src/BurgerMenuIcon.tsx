import React from "react";
export const BurgerMenuIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 20 16" fill="none" {...props}>
    <rect width={20} height={2} fill="black" />
    <rect y={7} width={14} height={2} fill="black" />
    <rect y={14} width={20} height={2} fill="black" />
  </svg>
);
