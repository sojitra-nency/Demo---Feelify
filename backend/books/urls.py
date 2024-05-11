from django.urls import path
from .views import BookSearchAPIView

urlpatterns = [
    path('book-search/', BookSearchAPIView.as_view(), name='book_search_api'),
]


# GET
# search books by query = http://127.0.0.1:8000/books/book-search/?q=<query>