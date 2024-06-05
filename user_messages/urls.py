from django.urls import path
from user_messages import views

urlpatterns = [
    path('conversations/', views.ConversationListCreateView.as_view(), name='conversation-list-create'),
    path('conversations/<int:pk>/', views.ConversationDetailView.as_view(), name='conversation-detail'),
    # path('messages/', views.MessageCreateView.as_view(), name='message-create'),
    path('adverts/<int:advert_id>/messages/', views.MessageCreateView.as_view(), name='message-create'),
]