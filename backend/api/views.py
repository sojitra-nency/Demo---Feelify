from rest_framework import viewsets, permissions, mixins, generics, status
from .serializers import FeedbackSerializer, ContactSerializer, UpgradeSerializer
from .models import Feedback, Contact, Upgrade
from rest_framework.views import APIView
from rest_framework.response import Response
import razorpay
from django.conf import settings



class FeedbackViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
class ContactView(generics.CreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    permission_classes = [permissions.AllowAny] 

    def perform_create(self, serializer):
        serializer.save()


razorpay_client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))

class UpgradeCreateView(generics.CreateAPIView):
    queryset = Upgrade.objects.all()
    serializer_class = UpgradeSerializer

    def perform_create(self, serializer):
        amount = serializer.validated_data['amount'] * 100  
        payment = razorpay_client.order.create({'amount': amount, 'currency': 'INR', 'payment_capture': '1'})
        
        serializer.save(payment_id=payment['id'])


class SuccessView(APIView):
    def post(self, request):
        razorpay_order_id = request.data.get('razorpay_order_id')
        if not razorpay_order_id:
            return Response({'error': 'Missing razorpay_order_id'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            upgrade = Upgrade.objects.get(payment_id=razorpay_order_id)
            upgrade.paid = True
            upgrade.save()
            return Response({'success': True})
        except Upgrade.DoesNotExist:
            return Response({'error': 'Invalid order_id'}, status=status.HTTP_404_NOT_FOUND)
