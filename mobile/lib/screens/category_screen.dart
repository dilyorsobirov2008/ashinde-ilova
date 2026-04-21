import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/product_provider.dart';
import '../../core/theme.dart';
import '../../widgets/product_card.dart';

class CategoryScreen extends StatefulWidget {
  const CategoryScreen({super.key});

  @override
  State<CategoryScreen> createState() => _CategoryScreenState();
}

class _CategoryScreenState extends State<CategoryScreen> {
  int _selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    final prodProv = context.watch<ProductProvider>();
    final categories = prodProv.categories;
    
    if (categories.isEmpty) {
      return const Scaffold(body: Center(child: Text('Kategoriyalar yo\'q')));
    }

    final selectedCategory = categories[_selectedIndex];

    return Scaffold(
      appBar: AppBar(
        title: const Text('Katalog'),
      ),
      body: Row(
        children: [
          // Left Sidebar
          Container(
            width: 100,
            color: AppColors.surface,
            child: ListView.builder(
              itemCount: categories.length,
              itemBuilder: (context, index) {
                final cat = categories[index];
                final isSelected = _selectedIndex == index;
                return GestureDetector(
                  onTap: () => setState(() => _selectedIndex = index),
                  child: Container(
                    color: isSelected ? AppColors.surface2 : Colors.transparent,
                    padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 8),
                    child: Column(
                      children: [
                        Text(cat.emoji ?? '📁', style: const TextStyle(fontSize: 24)),
                        const SizedBox(height: 8),
                        Text(
                          cat.name,
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            fontSize: 10,
                            fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                            color: isSelected ? AppColors.primaryL : AppColors.muted,
                          ),
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
          ),
          // Right Content
          Expanded(
            child: FutureBuilder(
              future: prodProv.fetchProductsByCategory(selectedCategory.slug),
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const Center(child: CircularProgressIndicator());
                }
                final prods = snapshot.data ?? [];
                if (prods.isEmpty) {
                  return const Center(child: Text('Bu kategoriyada mahsulot yo\'q', style: TextStyle(color: AppColors.muted)));
                }
                return GridView.builder(
                  padding: const EdgeInsets.all(12),
                  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 2,
                    childAspectRatio: 0.65,
                    crossAxisSpacing: 10,
                    mainAxisSpacing: 10,
                  ),
                  itemCount: prods.length,
                  itemBuilder: (context, index) {
                    return ProductCard(product: prods[index]);
                  },
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
