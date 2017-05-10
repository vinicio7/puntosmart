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
        factory('App\Salesman', 25)->create();

        App\User::create([
            'name'              => 'Administrador',
            'user'              => 'admin',
            'password'          => bcrypt('admin'),
            'type'              => 'admin',
            'company_id'        => 1,
            'remember_token'    => str_random(10),
        ]);

        App\User::create([
            'name'              => 'Vendedor',
            'user'              => 'user',
            'password'          => bcrypt('user'),
            'type'              => 'user',
            'company_id'        => 1,
            'remember_token'    => str_random(10),
        ]);
    }
}
