import Link from 'next/link';

export default function License()
{
    const h1Style = "text-2xl font-bold mt-9 mb-5 text-center";
    const h2Style = "text-xl font-bold mt-9 mb-5";
    const pStyle = "mb-3";

    return (
        <div className="mx-5 mb-9">
            <h1 className={h1Style}>License</h1>

            <p className={pStyle}>This license is between NovaGraphix, Co. (nova-graphix.com) and you. By purchasing or downloading NovaGraphix products, you are being bound and agreeing to the below licensing agreement and conditions.</p>

            <h2 className={h2Style}>I. NovaGraphix Assets</h2>
            <p className={pStyle}>The license grants you to use both for commercial and personal projects for free in unlimited End Products with a non-exclusive right to make use of NovaGraphix Assets you have purchased or downloaded. You may use it for almost any type of End Products (or customised implementation of NovaGraphix Assets) such as your personal site, web apps, mobile apps or client projects etc.</p>

            <h2 className={h2Style}>II. Prohibition</h2>
            <p className={pStyle}>You cannot re-distribute NovaGraphix Assets on its own (as-is) or bundle with other items, even if you modify NovaGraphix Assets. For example, you cannot re-distribute a SketchUp, Blender, Unreal Engine or any design tool version of NovaGraphix Assets and making it available for free or for sale.</p>
            <p className={pStyle}>It forbids you to hold the authors and license owners liable for damages as NovaGraphix Assets is provided without warranty.</p>
            <p className={pStyle}>It forbids you to hold the creators or copyright holders of NovaGraphix, Co. (nova-graphix.com) liable.</p>

            <h2 className={h2Style}>III. Other License Terms</h2>
            <p className={pStyle}>You are not required to attribute or link to NovaGraphix Assets but we would highly appreciate any credits and support.</p>
            <p className={pStyle}>If NovaGraphix Assets contains icons, images, or content sourced from elsewhere under a different license, that item retains its original license.</p>
            <p className={pStyle}>The copyright of the NovaGraphix Assets is owned by NovaGraphix, Co. (nova-graphix.com). You are granted only the permissions described in this license - all other rights are reserved.</p>

            <h2 className={h2Style}>IV. Terms of Use Amendment</h2>
            <p className={pStyle}>NovaGraphix reserves the right to change the terms of these Terms Of Use with or without prior notice at any time.</p>

            <p className="mb-3 mt-6">*Please <Link href="/contact">contact us</Link> if the above terms doesn't suit your project(s) or have any license related questions.</p>
        </div>
    );
}