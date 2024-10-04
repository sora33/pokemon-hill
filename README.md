## このテンプレについて
https://supabase.com/docs/guides/auth/quickstarts/nextjs を参考にして作成した。

## ローカルでの立ち上げ

### 依存パッケージのインストール

```bash
yarn install
```

### supabaseを初期化

`supabase`のローカル開発環境を起動

```bash
yarn supabase:start
yarn db:reset
```

### 環境変数を設定

`.env.local.example`を`.env.local`にコピー

```bash
cp .env.local.example .env.local
```

`supabase`のローカル開発環境のステータスを確認
```bash
yarn supabase:status
```

`supabase`のローカル開発環境の`API URL`と`anon key`を`.env.local`に設定
```
NEXT_PUBLIC_SUPABASE_URL=your-project-url（API URL）
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key（anon key）
```

### ローカルサーバーを起動

```bash
yarn dev
```

## 主要なライブラリ

### Supabase
- `@supabase/supabase-js`: SupabaseのJavaScriptクライアントライブラリ。データベース操作や認証機能を提供。
- `@supabase/ssr`: サーバーサイドレンダリング（SSR）用のSupabaseライブラリ。

### React
- `react`: Reactはユーザーインターフェースを構築するためのJavaScriptライブラリ。
- `react-dom`: ReactコンポーネントをDOMにレンダリングするためのパッケージ。

### Next.js
- `next`: Reactベースのフレームワークで、サーバーサイドレンダリングや静的サイト生成をサポート。

### Prisma
- `@prisma/client`: TypeScript/JavaScriptのORMで、データベース操作を簡素化。
- `prisma`: Prisma CLIツール。データベースのマイグレーションやスキーマ管理に使用。

### その他のライブラリ
- `zod`: スキーマバリデーションライブラリで、TypeScriptと相性が良い。
- `mantine ui`: ユーティリティファーストのCSSフレームワーク。

## 参照

- [【Supabase】ローカル開発（CLI）チートシート](https://zenn.dev/yytnk_tx/articles/28eb21225cd58c)
- [【Supabase Auth】認証認可の際に表示されるエラーメッセージの日本語化](https://qiita.com/tks_00/items/223b0cd4a9b00a664b50)


## Supabaseのポリシーについて

Supabaseのポリシー設定には、主に2つの重要な句があります。

### USING句:
  - 行レベルセキュリティの`SELECT`と`DELETE`操作に使用されます。
  - 既存のデータに基づいてアクセス制御を行います。

### WITH CHECK句:
  - `INSERT`と`UPDATE`操作に使用されます。
  - 新しいデータや変更されたデータが条件を満たしているかを確認します。

これらの句を適切に組み合わせることで、きめ細かなアクセス制御が可能になります。例えば、ユーザーが自分のデータのみを編集できるようにするなど、セキュアなデータ管理を実現できます。
