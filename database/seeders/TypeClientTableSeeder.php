<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TypeClientTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('type_clients')->delete();
        DB::table('type_clients')->insert([
            'name' => 'Société',
        ]);
        DB::table('type_clients')->insert([
            'name' => 'Particuler',
        ]);

    }
}
