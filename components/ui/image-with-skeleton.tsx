"use client"

import { useState } from "react"
import Image, { type ImageProps } from "next/image"
import { cn } from "@/lib/utils"
import { Skeleton } from "./skeleton"

// Bandera para forzar visualización del skeleton (false = modo normal)
export const FORCE_SKELETON_PREVIEW = false

export interface ImageWithSkeletonProps extends ImageProps {
  wrapperClassName?: string
  skeletonClassName?: string
}

export function ImageWithSkeleton({
  skeletonClassName,
  className,
  alt,
  onLoad,
  onError,
  ...props
}: ImageWithSkeletonProps) {
  const [loaded, setLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  const isImageVisible = loaded && !FORCE_SKELETON_PREVIEW

  return (
    <>
      {(!isImageVisible || hasError) && (
        <Skeleton
          className={cn(
            "absolute inset-0 z-0 size-full rounded-none",
            skeletonClassName
          )}
        />
      )}

      {!hasError && (
        <Image
          alt={alt}
          className={cn(
            "transition-opacity duration-700 ease-out",
            isImageVisible ? "opacity-100" : "opacity-0",
            className
          )}
          onLoad={(e) => {
            setLoaded(true)
            onLoad?.(e)
          }}
          onError={(e) => {
            setHasError(true)
            onError?.(e)
          }}
          {...props}
        />
      )}
    </>
  )
}
