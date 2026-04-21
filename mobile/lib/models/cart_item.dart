class CartItem {
  final int id;
  final int productId;
  final String name;
  final double price;
  final double? discountPrice;
  final List<String> images;
  final int stock;
  int quantity;

  CartItem({
    required this.id,
    required this.productId,
    required this.name,
    required this.price,
    this.discountPrice,
    required this.images,
    required this.stock,
    required this.quantity,
  });

  factory CartItem.fromJson(Map<String, dynamic> json) {
    List<String> imgs = [];
    if (json['images'] != null && json['images'] is List) {
      imgs = List<String>.from(json['images']);
    }
    return CartItem(
      id: json['id'],
      productId: json['product_id'],
      name: json['name'] ?? '',
      price: double.tryParse(json['price'].toString()) ?? 0.0,
      discountPrice: json['discount_price'] != null ? double.tryParse(json['discount_price'].toString()) : null,
      images: imgs,
      stock: json['stock'] ?? 0,
      quantity: json['quantity'] ?? 1,
    );
  }
}
