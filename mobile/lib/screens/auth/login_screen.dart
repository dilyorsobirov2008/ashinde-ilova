import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/auth_provider.dart';
import '../../core/theme.dart';
import '../main_wrapper.dart';
import 'register_screen.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _emailPhoneCtrl = TextEditingController();
  final _passCtrl = TextEditingController();

  void _login() async {
    final emailPhone = _emailPhoneCtrl.text.trim();
    final pass = _passCtrl.text.trim();
    if (emailPhone.isEmpty || pass.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Barcha maydonlarni to\'ldiring')));
      return;
    }
    
    final auth = Provider.of<AuthProvider>(context, listen: false);
    final success = await auth.login(emailPhone, pass);
    if (success) {
      if (!mounted) return;
      Navigator.pushReplacement(context, MaterialPageRoute(builder: (_) => const MainWrapper()));
    } else {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Login yoki parol xato')));
    }
  }

  @override
  Widget build(BuildContext context) {
    final isLoading = context.watch<AuthProvider>().isLoading;
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Text.rich(
                TextSpan(
                  children: [
                    const TextSpan(text: 'uzum', style: TextStyle(color: AppColors.text, fontSize: 32, fontWeight: FontWeight.w800, letterSpacing: -1)),
                    TextSpan(text: 'market', style: TextStyle(color: AppColors.primaryL, fontSize: 32, fontWeight: FontWeight.w800, letterSpacing: -1)),
                  ],
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 8),
              const Text('Akkauntga kirish', textAlign: TextAlign.center, style: TextStyle(color: AppColors.muted, fontSize: 16)),
              const SizedBox(height: 32),
              TextField(
                controller: _emailPhoneCtrl,
                decoration: const InputDecoration(labelText: 'Email yoki telefon', prefixIcon: Icon(Icons.person_outline)),
              ),
              const SizedBox(height: 16),
              TextField(
                controller: _passCtrl,
                obscureText: true,
                decoration: const InputDecoration(labelText: 'Parol', prefixIcon: Icon(Icons.lock_outline)),
              ),
              const SizedBox(height: 24),
              ElevatedButton(
                onPressed: isLoading ? null : _login,
                child: isLoading ? const SizedBox(width: 24, height: 24, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2)) : const Text('Kirish'),
              ),
              const SizedBox(height: 16),
              TextButton(
                onPressed: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const RegisterScreen())),
                child: const Text('Akkauntingiz yo\'qmi? Ro\'yxatdan o\'tish', style: TextStyle(color: AppColors.primaryL)),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
