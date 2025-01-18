"use server"

import { client } from "@/sanity/lib/client"

async function uploadImageToSanity(imageUrl:string){
 
    const response = await fetch(imageUrl)

    const blob = await response.blob()  //is a function blob  // upload sanity return asset reference

    const asset = await client.assets.upload('image',blob);
    return asset;  // return assets reference

}

export async function fetchData() {
  const response = await fetch("https://fakestoreapi.com/products")
  const products =  await response.json()
  

  // loop for of loop lagayegay

  for (const product of  products){

    const imageAsset = await uploadImageToSanity(product.image)  //image conversion krwae

    const sanityProduct = {
        _id:`product-${product.id}`,
        _type:'product',
        name:product.title,
        price:product.price,
        discountPercentage:product.discountPercentage || 0,    //means condition nahe mile tw o krdo
        tags:product.category ? [product.category] : [],       //agar array main property na ho tw kali krdena array
        image:{
            _type:'image',
            asset: {
                _type:'reference',
                _ref:imageAsset._id,
            },
            
            description:product.description,
            rating:product.rating?.rate || 0,
            ratingCount:product.rating?.count || 0
        }



    }
 await client.createOrReplace(sanityProduct)//ye refresh ky bd again add na ho islye ye dkta hain kay agar ye data nahe hain tw create warna replace remove give new
     
  }
}

