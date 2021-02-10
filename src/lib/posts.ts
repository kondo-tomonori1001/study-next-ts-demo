import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';

/* 
markdownを格納しているposts_dataディレクトリの取得
process.cwd()はNode.jsの構文でNodeが実行されているディレクトリを取得できる
__dirnameでもカレントディレクトリを取得できる
const RootDirectory:string = __dirname;
console.log(RootDirectory);
*/

const postsDirectory :string = path.join(process.cwd(),"posts_data");

type Post = {
  id:string
  title:string
  date:string
}

// トップページ表示
export const getPostsData = () => {

  

  // ========================================

  // ファイル名を取得
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map(filename => {
    // ファイル名をidとする
    const id = filename.replace(/\.md$/,'');
    // マークダウンファイルを文字列として読み取る
    const fullPath = path.join(postsDirectory, filename)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    // 投稿のメタデータ部分を解析するために gray-matter を使う

    /*
      matterResultは次のようなデータが格納
      {
        content:本文
        data:{
          title:"タイトル",
          date:"日付",
        }
      }
    */
    const matterResult = matter(fileContents)

    /*
      データを id と合わせて次のような形式のデータに
      {
        id:"id",
        title:"タイトル",
        date:"日付"
      }
    */
    return {
      id,
      // スプレッド構文で展開
      ...matterResult.data as { date: string; title: string }
    } as Post
  })

  return allPostsData
  .sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

// ブログ記事のデータ取得
export const getPostData = async (id:string) => {
  const filePath = path.join(postsDirectory,`${id}.md`);
  const fileContents = fs.readFileSync(filePath,'utf8');

  // gray-matterで解析
  const matterResult = matter(fileContents);

  // マークダウンを HTML 文字列に変換するために remark を使う
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    id,
    contentHtml,
    ...matterResult.data as { date: string; title: string }
  }
}

// ルーティング用パスの設定
export const getAllPostIds = () => {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map(fileName => {
    /*
    次のようなデータを返す
      [
        params:{
          id:"fileName"
        },
        params:{
          id:"fileName"
        },
      ]
    */
    return {
      params:{
        id:fileName.replace(/\.md$/,'')
      }
    }
  })
}
