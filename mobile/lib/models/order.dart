class Order {
  final int id;
  final String address;
  final String paymentMethod;
  final String status;
  final double totalPrice;
  final String? note;
  final String createdAt;
  final List<OrderItem> items;

  Order({
    required this.id,
    required this.address,
    required this.paymentMethod,
    required this.status,
    required this.totalPrice,
    this.note,
    required this.createdAt,
    required this.items,
  });

  factory Order.fromJson(Map<String, dynamic> json) {
    List<OrderItem> oItems = [];
    if (json['items'] != null && json['items'] is List) {
      oItems = (json['items'] as List).map((i) => OrderItem.fromJson(i)).toList();
    }
    return Order(
      id: json['id'],
      address: json['address'] ?? '',
      paymentMethod: json['payment_method'] ?? 'cash',
      status: json['status'] ?? 'pending',
      totalPrice: double.tryParse(json['total_price'].toString()) ?? 0.0,
      note: json['note'],
      createdAt: json['created_at'] ?? '',
      items: oItems,
    );
  }
}

class OrderItem {
  final int id;
  final int productId;
  final String? productName;
  final int quantity;
  final double price;
  final List<String> images;

  OrderItem({
    required this.id,
    required this.productId,
    this.productName,
    required this.quantity,
    required this.price,
    required this.images,
  });

  factory OrderItem.fromJson(Map<String, dynamic> json) {
    List<String> imgs = [];
    if (json['images'] != null && json['images'] is List) {
      imgs = List<String>.from(json['images']);
    }
    return OrderItem(
      id: json['id'],
      productId: json['product_id'],
      productName: json['name'],
      quantity: json['quantity'] ?? 1,
      price: double.tryParse(json['price'].toString()) ?? 0.0,
      images: imgs,
    );
  }
}
