import Header from '../../components/Header';

export function MainLayout({children}):JSX.Element{
  return(
    <>
      <Header />
      <main>{children}</main>
    </>
  )
}