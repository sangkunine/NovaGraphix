export default function PrivacyPolicy()
{
    const h1Style = "text-2xl font-bold mt-9 mb-5 text-center";
    const h2Style = "text-xl font-bold mt-9 mb-5";
    const pStyle = "mb-3";

    return (
        <div className="mx-5 mb-9">
            <h1 className={h1Style}>Privacy Policy</h1>

            <h2 className={h2Style}>I. Our Privacy Policy</h2>
            <p className={pStyle}>NovaGraphix does not share personal information of any kind with anyone. We will not sell or rent your name or personal information to any third party. We DO NOT sell, rent or provide outside access to our mailing list or any data we store. Any data that a user stores via our facilities is wholly owned by that user or business. At any time a user or business is free to take their data and leave, or to simply delete their data from our facilities.</p>
            <p className={pStyle}>NovaGraphix only collects such personal information that is necessary for you to access and use our services. This personal information includes, but is not limited to, first and last name, email address and other personal information necessary to generate proper legal documents.</p>
            <p className={pStyle}>NovaGraphix may release personal information if NovaGraphix is required to by law, search warrant, subpoena, court order or fraud investigation. We may also use personal information in a manner that does not identify you specifically nor allow you to be contacted but does identify certain criteria about our Site's users in general (such as we may inform third parties about the number of registered users, number of unique visitors, and the pages most frequently browsed).</p>

            <h2 className={h2Style}>II. Privacy Changes</h2>
            <p className={pStyle}>If we change our privacy policy we will post those changes on this page. Registered users will be sent an email that outlines changes made to the privacy policy.</p>

            <p className="mb-3 mt-6">*These Privacy Policy are in effect as of December 6, 2023.</p>
        </div>
    );
}