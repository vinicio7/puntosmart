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
        'name' => $faker->company,
        'nit' => str_random(13),
        'direction' => $faker->address,
    ];
});

$factory->define(App\Product::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->name,
        'description' => $faker->text,
        'stock' => rand(10,50),
        'price_cost' => rand(10.50, 240.10),
        'price_sale' => rand(10.50, 240.10)
    ];
});

$factory->define(App\Entry::class, function (Faker\Generator $faker) {
    return [
        'user_id' => rand(1,25),
        'product_id' => rand(1,25),
        'quantity' => rand(50,100)
    ];
});