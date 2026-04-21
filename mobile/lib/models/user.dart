class User {
  final int id;
  final String firstName;
  final String lastName;
  final String? phone;
  final String? email;
  final String role;
  final String? avatarUrl;

  User({
    required this.id,
    required this.firstName,
    required this.lastName,
    this.phone,
    this.email,
    required this.role,
    this.avatarUrl,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      firstName: json['first_name'] ?? '',
      lastName: json['last_name'] ?? '',
      phone: json['phone'],
      email: json['email'],
      role: json['role'] ?? 'user',
      avatarUrl: json['avatar_url'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'first_name': firstName,
      'last_name': lastName,
      'phone': phone,
      'email': email,
      'role': role,
      'avatar_url': avatarUrl,
    };
  }
}
