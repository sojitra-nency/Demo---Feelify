from rest_framework.views import APIView
from rest_framework.response import Response
from django.conf import settings
import requests

def fetch_books(query):
    # url = "https://www.googleapis.com/books/v1/volumes?q=happy&key=AIzaSyDUKCLVwPSQSex72ShbZeDWMp9srfDTNyQ"
    search_url = "https://www.googleapis.com/books/v1/volumes"

    search_params = {
        'filter': 'free-ebooks',
        'maxResults': 10,
        'key': settings.BOOKS_API_KEY,
        'orderBy':'newest',
        'q': query,
    }

    r = requests.get(search_url,params=search_params)
    results = r.json()['items']
    print("result: ", results)
    books = []
    for result in results:
        book_url = result.get('selfLink')
        print("book_id: ", book_url)
        if book_url:
            book_details = requests.get(book_url).json()
            book_data = {
                'id': book_details['id'],
                'title':book_details['volumeInfo'].get('title', ''),
                'subtitle':book_details['volumeInfo'].get('subtitle', ''),
                'publishedDate':result['volumeInfo'].get('publishedDate'),
                'authors':result['volumeInfo'].get('authors', []),
                'publisher':book_details['volumeInfo'].get('publisher',''),
                'description':book_details['volumeInfo'].get('description', ''),
                'isbn':book_details['volumeInfo'].get('industryIdentifiers', []),
                'pageCount':book_details['volumeInfo'].get('pageCount', ''),
                'categories':result['volumeInfo'].get('categories', []),
                'language':book_details['volumeInfo'].get('language', ''),
                'thumbnail':book_details['volumeInfo']['imageLinks'].get('small', ''),
                'preview':result['volumeInfo'].get('previewLink', ''),
                'download':book_details['accessInfo']['pdf'].get('downloadLink','')
            }
            books.append(book_data)

    return books

class BookSearchAPIView(APIView):
    def get(self, request):
        query = request.query_params.get('q', '')  
        books = fetch_books(query)
        return Response(books)



    