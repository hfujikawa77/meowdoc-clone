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

マスをタップ（クリック）するたびに `空欄 → × → 猫 → 空欄` と状態が切り替わります。猫を置くと、明らかに置けなくなる周辺マス（同じ行・列・エリア・隣接8マス）が自動で × になります。

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
js/data/puzzles.js            パズルデータ（5x5 x 15問）
js/logic/validator.js         ルール検証ロジック（UI非依存）
js/logic/gameState.js         盤面の状態管理・Undo・自動×
js/logic/storage.js           localStorage 永続化
js/main.js                    UI制御・イベント処理
tests/validator.test.js       validator.js の単体テスト
```

## 今後の拡張候補

盤面サイズは `puzzle.size` を参照する設計にしているため、6x6・7x7 など将来の拡張やヒント機能、問題の自動生成なども既存ロジックを大きく変えずに追加できます。
