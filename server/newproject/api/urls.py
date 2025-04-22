from django.urls import path
from .views import get_books, create_book, book_detail, add_review

urlpatterns = [
    path('books/', get_books, name='get_books'),                       # GET all books
    path('books/create/', create_book, name='create_book'),           # POST create a book
    path('books/<int:pk>', book_detail, name='book_detail'),          # PUT/DELETE a specific book
    path('books/<int:pk>/reviews/', add_review, name='add_review'),   # POST review for a book
]
