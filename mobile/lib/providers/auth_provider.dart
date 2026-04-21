import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/user.dart';
import '../services/api_service.dart';

class AuthProvider with ChangeNotifier {
  final SharedPreferences _prefs;
  User? _user;
  String? _token;
  bool _isLoading = false;

  AuthProvider(this._prefs) {
    _loadUser();
  }

  User? get user => _user;
  String? get token => _token;
  bool get isAuthenticated => _token != null;
  bool get isLoading => _isLoading;

  Future<void> _loadUser() async {
    _token = _prefs.getString('token');
    if (_token != null) {
      try {
        final res = await ApiService.get('/auth/me', token: _token);
        if (res.statusCode == 200) {
          final data = jsonDecode(res.body);
          _user = User.fromJson(data['user']);
        } else {
          logout();
        }
      } catch (e) {
        // ignore error, keep user offline or logout depending on strategy
      }
    }
    notifyListeners();
  }

  Future<bool> login(String emailOrPhone, String password) async {
    _isLoading = true;
    notifyListeners();
    try {
      final body = {
        if (emailOrPhone.contains('@')) 'email': emailOrPhone else 'phone': emailOrPhone,
        'password': password,
      };
      final res = await ApiService.post('/auth/login', body);
      if (res.statusCode == 200) {
        final data = jsonDecode(res.body);
        _token = data['token'];
        _user = User.fromJson(data['user']);
        await _prefs.setString('token', _token!);
        _isLoading = false;
        notifyListeners();
        return true;
      }
    } catch (e) {
      // Handle error
    }
    _isLoading = false;
    notifyListeners();
    return false;
  }

  Future<bool> register(String firstName, String lastName, String phone, String password) async {
    _isLoading = true;
    notifyListeners();
    try {
      final body = {
        'first_name': firstName,
        'last_name': lastName,
        'phone': phone,
        'password': password,
      };
      final res = await ApiService.post('/auth/register', body);
      if (res.statusCode == 201) {
        final data = jsonDecode(res.body);
        _token = data['token'];
        _user = User.fromJson(data['user']);
        await _prefs.setString('token', _token!);
        _isLoading = false;
        notifyListeners();
        return true;
      }
    } catch (e) {
      // Handle error
    }
    _isLoading = false;
    notifyListeners();
    return false;
  }

  void logout() {
    _token = null;
    _user = null;
    _prefs.remove('token');
    notifyListeners();
  }
}
