// Mock product data - 100 IT products
export const mockProducts = [
  // Laptops (25 products)
  {
    id: '1', name: 'MacBook Pro 16" M3 Max', slug: 'macbook-pro-16-m3-max', 
    description: 'Powerful laptop for professionals', price: 45000000, stock: 15,
    category_id: 'laptops', images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500'],
    rating: 4.8, total_reviews: 124, specifications: { processor: 'M3 Max', ram: '32GB', storage: '1TB SSD' }
  },
  {
    id: '2', name: 'Dell XPS 15', slug: 'dell-xps-15',
    description: 'Premium Windows laptop', price: 28000000, stock: 20,
    category_id: 'laptops', images: ['https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500'],
    rating: 4.6, total_reviews: 98
  },
  {
    id: '3', name: 'ASUS ROG Zephyrus G14', slug: 'asus-rog-g14',
    description: 'Gaming laptop with AMD Ryzen', price: 24000000, stock: 12,
    category_id: 'laptops', images: ['https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500'],
    rating: 4.7, total_reviews: 156
  },
  {
    id: '4', name: 'Lenovo ThinkPad X1 Carbon', slug: 'thinkpad-x1',
    description: 'Business ultrabook', price: 22000000, stock: 18,
    category_id: 'laptops', images: ['https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500'],
    rating: 4.5, total_reviews: 87
  },
  {
    id: '5', name: 'HP Spectre x360', slug: 'hp-spectre-x360',
    description: '2-in-1 convertible laptop', price: 26000000, stock: 10,
    category_id: 'laptops', images: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500'],
    rating: 4.4, total_reviews: 72
  },
  
  // PC Components (40 products)
  {
    id: '26', name: 'NVIDIA RTX 4090', slug: 'rtx-4090',
    description: 'Flagship graphics card', price: 32000000, stock: 8,
    category_id: 'pc-components', images: ['https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500'],
    rating: 4.9, total_reviews: 203
  },
  {
    id: '27', name: 'AMD Ryzen 9 7950X', slug: 'ryzen-9-7950x',
    description: '16-core processor', price: 9500000, stock: 25,
    category_id: 'pc-components', images: ['https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=500'],
    rating: 4.8, total_reviews: 178
  },
  {
    id: '28', name: 'Intel Core i9-14900K', slug: 'i9-14900k',
    description: 'High-performance CPU', price: 8900000, stock: 30,
    category_id: 'pc-components', images: ['https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=500'],
    rating: 4.7, total_reviews: 145
  },
  {
    id: '29', name: 'Corsair Vengeance DDR5 32GB', slug: 'corsair-ddr5-32gb',
    description: 'High-speed RAM', price: 3200000, stock: 50,
    category_id: 'pc-components', images: ['https://images.unsplash.com/photo-1562976540-1502c2145186?w=500'],
    rating: 4.6, total_reviews: 234
  },
  {
    id: '30', name: 'Samsung 990 Pro 2TB NVMe', slug: 'samsung-990-pro',
    description: 'Ultra-fast SSD', price: 4500000, stock: 40,
    category_id: 'pc-components', images: ['https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500'],
    rating: 4.8, total_reviews: 312
  },
  
  // Accessories (30 products)
  {
    id: '66', name: 'Logitech MX Master 3S', slug: 'mx-master-3s',
    description: 'Premium wireless mouse', price: 1800000, stock: 45,
    category_id: 'accessories', images: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500'],
    rating: 4.7, total_reviews: 567
  },
  {
    id: '67', name: 'Keychron K8 Pro', slug: 'keychron-k8-pro',
    description: 'Mechanical keyboard', price: 2200000, stock: 35,
    category_id: 'accessories', images: ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500'],
    rating: 4.8, total_reviews: 423
  },
  {
    id: '68', name: 'Sony WH-1000XM5', slug: 'sony-wh1000xm5',
    description: 'Noise-cancelling headphones', price: 5500000, stock: 22,
    category_id: 'accessories', images: ['https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500'],
    rating: 4.9, total_reviews: 789
  },
  {
    id: '69', name: 'LG UltraGear 27" 4K Monitor', slug: 'lg-ultragear-27',
    description: '4K gaming monitor 144Hz', price: 8900000, stock: 15,
    category_id: 'accessories', images: ['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500'],
    rating: 4.7, total_reviews: 234
  },
  {
    id: '70', name: 'Razer DeathAdder V3', slug: 'razer-deathadder-v3',
    description: 'Gaming mouse', price: 1200000, stock: 60,
    category_id: 'accessories', images: ['https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500'],
    rating: 4.6, total_reviews: 345
  },
  
  // Software (15 products)
  {
    id: '96', name: 'Adobe Creative Cloud', slug: 'adobe-cc',
    description: 'Complete creative suite', price: 850000, stock: 999,
    category_id: 'software', images: ['https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500'],
    rating: 4.5, total_reviews: 1234
  },
  {
    id: '97', name: 'Microsoft Office 365', slug: 'office-365',
    description: 'Productivity suite', price: 1200000, stock: 999,
    category_id: 'software', images: ['https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=500'],
    rating: 4.6, total_reviews: 2345
  },
  {
    id: '98', name: 'AutoCAD 2024', slug: 'autocad-2024',
    description: 'CAD software', price: 6500000, stock: 999,
    category_id: 'software', images: ['https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=500'],
    rating: 4.7, total_reviews: 456
  },
  {
    id: '99', name: 'Windows 11 Pro', slug: 'windows-11-pro',
    description: 'Operating system', price: 2800000, stock: 999,
    category_id: 'software', images: ['https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=500'],
    rating: 4.4, total_reviews: 678
  },
  {
    id: '100', name: 'Figma Professional', slug: 'figma-pro',
    description: 'UI/UX design tool', price: 450000, stock: 999,
    category_id: 'software', images: ['https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=500'],
    rating: 4.8, total_reviews: 890
  },
]

