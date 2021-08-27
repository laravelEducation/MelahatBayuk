<?php

namespace App\Http\Controllers\api\product;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductProperty;
use Dflydev\DotAccessData\Data;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class indexController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user=request()->user();
        $data=Product::all();

        return response()->json(['success'=>true,'user'=>$user,'data'=>$data]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $user=request()->user();
        $categories=Category::where('userId',$user->id)->get();
        return response()->json([
           'success'=>true,
           'categories'=>$categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user=request()->user();
        $all=$request->all(); //axiostan gelen tüm verilere eriştik
        $file=(isset($all['file'])) ? $all['file'] : [];
        $properties=(isset($all['property'])) ? \json_decode($all['property'],true): [];
        unset($all['file']);
        unset($all['property']);
        $all['userId']=$user->id;
        $create=Product::create($all);
        if ($create){
            foreach ($properties as $property){
             ProductProperty::create([
                'productId'=>$create->id,
                 'property'=>$property['property'],
                 'value'=>$property['value']
             ]);
            }
            return response()->json([
                'succes'=>true
            ]);
        }
        else{
            return response()->json([
                'success'=>false,
                'message'=>'Ürün Eklenemedi'
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $user=request()->user();
        $control=Product::where('id',$id)->where('userId',$user->id)->count();
        if ($control==0){
            return response()->json(['success'=>false,'message'=>'Ürün size ait değil']);
        }
        $product=Product::where('id',$id)->with('property')->first();
        $categories=Category::where('userId',$user->id)->get();
        return response()->json([
            'success'=>true,
            'categories'=>$categories,
            'product'=>$product
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user=request()->user();
        $control=Product::where('id',$id)->where('userId',$user->id)->count();
        if ($control==0){
            return response()->json(['success'=>false,'message'=>'Ürün size ait değil']);
        }
        $all=$request->all(); //axiostan gelen tüm verilere eriştik
        $file=(isset($all['file'])) ? json_decode($all['file'],true) : [];
        $newFile=(isset($all['newFile'])) ? $all['newFile'] : [];
        $properties=(isset($all['property'])) ? json_decode($all['property'],true): [];

        ProductProperty::where('productId',$id)->delete();
        foreach ($properties as $property){
            ProductProperty::create([
                'productId'=>$id,
                'property'=>$property['property'],
                'value'=>$property['value']
            ]);
        }

        unset($all['file']);
        unset($all['newFile']);
        unset($all['_method']);
        unset($all['property']);
        $create=Product::where('id',$id)->update($all);
        if ($create){

            return response()->json([
                'succes'=>true
            ]);
        }
        else{
            return response()->json([
                'success'=>false,
                'message'=>'Ürün Eklenemedi'
            ]);
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
           $user=request()->user();
           $control=Product::where('id',$id)->where('userId',$user->id)->count();
           if ($control==0){
               return response()->json(['success'=>false,'message'=>'Ürün size ait değil']);
           }
          ProductProperty::where('productId',$id)->delete();
           Product::where('id',$id)->delete();
           return response()->json(['success'=>true,'message'=>'Silindi']);
    }
}
