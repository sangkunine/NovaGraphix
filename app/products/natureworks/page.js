import Link from 'next/link';
import Image from 'next/image';

import leaf from '@/public/images/leaf.png';

import windyTerrain from '@/public/images/natureworks/windyTerrain.jpg';
import woodedMountain from '@/public/images/natureworks/woodedMountain.jpg';
import snowyCanyon from '@/public/images/natureworks/snowyCanyon.jpg';
import terrainGiant from '@/public/images/natureworks/terrainGiant.jpg';
import waterMinecraft from '@/public/images/natureworks/waterMinecraft.jpg';
import natureWorks2018 from '@/public/images/natureworks/natureWorks2018.jpg';

import desertCave from '@/public/images/natureworks/desertCave.jpg';
import floatingCave from '@/public/images/natureworks/floatingCave.jpg';
import darkTunnel from '@/public/images/natureworks/darkTunnel.jpg';
import forestGodray from '@/public/images/natureworks/forestGodray.jpg';

import aquariumFish from '@/public/images/natureworks/aquariumFish.jpg';
import windingRiver from '@/public/images/natureworks/windingRiver.jpg';
import swimmingFish from '@/public/images/natureworks/swimmingFish.png';
import sharkHerd from '@/public/images/natureworks/sharkHerd.jpg';

import materialCap from '@/public/images/natureworks/materialCap.jpg';
import solarSystem from '@/public/images/natureworks/solarSystem.jpg';


