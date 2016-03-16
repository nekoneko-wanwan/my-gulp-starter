# 概要

- これはkssベースのsc5-styleguideを元にしたスタイルガイドです
- scssファイル内の特定のコメントルールに基いてhtmlなどを自動生成します
- 生成には**gulp**を使用しましたが、npmで必要なモジュールをインストールすればCLIでも生成できるかと思います

> 詳しくはgithubを参照
> https://github.com/SC5/sc5-styleguide#as-a-command-line-tool


# スタイルガイドhtmlの見方

- CLIを使う場合: オプションでserverやportを指定し`localhost:port`でアクセス
- Gulpを使う場合: serverをbuildして`localhost:port`でアクセス（上記github参照）
- `styleguide/html/`をドキュメントルートとしてサーバに入れれば普通に動作する

# Gulpでのスタイルガイド生成時の注意

## `!global`を使っていると上手く動作しない

- Gulpを使用する場合、内部のcss parserパッケージ**gonzales-pe**のバージョンが古く`!global`記述をサポートしていない
- 最新バージョンでは対応されているので、現状手動でgonzales-peのインストールをする
- もしくは内部のparse.jsを書き換える

> もちろん、そのうちデフォルトでインストールされるgonzales-peのバージョンが上がると思うので時間の問題だとは思う

### 手動でparse.jsを書き換える場合

`作業ディレクトリ/node_modules/sc5-styleguide/node_modules/gonzales-pe/lib/scss/parse.js`

- 以下を参考に、追加されたものをscss/parse.jsに加えると動作する
- なお↓はsassなので、jsファイルをそのまま差し替えただけでは動作しない

https://github.com/tonyganch/gonzales-pe/commit/d0e295da4b5e1035ff382a6bdc0ed5e218918330
