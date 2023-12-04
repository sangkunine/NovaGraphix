import Link from 'next/link';
import Image from 'next/image';

import Hero from '../components/Hero';

// import { options } from "./api/auth/[...nextauth]/options"
// import { getServerSession } from "next-auth/next"
// import UserCard from "./components/UserCard"

import ecoplan from '@/public/images/ecoplan.jpg';
import ecolast from '@/public/images/ecolast.jpg';
import natureWorks2018 from '@/public/images/natureworks/natureWorks2018.jpg';
import viewWorks2018 from '@/public/images/viewworks/viewWorks2018.png';
import medVolume from '@/public/images/medicalworks/medVolume.jpg';
import medIsosurface from '@/public/images/medicalworks/medIsosurface.jpg';

import woman_init from '@/public/images/voxelmesh/woman_init.jpg';
import woman_100 from '@/public/images/voxelmesh/woman_100.jpg';
import woman_200 from '@/public/images/voxelmesh/woman_200.jpg';
import adamHead_init from '@/public/images/voxelmesh/adamHead_init.jpg';
import adamHead_100 from '@/public/images/voxelmesh/adamHead_100.jpg';
import voxelMetaverse from '@/public/images/voxelmesh/voxelMetaverse.gif';

export default async function HomePage()
{
    // const session = await getServerSession( options );
    // return (
    //     <>
    //     {session ? (
    //         // <UserCard user={session?.user} pagetype={"Home"} />
    //         <Hero />
    //     ) : (
    //         <h1 className="text-5xl">You Shall Not Pass!</h1>
    //     )}
    //     </>
    // );

    const sectionStyle = "text-gray-600 body-font";
    const sectionChildStyle = "container px-5 py-12 mx-auto flex flex-wrap";
    const projParentStyle = "flex flex-wrap w-full mb-10 flex-col items-center text-center";
    const projStyle = "sm:text-3xl text-2xl font-bold title-font mb-2 text-gray-900";
    const itemFirstStyle = "flex relative pt-10 pb-20 sm:items-center md:w-2/3 mx-auto";
    const itemMidStyle = "flex relative pb-20 sm:items-center md:w-2/3 mx-auto";
    const itemLastStyle = "flex relative pb-10 sm:items-center md:w-2/3 mx-auto";
    const lineParentStyle = "h-full w-10 absolute inset-0 flex items-center justify-center";
    const lineStyle = "h-full w-1 bg-gray-200 pointer-events-none";
    const numStyle = "flex-shrink-0 w-10 h-10 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-indigo-500 text-white relative z-10 title-font font-medium text-sm";
    const svgtxtStyle = "flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row";
    const svgDivStyle = "flex-shrink-0 w-24 h-24 bg-indigo-100 text-indigo-500 rounded-full inline-flex items-center justify-center";
    const txtDivStyle = "flex-grow sm:pl-6 mt-6 sm:mt-0";
    const txtTitleStyle = "font-medium title-font bg-indigo-600 mb-1 py-1 pl-5 rounded-md text-xl text-white";
    const blueBoldText = "text-blue-600 font-bold";

    return (
        <>
            <Hero />

            {/* Past Projects */}
            <section className={sectionStyle}>
                <div className={sectionChildStyle}>

                    <div className={projParentStyle}>
                        <h1 className={projStyle}>PAST PROJECTS</h1>
                    </div>

                    {/* EcoPlan */}
                    <div className={itemFirstStyle}>
                        <div className={lineParentStyle}>
                            <div className={lineStyle}></div>
                        </div>
                        <div className={numStyle}>EP</div>
                        <div className={svgtxtStyle}>
                            {/* <div className={svgDivStyle}>
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-12 h-12" viewBox="0 0 24 24">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                </svg>
                            </div> */}
                            <div className={txtDivStyle}>
                                <h2 className={txtTitleStyle}>EcoPlan<p className="text-sm">(Nov. 2003 – Apr. 2022)</p></h2>
                                <p className="mb-1">EcoPlan is an orthopedic insole design system that enables users to deforms a standard insole to the fully customized insole for a patient. It provides various modeling functions such as parameter-driven modification, mixing corrector shapes, fit-to-foot functions, pressure-based deformation, and so on. Also provided is a machining module that generates a machining tool path for a fast carving of the designed insole.</p>
                                <Image src={ecoplan} alt="ecoplan" priority/>
                            </div>
                        </div>
                    </div>

                    {/* EcoLast */}
                    <div className={itemMidStyle}>
                        <div className={lineParentStyle}>
                            <div className={lineStyle}></div>
                        </div>
                        <div className={numStyle}>EL</div>
                        <div className={svgtxtStyle}>
                            {/* <div className={svgDivStyle}>
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-12 h-12" viewBox="0 0 24 24">
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                </svg>
                            </div> */}
                            <div className={txtDivStyle}>
                                <h2 className={txtTitleStyle}>EcoLast<p className="text-sm">(Nov. 2003 – Apr. 2022)</p></h2>
                                <p className="mb-1">EcoLast is a shoe last design automation system that provides geometric modeling functions that allow users to manipulate a shoe last object for manufacturing orthopedic shoe lasts. Some typical features include parameter-driven modeling functions, fit to foot function and advanced shape modeling functions such as smooth, grading, twisting, bending, rotate heel, etc.</p>
                                <Image src={ecolast} alt="ecolast" priority/>
                                <p className="mt-1">EcoPlan & EcoLast systems have been installed in over 158 footwear companies, and successfully implemented to bring benefits to a foot patient as well as footwear companies using these systems in European industry. We are currently working with an Italian company.</p>
                            </div>
                        </div>
                    </div>

                    {/* NatureWorks */}
                    <div className={itemMidStyle}>
                        <div className={lineParentStyle}>
                            <div className={lineStyle}></div>
                        </div>
                        <div className={numStyle}>NW</div>
                        <div className={svgtxtStyle}>
                            {/* <div className={svgDivStyle}>
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-12 h-12" viewBox="0 0 24 24">
                                    <circle cx="12" cy="5" r="3"></circle>
                                    <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3"></path>
                                </svg>
                            </div> */}
                            <div className={txtDivStyle}>
                                <h2 className={txtTitleStyle}>NatureWorks<p className="text-sm">(Mar. 2018 – Present)</p></h2>
                                <p className="mb-1"><Link href="https://github.com/sangkunine/NatureWorks">NatureWorks</Link> is a web-based 3D graphics engine for a realistic real-time rendering of Nature, for example, sky, clouds, snows, rain, fish, bubbles, smoke, fire, tree, flowers, grass, water, ocean, ground, terrain, and their combinations, based on the popular javascript library, <Link href="https://threejs.org/">three.js</Link>. It will be upgraded for more realistic rendering, and more features of nature will continue to be inserted for more powerful modeling. You can create any natural features or phenomena you imagine in a way you wish through NatureWorks.</p>
                                <Image src={natureWorks2018} alt="natureWorks2018" priority/>
                            </div>
                        </div>
                    </div>

                    {/* ViewWorks */}
                    <div className={itemMidStyle}>
                        <div className={lineParentStyle}>
                            <div className={lineStyle}></div>
                        </div>
                        <div className={numStyle}>VW</div>
                        <div className={svgtxtStyle}>
                            {/* <div className={svgDivStyle}>
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-12 h-12" viewBox="0 0 24 24">
                                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </div> */}
                            <div className={txtDivStyle}>
                                <h2 className={txtTitleStyle}>ViewWorks<p className="text-sm">(Mar. 2018 – Present)</p></h2>
                                <p className="mb-1"><Link href="https://github.com/sangkunine/ViewWorks">ViewWorks</Link> is a web-based 3D model viewer for fast rendering of the most common 3D model files such as JSON, OBJ(+MTL), STL, PLY, DAE(COLLADA), GLTF, GLB, AMF, 3MF, WRL(VRML), FBX, 3DS, DRC, KMZ, MD2, SVG, VTK, using the renowned javascript library, <Link href="https://threejs.org/">three.js</Link>.</p>
                                <Image src={viewWorks2018} alt="viewWorks2018" priority/>
                            </div>
                        </div>
                    </div>

                    {/* MedicalWorks */}
                    <div className={itemLastStyle}>
                        <div className={lineParentStyle}>
                            <div className={lineStyle}></div>
                        </div>
                        <div className={numStyle}>MW</div>
                        <div className={svgtxtStyle}>
                            {/* <div className={svgDivStyle}>
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-12 h-12" viewBox="0 0 24 24">
                                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                    <path d="M22 4L12 14.01l-3-3"></path>
                                </svg>
                            </div> */}
                            <div className={txtDivStyle}>
                                <h2 className={txtTitleStyle}>MedicalWorks<p className="text-sm">(Mar. 2018 – Present)</p></h2>
                                <p className="mb-1"><Link href="https://github.com/sangkunine/MedicalWorks">MedicalWorks</Link> is a web-based 3D medical solution that will provide versatile tools that import various kinds of medical files, construct anatomical models from these files, design patient-specific guides, and export the 3D models for CAE analysis or 3D printing.</p>
                                <div className="grid grid-cols-2 gap-2 place-content-center">
                                    <Image className="inline" src={medVolume} alt="medVolume" priority/>
                                    <Image className="inline" src={medIsosurface} alt="medIsosurface" priority/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Current Projects */}
            <section className={sectionStyle}>
                <div className={sectionChildStyle}>

                    <div className={projParentStyle}>
                        <h1 className={projStyle}>CURRENT PROJECTS</h1>
                    </div>

                    {/* VoxelMesh */}
                    <div className={itemFirstStyle}>
                        <div className={lineParentStyle}>
                            <div className={lineStyle}></div>
                        </div>
                        <div className={numStyle}>VX</div>
                        <div className={svgtxtStyle}>
                            {/* <div className={svgDivStyle}>
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-12 h-12" viewBox="0 0 24 24">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                </svg>
                            </div> */}
                            <div className={txtDivStyle}>
                                <h2 className={txtTitleStyle}>VoxelMesh<p className="text-sm">(Dec. 2022 – Present)</p></h2>
                                <p className="mb-1">VoxelMesh is a 3D WebGL-based voxel engine that easily creates 3D voxel models with a concise voxel structure, which allocates 4 bytes or 8 bytes per voxel, for 3D computer games and metaverse construction. Click <Link href="/products/voxelmesh">here</Link> for more detailed information.</p>
                                <div className="flex flex-row items-center text-center">
                                    <div className="flex-grow">
                                        <Image className="inline h-80 w-1/3" src={woman_init} alt="woman_init" priority/>
                                        <Image className="inline h-80 w-1/3" src={woman_100} alt="woman_100" priority/>
                                        <Image className="inline h-80 w-1/3" src={woman_200} alt="woman_200" priority/>
                                    </div>
                                    <div className="flex-grow">
                                        <Image className="inline h-80 w-1/2" src={adamHead_init} alt="adamHead_init" priority/>
                                        <Image className="inline h-80 w-1/2" src={adamHead_100} alt="adamHead_100" priority/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Voxel Metaverse */}
                    <div className={itemMidStyle}>
                        <div className={lineParentStyle}>
                            <div className={lineStyle}></div>
                        </div>
                        <div className={numStyle}>VM</div>
                        <div className={svgtxtStyle}>
                            {/* <div className={svgDivStyle}>
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-12 h-12" viewBox="0 0 24 24">
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                </svg>
                            </div> */}
                            <div className={txtDivStyle}>
                                <h2 className={txtTitleStyle}>Voxel Metaverse<p className="text-sm">(Dec. 2022 – Present)</p></h2>
                                <p className="mb-1">We are a group of designers to build a 3D voxel metaverse. In the near future, the advanced technology of voxel will be unfolded, and thus the voxel world will be opened.</p>
                                <Image src={voxelMetaverse} alt="voxelMetaverse" priority/>
                            </div>
                        </div>
                    </div>

                    {/* 3D Digital Marketplace */}
                    <div className={itemLastStyle}>
                        <div className={lineParentStyle}>
                            <div className={lineStyle}></div>
                        </div>
                        <div className={numStyle}>DM</div>
                        <div className={svgtxtStyle}>
                            {/* <div className={svgDivStyle}>
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-12 h-12" viewBox="0 0 24 24">
                                    <circle cx="12" cy="5" r="3"></circle>
                                    <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3"></path>
                                </svg>
                            </div> */}
                            <div className={txtDivStyle}>
                                <h2 className={txtTitleStyle}>3D Digital Marketplace<p className="text-sm">(Aug. 2023 – Present)</p></h2>
                                <p><Link href="/marketplace">3D Digital Marketplace</Link> is a web-based digital trading market that buys and sells 3D models. On this website, you can freely purchase the 3D models needed to implement a game or metaverse, and also sell the models you own at a price of your choice. Although the number of 3D models we have to date is smaller than that of other competitors, our geometric modeling and graphic rendering technology for manipulating 3D models will be superior, and we can further meet customer needs in a customized manner through the following utility functions:</p>
                                <p><span className={blueBoldText}>Usefule functions for 3D polygon models</span></p>
                                <ul className="list-disc ml-6">
                                    <li className="leading-relaxed text-base">Correcting data errors in 3D models,</li>
                                    <li className="leading-relaxed text-base">Model composition through Boolean operations,</li>
                                    <li className="leading-relaxed text-base">Model simplification through data simplification, etc.</li>
                                </ul>
                                <p><span className={blueBoldText}>Specialized functions for 3D voxel models</span></p>
                                <ul className="list-disc ml-6">
                                    <li className="leading-relaxed text-base">Voxel modification,</li>
                                    <li className="leading-relaxed text-base">Voxel simplification,</li>
                                    <li className="leading-relaxed text-base">Voxel generation from signed-distance function (SDF) models,</li>
                                    <li className="leading-relaxed text-base">Voxelization of polygon models,</li>
                                    <li className="leading-relaxed text-base">Polygonization of voxel models, etc.</li>
                                </ul>
                                <p>In addition, the following are the main features of this marketplace to ensure user convenience and security.</p>
                                <p><span className={blueBoldText}>File encryption</span></p>
                                <ul className="list-disc ml-6">
                                    <li>All 3D model files in this marketplace are encrypted.</li>
                                    <li>Encrypted model files are stored in the server-side DB (currently using Notion database).</li>
                                    <li>The saved encrypted file is sent to the client upon the client&apos;s request.</li>
                                </ul>
                                <p><span className={blueBoldText}>Take a look at the model</span></p>
                                <ul className="list-disc ml-6">
                                    <li>The overall appearance of the 3D model can be briefly viewed through pre-prepared animated GIFs.</li>
                                    <li>If you click on the model of interest, you can check a more detailed view of the model of interest through the provided 3D viewer. In other words, the model can be dynamically rotated and examined using the mouse.</li>
                                </ul>
                                <p><span className={blueBoldText}>Search for 3D models</span></p>
                                <ul className="list-disc ml-6">
                                    <li>You can find the model file you want in this marketplace using the search function.</li>
                                    <li>You can also perform a more detailed search through the provided filtering function.</li>
                                    <li>In addition, you can use the sorting function to prioritize among searched model files.</li>
                                </ul>
                                <p>Click <Link href="/marketplace">here</Link> to see the 3D digital marketplace created by NovaGraphix.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
