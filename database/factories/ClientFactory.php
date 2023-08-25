<?php

namespace Database\Factories;

use App\Models\TypeClient;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Client>
 */
class ClientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name,
            'father_name' => $this->faker->name,
            'mother_name' => $this->faker->name,
            'type_client_id' => TypeClient::all()->random()->id,
        ];
    }
}
