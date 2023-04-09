import * as React from "react";
import Link from "next/link";
export default async function Page() {
  return (
    <div className="space-y-8">
      <div className="flex min-h-screen flex-col items-center justify-center py-2">
        <main className="mx-auto w-auto px-4 pt-16 pb-8 sm:pt-24 lg:px-8">
          <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 place-content-evenly">
            <li className="ui-group ui-mt-4 ui-rounded-lg ui-border ui-border-transparent ui-overflow-hidden ui-bg-origin-border ui-bg-gradient-to-r ui-from-brandred ui-to-brandblue ui-text-[#6b7280]">
              <div className="ui-p-4 ui-bg-zinc-900 ui-h-full">
                <Link
                  href={{ pathname: "/events" }}
                  className="ui-inline-block ui-text-xl ui-text-white"
                >
                  Events logger
                </Link>
              </div>
            </li>
            <li className="ui-group ui-mt-4 ui-rounded-lg ui-border ui-border-transparent ui-overflow-hidden ui-bg-origin-border ui-bg-gradient-to-r ui-from-brandred ui-to-brandblue ui-text-[#6b7280]">
              <div className="ui-p-4 ui-bg-zinc-900 ui-h-full">
                <Link
                  href={{ pathname: "/messages" }}
                  className="ui-inline-block ui-text-xl ui-text-white"
                >
                  Messages logger
                </Link>
              </div>
            </li>
          </ul>
        </main>
      </div>
    </div>
  );
}
