<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        factory('App\Company', 25)->create();
        factory('App\User', 25)->create();
        factory('App\Customer', 25)->create();
        factory('App\Product', 25)->create();
        factory('App\Entry', 25)->create();
    }
}
