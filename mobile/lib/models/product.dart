class Product {
  final int id;
  final String name;
  final String? description;
  final double price;
  final double? discountPrice;
  final int? categoryId;
  final String? categoryName;
  final List<String> images;
  final double rating;
  final int reviewCount;
  final int stock;
  final String? brand;
  final bool isFeatured;

  Product({
    required this.id,
    required this.name,
    this.description,
    required this.price,
    this.discountPrice,
    this.categoryId,
    this.categoryName,
    required this.images,
    required this.rating,
    required this.reviewCount,
    required this.stock,
    this.brand,
    required this.isFeatured,
  });

  factory Product.fromJson(Map<String, dynamic> json) {
    List<String> imgs = [];
    if (json['images'] != null) {
      if (json['images'] is List) {
        imgs = List<String>.from(json['images']);
      }
    }
    return Product(
      id: json['id'],
      name: json['name'] ?? '',
      description: json['description'],
      price: double.tryParse(json['price'].toString()) ?? 0.0,
      discountPrice: json['discount_price'] != null ? double.tryParse(json['discount_price'].toString()) : null,
      categoryId: json['category_id'],
      categoryName: json['category_name'],
      images: imgs,
      rating: double.tryParse(json['rating']?.toString() ?? '0') ?? 0.0,
      reviewCount: json['review_count'] ?? 0,
      stock: json['stock'] ?? 0,
      brand: json['brand'],
      isFeatured: json['is_featured'] ?? false,
    );
  }
}
