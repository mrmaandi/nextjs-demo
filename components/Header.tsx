import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";

const Header = (): JSX.Element => {
  const { data: session } = useSession();

  return (
    <>
      <div className="flex flex-wrap align-items-center justify-content-between">
        <div className="flex flex-1 flex-wrap align-items-center">
          <h1>NextJS demo</h1>
        </div>
        <div className="flex align-items-center" style={{ gap: 10 }}>
          {session?.user?.image && (
            <Avatar
              image={session?.user?.image}
              shape="circle"
            />
          )}
          {session?.user?.name}
          {session?.user ? (
            <Button className="p-button-outlined p-button-sm" onClick={() => signOut()}>Logout</Button>
          ) : (
            <Button className="p-button-sm" onClick={() => signIn()}>Login</Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
