<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

/** @var \Illuminate\Database\Eloquent\Factory $factory */

$factory->define(App\Company::class, function (Faker\Generator $faker) {
    return [
        'trade_name' => $faker->company,
        'business_name' => $faker->company,
        'nit' => str_random(13),
        'direction' => $faker->address,
        'phone' => $faker->phoneNumber,
        'contact' => $faker->phoneNumber,
        'correlative' => 1,
        'stock' => rand(0,1),
        'type_service' => rand(1,3),
        'format' => rand(1,2)
    ];
});

$factory->define(App\User::class, function (Faker\Generator $faker) {
    static $password;

    return [
        'company_id' => rand(1,25),
        'name' => $faker->name,
        'user' => $faker->unique()->userName,
        'password' => $password ?: $password = bcrypt('secret'),
        'type' => rand(1,2),
        'remember_token' => str_random(10),
    ];
});

$factory->define(App\Customer::class, function (Faker\Generator $faker) {
    return [
        'company_id' => rand(1,25),
        'name' => $faker->company,
        'nit' => str_random(13),
        'direction' => $faker->address,
        'phone' => $faker->phoneNumber,
        'email' => $faker->unique()->safeEmail,
        'contact' => $faker->name,
        'contact_email' => $faker->safeEmail,
    ];
});

$factory->define(App\Product::class, function (Faker\Generator $faker) {
    return [
        'company_id' => rand(1,25),
        'description' => $faker->text,
        'internal_code' => str_random(10),
        'bar_code' => $faker->ean13,
        'stock' => rand(10,50),
        'price_sale' => rand(10.50, 240.10)
    ];
});

$factory->define(App\Entry::class, function (Faker\Generator $faker) {
    return [
        'company_id' => rand(1,25),
        'user_id' => rand(1,25),
        'product_id' => rand(1,25),
        'quantity' => rand(50,100),
        'price_sale' => rand(1,50)
    ];
});

$factory->define(App\Salesman::class, function (Faker\Generator $faker) {
    return [
        'company_id' => rand(1,25),
        'name' => $faker->name,
        'direction' => $faker->address,
        'phone' => $faker->phoneNumber
    ];
});