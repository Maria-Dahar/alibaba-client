// Breadcrumbs.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";

function Breadcrumbs({ className = '', paths }) {
  const location = useLocation();

  const generatedPaths = React.useMemo(() => {
    if (paths && paths.length > 0) return paths;

    const segments = location.pathname.split("/").filter(Boolean);
    let currentPath = "";
    return [
      { label: "Home", href: "/" },
      ...segments.map((segment, index) => {
        currentPath += `/${segment}`;
        return {
          label: decodeURIComponent(segment)
            .replace(/-/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase()),
          href: currentPath,
        };
      }),
    ];
  }, [paths, location.pathname]);

  return (
    <nav className={`flex items-center text-sm text-gray-500 ${className}`}>
      <ol className="flex flex-wrap items-center space-x-1">
        {generatedPaths.map((path, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <span className="mx-1">
                <FaAngleRight className="mt-0.5" />
              </span>
            )}
            {index === generatedPaths.length - 1 ? (
              <span className="text-gray-700 font-medium">{path.label}</span>
            ) : (
              <Link to={path.href} className="hover:text-blue-500">
                {path.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
