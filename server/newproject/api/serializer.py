from rest_framework import serializers
from .models import Book, Review

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'rating', 'comment', 'timestamp']

class BookSerializer(serializers.ModelSerializer):
    reviews = ReviewSerializer(many=True, read_only=True)  # nested read-only reviews

    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'genre', 'published_year', 'reviews']
