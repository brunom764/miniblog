import Posts from '@/components/posts'


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">

      <div className="">
        <h1 className='text-5xl uppercase'>MiniBlog</h1>
      </div>
      <Posts/>
    </main>
  )
}
