import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/wishlist_provider.dart';
import '../../providers/auth_provider.dart';
import '../../core/theme.dart';
import '../../widgets/product_card.dart';

class WishlistScreen extends StatelessWidget {
  const WishlistScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthProvider>();
    final wishlist = context.watch<WishlistProvider>();

    if (!auth.isAuthenticated) {
      return const Scaffold(body: Center(child: Text('Istaklarni ko\'rish uchun tizimga kiring')));
    }

    if (wishlist.isLoading && wishlist.items.isEmpty) {
      return const Scaffold(body: Center(child: CircularProgressIndicator()));
    }

    if (wishlist.items.isEmpty) {
      return Scaffold(
        appBar: AppBar(title: const Text('Istaklar')),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(Icons.favorite_border, size: 80, color: AppColors.border),
              const SizedBox(height: 16),
              const Text('Sevimlilar ro\'yxati bo\'sh', style: TextStyle(fontSize: 18, color: AppColors.muted)),
            ],
          ),
        ),
      );
    }

    return Scaffold(
      appBar: AppBar(title: const Text('Istaklar')),
      body: GridView.builder(
        padding: const EdgeInsets.all(16),
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          childAspectRatio: 0.65,
          crossAxisSpacing: 12,
          mainAxisSpacing: 12,
        ),
        itemCount: wishlist.items.length,
        itemBuilder: (context, index) {
          return ProductCard(product: wishlist.items[index]);
        },
      ),
    );
  }
}
