<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BanksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */

    public function run(): void
    {
        DB::table('banks')->delete();
        DB::table('banks')->insert([
            'name' => 'AGB',
        ]);
        DB::table('banks')->insert([
        'name' => 'AL BARAKA BANK',
        ]);
        DB::table('banks')->insert([
            'name' => 'AL SALAM BANK',
        ]);
        DB::table('banks')->insert([
            'name' => 'ALGERIE POSTE',
        ]);
        DB::table('banks')->insert([
            'name' => 'ARAB BANK',
        ]);
        DB::table('banks')->insert([
            'name' => 'BADR',
        ]);
        DB::table('banks')->insert([
            'name' => 'BDL',
        ]);
        DB::table('banks')->insert([
            'name' => 'BEA',
        ]);
        DB::table('banks')->insert([
            'name' => 'BNA',
        ]);
        DB::table('banks')->insert([
            'name' => 'BNP PARIBAS',
        ]);
        DB::table('banks')->insert([
            'name' => 'CCP',
        ]);
        DB::table('banks')->insert([
            'name' => 'CNEP',
        ]);
        DB::table('banks')->insert([
            'name' => 'CPA',
        ]);
        DB::table('banks')->insert([
            'name' => 'EL DJAZAIR IDJAR',
        ]);
        DB::table('banks')->insert([
            'name' => 'NATIXIS ALGERIE',
        ]);
        DB::table('banks')->insert([
            'name' => 'SGA',
        ]);
        DB::table('banks')->insert([
            'name' => 'TRUST BANK ALGERIA',
        ]);

    }
}
