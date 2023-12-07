const EmailTemplate = ({ firstName, message }) =>
(
    <div class="text-md mx-4 my-4">
        <p class="mb-4">Dear {firstName},</p>
        <p>Thank you for contacting us. We received your email inquiring about the following:</p>
        <div class="mb-4 border-solid border-2 border-gray-400 rounded">
            <p class="mx-2">{message}</p>
        </div>
        <p class="mb-4">We will get back with you as soon as we can.</p>
        <p>Sincerely,</p>
        <p class="mb-4">The NovaGraphix team</p>
    </div>
);

export default EmailTemplate;