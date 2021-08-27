<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use PhpParser\Builder\Property;

class Product extends Model
{
    use HasFactory;
    protected $guarded=[];
    public function property(){
        return $this->HasMany(ProductProperty::class,'productId','id');
    }
}
