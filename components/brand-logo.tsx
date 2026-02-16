import Link from "next/link"
import { cn } from "@/lib/utils"

export default function BrandLogo({ className, href }: { className?: string; href?: string }) {
  const Wrapper = href ? Link : "div"
  return (
    <Wrapper href={href!} className={cn("flex items-center gap-0", className)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 600 609"
        className="h-10 w-10 text-primary"
        fill="currentColor"
      >
        <g transform="translate(0,609) scale(0.1,-0.1)">
          <path d="M2377 4463 c-4 -3 -7 -111 -7 -240 l0 -233 -205 0 -205 0 0 -235 0 -235 -210 0 -210 0 0 -955 0 -955 210 0 210 0 0 565 0 565 205 0 205 0 0 -565 0 -565 215 0 215 0 0 565 0 565 200 0 200 0 0 -565 0 -565 215 0 215 0 0 565 0 565 205 0 205 0 0 -565 0 -565 210 0 210 0 0 955 0 955 -211 0 -211 0 3 83 c2 45 2 151 1 235 l-2 152 -205 0 -205 0 -2 238 -3 237 -621 3 c-341 1 -624 -1 -627 -5z" />
        </g>
      </svg>
      <span className="font-mono text-lg font-semibold tracking-tight text-primary">asesley</span>
    </Wrapper>
  )
}
