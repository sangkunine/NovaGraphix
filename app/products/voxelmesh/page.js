import Link from 'next/link';
import Image from 'next/image';
import ImageSlider from '@/components/ImageSlider';

import sliderVoxels_01 from '@/public/images/voxelmesh/sliderVoxels_01.png';
import sliderVoxels_02 from '@/public/images/voxelmesh/sliderVoxels_02.png';
import sliderVoxels_03 from '@/public/images/voxelmesh/sliderVoxels_03.png';
import sliderVoxels_04 from '@/public/images/voxelmesh/sliderVoxels_04.png';

import voxelMesh_introduction from '@/public/images/voxelmesh/voxelMesh_introduction.jpg';
import voxelMesh_example from '@/public/images/voxelmesh/voxelMesh_example.jpg';

import boxVoxels from '@/public/images/voxelmesh/boxVoxels.png';
import cylinderVoxels from '@/public/images/voxelmesh/cylinderVoxels.png';
import sphereVoxels from '@/public/images/voxelmesh/sphereVoxels.png';
import tetrahedronVoxels from '@/public/images/voxelmesh/tetrahedronVoxels.png';
import octahedronVoxels from '@/public/images/voxelmesh/octahedronVoxels.png';
import legoVoxels from '@/public/images/voxelmesh/legoVoxels.png';

import ambientOcclusion from '@/public/images/voxelmesh/ambientOcclusion.png';
import ambientOcclusion2 from '@/public/images/voxelmesh/ambientOcclusion2.png';

import alienMonster_01 from '@/public/images/voxelmesh/alienMonster_01.jpg';
import alienMonster_02 from '@/public/images/voxelmesh/alienMonster_02.jpg';
import alienMonster_03 from '@/public/images/voxelmesh/alienMonster_03.jpg';
import voxelTween from '@/public/images/voxelmesh/voxelTween.jpg';
import voxelAutomata_01 from '@/public/images/voxelmesh/voxelAutomata_01.jpg';
import voxelAutomata_02 from '@/public/images/voxelmesh/voxelAutomata_02.jpg';

import Mandelbulb from '@/public/images/voxelmesh/Mandelbulb.gif';
import MengerSponge from '@/public/images/voxelmesh/MengerSponge.gif';
import PillarCave from '@/public/images/voxelmesh/PillarCave.gif';
import SierpinskiTetrahedron from '@/public/images/voxelmesh/SierpinskiTetrahedron.gif';

import Apollonian from '@/public/images/voxelmesh/Apollonian.gif';
import EllyTetra from '@/public/images/voxelmesh/EllyTetra.gif';
import IFS3dCross from '@/public/images/voxelmesh/IFS3dCross.gif';
import Juliabulb from '@/public/images/voxelmesh/Juliabulb.gif';

