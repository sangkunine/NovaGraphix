import Link from 'next/link';
import Image from 'next/image';

import { RunMedicalWorks } from '@/components/RunWorks';

import leaf from '@/public/images/leaf.png';
import medSlicer from '@/public/images/medicalworks/medSlicer.jpg';
// import medVolume from '@/public/images/medicalworks/medVolume.jpg';
// import medIsosurface from '@/public/images/medicalworks/medIsosurface.jpg';

export default function MedicalWorksPage()
{
    const boxSizeStyle = "xl:w-1/3 md:w-1/2 p-4";
    const boxBorderStyle = "border border-gray-200 p-6 rounded-lg";
    const svgStyle = "dark:bg-slate-800 w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4";
    const h2Style = "text-lg text-gray-900 font-medium title-font mb-2";
    const liStyle = "leading-relaxed text-base";

    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="mb-20">
                    <Link href="https://www.youtube.com/watch?v=VMqlCWnPZVg&t=133s">
                        <div className="mb-10">
                            <Image src={medSlicer} 
                                alt="medSlicer" 
                                style={{objectFit: "contain"}} 
                                priority
                            />
                        </div>
                        {/* <div className="mb-10 grid grid-cols-2 gap-2 place-content-center">
                            <Image className="inline" src={medVolume} alt="medVolume" priority/>
                            <Image className="inline" src={medIsosurface} alt="medIsosurface" priority/>
                        </div> */}
                    </Link>
                </div>
                <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
                    <h1 className="sm:text-3xl text-2xl font-bold title-font mb-2 text-gray-900">
                        <div className="flex flex-row items-center">
                            <Image src={leaf} alt="leaf" priority/>
                            <span className="text-red-700">M</span>edical
                            <span className="text-blue-700">W</span>orks
                        </div>
                    </h1>
                    <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">Specialized in medical imaging & volume visualization</p>
                    <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">A WebGL-based 3D medical solution since July 2018</p>
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
                            <p className={liStyle}>DCM (DIC, DICOM, IMA, DCM without extension), NII, NRRD, MHD, MGH, MGZ</p>
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
                            <h2 className={h2Style}>Workspaces for user-friendly GUI</h2>
                            <ul className="list-disc ml-2">
                                <li className={liStyle}>Quad workspace: 3 sectional views (axial, sagittal, coronal) and one 3D perspective view</li>
                                <li className={liStyle}>Slices workspace: 2D slice views of the medical volume are shown in slices workspace</li>
                            </ul>
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
                            <h2 className={h2Style}>Three different model representations</h2>
                            <ul className="list-disc ml-2">
                                <li className={liStyle}>Slicer: slice image interpolated with 2D texture array</li>
                                <li className={liStyle}>Volume: 3D volume rendering based on ray marching technique</li>
                                <li className={liStyle}>Isosurface: polygonal mesh extracted from 3D volumetric data using marching cubes technique</li>
                            </ul>
                        </div>
                    </div>
                    <div className={boxSizeStyle}>
                        <div className={boxBorderStyle}>
                            <div className={svgStyle}>
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"></path>
                                </svg>
                            </div>
                            <h2 className={h2Style}>Basic sketchers</h2>
                            <ul className="list-disc ml-2">
                                <li className={liStyle}>Ruler: measure the distance between two positions</li>
                                <li className={liStyle}>Angle: measure the angle between two segments defined by three handle points</li>
                                <li className={liStyle}>Rectangle: compute the mean, standard deviation, maximum/minimum, and area from the sketched rectangle</li>
                                <li className={liStyle}>Polygon: similar to the rectangle, but the sketched geometry is a polygon</li>
                            </ul>
                        </div>
                    </div>
                    <div className={boxSizeStyle}>
                        <div className={boxBorderStyle}>
                            <div className={svgStyle}>
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
                                </svg>
                            </div>
                            <h2 className={h2Style}>Advanced sketchers</h2>
                            <ul className="list-disc ml-2">
                                <li className={liStyle}>Biruler: Measure length and angle by selecting three points</li>
                                <li className={liStyle}>Freehand: similar to the rectangle, but the sketched geometry is a free-form curve</li>
                                <li className={liStyle}>Annotation: text message which user would like to write down</li>
                                <li className={liStyle}>VoxelProbe: compute LPS and IJK coordinates and also optical intensity at that point</li>
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
                            <h2 className={h2Style}>Future Works</h2>
                            <p className="leading-relaxed text-base">MedicalWorks is a 3D WebGL-based medical solution that will provide versatile tools that import various kinds of medical files, construct anatomical models from these files, design patient-specific guides, and export the 3D models for CAE analysis or 3D printing.</p>
                        </div>
                    </div>
                </div>
                <div className="w-full mt-20 text-center">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                        Try the <Link href="https://github.com/sangkunine/MedicalWorks" className="text-blue-800 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-400">MedicalWorks</Link>
                    </h1>
                    <div className="mb-2">
                        <span className="mr-1">Please refer</span>
                        <Link href="https://github.com/sangkunine/MedicalWorks" className="text-blue-800 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-400">here</Link> 
                        <span className="ml-1">for detailed instructions on how to use this software.</span>
                    </div>
                    <RunMedicalWorks width="100%" height={1080*0.75} />
                </div>
            </div>
        </section>
    );
}