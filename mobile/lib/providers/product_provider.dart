import 'dart:convert';
import 'package:flutter/foundation.dart';
import '../models/product.dart';
import '../models/category.dart';
import '../models/banner_model.dart';
import '../services/api_service.dart';

class ProductProvider with ChangeNotifier {
  List<Product> _products = [];
  List<Product> _featuredProducts = [];
  List<Category> _categories = [];
  List<BannerModel> _banners = [];
  bool _isLoading = false;

  List<Product> get products => _products;
  List<Product> get featuredProducts => _featuredProducts;
  List<Category> get categories => _categories;
  List<BannerModel> get banners => _banners;
  bool get isLoading => _isLoading;

  Future<void> fetchHomeData() async {
    _isLoading = true;
    notifyListeners();
    try {
      final futures = await Future.wait([
        ApiService.get('/banners'),
        ApiService.get('/categories'),
        ApiService.get('/products?featured=true&limit=6'),
        ApiService.get('/products?limit=10'),
      ]);

      if (futures[0].statusCode == 200) {
        final d = jsonDecode(futures[0].body);
        _banners = (d['banners'] as List).map((i) => BannerModel.fromJson(i)).toList();
      }
      if (futures[1].statusCode == 200) {
        final d = jsonDecode(futures[1].body);
        _categories = (d['categories'] as List).map((i) => Category.fromJson(i)).toList();
      }
      if (futures[2].statusCode == 200) {
        final d = jsonDecode(futures[2].body);
        _featuredProducts = (d['products'] as List).map((i) => Product.fromJson(i)).toList();
      }
      if (futures[3].statusCode == 200) {
        final d = jsonDecode(futures[3].body);
        _products = (d['products'] as List).map((i) => Product.fromJson(i)).toList();
      }
    } catch (e) {
      // print error
    }
    _isLoading = false;
    notifyListeners();
  }

  Future<List<Product>> fetchProductsByCategory(String slug) async {
    try {
      final res = await ApiService.get('/products?category=$slug&limit=50');
      if (res.statusCode == 200) {
        final d = jsonDecode(res.body);
        return (d['products'] as List).map((i) => Product.fromJson(i)).toList();
      }
    } catch (e) {
      // err
    }
    return [];
  }

  Future<List<Product>> searchProducts(String query) async {
    if (query.isEmpty) return [];
    try {
      final res = await ApiService.get('/products?search=$query&limit=20');
      if (res.statusCode == 200) {
        final d = jsonDecode(res.body);
        return (d['products'] as List).map((i) => Product.fromJson(i)).toList();
      }
    } catch (e) {
      // err
    }
    return [];
  }
}
