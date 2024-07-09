from django.urls import path
from adverts import views


urlpatterns = [
    path("adverts/", views.AdvertList.as_view()),
    path("adverts/<int:pk>/", views.AdvertDetail.as_view()),
    path("adverts/category_choices/", views.category_choices, name="category_choices"),
    path("adverts/location_choices/", views.location_choices, name="location_choices"),
    path("adverts/deliver_choices/", views.deliver_choices, name="deliver_choices"),
]