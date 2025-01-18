// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { client } from "@/sanity/lib/client";
// import { fetchData } from "@/services/api";
// import Image from "next/image";

// export default async function Home() {


//   await fetchData()

//   const res = await client.fetch(`*[_type == 'product']{
//   name,
//   price,
//     description,
//     'image': image.asset->url
// }`)

//   return (
//    <>
//     {res.map((card:any, index:any)=>{
//       return (
//         <Card className="w-full md:w-1/3 lg:w-1/4 shadow-lg m-4" key={index}>
//       <CardHeader className="p-4">
//         <Image
//           src={card.image}
//           alt={card.name}
//           width={300}
//           height={300}
//           className="w-full h-64 object-cover rounded-md"
//         />
//       </CardHeader>
//       <CardContent className="p-4">
//         <CardTitle className="text-lg font-bold">{card.name}</CardTitle>
//         <CardDescription className="text-sm text-gray-500">{card.description}</CardDescription>
//         <div className="mt-2 text-sm text-gray-600">
          
//           <p>
//             <span className="font-bold">Price:</span> ${card.price.toFixed(2)}
//           </p>
//         </div>
//       </CardContent>
//     </Card>


//       )

    

//     })
//   }
//     </>
   
//   );
// }


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { client } from "@/sanity/lib/client";
import { fetchData } from "@/services/api";
import Image from "next/image";

export default async function Home() {
  await fetchData();

  const res = await client.fetch(`*[_type == 'product']{
    name,
    price,
    description,
    'image': image.asset->url
  }`);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
      {res.map((card: any, index: any) => (
        <Card className="shadow-lg" key={index}>
          <CardHeader className="p-4">
            <Image
              src={card.image}
              alt={card.name}
              width={300}
              height={300}
              className="w-full h-64 object-cover rounded-md"
            />
          </CardHeader>
          <CardContent className="p-4">
            <CardTitle className="text-lg font-bold">{card.name}</CardTitle>
            <CardDescription className="text-sm text-gray-500">{card.description}</CardDescription>
            <div className="mt-2 text-sm text-gray-600">
              <p>
                <span className="font-bold">Price:</span> ${card.price.toFixed(2)}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
