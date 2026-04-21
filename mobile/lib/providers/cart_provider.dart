import 'dart:convert';
import 'package:flutter/foundation.dart';
import '../models/cart_item.dart';
import '../models/order.dart';
import '../services/api_service.dart';

class CartProvider with ChangeNotifier {
  List<CartItem> _items = [];
  double _total = 0.0;
  bool _isLoading = false;
  List<Order> _orders = [];

  List<CartItem> get items => _items;
  double get total => _total;
  bool get isLoading => _isLoading;
  int get itemCount => _items.fold(0, (sum, item) => sum + item.quantity);
  List<Order> get orders => _orders;

  Future<void> fetchCart(String token) async {
    _isLoading = true;
    notifyListeners();
    try {
      final res = await ApiService.get('/cart', token: token);
      if (res.statusCode == 200) {
        final data = jsonDecode(res.body);
        _items = (data['items'] as List).map((i) => CartItem.fromJson(i)).toList();
        _total = double.tryParse(data['total'].toString()) ?? 0.0;
      }
    } catch (e) {}
    _isLoading = false;
    notifyListeners();
  }

  Future<void> addToCart(int productId, String token) async {
    try {
      final res = await ApiService.post('/cart', {'product_id': productId, 'quantity': 1}, token: token);
      if (res.statusCode == 200) {
        fetchCart(token);
      }
    } catch (e) {}
  }

  Future<void> updateQuantity(int itemId, int quantity, String token) async {
    try {
      final res = await ApiService.put('/cart/$itemId', {'quantity': quantity}, token: token);
      if (res.statusCode == 200) {
        fetchCart(token);
      }
    } catch (e) {}
  }

  Future<void> removeFromCart(int itemId, String token) async {
    try {
      final res = await ApiService.delete('/cart/$itemId', token: token);
      if (res.statusCode == 200) {
        fetchCart(token);
      }
    } catch (e) {}
  }

  Future<bool> checkout(String address, String paymentMethod, String token) async {
    _isLoading = true;
    notifyListeners();
    try {
      final body = {'address': address, 'payment_method': paymentMethod};
      final res = await ApiService.post('/orders', body, token: token);
      if (res.statusCode == 201) {
        _items = [];
        _total = 0.0;
        await fetchOrders(token);
        _isLoading = false;
        notifyListeners();
        return true;
      }
    } catch (e) {}
    _isLoading = false;
    notifyListeners();
    return false;
  }

  Future<void> fetchOrders(String token) async {
    try {
      final res = await ApiService.get('/orders', token: token);
      if (res.statusCode == 200) {
        final data = jsonDecode(res.body);
        _orders = (data['orders'] as List).map((i) => Order.fromJson(i)).toList();
        notifyListeners();
      }
    } catch (e) {}
  }
}
