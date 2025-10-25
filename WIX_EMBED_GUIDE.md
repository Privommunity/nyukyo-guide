# WIX埋め込みガイド

## 📄 作成したファイル

**embed.html** - ヘッダー・フッターなしのWIX埋め込み用ページ

公開URL: `https://privommunity.github.io/nyukyo-guide/embed.html`

---

## 🎯 WIXへの埋め込み方法

### 方法1: iframeで埋め込む（推奨）

#### ステップ1: WIXエディタを開く
1. WIXダッシュボードにログイン
2. サイトを編集

#### ステップ2: HTML iframeウィジェットを追加
1. 左側のメニューから「**追加**」をクリック
2. 「**埋め込みコード**」を選択
3. 「**HTMLコード**」または「**iframe**」を選択

#### ステップ3: iframeコードを挿入
以下のコードをコピー＆ペースト：

```html
<iframe 
    src="https://privommunity.github.io/nyukyo-guide/embed.html" 
    width="100%" 
    height="3000" 
    frameborder="0" 
    scrolling="auto"
    style="border: none; overflow: hidden;">
</iframe>
```

#### ステップ4: サイズ調整
- **幅**: 100%（フル幅）
- **高さ**: 3000px（コンテンツに合わせて調整）

---

### 方法2: HTMLコンポーネントで埋め込む

#### ステップ1: カスタムHTMLを追加
1. WIXエディタで「**追加**」→「**埋め込みコード**」
2. 「**カスタムコード**」を選択

#### ステップ2: コードを設定
- **コードタイプ**: HTML
- **配置**: ページ内（Body）
- 上記のiframeコードを貼り付け

---

## 🎨 カスタマイズオプション

### 高さの調整

コンテンツの高さに合わせて調整：

```html
<!-- 短いバージョン -->
<iframe height="2000" ...></iframe>

<!-- 長いバージョン -->
<iframe height="4000" ...></iframe>
```

### レスポンシブ対応

モバイルでも適切に表示されるように：

```html
<div style="position: relative; width: 100%; padding-bottom: 150%; overflow: hidden;">
    <iframe 
        src="https://privommunity.github.io/nyukyo-guide/embed.html"
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;">
    </iframe>
</div>
```

---

## 📱 表示確認

埋め込み後、以下をチェック：

✅ **デスクトップ表示**
- 横幅が適切か
- コンテンツが切れていないか

✅ **モバイル表示**
- スクロールが正常か
- レイアウトが崩れていないか

✅ **リンク動作**
- 外部リンクが新しいタブで開くか
- 内部リンク（#services等）が正常に動作するか

---

## ⚙️ 高度な設定

### セクション単位で埋め込む

特定のセクションだけを表示したい場合：

```html
<!-- 事業内容のみ -->
<iframe src="https://privommunity.github.io/nyukyo-guide/embed.html#services" ...></iframe>

<!-- CENTURY21についてのみ -->
<iframe src="https://privommunity.github.io/nyukyo-guide/embed.html#about" ...></iframe>
```

### スクロールなしで表示

ページ全体を表示（スクロールバーなし）：

```html
<iframe 
    src="https://privommunity.github.io/nyukyo-guide/embed.html"
    width="100%" 
    height="3500" 
    frameborder="0" 
    scrolling="no"
    style="border: none; overflow: hidden;">
</iframe>
```

---

## 🔧 トラブルシューティング

### 問題1: コンテンツが切れて表示される
**解決策**: iframeの高さを増やす
```html
height="4000"
```

### 問題2: スクロールバーが表示される
**解決策**: 
```html
scrolling="no"
style="overflow: hidden;"
```

### 問題3: モバイルで横スクロールが発生
**解決策**: WIXのモバイルエディタで幅を調整
- モバイルビューに切り替え
- iframeの幅を100%に設定

### 問題4: リンクがWIX内で開いてしまう
**解決策**: すでに`target="_blank"`が設定されているため、外部リンクは新しいタブで開きます

---

## 📊 含まれているセクション

1. ✅ **ヒーローセクション** - メインビジュアル
2. ✅ **新着情報** - お知らせ表示
3. ✅ **事業内容** - 6つのサービスカード
4. ✅ **CENTURY21について** - ブランド紹介
5. ✅ **会社情報** - 基本情報4項目
6. ✅ **CTAセクション** - お問い合わせボタン

**除外されているもの:**
- ❌ ヘッダー（ナビゲーション）
- ❌ フッター

---

## 🚀 デプロイ後の確認

埋め込みページのURL:
**https://privommunity.github.io/nyukyo-guide/embed.html**

ブラウザで直接アクセスして、表示を確認できます。

---

## 💡 ヒント

### WIXのヘッダー・フッターを活用
- WIX側でヘッダーとフッターを作成
- embed.htmlを中央のコンテンツとして埋め込む
- 統一感のあるサイトが完成

### 更新の反映
- embed.htmlを更新すると、WIXサイトにも自動反映
- WIX側での再設定は不要

### パフォーマンス
- GitHub Pagesは高速
- キャッシュが効くため、2回目以降の読み込みが速い

---

## 📞 サポート

問題が発生した場合は、お知らせください！
