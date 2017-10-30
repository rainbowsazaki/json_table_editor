
const STORY_TYPE = [
  { value: 'メインストーリー', html: 'M' },
  { value: 'アナザーストーリー', html: 'A' },
  { value: '魔法少女ストーリー', html: '魔法少女' },
  { value: 'イベントクエスト', html: 'イベント' }
]

const ITEMS = [
  { value: 'フレイムオーブ', image: '~@/assets/img/item/orb_flame.jpg', isSub: true },
  { value: 'フレイムオーブ＋＋', image: '~@/assets/img/item/orb_flame_p.jpg', isSub: true },
  { value: 'フレイムオーブ＋＋', image: '~@/assets/img/item/orb_flame_pp.jpg', isSub: true },
  { value: 'アクアオーブ', image: '~@/assets/img/item/orb_aqua.jpg', isSub: true },
  { value: 'アクアオーブ＋', image: '~@/assets/img/item/orb_aqua_p.jpg', isSub: true },
  { value: 'アクアオーブ＋＋', image: '~@/assets/img/item/orb_aqua_pp.jpg', isSub: true },
  { value: 'フォレストオーブ', image: '~@/assets/img/item/orb_forest.jpg', isSub: true },
  { value: 'フォレストオーブ＋', image: '~@/assets/img/item/orb_forest_p.jpg', isSub: true },
  { value: 'フォレストオーブ＋＋', image: '~@/assets/img/item/orb_forest_pp.jpg', isSub: true },
  { value: 'ライトオーブ', image: '~@/assets/img/item/orb_light.jpg', isSub: true },
  { value: 'ライトオーブ＋', image: '~@/assets/img/item/orb_light_p.jpg', isSub: true },
  { value: 'ライトオーブ＋＋', image: '~@/assets/img/item/orb_light_pp.jpg', isSub: true },
  { value: 'ダークオーブ', image: '~@/assets/img/item/orb_dark.jpg', isSub: true },
  { value: 'ダークオーブ＋', image: '~@/assets/img/item/orb_dark_p.jpg', isSub: true },
  { value: 'ダークオーブ＋＋', image: '~@/assets/img/item/orb_dark_pp.jpg', isSub: true },
  { value: 'フレイムブック', image: '~@/assets/img/item/book_flame.jpg', isSub: true },
  { value: 'フレイムブック＋', image: '~@/assets/img/item/book_flame_p.jpg', isSub: true },
  { value: 'フレイムブック＋＋', image: '~@/assets/img/item/book_flame_pp.jpg', isSub: true },
  { value: 'アクアブック', image: '~@/assets/img/item/book_aqua.jpg', isSub: true },
  { value: 'アクアブック＋', image: '~@/assets/img/item/book_aqua_p.jpg', isSub: true },
  { value: 'アクアブック＋＋', image: '~@/assets/img/item/book_aqua_pp.jpg', isSub: true },
  { value: 'フォレストブック', image: '~@/assets/img/item/book_forest.jpg', isSub: true },
  { value: 'フォレストブック＋', image: '~@/assets/img/item/book_forest_p.jpg', isSub: true },
  { value: 'フォレストブック＋＋', image: '~@/assets/img/item/book_forest_pp.jpg', isSub: true },
  { value: 'ライトブック', image: '~@/assets/img/item/book_light.jpg', isSub: true },
  { value: 'ライトブック＋', image: '~@/assets/img/item/book_light_p.jpg', isSub: true },
  { value: 'ライトブック＋＋', image: '~@/assets/img/item/book_light_pp.jpg', isSub: true },
  { value: 'ダークブック', image: '~@/assets/img/item/book_dark.jpg', isSub: true },
  { value: 'ダークブック＋', image: '~@/assets/img/item/book_dark_p.jpg', isSub: true },
  { value: 'ダークブック＋＋', image: '~@/assets/img/item/book_dark_pp.jpg', isSub: true },
  { value: '燕尾の羽', alias: '羽', image: '~@/assets/img/item/hane.jpg' },
  { value: '鏡の招待状', alias: '状', image: '~@/assets/img/item/syoutaijou.jpg' },
  { value: '立ち耳の包装紙', alias: '紙', image: '~@/assets/img/item/kami.jpg' },
  { value: '羊の角笛', alias: '笛', image: '~@/assets/img/item/hue.jpg' },
  { value: '屋上の鍵', alias: '鍵', image: '~@/assets/img/item/kagi.jpg' },
  { value: '砂場の巻貝', alias: '貝', image: '~@/assets/img/item/kaigara.jpg' },
  { value: '南京錠の鎖', alias: '鎖', image: '~@/assets/img/item/kusari.jpg' },
  { value: '絵馬の水引', alias: '水', image: '~@/assets/img/item/mizuhiki.jpg' },
  { value: 'オウルのバケツ', alias: '桶', image: '~@/assets/img/item/baketu.jpg' },
  { value: '砂場のシャベル', alias: 'シ', image: '~@/assets/img/item/syaberu.jpg' },
  { value: '階段のモニュメント', alias: 'モ', image: '~@/assets/img/item/monument.jpg' },
  { value: 'マチビト馬の車輪', alias: '車', image: '~@/assets/img/item/syarin.jpg' },
  { value: 'レインボーオーブ', image: '~@/assets/img/item/orb_rainbow.jpg', isSub: true },
  { value: 'リュトンのリボン', alias: 'リ', image: '~@/assets/img/item/ribon.jpg' },
  { value: '立ち耳の綿', alias: '綿', image: '~@/assets/img/item/wata.jpg' },
  { value: '羊の角', alias: '角', image: '~@/assets/img/item/tuno.jpg' },
  { value: '屋上のバルーン', alias: 'バ', image: '~@/assets/img/item/barun.jpg' }
]

const ATTRIBUTES = [
  { value: '火', image: '~@/assets/img/attr/flame.png' },
  { value: '水', image: '~@/assets/img/attr/aqua.png' },
  { value: '木', image: '~@/assets/img/attr/forest.png' },
  { value: '光', image: '~@/assets/img/attr/light.png' },
  { value: '闇', image: '~@/assets/img/attr/dark.png' }
]

const DATA_FORMAT = [
  {
    id: 'storyType',
    name: '',
    type: String,
    select: STORY_TYPE
  },
  {
    id: 'name',
    name: 'ストーリー',
    type: String
  },
  {
    id: 'difficulty',
    name: '難易度',
    type: Number
  },
  {
    id: 'ap',
    name: 'AP',
    type: Number
  },
  {
    id: 'dropItems',
    name: '獲得報酬',
    type: Array,
    itemType: String,
    select: ITEMS
  },
  {
    id: 'enemyAttributes',
    name: '敵の属性',
    type: Array,
    itemType: String,
    select: ATTRIBUTES,
    allDisp: true
  }
]

export default DATA_FORMAT
