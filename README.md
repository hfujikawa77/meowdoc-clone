# 🐱 Meowdoku

猫を配置するロジックパズル。ビルド不要の静的サイト（HTML / CSS / Vanilla JS）で、GitHub Pages にそのまま公開できます。

## Play

GitHub Pages: リポジトリの Settings → Pages を有効化すると `https://<username>.github.io/<repo>/` で公開されます。

## Rules

盤面には色分けされたエリアがあります。以下をすべて満たすと1問クリアです。

- 各行に猫はちょうど1匹
- 各列に猫はちょうど1匹
- 各エリアに猫はちょうど1匹
- 猫同士は隣接禁止（上下左右斜めすべて含む）

- シングルタップ（クリック）: `空欄 ⇄ ×` を切り替える
- ダブルタップ（素早い連続クリック）: 猫を設置・撤去する

時間を置いた2回のシングルタップはダブルタップとして扱われません。× 付けは自動化されておらず、ユーザー自身がすべて手動で付ける方式です。

ルールに違反する場所（行・列・エリアの重複、または隣接）に猫を置こうとするとミスになります。ミスが3回になるとゲームオーバーで、Retry で同じ問題を最初からやり直せます。

初回プレイ時と「🎲 Next Puzzle」では、未クリアの問題を優先してランダムに1問選びます（すべてクリア済みなら完全ランダム）。

## Development

ビルドツールは使用していません。任意の静的サーバーで配信するだけで動作します。

```sh
npm install   # 依存パッケージなし（package.jsonはnpm testのため）
npm run dev   # python3 -m http.server 8080 を起動
# http://localhost:8080 を開く
```

`index.html` を直接ブラウザで開くだけでも遊べます。

## Test

ゲームロジック（`js/logic/validator.js`）の単体テストを Node.js 標準の test runner で実行します。

```sh
npm test
```

対象：完成盤面の判定、行・列・エリアの重複判定、横/縦/斜め隣接判定など。

## Build

ビルド不要（ビルドステップはありません）。

## GitHub Pages への公開

ビルドステップが無い完全静的サイトなので、GitHub Actions を使わずブランチから直接公開できます。

1. リポジトリの Settings → Pages → Source を **Deploy from a branch** に設定してください。
2. Branch に公開したいブランチ（例: `main`）と `/ (root)` を選択して Save してください。
3. 数分後に `https://<username>.github.io/<repo>/` で公開されます。

## ファイル構成

```
index.html                    エントリーポイント（SPA）
css/style.css                 スタイル（猫テーマ、レスポンシブ対応）
js/data/puzzles.js            パズルデータ（5x5 x15 / 6x6 x5 / 7x7 x5 / 8x8 x5、計30問）
js/logic/validator.js         ルール検証ロジック（UI非依存）
js/logic/gameState.js         盤面の状態管理・Undo
js/logic/storage.js           localStorage 永続化
js/main.js                    UI制御・イベント処理
tests/validator.test.js       validator.js の単体テスト
```

## 今後の拡張候補

盤面サイズは `puzzle.size` を参照する設計にしているため、9x9 以上のさらに大きな盤面やヒント機能、問題の自動生成なども既存ロジックを大きく変えずに追加できます。
