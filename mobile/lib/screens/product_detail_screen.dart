import 'package:flutter/material.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';
import '../../models/product.dart';
import '../../core/theme.dart';
import '../../providers/auth_provider.dart';
import '../../providers/cart_provider.dart';
import '../../providers/wishlist_provider.dart';

class ProductDetailScreen extends StatefulWidget {
  final Product product;
  const ProductDetailScreen({super.key, required this.product});

  @override
  State<ProductDetailScreen> createState() => _ProductDetailScreenState();
}

class _ProductDetailScreenState extends State<ProductDetailScreen> {
  int _currentImage = 0;

  @override
  Widget build(BuildContext context) {
    final product = widget.product;
    final formatCurrency = NumberFormat.currency(locale: 'uz_UZ', symbol: 'so\'m', decimalDigits: 0);
    final isFav = context.watch<WishlistProvider>().isFavorite(product.id);
    final token = context.read<AuthProvider>().token;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Mahsulot haqida'),
        actions: [
          IconButton(
            icon: Icon(isFav ? Icons.favorite : Icons.favorite_border, color: isFav ? AppColors.red : null),
            onPressed: () {
              if (token != null) {
                context.read<WishlistProvider>().toggleFavorite(product, token);
              } else {
                ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Tizimga kiring')));
              }
            },
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.only(bottom: 100),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (product.images.isNotEmpty)
              Stack(
                alignment: Alignment.bottomCenter,
                children: [
                  Container(
                    color: Colors.white, // product images usually look better on white
                    child: CarouselSlider(
                      options: CarouselOptions(
                        height: 350.0,
                        viewportFraction: 1.0,
                        enableInfiniteScroll: false,
                        onPageChanged: (index, reason) => setState(() => _currentImage = index),
                      ),
                      items: product.images.map((img) {
                        return CachedNetworkImage(
                          imageUrl: img,
                          fit: BoxFit.contain,
                          placeholder: (context, url) => const Center(child: CircularProgressIndicator(color: AppColors.primary)),
                          errorWidget: (context, url, error) => const Icon(Icons.error),
                        );
                      }).toList(),
                    ),
                  ),
                  Positioned(
                    bottom: 10,
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                      decoration: BoxDecoration(color: Colors.black54, borderRadius: BorderRadius.circular(20)),
                      child: Text('${_currentImage + 1} / ${product.images.length}', style: const TextStyle(color: Colors.white, fontSize: 12)),
                    ),
                  ),
                ],
              )
            else
              Container(height: 350, color: AppColors.surface2, child: const Center(child: Icon(Icons.image, size: 100, color: AppColors.muted))),
            
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      const Icon(Icons.star, color: AppColors.yellow, size: 20),
                      const SizedBox(width: 4),
                      Text('${product.rating} (${product.reviewCount} baho)', style: const TextStyle(color: AppColors.muted, fontSize: 14)),
                      const Spacer(),
                      if (product.stock > 0)
                        const Text('Sotuvda bor', style: TextStyle(color: AppColors.green, fontSize: 13, fontWeight: FontWeight.w600))
                      else
                        const Text('Omborda qolmagan', style: TextStyle(color: AppColors.red, fontSize: 13, fontWeight: FontWeight.w600)),
                    ],
                  ),
                  const SizedBox(height: 12),
                  Text(product.name, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, height: 1.3)),
                  const SizedBox(height: 16),
                  if (product.discountPrice != null)
                    Text(formatCurrency.format(product.price), style: const TextStyle(fontSize: 14, decoration: TextDecoration.lineThrough, color: AppColors.muted)),
                  Text(formatCurrency.format(product.discountPrice ?? product.price), style: const TextStyle(fontSize: 28, fontWeight: FontWeight.w900, color: AppColors.primaryL)),
                  
                  const SizedBox(height: 24),
                  const Text('Tavsif', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 8),
                  Text(product.description ?? 'Tavsif yo\'q', style: const TextStyle(fontSize: 15, color: AppColors.muted, height: 1.5)),
                ],
              ),
            ),
          ],
        ),
      ),
      bottomSheet: Container(
        padding: const EdgeInsets.all(16),
        decoration: const BoxDecoration(
          color: AppColors.surface,
          border: Border(top: BorderSide(color: AppColors.border)),
        ),
        child: SafeArea(
          child: ElevatedButton(
            onPressed: product.stock > 0
                ? () {
                    if (token != null) {
                      context.read<CartProvider>().addToCart(product.id, token);
                      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Savatga qo\'shildi')));
                    } else {
                      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Tizimga kiring')));
                    }
                  }
                : null,
            child: Text(product.stock > 0 ? 'Savatga qo\'shish' : 'Sotuvda yo\'q'),
          ),
        ),
      ),
    );
  }
}
