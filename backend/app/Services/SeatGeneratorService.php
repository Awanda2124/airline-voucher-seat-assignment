<?php

namespace App\Services;

class SeatGeneratorService
{
    public function generate($type)
    {
        $seats = [];

        switch ($type) {
            case 'ATR':
                $rows = 18;
                $letters = ['A', 'C', 'D', 'F'];
                break;

            case 'Airbus 320':
            case 'Boeing 737 Max':
                $rows = 32;
                $letters = ['A', 'B', 'C', 'D', 'E', 'F'];
                break;

                default:
                throw new \InvalidArgumentException(
                    'Invalid aircraft type.'
                );
        }

        for ($i = 1; $i <= $rows; $i++) {
            foreach ($letters as $letter) {
                $seats[] = $i.$letter;
            }
        }

        shuffle($seats);

        return array_slice($seats, 0, 3);
    }
}
