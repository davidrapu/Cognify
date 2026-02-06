import logo from "@/assets/images/icons8-brain-pastel-color-32.png";
import { Link } from 'react-router';

type LogoProps = {
    textSize?: number;
    tracking?: number;
}

export default function Logo({ textSize = 1.8, tracking = 0.3 }: LogoProps) {
  return (
    <Link to="/" className="flex flex-row items-center gap-x-1">
      <img src={logo} alt="Logo" />
      <span
        style={{
          fontSize: `${textSize}em`,
          letterSpacing: `${tracking}em`,
        }}
        className="m-0 font-(family-name:--headings)"
      >
        COG-NIFY
      </span>
    </Link>
  );
}
