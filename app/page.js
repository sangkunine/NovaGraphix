import Hero from '../components/Hero';

// import { options } from "./api/auth/[...nextauth]/options"
// import { getServerSession } from "next-auth/next"
// import UserCard from "./components/UserCard"

export default async function HomePage()
{
  // const session = await getServerSession( options );
  // return (
  //   <>
  //     {session ? (
  //       // <UserCard user={session?.user} pagetype={"Home"} />
  //       <Hero />
  //     ) : (
  //       <h1 className="text-5xl">You Shall Not Pass!</h1>
  //     )}
  //   </>
  // );

  return <Hero />;
}
