import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding with verified image URLs...');

  // 1. Clean existing data
  await prisma.review.deleteMany({});
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.user.deleteMany({});

  // 2. Create Users
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@commerce.com',
      password: 'adminpassword123',
      name: 'Admin Manager',
      role: 'admin',
    },
  });

  const customerUser = await prisma.user.create({
    data: {
      email: 'customer@example.com',
      password: 'customerpassword123',
      name: 'Customer Demo',
      role: 'customer',
    },
  });

  console.log('✅ Users created.');

  // 3. Create Categories
  const categoriesData = [
    {
      name: 'Electronics & Audio',
      slug: 'electronics-audio',
      description: 'Headphones, high-fidelity speakers, smartwatches and audio accessories.',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    },
    {
      name: 'Computers & Laptops',
      slug: 'computers-laptops',
      description: 'Laptops, mechanical keyboards, gaming mice and monitors.',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
    },
    {
      name: 'Smartphones & Mobile',
      slug: 'smartphones-mobile',
      description: 'Flagship smartphones, tablets and wireless accessories.',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80',
    },
    {
      name: 'Wearable Tech',
      slug: 'wearable-tech',
      description: 'Smartwatches, fitness bands and AR smart glasses.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    },
    {
      name: 'Home Office & Desk Essentials',
      slug: 'home-office',
      description: 'Ergonomic chairs, minimalist desk lamps and accessories.',
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80',
    },
    {
      name: 'Gaming & Entertainment',
      slug: 'gaming',
      description: 'Consoles, controllers, VR headsets and gaming gear.',
      image: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=800&q=80',
    },
  ];

  const categories = await Promise.all(
    categoriesData.map((cat) => prisma.category.create({ data: cat }))
  );

  const catMap = new Map(categories.map((c) => [c.slug, c.id]));
  console.log(`✅ ${categories.length} Categories created.`);

  // 4. Create Products with verified high-res Unsplash images
  const productsData = [
    // Electronics & Audio
    {
      name: 'Pro Wireless Noise-Canceling Headphones',
      slug: 'pro-wireless-noise-canceling-headphones',
      description: 'Industry-leading active noise cancellation with premium 40mm drivers and 30-hour battery life.',
      longDescription: 'Immerse yourself in pure sound with our flagship wireless headphones. Features adaptive noise cancellation, transparency mode, dynamic head tracking audio, and ultra-soft memory foam ear cushions.',
      price: 299.99,
      discountPrice: 249.99,
      stock: 45,
      categoryId: catMap.get('electronics-audio')!,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80',
      ]),
      thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
      rating: 4.8,
      reviewCount: 124,
      isFeatured: true,
    },
    {
      name: 'Minimalist Hi-Fi Bluetooth Speaker',
      slug: 'minimalist-hifi-bluetooth-speaker',
      description: '360-degree ambient room room-filling acoustic sound enclosed in brushed aluminum.',
      longDescription: 'Engineered with dual passive radiators and custom neodymium drivers for rich bass and crystal-clear highs. Water-resistant design ideal for home and outdoor use.',
      price: 149.00,
      discountPrice: 129.00,
      stock: 60,
      categoryId: catMap.get('electronics-audio')!,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80',
      ]),
      thumbnail: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80',
      rating: 4.6,
      reviewCount: 88,
      isFeatured: true,
    },

    // Computers & Laptops
    {
      name: 'UltraBook Pro 15 M3',
      slug: 'ultrabook-pro-15-m3',
      description: 'Next-generation performance with 16-core CPU, 32GB Unified Memory and Retina XDR Display.',
      longDescription: 'Designed for creator workflows, software development, and heavy multitasking. Features all-day 22-hour battery life, MagSafe charging, and quiet fanless thermal engineering.',
      price: 1899.99,
      discountPrice: 1799.99,
      stock: 20,
      categoryId: catMap.get('computers-laptops')!,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
        'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&q=80',
      ]),
      thumbnail: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
      rating: 4.9,
      reviewCount: 210,
      isFeatured: true,
    },
    {
      name: 'Custom Wireless Mechanical Keyboard 75%',
      slug: 'custom-wireless-mechanical-keyboard-75',
      description: 'Hot-swappable tactile switches with RGB per-key backlighting and PBT keycaps.',
      longDescription: 'Pre-lubed linear switches for smooth, satisfying acoustics. Tri-mode connectivity (2.4GHz wireless, Bluetooth 5.1, USB-C) compatible with Windows and macOS.',
      price: 139.99,
      discountPrice: null,
      stock: 35,
      categoryId: catMap.get('computers-laptops')!,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80',
      ]),
      thumbnail: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80',
      rating: 4.7,
      reviewCount: 95,
      isFeatured: true,
    },

    // Smartphones & Mobile
    {
      name: 'Apex Phone 16 Pro Max 512GB',
      slug: 'apex-phone-16-pro-max-512gb',
      description: 'Titanium chassis, 5x Optical Zoom camera system, and OLED 120Hz display.',
      longDescription: 'Unrivaled mobile photography with 48MP main sensor, spatial video recording, satellite SOS emergency, and all-day battery efficiency.',
      price: 1199.00,
      discountPrice: 1149.00,
      stock: 30,
      categoryId: catMap.get('smartphones-mobile')!,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80',
      ]),
      thumbnail: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80',
      rating: 4.9,
      reviewCount: 340,
      isFeatured: true,
    },

    // Wearable Tech
    {
      name: 'Horizons Smartwatch Ultra',
      slug: 'horizons-smartwatch-ultra',
      description: 'Rugged titanium case, dual-frequency GPS, ECG monitor and 100m water resistance.',
      longDescription: 'The ultimate endurance watch with multi-sport tracking, heart rate variability metrics, sleep score insights, and bright 2000-nit display.',
      price: 499.00,
      discountPrice: 449.00,
      stock: 25,
      categoryId: catMap.get('wearable-tech')!,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
      ]),
      thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
      rating: 4.8,
      reviewCount: 160,
      isFeatured: true,
    },

    // Home Office
    {
      name: 'Ergonomic Mesh Office Chair',
      slug: 'ergonomic-mesh-office-chair',
      description: 'Adjustable lumbar support, 3D armrests, and breathable high-tension mesh.',
      longDescription: 'Designed for long hours at the desk. Synchronized tilt mechanism, memory foam seat cushion, and heavy-duty aluminium star base.',
      price: 349.99,
      discountPrice: 299.99,
      stock: 15,
      categoryId: catMap.get('home-office')!,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=800&q=80',
      ]),
      thumbnail: 'https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=800&q=80',
      rating: 4.5,
      reviewCount: 78,
      isFeatured: true,
    },

    // Gaming
    {
      name: 'VR Horizons HMD Headset 4K',
      slug: 'vr-horizons-hmd-headset-4k',
      description: 'Next-gen virtual reality headset with dual 4K OLED micro-displays and eye tracking.',
      longDescription: 'Step into ultra-realistic virtual worlds with wide 110-degree FOV, haptic wireless motion controllers, and spatial 3D audio.',
      price: 699.00,
      discountPrice: 649.00,
      stock: 18,
      categoryId: catMap.get('gaming')!,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=800&q=80',
      ]),
      thumbnail: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=800&q=80',
      rating: 4.7,
      reviewCount: 92,
      isFeatured: true,
    },
  ];

  const products = await Promise.all(
    productsData.map((prod) => prisma.product.create({ data: prod }))
  );
  console.log(`✅ ${products.length} Products created with verified images.`);

  // 5. Create Sample Order
  const firstProd = products[0];
  const secondProd = products[1];

  const sampleOrder = await prisma.order.create({
    data: {
      orderNumber: 'ORD-2026-0001',
      userId: customerUser.id,
      shippingName: 'Bùi Nguyễn Nhật Huy',
      shippingEmail: 'customer@example.com',
      shippingPhone: '0987654321',
      shippingAddress: '77 Nguyễn Huệ, Thành phố Huế',
      shippingCity: 'Huế',
      shippingCountry: 'Việt Nam',
      shippingZipCode: '530000',
      total: firstProd!.price + secondProd!.price,
      status: 'delivered',
      paymentMethod: 'credit_card',
      paymentStatus: 'paid',
      notes: 'Giao hàng giờ hành chính',
      items: {
        create: [
          { productId: firstProd!.id, quantity: 1, price: firstProd!.price },
          { productId: secondProd!.id, quantity: 1, price: secondProd!.price },
        ],
      },
    },
  });

  console.log(`✅ Sample Order ${sampleOrder.orderNumber} created.`);

  // 6. Create Reviews
  await prisma.review.create({
    data: {
      productId: firstProd!.id,
      rating: 5,
      title: 'Chất lượng âm thanh tuyệt vời!',
      content: 'Tai nghe chống ồn rất đỉnh, pin trâu đúng như mô tả. Đáng tiền!',
    },
  });

  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
