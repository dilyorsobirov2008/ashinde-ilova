import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:intl/intl.dart';
import '../../providers/cart_provider.dart';
import '../../providers/auth_provider.dart';
import '../../core/theme.dart';

class OrdersScreen extends StatefulWidget {
  const OrdersScreen({super.key});

  @override
  State<OrdersScreen> createState() => _OrdersScreenState();
}

class _OrdersScreenState extends State<OrdersScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final token = context.read<AuthProvider>().token;
      if (token != null) context.read<CartProvider>().fetchOrders(token);
    });
  }

  @override
  Widget build(BuildContext context) {
    final orders = context.watch<CartProvider>().orders;
    final formatCurrency = NumberFormat.currency(locale: 'uz_UZ', symbol: 'so\'m', decimalDigits: 0);
    
    final statusMap = {
      'pending': 'Kutmoqda',
      'confirmed': 'Tasdiqlangan',
      'delivering': 'Yetkazilmoqda',
      'delivered': 'Yetkazildi',
      'cancelled': 'Bekor qilingan',
    };
    
    final colorMap = {
      'pending': AppColors.yellow,
      'confirmed': AppColors.primaryL,
      'delivering': Colors.blue,
      'delivered': AppColors.green,
      'cancelled': AppColors.red,
    };

    return Scaffold(
      appBar: AppBar(title: const Text('Mening buyurtmalarim')),
      body: orders.isEmpty
          ? const Center(child: Text('Hozircha buyurtmalar yo\'q', style: TextStyle(color: AppColors.muted)))
          : ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: orders.length,
              itemBuilder: (context, index) {
                final order = orders[index];
                final date = DateTime.parse(order.createdAt).toLocal();
                final formattedDate = DateFormat('dd.MM.yyyy HH:mm').format(date);
                final statusStr = statusMap[order.status] ?? order.status;
                final statusCol = colorMap[order.status] ?? AppColors.muted;

                return Card(
                  margin: const EdgeInsets.only(bottom: 16),
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text('Buyurtma #${order.id}', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                              decoration: BoxDecoration(color: statusCol.withOpacity(0.1), borderRadius: BorderRadius.circular(6)),
                              child: Text(statusStr, style: TextStyle(color: statusCol, fontSize: 12, fontWeight: FontWeight.bold)),
                            ),
                          ],
                        ),
                        const SizedBox(height: 8),
                        Text(formattedDate, style: const TextStyle(color: AppColors.muted, fontSize: 12)),
                        const Divider(height: 24),
                        ...order.items.map((item) => Padding(
                          padding: const EdgeInsets.only(bottom: 8),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Expanded(child: Text('${item.quantity} x ${item.productName ?? 'Mahsulot'}', maxLines: 1, overflow: TextOverflow.ellipsis)),
                              Text(formatCurrency.format(item.price * item.quantity), style: const TextStyle(fontWeight: FontWeight.w500)),
                            ],
                          ),
                        )),
                        const Divider(height: 24),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            const Text('Jami:', style: TextStyle(color: AppColors.muted)),
                            Text(formatCurrency.format(order.totalPrice), style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 18, color: AppColors.primaryL)),
                          ],
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
    );
  }
}
