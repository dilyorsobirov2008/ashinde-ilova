class BannerModel {
  final int id;
  final String? title;
  final String imageUrl;
  final String? linkType;
  final String? linkValue;

  BannerModel({
    required this.id,
    this.title,
    required this.imageUrl,
    this.linkType,
    this.linkValue,
  });

  factory BannerModel.fromJson(Map<String, dynamic> json) {
    return BannerModel(
      id: json['id'],
      title: json['title'],
      imageUrl: json['image_url'] ?? '',
      linkType: json['link_type'],
      linkValue: json['link_value'],
    );
  }
}
