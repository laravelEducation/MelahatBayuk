<?php

namespace App\Http\Controllers\api\home;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Customer;
use App\Models\Product;
use App\Models\Category;

class indexController extends Controller
{
    public function index(Request $request){
        $user=request()->user();
        $totalCustomer=Customer::where('userId',$user->id)->count();
        $totalProduct=Product::where('userId',$user->id)->count();
        $totalCategory=Product::where('userId',$user->id)->count();
        $total=[
            'product'=>$totalProduct,
            'category'=>$totalCategory,
            'customer'=>$totalCustomer,
        ];
        return response()->json([
           'success'=>true,
           'total'=>$total,
        ]);
    }
}
