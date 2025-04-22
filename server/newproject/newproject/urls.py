
from django.urls import path
from . import views

urlpatterns = [
    path('books/', views.get_books),                  # GET all books
    path('books/create/', views.create_book),         # POST create book
    path('books/<int:pk>/', views.book_detail),       # PUT/DELETE a book
    path('books/<int:book_id>/reviews/', views.add_review),  # POST review for a book
]
