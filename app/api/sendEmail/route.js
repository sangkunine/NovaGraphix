import { EmailTemplate } from '@/components/EmailTemplate';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend( process.env.RESEND_API_KEY );

export async function POST( request )
{
    try
    {
        const body = await request.json();
        console.log('body:', body);

        const { name, email, subject, message } = body;

        const data = await resend.emails.send({
            from: 'info@nova-graphix.com',  // 'company <helper@company.com>',
            to: email,                      // ['guest@email.com'],
            subject: subject,
            react: EmailTemplate({ firstName: name, message }),
        });

        if( data.status === 'success' )
        {
            console.log('Email successfully sent!');
        }

        return NextResponse.json( data );
    }
    catch( error )
    {
        return NextResponse.json({ error });
    }
}