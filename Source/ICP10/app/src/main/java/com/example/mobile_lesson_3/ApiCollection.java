package com.example.mobile_lesson_3;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;

public interface ApiCollection {

    @GET("users")
    Call<List<User>> getData();
}
