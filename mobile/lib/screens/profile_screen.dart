import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/auth_provider.dart';
import '../../core/theme.dart';
import 'auth/login_screen.dart';
import 'orders_screen.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthProvider>();

    if (!auth.isAuthenticated) {
      return Scaffold(
        appBar: AppBar(title: const Text('Profil')),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Text('Tizimga kirmagansiz', style: TextStyle(color: AppColors.muted, fontSize: 16)),
              const SizedBox(height: 20),
              ElevatedButton(
                style: ElevatedButton.styleFrom(minimumSize: const Size(200, 48)),
                onPressed: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const LoginScreen())),
                child: const Text('Kirish'),
              )
            ],
          ),
        ),
      );
    }

    final user = auth.user!;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Profil'),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout, color: AppColors.red),
            onPressed: () {
              auth.logout();
              Navigator.pushReplacement(context, MaterialPageRoute(builder: (_) => const LoginScreen()));
            },
          )
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            const CircleAvatar(
              radius: 40,
              backgroundColor: AppColors.surface2,
              child: Icon(Icons.person, size: 40, color: AppColors.muted),
            ),
            const SizedBox(height: 16),
            Text('${user.firstName} ${user.lastName}', style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
            if (user.phone != null) Text(user.phone!, style: const TextStyle(color: AppColors.muted)),
            if (user.email != null) Text(user.email!, style: const TextStyle(color: AppColors.muted)),
            
            const SizedBox(height: 32),
            
            _menuItem(context, Icons.shopping_bag_outlined, 'Mening buyurtmalarim', () {
              Navigator.push(context, MaterialPageRoute(builder: (_) => const OrdersScreen()));
            }),
            _menuItem(context, Icons.location_on_outlined, 'Manzillarim', () {}),
            _menuItem(context, Icons.payment_outlined, 'To\'lov kartalari', () {}),
            _menuItem(context, Icons.settings_outlined, 'Sozlamalar', () {}),
            _menuItem(context, Icons.help_outline, 'Yordam', () {}),
          ],
        ),
      ),
    );
  }

  Widget _menuItem(BuildContext context, IconData icon, String title, VoidCallback onTap) {
    return ListTile(
      contentPadding: EdgeInsets.zero,
      leading: Container(
        padding: const EdgeInsets.all(8),
        decoration: BoxDecoration(color: AppColors.surface2, borderRadius: BorderRadius.circular(8)),
        child: Icon(icon, color: AppColors.primaryL),
      ),
      title: Text(title, style: const TextStyle(fontWeight: FontWeight.w500)),
      trailing: const Icon(Icons.chevron_right, color: AppColors.muted),
      onTap: onTap,
    );
  }
}
