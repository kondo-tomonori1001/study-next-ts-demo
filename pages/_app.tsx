// スタイル読み込み
import 'ress';
import '../styles/globals.css';
// コンポーネント読み込み
import { Container } from "next/app";
import { GlobalNav } from "../components/GlobalNav"


import type { AppProps } from "next/app";

function App({ Component, pageProps }:AppProps) {
  return (
    <Container>
      <GlobalNav />
      <Component {...pageProps} />
    </Container>
  )
}

export default App
