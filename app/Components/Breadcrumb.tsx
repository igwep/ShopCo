'use client'; 

import Link from "next/link";
import { usePathname } from "next/navigation"; 
import Image from "next/image";

const Breadcrumb = () => {
  const pathname = usePathname(); 
  const pathSegments = pathname.split("/").filter(Boolean);

  const buildHref = (index: number) => "/" + pathSegments.slice(0, index + 1).join("/");

  return (
    <nav className="text-sm text-gray-500 my-4" aria-label="Breadcrumb">
      <ol className="list-none p-0 inline-flex">
        <li className="flex items-center">
          <Link href="/" className="hover:underline text-gray-500">
            Home
          </Link>
          {pathSegments.length > 0 && <span className="mx-2">
            <Image 
                src="/SVG/breadcrumbArrow.svg"
                alt=">"
                width={10}
                height={10}
                className="w-3 h-3"
                />
            </span>}
        </li>
        {pathSegments.map((segment, index) => {
          const href = buildHref(index);
          const isLast = index === pathSegments.length - 1;
          const formatted = decodeURIComponent(segment.replace(/-/g, " "));
          return (
            <li key={index} className="flex items-center">
              {!isLast ? (
                <>
                  <Link href={href} className="hover:underline text-blue-600 capitalize">
                    {formatted}
                  </Link>
                  <span className="mx-2">/</span>
                </>
              ) : (
                <span className="capitalize text-gray-700 font-semibold" aria-current="page">
                  {formatted}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
