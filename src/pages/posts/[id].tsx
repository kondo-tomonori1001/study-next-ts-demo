import { MainLayout } from 'src/layouts/main/index'
import { getAllPostIds,getPostData } from 'src/lib/posts';


export default function Post({ postData }) {
  return (
      <MainLayout page={postData.id}>
        {postData.title}
        <br />
        {postData.id}
        <br />
        {postData.date}
        <br />
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </MainLayout>
    )
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({ params }) {
  // params.id を使用して、ブログの投稿に必要なデータを取得する
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}