<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Command extends Model
{
    use HasFactory;

    public $table = 'commands';

    protected $fillable = [
        'num_command',
        'nom_commerciale',
        'client_id',
        'date_command',
        'marque',
        'version',
        'couleur',
        'price',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }
}
