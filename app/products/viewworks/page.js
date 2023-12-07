import Link from 'next/link';
import Image from 'next/image';

import { RunViewWorks } from '@/components/RunWorks';

import leaf from '@/public/images/leaf.png';
import viewExamples from '@/public/images/viewworks/viewExamples.jpg';

export default function ViewWorksPage()
{
    const boxSizeStyle = "xl:w-1/3 md:w-1/2 p-4";
    const boxBorderStyle = "border border-gray-200 p-6 rounded-lg";
    const svgStyle = "dark:bg-slate-800 w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4";
    const h2Style = "text-lg text-gray-900 font-medium title-font mb-2";

    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="mb-20">
                    <Link href="https://www.youtube.com/watch?v=J85_ZMJszNM">
                        <Image src={viewExamples} 
                            alt="viewExamples" 
                            style={{objectFit: "contain"}} 
                            priority
                        />
                    </Link>
                </div>
                <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
                    <h1 className="sm:text-3xl text-2xl font-bold title-font mb-2 text-gray-900">
                        <div className="flex flex-row items-center">
                            <Image src={leaf} alt="leaf" priority/>
                            <span className="text-red-700">V</span>iew
                            <span className="text-blue-700">W</span>orks
                        </div>
                    </h1>
                    <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">Specialized in visualizing any 3D models</p>
                    <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">A WebGL-based 3D model viewer since July 2018</p>
                </div>
                <div className="flex flex-wrap -m-4">
                    <div className={boxSizeStyle}>
                        <div className={boxBorderStyle}>
                            <div className={svgStyle}>
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                </svg>
                            </div>
                            <h2 className={h2Style}>Supported file format</h2>
                            <p className="leading-relaxed text-base">JSON, OBJ(+MTL), STL, PLY, DAE(COLLADA), GLTF, GLB, AMF, 3MF, WRL(VRML), FBX, 3DS, DRC, KMZ, MD2, SVG, VTK</p>
                        </div>
                    </div>
                    <div className={boxSizeStyle}>
                        <div className={boxBorderStyle}>
                            <div className={svgStyle}>
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                                    <circle cx="6" cy="6" r="3"></circle>
                                    <circle cx="6" cy="18" r="3"></circle>
                                    <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                                </svg>
                            </div>
                            <h2 className={h2Style}>Background</h2>
                            <p className="leading-relaxed text-base">In this viewer, three different textures are used as a background. They are wallpaper textures, cube map textures, and animated textures.</p>
                        </div>
                    </div>
                    <div className={boxSizeStyle}>
                        <div className={boxBorderStyle}>
                            <div className={svgStyle}>
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </div>
                            <h2 className={h2Style}>PBR-based floors</h2>
                            <p className="leading-relaxed text-base">These are base floors for improving the visual appearance of the loaded model. These are rendered using PBR techniques. One of these is a circular plate with mirror or glass features.</p>
                        </div>
                    </div>
                    <div className={boxSizeStyle}>
                        <div className={boxBorderStyle}>
                            <div className={svgStyle}>
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"></path>
                                </svg>
                            </div>
                            <h2 className={h2Style}>Drag & drop</h2>
                            <p className="leading-relaxed text-base">3D model files can be loaded to this application by a drag & drop</p>
                        </div>
                    </div>
                    <div className={boxSizeStyle}>
                        <div className={boxBorderStyle}>
                            <div className={svgStyle}>
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
                                </svg>
                            </div>
                            <h2 className={h2Style}>Lights & Shadow</h2>
                            <ul className="list-disc ml-2">
                                <li className="leading-relaxed text-base">Hemisphere light & directional light</li>
                                <li className="leading-relaxed text-base">Shadow maps using the percentage-closer soft shadows technique</li>
                            </ul>
                        </div>
                    </div>
                    <div className={boxSizeStyle}>
                        <div className={boxBorderStyle}>
                            <div className={svgStyle}>
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                </svg>
                            </div>
                            <h2 className={h2Style}>Perspective Camera</h2>
                            <ul className="list-disc ml-2">
                                <li className="leading-relaxed text-base">Fitting the camera to the size of the loaded models</li>
                                <li className="leading-relaxed text-base">Controls the camera to orbit around the models</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="w-full mt-20 text-center">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                        Try the <Link href="https://github.com/sangkunine/ViewWorks" className="text-blue-800 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-400">ViewWorks</Link>
                    </h1>
                    <p className="mb-2">To view your 3D models, drag & drop the model file(s) onto the browser. An upgraded version will be released soon. Please contact us if needed for your project.</p>
                    <RunViewWorks width="100%" height={1080*0.75} />
                </div>
            </div>
        </section>
    );
}