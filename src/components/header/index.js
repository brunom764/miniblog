import Link from "next/link";

export default function Header() {
  return (
    <header className="my-10 border-b-2 pb-10 shadow-lg">
      <Link  href="/">
        <h1 className='text-5xl uppercase text-center'>MiniBlog</h1>
        </Link>
    </header>
  )
}