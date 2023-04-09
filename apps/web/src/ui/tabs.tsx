"use client";

import classNames from "classnames";
import Link from "next/link";

const links = [
  { label: "Home", path: "/" },
  { label: "Messages", path: "/messages" },
  { label: "Events", path: "/events" },
] as const;

const Tabs = ({ path }: { path: (typeof links)[number]["path"] }) => {
  return (
    <nav className="flex space-x-4" aria-label="Tabs">
      {links.map((tab) => (
        <Link
          key={tab.path}
          href={{ pathname: tab.path }}
          className={classNames(
            path === tab.path
              ? "bg-gray-400 text-gray-700"
              : "text-gray-300 hover:bg-gray-700 hover:text-white",
            "rounded-md px-3 py-2 text-sm font-medium"
          )}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
};

export default Tabs;
