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
        /*
        App\User::create([
            'name'              => 'Super usuario',
            'user'              => 'root',
            'password'          => bcrypt('root'),
            'type'              => 'root',
            'company_id'        => 1,
            'remember_token'    => str_random(10),
        ]);

        App\User::create([
            'name'              => 'Usuario administrador',
            'user'              => 'admin',
            'password'          => bcrypt('admin'),
            'type'              => 'admin',
            'company_id'        => 1,
            'remember_token'    => str_random(10),
        ]);

        App\User::create([
            'name'              => 'Usuario vendedor',
            'user'              => 'user',
            'password'          => bcrypt('user'),
            'type'              => 'user',
            'company_id'        => 1,
            'remember_token'    => str_random(10),
        ]);

        App\User::create([
            'name'              => 'Demostración',
            'user'              => 'demostracion',
            'password'          => bcrypt('demo2017'),
            'type'              => 'user',
            'company_id'        => 1,
            'remember_token'    => str_random(10),
        ]);*/

        //factory('App\Company', 25)->create();
        //factory('App\User', 25)->create();
        //factory('App\Customer', 25)->create();
        //factory('App\Product', 25)->create();
        factory('App\Salesman', 25)->create();
    }
}