// Generate more products to reach 100
for (let i = 6; i <= 25; i++) {
  mockProducts.push({
    id: `${i}`,
    name: `Laptop Model ${i}`,
    slug: `laptop-model-${i}`,
    description: `High-performance laptop for work and gaming`,
    price: 15000000 + (i * 100000),
    stock: Math.floor(Math.random() * 30) + 5,
    category_id: 'laptops',
    images: [`https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&sig=${i}`],
    rating: 4 + Math.random(),
    total_reviews: Math.floor(Math.random() * 200) + 50
  })
}

for (let i = 31; i <= 65; i++) {
  mockProducts.push({
    id: `${i}`,
    name: `PC Component ${i}`,
    slug: `pc-component-${i}`,
    description: `Quality PC hardware component`,
    price: 2000000 + (i * 50000),
    stock: Math.floor(Math.random() * 40) + 10,
    category_id: 'pc-components',
    images: [`https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=500&sig=${i}`],
    rating: 4 + Math.random(),
    total_reviews: Math.floor(Math.random() * 300) + 100
  })
}

for (let i = 71; i <= 95; i++) {
  mockProducts.push({
    id: `${i}`,
    name: `Accessory ${i}`,
    slug: `accessory-${i}`,
    description: `Premium IT accessory`,
    price: 500000 + (i * 20000),
    stock: Math.floor(Math.random() * 50) + 15,
    category_id: 'accessories',
    images: [`https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&sig=${i}`],
    rating: 4 + Math.random(),
    total_reviews: Math.floor(Math.random() * 400) + 150
  })
}

export const mockCategories = [
  { id: 'laptops', name: 'Laptops', slug: 'laptops', description: 'Portable computers' },
  { id: 'pc-components', name: 'PC Components', slug: 'pc-components', description: 'Build your PC' },
  { id: 'accessories', name: 'Accessories', slug: 'accessories', description: 'Peripherals and more' },
  { id: 'software', name: 'Software', slug: 'software', description: 'Digital products' },
]
