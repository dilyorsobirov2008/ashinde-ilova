import 'dart:convert';
import 'package:flutter/foundation.dart';
import '../models/product.dart';
import '../services/api_service.dart';

class WishlistProvider with ChangeNotifier {
  List<Product> _items = [];
  bool _isLoading = false;

  List<Product> get items => _items;
  bool get isLoading => _isLoading;

  bool isFavorite(int productId) {
    return _items.any((p) => p.id == productId);
  }

  Future<void> fetchWishlist(String token) async {
    _isLoading = true;
    notifyListeners();
    try {
      final res = await ApiService.get('/wishlist', token: token);
      if (res.statusCode == 200) {
        final data = jsonDecode(res.body);
        _items = (data['wishlist'] as List).map((i) => Product.fromJson(i)).toList();
      }
    } catch (e) {}
    _isLoading = false;
    notifyListeners();
  }

  Future<void> toggleFavorite(Product product, String token) async {
    final bool isFav = isFavorite(product.id);
    if (isFav) {
      _items.removeWhere((p) => p.id == product.id);
      notifyListeners();
      try {
        await ApiService.delete('/wishlist/${product.id}', token: token);
      } catch (e) {
        _items.add(product); // rollback
        notifyListeners();
      }
    } else {
      _items.add(product);
      notifyListeners();
      try {
        await ApiService.post('/wishlist', {'product_id': product.id}, token: token);
      } catch (e) {
        _items.removeWhere((p) => p.id == product.id); // rollback
        notifyListeners();
      }
    }
  }
}
