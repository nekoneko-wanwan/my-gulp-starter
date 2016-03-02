# 概要

このリポジトリは汎用的に使えるGulpファイルをまとめたものです。
なるべくタスクごとにファイルを分割することで、色々なケースのプロジェクトで簡単・柔軟に対応できることを目指しています。


# カスタマイズ例

更新ファイルをsftpで外部サーバへアップロードし、完了後のタイミングでリロードさせたい

- browserSync > proxyをtrueにして該当するアドレスを設定
- config > watch > sftpとreloadをtrueに
- browserSync.jsのliveReloadタスクに、sftpのタスク名を第二引数で渡す

```exsample.js
gulp.task(bs.liveReload.taskName, [conf.sftp.taskName] function() {
  browserSync.reload();
});
```

**proxyを通しているだけなので、あくまでブラウザではlocalhost:portにアクセスする（open:true で自動で開く）**  

> なお上記の場合ファイルは一括でまとめてアップしているので、処理が重たくなったら対象ファイルを減らすか、更新ファイルのみアップするようタスクを調整する


# 備考

- watch.tasks, default.tasksのプロパティは各taskNameをそのまま指定しているため、変更した場合はここも変える
- 各タスクの依存関係は考慮していないので、指定とタイミングによっては無駄なタスクが処理される可能性がある
- タスクは必要に応じて細かく調整すること
