import { MainLayout } from 'src/layouts/main/index'

export default function Post() {
  return (
      <MainLayout>

      </MainLayout>
    )
}

export async function getStaticPaths() {
  // id としてとりうる値のリストを返す
}

export async function getStaticProps({ params }) {
  // params.id を使用して、ブログの投稿に必要なデータを取得する
}