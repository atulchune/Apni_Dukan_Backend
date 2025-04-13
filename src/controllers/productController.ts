import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class ProductController {
  public async fetchProductsBytypes(req: Request, res: Response,) {
    try {
      const { productType } = req.body;
      console.log(productType, 'productType')
      const products = await prisma.products.findMany({
        include: {
          Images: {
            where: {
              isDeleted: false,  // Only include images where isDeleted is false
            },
          },
        },
        where: {
          ProductTypeId: productType,
          isDeleted: false,
        },
        orderBy: {
          name: 'asc',
        },
      });
      if (products) {
        res
          .status(200)
          .json({ data: products })
      } else {
        res
          .status(404)
          .json({ data: "Data Not Found" })
      }
      return
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: error })
    }
  }

  public async fetchProductsById(req: Request, res: Response) {
    try {
      const  {Id}  = req.query;
      if(!Id){
        res.status(400)
        .json({error:"please pass proper query params"})
        return
      }
      const productId = Number(Id);

      const fetchProduct = await prisma.products.findFirst({
        include: {
          category: {
            select: {
              title: true, // Equivalent to cat.title AS category
            },
          },
          ProductType: {
            select: {
              Type: true, // Equivalent to prodtype."Type" AS productType
            },
          },
          Images: true,
        },
        where:{
          ProductId:productId,
          isDeleted:false
        },
        orderBy: {
          name: 'asc', // Equivalent to ORDER BY prod."name" ASC
        },


      });
      if(!fetchProduct){
        res.status(404)
        .json({message:"Product Not Found"});
        return
      }else{
        res.status(200)
        .json({message:fetchProduct})
        return
      }

    } catch (error) {
      res.status(500)
      .json({error:error})
      return
    }
  }

  public async fetchProductBySearch(req: Request, res: Response): Promise<void> {
    const {search}= req.query;
    if(!search){
      res.status(400)
      .json({message:"please enter search param"})
      return;
    }
    try {
      const fetchProduct = await prisma.products.findMany({
        include: {
          category: {
            select: {
              title: true, 
            },
          },
          ProductType: {
            select: {
              Type: true, 
            },
          },
          Images: true,
        },where:{
          name:{
            contains:search as string,
            mode:"insensitive"
          }
        },
        orderBy: {
          name: 'asc', 
        },

      })


      if(fetchProduct?.length<=0){
        res.status(404)
        .json({message:"No Products found"})
        return;
      }

      // const updated_fetch_product = await Promise.all(fetchProduct?.map((item,index)=>{
        // const NewImagesUrl = item?.imageUrl.split(';');
        // const updated_Values = {...item,
        //   category:item.category.title,
        //   ProductType:item.ProductType.Type,
        //   imageUrl:NewImagesUrl
        // }
        // return (
        //   updated_Values
        // )
      // }
    // )
    // )
      res.status(200)
      .json({message:fetchProduct})
      return;

    } catch (error) {
      console.error("error fetching products", error);
      res.status(500)
      .json({message:error})
      return;
    }

  }
}

export default ProductController;
