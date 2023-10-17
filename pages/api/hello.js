// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler( req, res )
{
    res.status( 200 ).json({ name: 'John Doe' });

    // const searchValue = req.body[ 'search' ];
    // console.log( searchValue );

    // res.status( 200 ).json({ message: 'Your search request has been received.' });
    // res.status( 200 ).json('>>> Your search request has been received.');

    // try {
    //     res.status( 200 ).json({ success: 'received your data' });
    // } catch ( err ) {
    //     res.status( 500 ).json({ error: 'failed to fetch data' });
    // }

    // if( req.method === 'POST' )
    // {
    //     const { search } = req.body;
    //     console.log( 'search:', search );

    //     try {
    //         res.redirect( 307, '/' );
    //     } catch ( err ) {
    //         res.status( 500 ).json({ error: 'Failed to fetch data' });
    //     }
    // }
}
