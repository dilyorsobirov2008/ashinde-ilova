class Category {
  final int id;
  final String name;
  final String slug;
  final String? iconUrl;
  final String? emoji;

  Category({
    required this.id,
    required this.name,
    required this.slug,
    this.iconUrl,
    this.emoji,
  });

  factory Category.fromJson(Map<String, dynamic> json) {
    return Category(
      id: json['id'],
      name: json['name'] ?? '',
      slug: json['slug'] ?? '',
      iconUrl: json['icon_url'],
      emoji: json['emoji'],
    );
  }
}
