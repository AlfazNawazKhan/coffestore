/* ============================================================
   Brew Haven — Product catalog & review data
   (In a real store this would come from an API / backend.)
   ============================================================ */

const PRODUCTS = [
  // ---------- Coffee Beans ----------
  {
    id: 'bh-01',
    name: 'Ethiopia Yirgacheffe',
    category: 'beans',
    price: 18.50,
    badge: 'Single Origin',
    intensity: 3,
    desc: 'Bright and floral with blueberry, jasmine and a wine-like finish.',
    img: 'https://images.unsplash.com/photo-1611854779516-0427ef6dfae5?auto=format&fit=crop&w=600&q=70'
  },
  {
    id: 'bh-02',
    name: 'Colombia Huila Reserve',
    category: 'beans',
    price: 16.00,
    badge: 'Best Seller',
    intensity: 4,
    desc: 'Caramel sweetness, red apple acidity and a velvety chocolate body.',
    img: 'https://images.unsplash.com/photo-1559056199-641a0ac8b520?auto=format&fit=crop&w=600&q=70'
  },
  {
    id: 'bh-03',
    name: 'House Midnight Blend',
    category: 'beans',
    price: 14.50,
    badge: 'Dark Roast',
    intensity: 5,
    desc: 'Our signature dark blend — smoky cocoa, toasted nuts, zero bitterness.',
    img: 'https://images.unsplash.com/photo-1587734111767-7e931c18b95d?auto=format&fit=crop&w=600&q=70'
  },
  {
    id: 'bh-04',
    name: 'Sumatra Mandheling',
    category: 'beans',
    price: 17.25,
    badge: 'Earthy',
    intensity: 4,
    desc: 'Full-bodied and syrupy with cedar, dark spice and low acidity.',
    img: 'https://images.unsplash.com/photo-1610886596812-4d0177840890?auto=format&fit=crop&w=600&q=70'
  },

  // ---------- Hot Drinks ----------
  {
    id: 'bh-05',
    name: 'Classic Espresso',
    category: 'drinks',
    price: 3.50,
    badge: 'Barista Craft',
    intensity: 5,
    desc: 'A rich double shot with thick golden crema. Bold and unforgettable.',
    img: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=70'
  },
  {
    id: 'bh-06',
    name: 'Caramel Macchiato',
    category: 'drinks',
    price: 4.90,
    badge: 'Fan Favorite',
    intensity: 3,
    desc: 'Vanilla-kissed steamed milk, espresso and buttery caramel drizzle.',
    img: 'https://images.unsplash.com/photo-1485808113438-7993b7e930bc?auto=format&fit=crop&w=600&q=70'
  },
  {
    id: 'bh-07',
    name: 'Hazel Cloud Latte',
    category: 'drinks',
    price: 5.20,
    badge: 'New',
    intensity: 2,
    desc: 'Silky microfoam latte with roasted hazelnut and a dusting of cocoa.',
    img: 'https://images.unsplash.com/photo-1572442388796-11668b65f88e?auto=format&fit=crop&w=600&q=70'
  },
  {
    id: 'bh-08',
    name: 'Mocha Supreme',
    category: 'drinks',
    price: 5.50,
    badge: 'Indulgent',
    intensity: 4,
    desc: 'Belgian dark chocolate melted into espresso, topped with whipped cream.',
    img: 'https://images.unsplash.com/photo-1578378939185-8ee6da75b4c2?auto=format&fit=crop&w=600&q=70'
  },

  // ---------- Cold Brews ----------
  {
    id: 'bh-09',
    name: 'Slow-Steep Cold Brew',
    category: 'cold',
    price: 4.50,
    badge: '18-Hour Steep',
    intensity: 4,
    desc: 'Smooth, naturally sweet and low-acid. Served over clear ice spheres.',
    img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=70'
  },
  {
    id: 'bh-10',
    name: 'Maple Oat Iced Latte',
    category: 'cold',
    price: 5.75,
    badge: 'Vegan',
    intensity: 3,
    desc: 'Double espresso, creamy oat milk and a touch of grade-A maple.',
    img: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1b57f?auto=format&fit=crop&w=600&q=70'
  },
  {
    id: 'bh-11',
    name: 'Espresso Tonic Fizz',
    category: 'cold',
    price: 5.00,
    badge: 'Refreshing',
    intensity: 3,
    desc: 'Sparkling tonic, citrus peel and a floating shot of bright espresso.',
    img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=70'
  },

  // ---------- Pastries ----------
  {
    id: 'bh-12',
    name: 'Butter Croissant',
    category: 'pastry',
    price: 3.20,
    badge: 'Baked Daily',
    intensity: 1,
    desc: 'Flaky, 72-layer French pastry baked in-house every morning.',
    img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=70'
  },
  {
    id: 'bh-13',
    name: 'Espresso Brownie',
    category: 'pastry',
    price: 3.80,
    badge: 'Decadent',
    intensity: 2,
    desc: 'Fudgy dark-chocolate brownie infused with our Midnight Blend.',
    img: 'https://images.unsplash.com/photo-1606313564390-e1328b23aa4b?auto=format&fit=crop&w=600&q=70'
  },
  {
    id: 'bh-14',
    name: 'Cinnamon Morning Bun',
    category: 'pastry',
    price: 4.10,
    badge: 'Warm',
    intensity: 1,
    desc: 'Laminated bun swirled with cinnamon sugar and orange zest glaze.',
    img: 'https://images.unsplash.com/photo-1509365465985-d502cc87522b?auto=format&fit=crop&w=600&q=70'
  }
];

const REVIEWS = [
  {
    name: 'Sarah Mitchell',
    role: 'Home barista, Seattle',
    stars: 5,
    text: 'The Yirgacheffe changed my mornings forever. It tastes like a berry tart in the best way — and it arrived roasted just two days prior. Unbeatable freshness.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    name: 'James Okafor',
    role: 'Café owner, Austin',
    stars: 5,
    text: 'We switched our whole café to Brew Haven wholesale. Consistent roasts, incredible support, and our customers constantly ask which beans we use.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    name: 'Emily Chen',
    role: 'Subscription member',
    stars: 5,
    text: 'My monthly subscription is the gift I buy myself. Every bag feels like a little travel experience — Sumatra one month, Colombia the next. Obsessed.',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
  },
  {
    name: 'Daniel Rivera',
    role: 'Cold brew devotee',
    stars: 4,
    text: 'The 18-hour cold brew is smoother than anything I have made at home. Only wish the bags were bigger — I go through them embarrassingly fast.',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg'
  }
];
