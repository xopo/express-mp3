import { SVG } from '../../assets/svg-content';

type SVGProps = {
    name: string;
    size?: number;
}

export default function SvgIcon({name, size=24}: SVGProps) {
    const target = name in SVG ? name : Object.keys(SVG)[0] as keyof typeof SVG;
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 -960 960 960" width={size}>
            <path d={`${SVG[target]}`}/>
        </svg>
    );
}