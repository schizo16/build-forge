# Build Forge — Development Roadmap

> Trang web random build cho Elden Ring, Dark Souls 1-3, Bloodborne, Cyberpunk 2077
> Stage: MVP hoàn chỉnh (157 builds, 6 games, song ngữ EN/VI)
> Điểm hiện tại: 8.5/10

---

## 🥇 Priority 1: Short-term (1-2 ngày)

### 1.1 Search bar trên game page

**File:** `app/[locale]/[game]/page.tsx`

Thêm một input search filter trên đầu trang game page. Lọc build theo tên (cả EN và VI) khi gõ.

```typescript
const [search, setSearch] = useState('')
const filtered = builds.filter(b => 
  b.name.toLowerCase().includes(search.toLowerCase()) ||
  b.nameVi?.toLowerCase().includes(search.toLowerCase())
)
```

**Thời gian:** 30 phút

### 1.2 Dark Souls tab chọn game con

**File:** `app/[locale]/dark-souls/page.tsx` (redirect hoặc tab selector)

Dark Souls có 3 game con (DS1, DS2, DS3). Khi click vào Dark Souls trên landing, hiển thị tab/chip để chọn game trước khi vào game page.

**Cách làm:**
- Thêm route `/dark-souls` → hiển thị 3 DS game card
- Hoặc thêm DS tab selector trên game page

**Thời gian:** 1 giờ

### 1.3 Sort builds

**File:** `app/[locale]/[game]/page.tsx`

Thêm dropdown sort bên cạnh filter pills. Các option:
- A-Z / Z-A
- Difficulty (Low→High / High→Low)
- SL (Low→High / High→Low)
- Newest first (dựa trên thứ tự trong JSON)

**Thời gian:** 30 phút

### 1.4 SEO meta cho từng build

**File:** `app/[locale]/[game]/[slug]/page.tsx`

Thêm `generateMetadata()` function để mỗi build có meta title, description, og:image riêng khi share Facebook/Zalo.

```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { game, slug } = await params
  const build = getBuild(game as GameSlug, slug)
  if (!build) return { title: 'Build not found' }
  return {
    title: `${build.name} — Build Forge`,
    description: build.description,
    openGraph: {
      title: `${build.name} — ${GAME_CONFIGS[game as GameSlug].name}`,
      description: build.description,
    }
  }
}
```

**Thời gian:** 1 giờ

### 1.5 Custom 404 per game

**File:** `app/[locale]/[game]/not-found.tsx`

Khi user vào game slug không hợp lệ, hiển thị 404 đẹp thay vì "Game not found" text thường.

**Thời gian:** 30 phút

---

## 🥈 Priority 2: Medium-term (3-5 ngày)

### 2.1 So sánh build (side-by-side)

**File:** `app/[locale]/compare/page.tsx`

Cho phép chọn 2-3 build và so sánh stats, items, affinity cạnh nhau.

**UX:**
- Nút "Compare" trên build card → thêm vào danh sách so sánh
- Trang `/compare` hiển thị grid các build đã chọn
- So sánh stat bars, affinity, items

**Thời gian:** 2-3 giờ

### 2.2 Build of the Day

**File:** `app/[locale]/page.tsx` + `lib/builds.ts`

Random build đặc biệt thay đổi mỗi ngày. Dùng seed dựa trên ngày tháng để chọn build cố định trong ngày.

```typescript
export function getBuildOfTheDay(): Build {
  const today = new Date().toISOString().slice(0, 10)
  const all = getAllBuilds()
  const seed = today.split('-').reduce((a, b) => a + parseInt(b), 0)
  return all[seed % all.length]
}
```

**Thời gian:** 1 giờ

### 2.3 PWA (Progressive Web App)

**Files:**
- `public/manifest.json`
- `public/sw.js` (hoặc dùng Next.js PWA plugin)
- Update `app/layout.tsx` với `<link rel="manifest">`

Cho phép user cài web như app trên điện thoại, dùng ngoại tuyến (cache static pages).

**Thời gian:** 2-3 giờ

### 2.4 Share build

**File:** `components/build-detail/share-button.tsx`

Nút share copy link build vào clipboard, kèm thông báo "Copied!". Dùng `navigator.clipboard.writeText()`.

**Thời gian:** 30 phút

### 2.5 Responsive mobile polish

**Files:** Tất cả component

Kiểm tra responsive tại 375px, 768px, 1024px, 1440px. Fix:
- Nav collapse thành hamburger menu trên mobile
- Game cards grid: 2 col → 1 col trên mobile
- Build detail: section spacing gọn hơn
- Filter pills: horizontal scroll thay vì wrap

**Thời gian:** 2-3 giờ

---

## 🥉 Priority 3: Long-term (1-2 tuần)

### 3.1 Import/Export save list

Cho phép user export danh sách build đã save ra JSON, import lại khi cần.

**File:** `app/[locale]/saved/page.tsx` thêm nút Export/Import

**Thời gian:** 1 giờ

### 3.2 Print/PDF guide

Thêm nút "Print guide" trên build detail, CSS `@media print` để tối ưu in ấn.

**File:** `app/[locale]/[game]/[slug]/page.tsx` + `app/globals.css`

**Thời gian:** 1-2 giờ

### 3.3 Community build submit (cần backend)

Cho phép user submit build của họ:
- Form nhập build data
- Admin approve trước khi public
- Vote/comment

**Cần:** Database (PostgreSQL), API routes, auth (NextAuth), admin panel

**Thời gian:** 1-2 tuần

### 3.4 Item images từ wiki

Cache ảnh item từ Fextralife về local:
- Script crawl + download ảnh
- Lưu vào `public/images/items/{game}/`
- Fallback về wiki URL nếu không có local

**Thời gian:** 2-3 ngày (tùy số lượng item)

### 3.5 Multi-language mở rộng

Thêm ngôn ngữ khác (JP, KR, CN, FR, DE) — cần translate messages và build data.

**Thời gian:** 1 tuần (phụ thuộc vào translator)

---

## Bugs cần fix

| Bug | Mức | File |
|-----|-----|------|
| Tiếng Việt data mất dấu (steps, descriptions fallback EN) | 🔴 | `data/*.json` — cần rewrite VN text |
| Build detail page transition animation lag trên mobile | 🟡 | `components/page-transition.tsx` |
| StatsBar dùng `useTranslations()` trong server component? | 🟡 | `components/landing/stats-bar.tsx` |

---

## Tech Debt

| Item | Lý do |
|------|-------|
| Tách data JSON → TypeScript `.ts` files | Để có type checking, tránh lỗi runtime |
| Component unit tests | Hiện không có test nào |
| Extract hardcoded strings trong components | Một số component vẫn dùng text cứng |

---

## How to contribute

```bash
# Clone
git clone https://github.com/schizo16/build-forge.git
cd build-forge

# Install + run
npm install
npm run dev

# Build
npm run build

# CI (GitHub Actions tự động)
# .github/workflows/ci.yml
```
