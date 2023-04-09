"use client";

import { LoggerItem } from "logger";
import { motion } from "framer-motion";
import classNames from "classnames";
import * as React from "react";
import Image from "next/image";

const Card = ({
  title,
  content,
  avatar,
  size,
}: {
  size: "sm" | "lg";
  title: React.ReactElement;
  content: string;
  avatar: string;
}) => {
  return (
    <motion.div
      animate={size}
      className="group p-1 lg:p-4 rounded-lg overflow-hidden text-gray-300 hover:bg-zinc-600/50 transition-all"
    >
      <div className="h-full flex ">
        <div className="flex-shrink-0">
          <motion.div
            initial={{ scale: 1, marginRight: "12px" }}
            variants={{
              sm: { scale: 0.8, marginRight: "4px" },
              lg: { scale: 1, marginRight: "12px" },
            }}
          >
            <Image
              src={avatar}
              alt="avatar"
              width={40}
              height={40}
              className={classNames("rounded-full")}
            />
          </motion.div>
        </div>
        <div className="flex-1">
          <motion.p
            initial={{ fontSize: "16px" }}
            variants={{
              sm: { fontSize: "12px" },
              lg: { fontSize: "16px" },
            }}
            className="text-white leading-5 space-x-2"
          >
            {title}
          </motion.p>
          <motion.p
            initial={{ fontSize: "16px" }}
            variants={{
              sm: { fontSize: "12px" },
              lg: { fontSize: "16px" },
            }}
            className="leading-5 break-all mt-2"
            title={content}
          >
            {content}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

const LoggerList = ({
  data,
  delay,
  hasPrefix,
  oldGroup,
}: {
  oldGroup: number[];
  data: LoggerItem[];
  delay: number;
  hasPrefix: boolean;
}) => {
  return (
    <div className="grid grid-cols-12 gap-1">
      {data.map((item) => {
        const isOld = oldGroup.includes(item.id);
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 50 * (hasPrefix ? -1 : 1) }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                duration: delay,
              },
            }}
            layout="position"
            className={classNames(
              "relative",
              isOld
                ? "col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
                : "col-span-12"
            )}
          >
            <Card
              size={isOld ? "sm" : "lg"}
              avatar={item.user.avatar}
              title={
                <>
                  <span className="inline-block lg:inline">
                    {item.user.username}
                  </span>
                  <span className="inline-block lg:inline text-gray-400">
                    {new Date(item.msgTimestamp).toLocaleString()}
                  </span>
                </>
              }
              content={item.content}
            />
          </motion.div>
        );
      })}
    </div>
  );
};
export default LoggerList;
