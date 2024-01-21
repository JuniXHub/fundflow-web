import Link from "next/link";

const Navbar = () => {
  return (
    <div>
      <ul className="flex justify-between m-10 gap-10">
        <Link href="/">Home</Link>
        <Link href="/protectedPage">Protected Page</Link>
        <Link href="/auth">Auth</Link>
      </ul>
    </div>
  );
};

export default Navbar;
