import Header from '@/components/header'
import Posts from '@/components/posts'
import Head from 'next/head'


export default function Home() {
  return (
    <>
      <Head>
        <title>MiniBlog</title>
      </Head>
      <section className="bg-white">
        <Header/>
        <Posts/>
      </section>
    </>
  )
}
