import React from 'react'
import logo from "../assets/icons8-brain-pastel-color-32.png";
import { Link } from 'react-router-dom';

type LogoProps = {
    textSize?: string;
    tracking?: string;
}

export default function Logo({textSize = "1.8em", tracking = "0.3em"}: LogoProps) {
  return (
    <Link to="/" className="flex flex-row items-center gap-x-1">
      <img src={logo} alt="Logo" />
      <span className={`m-0 text-[${textSize}] font-(family-name:--headings) tracking-[${tracking}] `}>
        COGNIFY
      </span>
    </Link>
  );
}