export default function NatureWorksPage()
{
    const titleDivStyle = "py-8 flex flex-wrap md:flex-nowrap";
    const spanDivStyle = "md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col";
    const spanTitleStyle = "font-semibold title-font text-gray-700";
    const spanDateStyle = "mt-1 text-gray-500 text-sm";

    const contentStyle = "md:flex-grow";
    const h2Style = "text-2xl font-medium text-gray-900 title-font mb-2";
    const ulStyle = "list-disc ml-2";
    const liStyle = "leading-relaxed text-base";

    const blueBoldText = "text-blue-600 font-bold";

    const gridC2R3Style = "mx-52 mb-10 grid gap-4 grid-cols-2 grid-rows-3";
    const gridC2R2Style = "mx-52 mb-10 grid gap-4 grid-cols-2 grid-rows-2";
    const gridC2R1Style = "mx-52 mb-10 grid gap-4 grid-cols-2 grid-rows-1";

    return (
        <section className="text-gray-600 body-font overflow-hidden">

            {/* <ImageSlider images={images} /> */}

            <div className="container px-5 py-24 mx-auto">

                <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
                    <h1 className="sm:text-3xl text-2xl font-bold title-font mb-2 text-gray-900">
                        <div className="flex flex-row items-center">
                            <Image src={leaf} alt="leaf" priority/>
                            <span className="text-red-700">N</span>ature
                            <span className="text-blue-700">W</span>orks
                        </div>
                    </h1>
                    <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">Specialized in modeling and processing 3D models associated with Nature</p>
                    <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">A WebGL-based 3D rendering engine since July 2018</p>
                </div>

                <div className="-my-8 divide-y-2 divide-gray-100">
                    {/* TECHNIQUES */}
                    <div className={titleDivStyle}>
                        <div className={spanDivStyle}>
                            <span className={spanTitleStyle}>TECHNIQUES</span>
                            <span className={spanDateStyle}>April 11, 2023</span>
                        </div>
                        <div className={contentStyle}>
                            <h2 className={h2Style}>Underlying Technologies</h2>
                            <ul className={ulStyle}>
                                <li className={liStyle}><span className={blueBoldText}>Development environment</span></li>
                                <ul className='ml-3'>
                                    <li className='list-decimal'>HTML, CSS, Javascript, C++</li>
                                    <li className='list-decimal'>Node.js, Npm, GitHub, VSCode, WebGL(three.js), GLSL Shaders</li>
                                    <li className='list-decimal'>GPGPU (for parallel computing), PBR(physically-based rendering)</li>
                                </ul>
                            </ul>
                            <ul className={ulStyle}>
                                <li className={liStyle}><span className={blueBoldText}>Supported modules</span></li>
                                <ul className='ml-3'>
                                    <li className='list-decimal'>Raymarching, Tween, 3D Volume Rendering, Isosurface Polygonizer</li>
                                    <li className='list-decimal'>Fast Delaunay Triangulation, Radial Basis Function (RBF)</li>
                                    <li className='list-decimal'>Kd-Tree and Sparse-Octree, High-Performance Linear Algebra</li>
                                </ul>
                            </ul>
                        </div>
                    </div>

                    {/* DIGITAL ASSETS */}
                    <div className={titleDivStyle}>
                        <div className={spanDivStyle}>
                            <span className={spanTitleStyle}>DIGITAL ASSETS</span>
                            <span className={spanDateStyle}>April 11, 2023</span>
                        </div>
                        <div className={contentStyle}>
                            <h2 className={h2Style}>Nature assets</h2>
                            <p>
                                This application provides 23 different kinds of realistic natures for non-experts. They are sunlight, sky (sky dome), clouds (cloud dome), snows, rain, boids(e.g., a school of fish), curl noise, curl particles, bubbles (sprite bubbles), smoke, volume fire, fire particles, tree, tufts(e.g., flower, grass), water, ocean, ground, terrain, GPU particles, and ray marching-based natures (e.g., terrain, tunnel, galaxy, mountains, canyon, caves, sea, river, forest, fish, etc)”. Note that the ray marching-based natures were inspired by Shadertoy
                            </p>
                        </div>
                    </div>

                    {/* MODELING HISTORY */}
                    <div className={titleDivStyle}>
                        <div className={spanDivStyle}>
                            <span className={spanTitleStyle}>MODELING HISTORY</span>
                            <span className={spanDateStyle}>April 11, 2023</span>
                        </div>
                        <div className={contentStyle}>
                            <h2 className={h2Style}>Undo / redo</h2>
                            <p>
                                The undo function is used to erase the last change done to the document reverting it to an older state. And redo is used to rerun the recent actions you undid. Note that there is no limit to the number of undo operations.
                            </p>
                        </div>
                    </div>

                    {/* FILE SAVE */}
                    <div className={titleDivStyle}>
                        <div className={spanDivStyle}>
                            <span className={spanTitleStyle}>FILE SAVE</span>
                            <span className={spanDateStyle}>April 11, 2023</span>
                        </div>
                        <div className={contentStyle}>
                            <h2 className={h2Style}>Auto save</h2>
                            <p>
                                Like Google documents, all changed data is automatically saved. Note that if the data size exceeds the capacity of your web browser used, the storage may fail. In this case, you need to use the pop-up menu (File / Save As) to save the changed data.
                            </p>
                        </div>
                    </div>

                    {/* MODEL STRUCTURE */}
                    <div className={titleDivStyle}>
                        <div className={spanDivStyle}>
                            <span className={spanTitleStyle}>MODEL STRUCTURE</span>
                            <span className={spanDateStyle}>April 11, 2023</span>
                        </div>
                        <div className={contentStyle}>
                            <h2 className={h2Style}>Scene graph</h2>
                            <p>
                                In a scene graph with a tree structure, a node marked with a check box is a parent node having a child node, and a node without a check box is a leaf node. Each node has a colored box preceded by its name, and if it is a mesh, there is a blue node pointing to the geometry and a green node pointing to the material next to it. The selected node is displayed in red, and you can edit the details of that node through the right-click context menu.
                            </p>
                        </div>
                    </div>

                    {/* MATERIALS */}
                    <div className={titleDivStyle}>
                        <div className={spanDivStyle}>
                            <span className={spanTitleStyle}>MATERIALS</span>
                            <span className={spanDateStyle}>April 11, 2023</span>
                        </div>
                        <div className={contentStyle}>
                            <h2 className={h2Style}>Material libraries</h2>
                            <ul className={ulStyle}>
                                <li className={liStyle}><span className={blueBoldText}>MatCap library</span></li>
                                <p>
                                    You can apply Matcap material to an object using the Matcap material library of 50 textures. Note that a custom material map can be also applied by dropping it to the last element of material drop zone.
                                </p>
                            </ul>
                            <ul className={ulStyle}>
                                <li className={liStyle}><span className={blueBoldText}>Normal map library</span></li>
                                <p>
                                    You can adjust the normal map of material through the 26 normal textures and normal scale adjustments.
                                </p>
                            </ul>
                        </div>
                    </div>

                    {/* MODELING TOOLS */}
                    <div className={titleDivStyle}>
                        <div className={spanDivStyle}>
                            <span className={spanTitleStyle}>MODELING TOOLS</span>
                            <span className={spanDateStyle}>April 11, 2023</span>
                        </div>
                        <div className={contentStyle}>
                            <h2 className={h2Style}>Boolean operations</h2>
                            <ul className={ulStyle}>
                                <li className={liStyle}><span className={blueBoldText}>Union</span>: it obtains the union of two meshes.</li>
                                <li className={liStyle}><span className={blueBoldText}>Intersect</span>: it gets the intersection of two meshes.</li>
                                <li className={liStyle}><span className={blueBoldText}>Subtract</span>: tt obtains the difference set between two meshes.</li>
                            </ul>
                        </div>
                    </div>

                    {/* OBJECT-ORIENTED GUI */}
                    <div className={titleDivStyle}>
                        <div className={spanDivStyle}>
                            <span className={spanTitleStyle}>OBJECT-ORIENTED GUI</span>
                            <span className={spanDateStyle}>April 11, 2023</span>
                        </div>
                        <div className={contentStyle}>
                            <h2 className={h2Style}>Context menu</h2>
                            <p>
                                The context menus appears when selecting objects by mouse right-clicking. You can edit various properties of the 3D model using this context menu.
                            </p>
                        </div>
                    </div>

                    {/* FILE LOADING */}
                    <div className={titleDivStyle}>
                        <div className={spanDivStyle}>
                            <span className={spanTitleStyle}>FILE LOADING</span>
                            <span className={spanDateStyle}>April 11, 2023</span>
                        </div>
                        <div className={contentStyle}>
                            <h2 className={h2Style}>Importing files</h2>
                            <p>
                                You can load 3D model files using the pop-up menu (FILE / Open Files...) or drag & drop them to your web browser. Supported file formats are JSON, OBJ(+MTL), STL, PLY, DAE(COLLADA), GLTF, GLB, AMF, 3MF, WRL(VRML), and FBX.
                            </p>
                        </div>
                    </div>

                    {/* EXAMPLES */}
                    <div>
                        {/* TERRAIN | MOUNTAIN */}
                        <div className={titleDivStyle}>
                            <div className={spanDivStyle}>
                                <span className={spanTitleStyle}>EXAMPLES 01</span>
                                <span className={spanDateStyle}>April 11, 2023</span>
                            </div>
                            <div className={contentStyle}>
                                <h2 className={h2Style}>TERRAIN | MOUNTAIN</h2>
                            </div>
                        </div>
                        <div className={gridC2R3Style}>
                            <div><Link href="https://www.youtube.com/watch?v=dyTR0QwO0f0"><Image src={windyTerrain} alt="windyTerrain" priority/></Link></div>
                            <div><Link href="https://www.youtube.com/watch?v=v-Q2cD27jGc"><Image src={woodedMountain} alt="woodedMountain" priority/></Link></div>
                            <div><Link href="https://www.youtube.com/watch?v=Pkw-hHLoYRU"><Image src={snowyCanyon} alt="snowyCanyon" priority/></Link></div>
                            <div><Link href="https://www.youtube.com/watch?v=Anq8Vp7NYt4"><Image src={terrainGiant} alt="terrainGiant" priority/></Link></div>
                            <div><Link href="https://www.youtube.com/watch?v=u9WfOsgZgaM"><Image src={waterMinecraft} alt="waterMinecraft" priority/></Link></div>
                            <div><Link href="https://www.youtube.com/watch?v=c_-D8cDiuR4"><Image src={natureWorks2018} alt="natureWorks2018" priority/></Link></div>
                        </div>

                        {/* CAVE | TUNNEL | FOREST */}
                        <div className={titleDivStyle}>
                            <div className={spanDivStyle}>
                                <span className={spanTitleStyle}>EXAMPLES 02</span>
                                <span className={spanDateStyle}>April 11, 2023</span>
                            </div>
                            <div className={contentStyle}>
                                <h2 className={h2Style}>CAVE | TUNNEL | FOREST</h2>
                            </div>
                        </div>
                        <div className={gridC2R2Style}>
                            <div><Link href="https://www.youtube.com/watch?v=VYRiIflwX28"><Image src={desertCave} alt="desertCave" priority/></Link></div>
                            <div><Link href="https://www.youtube.com/watch?v=noaDNz_fFg4"><Image src={floatingCave} alt="floatingCave" priority/></Link></div>
                            <div><Link href="https://www.youtube.com/watch?v=noaDNz_fFg4"><Image src={darkTunnel} alt="darkTunnel" priority/></Link></div>
                            <div><Link href="https://www.youtube.com/watch?v=DgTqGocCzrQ"><Image src={forestGodray} alt="forestGodray" priority/></Link></div>
                        </div>

                        {/* WATER | OCEAN */}
                        <div className={titleDivStyle}>
                            <div className={spanDivStyle}>
                                <span className={spanTitleStyle}>EXAMPLES 03</span>
                                <span className={spanDateStyle}>April 11, 2023</span>
                            </div>
                            <div className={contentStyle}>
                                <h2 className={h2Style}>WATER | OCEAN</h2>
                            </div>
                        </div>
                        <div className={gridC2R2Style}>
                            <div><Link href="https://www.youtube.com/watch?v=ZBYj8Rt8WWU"><Image src={aquariumFish} alt="aquariumFish" priority/></Link></div>
                            <div><Link href="https://www.youtube.com/watch?v=Y-VRa32v79s"><Image src={windingRiver} alt="windingRiver" priority/></Link></div>
                            <div><Link href="https://www.youtube.com/watch?v=YkWvis8Sa5w"><Image src={swimmingFish} alt="swimmingFish" priority/></Link></div>
                            <div><Link href="https://www.youtube.com/watch?v=uW9iR3bVI2k"><Image src={sharkHerd} alt="sharkHerd" priority/></Link></div>
                        </div>

                        {/* OTHERS */}
                        <div className={titleDivStyle}>
                            <div className={spanDivStyle}>
                                <span className={spanTitleStyle}>EXAMPLES 04</span>
                                <span className={spanDateStyle}>April 11, 2023</span>
                            </div>
                            <div className={contentStyle}>
                                <h2 className={h2Style}>OTHERS</h2>
                            </div>
                        </div>
                        <div className={gridC2R1Style}>
                            <div><Link href="https://www.youtube.com/watch?v=SsJpGNiHFCc"><Image src={materialCap} alt="materialCap" priority/></Link></div>
                            <div><Link href="https://www.youtube.com/watch?v=AjudxR3_WaA"><Image src={solarSystem} alt="solarSystem" priority/></Link></div>
                        </div>
                    </div>
                </div>

                <div className="w-full mt-20 text-center">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                        Try the <Link href="https://github.com/sangkunine/NatureWorks" className="text-blue-800 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-400">NatureWorks</Link>
                    </h1>
                    <div className="mb-2">
                        <span className="mr-1">Please refer</span>
                        <Link href="https://github.com/sangkunine/NatureWorks" className="text-blue-800 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-400">here</Link> 
                        <span className="ml-1">for detailed instructions on how to use this software.</span>
                    </div>
                    <iframe src="https://sangkunine.github.io/NatureWorks/" width="100%" height={1080*0.75} />
                </div>

            </div>
        </section>
    )
}