import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:intl/intl.dart';
import 'package:cached_network_image/cached_network_image.dart';
import '../../providers/cart_provider.dart';
import '../../providers/auth_provider.dart';
import '../../core/theme.dart';
import 'checkout_screen.dart';

class CartScreen extends StatelessWidget {
  const CartScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthProvider>();
    final cart = context.watch<CartProvider>();
    final formatCurrency = NumberFormat.currency(locale: 'uz_UZ', symbol: 'so\'m', decimalDigits: 0);

    if (!auth.isAuthenticated) {
      return const Scaffold(body: Center(child: Text('Savatni ko\'rish uchun tizimga kiring')));
    }

    if (cart.isLoading && cart.items.isEmpty) {
      return const Scaffold(body: Center(child: CircularProgressIndicator()));
    }

    if (cart.items.isEmpty) {
      return Scaffold(
        appBar: AppBar(title: const Text('Savat')),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(Icons.shopping_cart_outlined, size: 80, color: AppColors.border),
              const SizedBox(height: 16),
              const Text('Savatingiz bo\'sh', style: TextStyle(fontSize: 18, color: AppColors.muted)),
            ],
          ),
        ),
      );
    }

    return Scaffold(
      appBar: AppBar(title: const Text('Savat')),
      body: ListView.separated(
        padding: const EdgeInsets.all(16),
        itemCount: cart.items.length,
        separatorBuilder: (_, __) => const SizedBox(height: 12),
        itemBuilder: (context, index) {
          final item = cart.items[index];
          return Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(color: AppColors.surface, borderRadius: BorderRadius.circular(12), border: Border.all(color: AppColors.border)),
            child: Row(
              children: [
                ClipRRect(
                  borderRadius: BorderRadius.circular(8),
                  child: item.images.isNotEmpty
                      ? CachedNetworkImage(imageUrl: item.images[0], width: 70, height: 70, fit: BoxFit.cover, errorWidget: (_,__,___) => Container(width: 70, height: 70, color: AppColors.surface2))
                      : Container(width: 70, height: 70, color: AppColors.surface2),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(item.name, maxLines: 2, overflow: TextOverflow.ellipsis, style: const TextStyle(fontWeight: FontWeight.w600)),
                      const SizedBox(height: 4),
                      Text(formatCurrency.format(item.discountPrice ?? item.price), style: const TextStyle(fontWeight: FontWeight.bold, color: AppColors.primaryL)),
                      const SizedBox(height: 8),
                      Row(
                        children: [
                          _qtyBtn(Icons.remove, () => cart.updateQuantity(item.id, item.quantity - 1, auth.token!)),
                          Padding(padding: const EdgeInsets.symmetric(horizontal: 16), child: Text('${item.quantity}', style: const TextStyle(fontWeight: FontWeight.bold))),
                          _qtyBtn(Icons.add, () => cart.updateQuantity(item.id, item.quantity + 1, auth.token!)),
                          const Spacer(),
                          IconButton(
                            icon: const Icon(Icons.delete_outline, color: AppColors.red),
                            onPressed: () => cart.removeFromCart(item.id, auth.token!),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ],
            ),
          );
        },
      ),
      bottomNavigationBar: Container(
        padding: const EdgeInsets.all(20),
        decoration: const BoxDecoration(color: AppColors.surface, border: Border(top: BorderSide(color: AppColors.border))),
        child: SafeArea(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text('Jami:', style: TextStyle(fontSize: 16, color: AppColors.muted)),
                  Text(formatCurrency.format(cart.total), style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: AppColors.text)),
                ],
              ),
              const SizedBox(height: 16),
              ElevatedButton(
                onPressed: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const CheckoutScreen())),
                child: const Text('Buyurtma berish'),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _qtyBtn(IconData icon, VoidCallback onTap) {
    return InkWell(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(4),
        decoration: BoxDecoration(color: AppColors.surface2, borderRadius: BorderRadius.circular(6)),
        child: Icon(icon, size: 16, color: AppColors.text),
      ),
    );
  }
}
