import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:intl/intl.dart';
import '../../providers/cart_provider.dart';
import '../../providers/auth_provider.dart';
import '../../core/theme.dart';
import 'main_wrapper.dart';

class CheckoutScreen extends StatefulWidget {
  const CheckoutScreen({super.key});

  @override
  State<CheckoutScreen> createState() => _CheckoutScreenState();
}

class _CheckoutScreenState extends State<CheckoutScreen> {
  final _addressCtrl = TextEditingController();
  final _noteCtrl = TextEditingController();
  String _paymentMethod = 'cash';

  void _submit() async {
    final address = _addressCtrl.text.trim();
    if (address.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Manzilni kiriting')));
      return;
    }
    final token = context.read<AuthProvider>().token!;
    final success = await context.read<CartProvider>().checkout(address, _paymentMethod, token);
    
    if (success) {
      if (!mounted) return;
      showDialog(
        context: context,
        barrierDismissible: false,
        builder: (ctx) => AlertDialog(
          backgroundColor: AppColors.surface,
          title: const Text('🎉 Muvaffaqiyatli'),
          content: const Text('Buyurtmangiz qabul qilindi. Operator tez orada bog\'lanadi.'),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.pop(ctx);
                Navigator.pushAndRemoveUntil(context, MaterialPageRoute(builder: (_) => const MainWrapper()), (r) => false);
              },
              child: const Text('Asosiyga qaytish'),
            )
          ],
        ),
      );
    } else {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Xatolik yuz berdi')));
    }
  }

  @override
  Widget build(BuildContext context) {
    final cart = context.watch<CartProvider>();
    final formatCurrency = NumberFormat.currency(locale: 'uz_UZ', symbol: 'so\'m', decimalDigits: 0);

    return Scaffold(
      appBar: AppBar(title: const Text('Rasmiylashtirish')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Yetkazib berish manzili', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
            const SizedBox(height: 12),
            TextField(
              controller: _addressCtrl,
              maxLines: 3,
              decoration: const InputDecoration(hintText: 'Toshkent shahar, Yunusobod tumani...'),
            ),
            
            const SizedBox(height: 24),
            const Text('To\'lov usuli', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
            const SizedBox(height: 12),
            Container(
              decoration: BoxDecoration(color: AppColors.surface, borderRadius: BorderRadius.circular(12), border: Border.all(color: AppColors.border)),
              child: Column(
                children: [
                  RadioListTile(
                    title: const Text('Naqd pul'),
                    value: 'cash',
                    groupValue: _paymentMethod,
                    onChanged: (v) => setState(() => _paymentMethod = v.toString()),
                  ),
                  const Divider(height: 1),
                  RadioListTile(
                    title: const Text('Click / Payme (Karta)'),
                    value: 'card',
                    groupValue: _paymentMethod,
                    onChanged: (v) => setState(() => _paymentMethod = v.toString()),
                  ),
                ],
              ),
            ),
            
            const SizedBox(height: 24),
            const Text('Jami hisob', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
            const SizedBox(height: 12),
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(color: AppColors.surface, borderRadius: BorderRadius.circular(12), border: Border.all(color: AppColors.border)),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text('To\'lanadigan summa:', style: TextStyle(color: AppColors.muted)),
                  Text(formatCurrency.format(cart.total), style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: AppColors.primaryL)),
                ],
              ),
            ),
            
            const SizedBox(height: 32),
            ElevatedButton(
              onPressed: cart.isLoading ? null : _submit,
              child: cart.isLoading ? const CircularProgressIndicator(color: Colors.white) : const Text('Tasdiqlash'),
            ),
          ],
        ),
      ),
    );
  }
}
