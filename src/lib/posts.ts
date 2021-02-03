import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

type Posts = {
  id:string
  title:string
  date:string
}

export const getPostsData = () => {

  // markdownを格納しているposts_dataディレクトリの取得
  // process.cwd()はNode.jsの構文でNodeが実行されているディレクトリを取得できる
  const postsDirectory :string = path.join(process.cwd(),"posts_data");
  // __dirnameでもカレントディレクトリを取得できる
  // const RootDirectory:string = __dirname;
  // console.log(RootDirectory);

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
    const matterResult = matter(fileContents)
    console.log(matterResult);
    // データを id と合わせる
    return {
      id,
      // スプレッド構文で展開
      ...matterResult.data
    } as Posts
  })
  return allPostsData
  // .sort((a, b) => {
  //   if (a.date < b.date) {
  //     return 1
  //   } else {
  //     return -1
  //   }
  // })
}
