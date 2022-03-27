package com.example.icp9;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

public class OrderMenu extends AppCompatActivity implements AdapterView.OnItemSelectedListener {

    private Spinner CrustType;
    private Spinner SauceType;
    int quantity = 1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_order_menu);

        CrustType = findViewById(R.id.crust_spinner);
        SauceType = findViewById(R.id.sauce_spinner);

        ArrayAdapter<CharSequence> crust = ArrayAdapter.createFromResource(this, R.array.crustTypes, android.R.layout.simple_spinner_item);
        ArrayAdapter<CharSequence> sauce = ArrayAdapter.createFromResource(this, R.array.sauceTypes, android.R.layout.simple_spinner_item);

        crust.setDropDownViewResource(android.R.layout.simple_dropdown_item_1line);
        sauce.setDropDownViewResource(android.R.layout.simple_dropdown_item_1line);

        CrustType.setAdapter(crust);
        CrustType.setOnItemSelectedListener(this);

        SauceType.setAdapter(sauce);
        SauceType.setOnItemSelectedListener(this);

    }


    @Override
    public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {
        String crustChoice = adapterView.getItemAtPosition(i).toString();
        //Toast.makeText(getApplicationContext(), crustChoice, Toast.LENGTH_LONG).show();
    }

    @Override
    public void onNothingSelected(AdapterView<?> adapterView) {

    }

    private void display(int number) {
        TextView quantityTextView = (TextView) findViewById(R.id.quantity_text_view);
        quantityTextView.setText("" + number);
    }

    public void increment(View view) {
        if (quantity < 100) {
            quantity = quantity + 1;
            display(quantity);
        } else {
            Log.i("MainActivity", "Cannot order more then 99 Pizzas");
            Context context = getApplicationContext();
            String lowerLimitToast = "Cannot order more then 99 Pizzas";
            int duration = Toast.LENGTH_SHORT;
            Toast toast = Toast.makeText(context, lowerLimitToast, duration);
            toast.show();
            return;
        }
    }

    public void decrement(View view) {
        if (quantity > 1) {
            quantity = quantity - 1;
            display(quantity);
        } else {
            Log.i("MainActivity", "Please select at a positive quantity");
            Context context = getApplicationContext();
            String upperLimitToast = "Please select at a positive quantity";
            int duration = Toast.LENGTH_SHORT;
            Toast toast = Toast.makeText(context, upperLimitToast, duration);
            toast.show();
            return;
        }
    }
}