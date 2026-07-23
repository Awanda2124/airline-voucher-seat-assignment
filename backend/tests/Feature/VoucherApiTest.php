<?php

namespace Tests\Feature;

use App\Models\Voucher;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class VoucherApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_check_returns_false_when_voucher_not_exists()
    {
        $response = $this->postJson('/api/check', [
            'flightNumber' => 'GA102',
            'date' => '2025-07-12',
        ]);

        $response
            ->assertStatus(200)
            ->assertJson([
                'exists' => false,
            ]);
    }


    public function test_generate_voucher_successfully()
    {
        $response = $this->postJson('/api/generate', [
            'name' => 'Sarah',
            'id' => '98123',
            'flightNumber' => 'GA102',
            'date' => '2025-07-12',
            'aircraft' => 'Airbus 320',
        ]);

        $response
            ->assertStatus(201)
            ->assertJson([
                'success' => true,
            ])
            ->assertJsonCount(3, 'seats');


        $this->assertDatabaseHas('vouchers', [
            'flight_number' => 'GA102',
            'flight_date' => '2025-07-12',
        ]);
    }


    public function test_duplicate_voucher_generation_is_blocked()
    {
        Voucher::create([
            'crew_name' => 'Sarah',
            'crew_id' => '98123',
            'flight_number' => 'GA102',
            'flight_date' => '2025-07-12',
            'aircraft_type' => 'Airbus 320',
            'seat1' => '1A',
            'seat2' => '2B',
            'seat3' => '3C',
        ]);


        $response = $this->postJson('/api/generate', [
            'name' => 'Budi',
            'id' => '99999',
            'flightNumber' => 'GA102',
            'date' => '2025-07-12',
            'aircraft' => 'Airbus 320',
        ]);


        $response->assertStatus(409);
    }
}
