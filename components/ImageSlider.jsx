'use client'

import Image from 'next/image';
import { useEffect, useRef } from 'react';

export default function ImageSlider({ images, titles, descriptions })
{
    const sliderParentStyle = "w-full h-full mx-auto overflow-x-hidden overflow-y-hidden";
    const sliderStyle = "h-full flex lg:gap-8 md:gap-6 gap-14 items-center justify-start transition ease-out duration-700";
    const imgDivStyle = "flex flex-shrink-0 relative w-full sm:w-auto";
    const svgStyle = "text-slate-200";

    const forwardStyle = "absolute z-30 left-0 ml-10 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer";
    const backwardStyle = "absolute z-30 right-0 mr-10 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400";

    const captionStyle = "bg-gray-800 bg-opacity-30 absolute w-full h-full p-6";
    const titleStyle = "lg:text-xl leading-4 text-base lg:leading-5 text-white";
    const descriptionStyle = "text-xl lg:text-2xl leading-5 lg:leading-6 text-white";

    const nextRef = useRef(null);
    const prevRef = useRef(null);

    useEffect(() =>
    {
        let defaultTransform = 0;

        function goNext() {
          defaultTransform = defaultTransform - 398;
          const slider = document.getElementById("slider");
          if (Math.abs(defaultTransform) >= slider.scrollWidth / 1.7)
            defaultTransform = 0;
          slider.style.transform = "translateX(" + defaultTransform + "px)";
        }
        
        function goPrev() {
          const slider = document.getElementById("slider");
          if (Math.abs(defaultTransform) === 0) defaultTransform = 0;
          else defaultTransform = defaultTransform + 398;
          slider.style.transform = "translateX(" + defaultTransform + "px)";
        }

        nextRef.current.addEventListener("click", goNext);
        prevRef.current.addEventListener("click", goPrev);

    }, [] );

    return (
        <div className="flex items-center justify-center w-full h-full py-24 sm:py-8 px-4">
            <div className="w-full relative flex items-center justify-center">

                {/* slide backward */}
                <button ref={prevRef} id="prev" className={forwardStyle} aria-label="slide backward">
                    <svg className={svgStyle} width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 1L1 7L7 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                {/* slider images */}
                <div className={sliderParentStyle}>
                    <div id="slider" className={sliderStyle}>
                    {
                        images.map( (_img, i) =>
                            <div key={i} className={imgDivStyle}>
                                <Image src={_img} 
                                    alt={`voxelmesh_${i}`}
                                    style={{objectFit: "contain"}} 
                                    width={500} 
                                    className="object-cover object-center w-full" 
                                    priority
                                />
                                <div className={captionStyle}>
                                {
                                    titles ?
                                    <h2 className={titleStyle}>{titles[i]}</h2> : <></>
                                }
                                {
                                    descriptions ?
                                    <div className="flex h-full items-end pb-6">
                                        <h3 className={descriptionStyle}>{descriptions[i]}</h3>
                                    </div> : <></>
                                }
                                </div>
                            </div>
                        )
                    }
                    </div>
                </div>

                {/* slide forward */}
                <button ref={nextRef} id="next" className={backwardStyle} aria-label="slide forward">
                    <svg className={svgStyle} width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L7 7L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
        </div>
    );
}