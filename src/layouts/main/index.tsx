import Link from 'next/link';
import Head from 'next/Head';
import Header from '../../components/Header';

type Props = {
  children:React.ReactNode,
  home?:boolean,
}

export const MainLayout:React.FC<Props> = ({children,home}):JSX.Element => {
  return(
    <>
      <Head>
        <title>MyBlog</title>
      </Head>
      <Header />
      <main>{children}</main>
      {!home && (
        <div>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </>
  )
}