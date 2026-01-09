"use client";

import { IKImage } from "imagekitio-next";
import React from "react";

interface LogoProps {
    path?: string | null;
    alt: string;
    fallbackClassName?: string;
    fallbackIcon?: React.ReactNode;
}

export function Logo({ path, alt, fallbackClassName, fallbackIcon }: LogoProps) {
    if (!path) {
        return (
            <div className={fallbackClassName}>
                {fallbackIcon}
            </div>
        );
    }

    return (
        <div className={`${fallbackClassName} relative overflow-hidden bg-background`}>
             <IKImage
                urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT}
                {...(path.startsWith("http") ? { src: path } : { path: path })}
                transformation={[{ height: "100", width: "100" }]}
                loading="lazy"
                className="object-cover h-full w-full"
                alt={alt}
            />
        </div>
    );
}