export default function VoxelMeshPage()
{
    const images = [ sliderVoxels_01, sliderVoxels_02, sliderVoxels_03, sliderVoxels_04 ];
    const titles = [
        'Title 1',
        'Title 2',
        'Title 3',
        'Title 4',
    ];
    const descriptions = [
        'Description 1',
        'Description 2',
        'Description 3',
        'Description 4',
    ];

    const titleDivStyle = "py-8 flex flex-wrap md:flex-nowrap";
    const spanDivStyle = "md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col";
    const spanTitleStyle = "font-semibold title-font text-gray-700";
    const spanDateStyle = "mt-1 text-gray-500 text-sm";

    const contentStyle = "md:flex-grow";
    const h2Style = "text-2xl font-medium text-gray-900 title-font mb-2";
    const ulStyle = "list-disc ml-2";
    const liStyle = "leading-relaxed text-base";

    const blueBoldText = "text-blue-600 font-bold";

    const gridC2R1Style = "mx-52 mb-20 grid gap-4 grid-cols-2 grid-rows-1";
    const gridC2R3Style = "mx-52 mb-20 grid gap-4 grid-cols-2 grid-rows-3";
    const gridC2R4Style = "mx-52 mb-20 grid gap-4 grid-cols-2 grid-rows-4";

    return (            
        <section className="text-gray-600 body-font overflow-hidden">

            {/* <ImageSlider images={images} titles={titles} descriptions={descriptions} /> */}
            <ImageSlider images={images} />

            <div className="container px-5 py-24 mx-auto">

                {/* VOXEL STRUCTURE */}
                <div className={titleDivStyle}>
                    <div className={spanDivStyle}>
                        <span className={spanTitleStyle}>VOXEL STRUCTURE</span>
                        <span className={spanDateStyle}>April 11, 2023</span>
                    </div>
                    <div className={contentStyle}>
                        <h2 className={h2Style}>Voxel Representation & Features</h2>
                        <ul className={ulStyle}>
                            <li className={liStyle}><span className={blueBoldText}>Data compression</span> is used to minimize data transfer volume.</li>
                            <li className={liStyle}><span className={blueBoldText}>JS heap memory</span> is deleted immediately after use.</li>
                            <li className={liStyle}><span className={blueBoldText}>Voxel volume</span> requires 4 bytes or 8 bytes per voxel.</li>
                            <ul className='ml-3'>
                                <li className='list-decimal'>For a 4-byte voxel, 256 colors are used.</li>
                                <li className='list-decimal'>For a 8-byte voxel, full-sized colors are used. (cf: atlas texture available)</li>
                            </ul>
                            <li className={liStyle}><span className={blueBoldText}>Chunk structure</span>: not used for reducing memory waste, unlike existing research.</li>
                            <li className={liStyle}><span className={blueBoldText}>3D indexing approach</span>: not used for reducing performance degradation due to expensive multiplication, unlike existing research.</li>
                        </ul>
                    </div>
                </div>
                <div className={gridC2R1Style}>
                    <div><Link href="https://www.youtube.com/watch?v=X9dkxjxfKK4&t=51s"><Image src={voxelMesh_introduction} alt="voxelMesh_introduction" priority/></Link></div>
                    <div><Image src={voxelMesh_example} alt="voxelMesh_example" priority/></div>
                </div>

                {/* VOXEL MODELING */}
                <div className={titleDivStyle}>
                    <div className={spanDivStyle}>
                        <span className={spanTitleStyle}>VOXEL MODELING</span>
                        <span className={spanDateStyle}>April 11, 2023</span>
                    </div>
                    <div className={contentStyle}>
                        <h2 className={h2Style}>Geometric Modeling & Processing</h2>
                        <ul className={ulStyle}>
                            <li className={liStyle}><span className={blueBoldText}>Element types</span>: seven voxel geometries supported.</li>
                            <ul className='ml-3'>
                                <li className='list-decimal'>Cube: typical voxel shape</li>
                                <li className='list-decimal'>Box: variable in width, height, and thickness</li>
                                <li className='list-decimal'>Cylinder: variable radius and height</li>
                                <li className='list-decimal'>Sphere: possible changed to oval shape</li>
                                <li className='list-decimal'>Tetrahedron: magnification applicable in each direction</li>
                                <li className='list-decimal'>Octahedron: possible changed into diamond shape</li>
                                <li className='list-decimal'>Lego: basic form of Lego is supported (its size can be changed)</li>
                                <li className='list-decimal'>Custom: user-specific shapes will also be supported</li>
                            </ul>
                            <li className={liStyle}><span className={blueBoldText}>Inquire</span>: we check whether a voxel exists at an offset distance from the current position of the voxel, and returns its value if it exists.</li>
                            <li className={liStyle}><span className={blueBoldText}>Topology</span>: three functions are provided for extracting neighboring voxels.</li>
                            <ul className='ml-3'>
                                <li className='list-decimal'>Face-connected: extracts 6 neighboring voxels that share 6 faces of a voxel</li>
                                <li className='list-decimal'>Edge-connected: extracts 12 neighboring voxels that share 12 edges of a voxel</li>
                                <li className='list-decimal'>Vertex-connected: extracts 8 neighboring voxels that share the 8 vertices of a voxel.</li>
                            </ul>
                            <li className={liStyle}><span className={blueBoldText}>Boundary checking</span>: we check whether a specific voxel is in the boundary and returns true or false.</li>
                            <li className={liStyle}><span className={blueBoldText}>Affine transformation</span>: for example, voxel size can be scaled to reduce a memory waste caused by using a lot of voxels for large objects.</li>
                            <li className={liStyle}><span className={blueBoldText}>Ray intersection</span>: voxels are selected using a mouse (touch). This extends to voxel painting to enable voxel editing.</li>
                            <li className={liStyle}><span className={blueBoldText}>Creating from point cloud</span>: voxels are created from point data set, which does not require data order and has no problem with overlapping. It means 3D scanners can make voxels.</li>
                            <li className={liStyle}><span className={blueBoldText}>Shelling</span>: we delete voxels that exist inside the volume (invisible part) to minimize memory.</li>
                            <li className={liStyle}><span className={blueBoldText}>Filling</span>: we support the function of filling gaps such as holes on the boundary surface. Voxels lost in the middle of the surface can be restored.</li>
                            <li className={liStyle}><span className={blueBoldText}>Editing</span>: voxels are first selected through mouse event and ray intersection, then we perform the voxel addition and deletion using the neighbor information of selected voxels. All work is carried out in an interactive manner.</li>
                            <li className={liStyle}><span className={blueBoldText}>VOX format</span>: this format is supported, widely used in the voxel ecosystem.</li>
                        </ul>
                    </div>
                </div>
                <div className={gridC2R3Style}>
                    <div><Image src={boxVoxels} alt="boxVoxels" priority/></div>
                    <div><Image src={cylinderVoxels} alt="cylinderVoxels" priority/></div>
                    <div><Image src={sphereVoxels} alt="sphereVoxels" priority/></div>
                    <div><Image src={tetrahedronVoxels} alt="tetrahedronVoxels" priority/></div>
                    <div><Image src={octahedronVoxels} alt="octahedronVoxels" priority/></div>
                    <div><Image src={legoVoxels} alt="legoVoxels" priority/></div>
                </div>

                {/* VOXEL RENDERING */}
                <div className={titleDivStyle}>
                    <div className={spanDivStyle}>
                        <span className={spanTitleStyle}>VOXEL RENDERING</span>
                        <span className={spanDateStyle}>April 11, 2023</span>
                    </div>
                    <div className={contentStyle}>
                        <h2 className={h2Style}>3D WebGL-based Rendering</h2>
                        <ul className={ulStyle}>
                            <li className={liStyle}><span className={blueBoldText}>PBR materials</span>: shaders for physically-based rendering are supported, based on <Link href='https://threejs.org/'>three.js</Link>.</li>
                            <li className={liStyle}><span className={blueBoldText}>ATLAS Texture</span>: supported along with PBR shaders to increase the realism of VR and game worlds.</li>
                            <li className={liStyle}><span className={blueBoldText}>Frustum culling</span>: voxels not rendered, which exist outside the viewing space.</li>
                            <li className={liStyle}><span className={blueBoldText}>Occlusion culling</span>: voxels not rendered, which are hidden by other objects so are not visible to the camera.</li>
                            <li className={liStyle}><span className={blueBoldText}>Ambient occlusion</span>: our shader program calculates how exposed each point in a scene is to ambient lighting by counting the presence of neighboring voxels.</li>
                        </ul>
                    </div>
                </div>
                <div className={gridC2R1Style}>
                    <div><Image src={ambientOcclusion} alt="ambientOcclusion" priority/></div>
                    <div><Image src={ambientOcclusion2} alt="ambientOcclusion2" priority/></div>
                </div>

                {/* VOXEL ANIMATION */}
                <div className={titleDivStyle}>
                    <div className={spanDivStyle}>
                        <span className={spanTitleStyle}>VOXEL ANIMATION</span>
                        <span className={spanDateStyle}>April 11, 2023</span>
                    </div>
                    <div className={contentStyle}>
                        <h2 className={h2Style}>Voxel Dynamics & Simulation</h2>
                        <ul className={ulStyle}>
                            <li className={liStyle}><span className={blueBoldText}>Compact structure</span>: VoxelMesh does not use 32 x 32 x 32 chunks of memory to define a few voxels, while most current voxel engines use the chunks. Our VoxelMesh uses only as much memory as it uses, so memory usage can be drastically reduced.</li>
                            <li className={liStyle}><span className={blueBoldText}>GPU computation</span>: VoxelMesh uses one thread per voxel so that each voxel can simultaneously perform the same algorithm. In other words, GPU-based programming is possible, which enables real-time animation development.</li>
                            <li className={liStyle}><span className={blueBoldText}>Signed distance functions</span>: You can easily render a signed distance function (SDF) without any special algorithm. Therefore, various modeling operation functions of SDF can be used without modification. On the other hand, in the case of existing polygon models, the expensive marching cubes algorithm is required.</li>
                            <li className={liStyle}><span className={blueBoldText}>Particle dynamics</span>: VoxelMesh includes a dual structure. One is that it supports a grid network like a general voxel engine, and the other is that it can implement particle dynamics which is hardly possible in existing voxel engines. For example, water simulation can be implemented using the PIC or FLIP algorithm.</li>
                            <li className={liStyle}><span className={blueBoldText}>Animation properties</span>: VoxelMesh has 4 properties for voxel animation. These include size, opacity, life, and rotation. Their total size is 2 bytes.</li>
                            <li className={liStyle}><span className={blueBoldText}>Celluar Automata</span>: VoxelMesh can simulate several types of celluar automata (CA) studied in various areas, including physics, theoretical biology and microstructure modeling.</li>
                        </ul>
                    </div>
                </div>
                <div className={gridC2R3Style}>
                    <div><Link href="https://www.youtube.com/watch?v=pKaeW6yIXPo"><Image src={alienMonster_01} alt="alienMonster_01" priority/></Link></div>
                    <div><Link href="https://www.youtube.com/watch?v=0g30rf1Z6oQ"><Image src={alienMonster_02} alt="alienMonster_02" priority/></Link></div>
                    <div><Link href="https://www.youtube.com/watch?v=JAc7Sj1OHK0"><Image src={alienMonster_03} alt="alienMonster_03" priority/></Link></div>
                    <div><Link href="https://www.youtube.com/watch?v=oX7mKh5quL8"><Image src={voxelTween} alt="voxelTween" priority/></Link></div>
                    <div><Link href="https://www.youtube.com/watch?v=PWY0log0jAs"><Image src={voxelAutomata_01} alt="voxelAutomata_01" priority/></Link></div>
                    <div><Link href="https://www.youtube.com/watch?v=GVCD3PyIWWE&t=30s"><Image src={voxelAutomata_02} alt="voxelAutomata_02" priority/></Link></div>
                </div>

                {/* VOXEL EXAMPLES */}
                <div className={titleDivStyle}>
                    <div className={spanDivStyle}>
                        <span className={spanTitleStyle}>VOXEL APPLICATIONS</span>
                        <span className={spanDateStyle}>April 11, 2023</span>
                    </div>
                    <div className={contentStyle}>
                        <h2 className={h2Style}>Application Examples</h2>
                        <ul className={ulStyle}>
                            <li className={liStyle}><span className={blueBoldText}>3D fractals</span>: We create 3D fractals that are a range of chaotic equation-based objects, most often derived from the Mandelbrot set. Typical examples include Mandelbulb, Menger sponge, Juliabulb, Sierpinski tetrahedron, etc. These 3D models are quickly created and rendered in 3D space using the GPU.</li>
                            <li className={liStyle}><span className={blueBoldText}>3D celluar automata</span>: We build 3D voxels, called 3D cellular automata that are a collection of cells arranged in three-dimensional space, where each cell changes its state as a function of time according to a defined set of rules.</li>
                            <li className={liStyle}><span className={blueBoldText}>Iterated function system</span>: We create 3D voxels from an iterated function system (IFS) which generates a 3D fractal by iterative equations (2D) or a set of transformations (3D).</li>
                            <li className={liStyle}><span className={blueBoldText}>SDF-based raymarch</span>: The SDF(signed-distance function) is used to define the shape and rendering properties of the 3D model, and the ray-march approach is used to generate the final 3D voxel models. By compositing multiple SDF models, more complex voxel models can be created.</li>
                            <li className={liStyle}><span className={blueBoldText}>3D tween</span>: We create a voxel model at one specific frame in the timeline. And, change that voxels at another specific frame. Animate then interpolates the intermediate models for the frames in between, creating the animation of one voxels morphing into another.</li>
                        </ul>
                    </div>
                </div>
                <div className={gridC2R4Style}>
                    <div><Link href="https://opensea.io/assets/matic/0x2953399124f0cbb46d2cbacd8a89cf0599974963/90178724377835402463078005350460336323666865499173906711088353167566530674689">
                        <Image src={Mandelbulb} alt="Mandelbulb" priority/></Link>
                    </div>
                    <div><Link href="https://opensea.io/assets/matic/0x2953399124f0cbb46d2cbacd8a89cf0599974963/90178724377835402463078005350460336323666865499173906711088353168666042302465">
                        <Image src={MengerSponge} alt="MengerSponge" priority/></Link>
                    </div>
                    <div><Link href="https://opensea.io/assets/matic/0x2953399124f0cbb46d2cbacd8a89cf0599974963/90178724377835402463078005350460336323666865499173906711088353170865065558017">
                        <Image src={PillarCave} alt="PillarCave" priority/></Link>
                    </div>
                    <div><Link href="https://opensea.io/assets/matic/0x2953399124f0cbb46d2cbacd8a89cf0599974963/90178724377835402463078005350460336323666865499173906711088353176362623696897">
                        <Image src={SierpinskiTetrahedron} alt="SierpinskiTetrahedron" priority/></Link>
                    </div>
                    <div><Link href="https://opensea.io/assets/matic/0x2953399124f0cbb46d2cbacd8a89cf0599974963/90178724377835402463078005350460336323666865499173906711088353148874833002497">
                        <Image src={Apollonian} alt="Apollonian" priority/></Link>
                    </div>
                    <div><Link href="https://opensea.io/assets/matic/0x2953399124f0cbb46d2cbacd8a89cf0599974963/90178724377835402463078005350460336323666865499173906711088353151073856258049">
                        <Image src={EllyTetra} alt="EllyTetra" priority/></Link>
                    </div>
                    <div><Link href="https://opensea.io/assets/matic/0x2953399124f0cbb46d2cbacd8a89cf0599974963/90178724377835402463078005350460336323666865499173906711088353164267995791361">
                        <Image src={IFS3dCross} alt="IFS3dCross" priority/></Link></div>
                    <div><Link href="https://opensea.io/assets/matic/0x2953399124f0cbb46d2cbacd8a89cf0599974963/90178724377835402463078005350460336323666865499173906711088353153272879513601">
                        <Image src={Juliabulb} alt="Juliabulb" priority/></Link>
                    </div>
                </div>

            </div>
        </section>
    );
}