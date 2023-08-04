import React from 'react';

export interface LazyImageProps {
    alt?: string;
    src?: string;
    blur?: number;
    ratio?: string;
    width?: number;
    height?: number;
    duration?: number;
    thumbnail?: string;
    className?: string;
    imageClass?: string;
    overlayClass?: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    imageStyle?: React.CSSProperties;
    overlayStyle?: React.CSSProperties;
    props?: React.HTMLAttributes<HTMLDivElement>;
    imageProps?: React.HTMLAttributes<HTMLDivElement>;
    overlayProps?: React.HTMLAttributes<HTMLSpanElement>;
};


/**
 * Render an Image with lazy loading.
 *
 * @param alt - Define an alt tag for the rendered image.
 * @param blur - Define a blur for the thumbnail, rendered as backdropFilter: `blur(${blur}px)`.
 * @param children - Add additional children inside the LazyImage component.
 * @param className - Add classes to the LazyImage component.
 * @param duration - Define a transition duration for the fading of image.
 * @param imageClass - Add classes to the LazyImage - img component.
 * @param props - Add additional props to the LazyImage component.
 * @param imageProps - Add additional props to the LazyImage - img component.
 * @param imageStyle - Add additional styles to the LazyImage - img component.
 * @param overlayProps - Add additional props to the LazyImage - overlay component.
 * @param overlayClass - Add classes to the LazyImage - overlay component.
 * @param overlayStyle - Add additional styles to the LazyImage - overlay component.
 * @param height - Add a height to the image (works only if `width` is provided).
 * @param ratio - Define the ratio of image to be rendered (alternative of `width / height`).
 * @param src - Add the source of image.
 * @param style - Add additional styles to the LazyImage component.
 * @param thumbnail - Add a thumbnail to be loaded before the main image loads.
 * @param width - Add a width to the image (works only if `height` is provided).
 */

export function LazyImage({
    alt = "",
    blur = 8,
    children,
    className = "",
    duration = 500,
    imageClass = "",
    height,
    props = {},
    imageProps = {},
    imageStyle = {},
    overlayClass = "",
    overlayProps = {},
    overlayStyle = {},
    ratio,
    src,
    style = {},
    thumbnail,
    width,
}: LazyImageProps) {
    return (
        <div
            className={`LazyImage ${className}`}
            style={{
                aspectRatio: ((width && height) ? `${width} / ${height}` : (ratio || "initial")),
                backgroundImage: `url(${thumbnail})`,
                ...(style || {}),
            }}
            {...props}
        >
            <em
                style={{
                    backdropFilter: `blur(${blur}px)`,
                    ...(overlayStyle || {}),
                }}
                className={overlayClass}
                {...overlayProps}
            ></em>
            <img
                src={src}
                alt={alt ?? 'LazyImage'}
                style={{
                    transitionDuration: `${duration}ms`,
                    ...(imageStyle || {}),
                }}
                width={width}
                height={height}
                className={imageClass}
                loading='lazy'
                onLoad={(e) => ((e.target as HTMLImageElement).style.opacity = "1")}
                {...imageProps}
            />
            {children}
        </div>
    );
}

export default LazyImage;
