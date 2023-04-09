import * as React from "react";
import Image from "next/image";

export const Card = ({
  title,
  content,
  avatar,
}: {
  title: React.ReactElement;
  content: string;
  avatar: string;
}) => {
  return (
    <div className="ui-group ui-py-4 ui-rounded-lg ui-overflow-hidden ui-text-gray-300">
      <div className=" ui-bg-zinc-900 ui-h-full">
        <div className="ui-flex ui-space-x-4">
          <div className="ui-flex-shrink-0">
            <Image
              src={avatar}
              alt="avatar"
              width={40}
              height={40}
              className="ui-rounded-full"
            />
          </div>
          <div className="ui-flex-1">
            <p className="ui-text-white ui-leading-5 ui-space-x-2">{title}</p>
            <p className="ui-text-base  ui-leading-6">{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
