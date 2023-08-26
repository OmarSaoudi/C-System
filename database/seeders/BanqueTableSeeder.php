<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BanqueTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */

    public function run(): void
    {
        DB::table('banques')->delete();
        DB::table('banques')->insert([
            'name' => 'AGB',
        ]);
        DB::table('banques')->insert([
        'name' => 'AL BARAKA BANK',
    ]);
        DB::table('banques')->insert([
            'name' => 'AL SALAM BANK',
        ]);
        DB::table('banques')->insert([
            'name' => 'ALGERIE POSTE',
        ]);
        DB::table('banques')->insert([
            'name' => 'ARAB BANK',
        ]);
        DB::table('banques')->insert([
            'name' => 'BADR',
        ]);
        DB::table('banques')->insert([
            'name' => 'BDL',
        ]);
        DB::table('banques')->insert([
            'name' => 'BEA',
        ]);
        DB::table('banques')->insert([
            'name' => 'BNA',
        ]);
        DB::table('banques')->insert([
            'name' => 'BNP PARIBAS',
        ]);
        DB::table('banques')->insert([
            'name' => 'CCP',
        ]);
        DB::table('banques')->insert([
            'name' => 'CNEP',
        ]);
        DB::table('banques')->insert([
            'name' => 'CPA',
        ]);
        DB::table('banques')->insert([
            'name' => 'EL DJAZAIR IDJAR',
        ]);
        DB::table('banques')->insert([
            'name' => 'NATIXIS ALGERIE',
        ]);
        DB::table('banques')->insert([
            'name' => 'SGA',
        ]);
        DB::table('banques')->insert([
            'name' => 'TRUST BANK ALGERIA',
        ]);





    }}
