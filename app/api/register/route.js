import { registerUser } from "@/utils/notionDB";
import { NextResponse } from "next/server";

export async function POST( req )
{
    try
    {
        const { name, email, password } = await req.json();

        await registerUser( name, email, password );

        return NextResponse.json({
            user: {
                name: name,
                email: email,
                password: password
            }
        });
    }
    catch( error )
    {
        return new NextResponse(
            JSON.stringify({
                status: "error",
                message: error.message,
            }),
            { status: 500 }
        );
    }
}