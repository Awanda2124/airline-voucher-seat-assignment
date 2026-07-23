<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class VoucherResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'crewName' => $this->crew_name,
            'crewId' => $this->crew_id,
            'flightNumber' => $this->flight_number,
            'date' => $this->flight_date,
            'aircraft' => $this->aircraft_type,
            'seats' => [
                $this->seat1,
                $this->seat2,
                $this->seat3,
            ],
        ];
    }
}
