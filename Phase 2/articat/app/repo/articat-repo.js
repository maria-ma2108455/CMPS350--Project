import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default class articatRepo {
    async getAllUsers() {
        return await prisma.user.findMany()
    }
    async getUser(username) {

        return await prisma.user.findUnique({
            where: {
                username: username
            },
            include: {
                seller: true,
                customer:true
             }
        })
    }
    async getCustomer(username) {
        return await prisma.customer.findUnique({
            where: {
                username: username
            },
            include: {
                user: true
            }
        })
    }

    async getSeller(username) {
        try {
            return await prisma.customer.findUnique({
                where: {
                    username: username
                },
                include: {
                    user: true
                }
            })
        } catch (error) {
            return { error: error.message }
        }
    }

    async getAllItems() {
        try {
            return await prisma.item.findMany()
        } catch (error) {
            return { error: error.message }
        }
    }
    async getItems(category) {
        try {
            if (category === 'all')
                return prisma.item.findMany()

            return prisma.item.findMany({
                where: { category }
            })

        } catch (error) {
            return { error: error.message }
        }
    }


    async getFeatured() {
        try {
            return await prisma.item.findMany({
                where: {
                    featured: true
                }
            })
        } catch (error) {
            return { error: error.message }
        }

    }
    async getSearchItems(searchValue) {
        const search = searchValue.toLowerCase()
        try {

            return await prisma.item.findMany({
                where: {
                    quantity: { gt: 0 },
                    name: {
                        contains: search
                    }
                }
            })
        } catch (error) {
            return { error: error.message }
        }
        // javacode:
        // filteredItems = items.filter( i => i.quantity > 0 && i.name.toLowerCase().includes(search.toLowerCase()) 
        // || i.seller.companyName.toLowerCase().includes(search.toLowerCase()))
    }

    async getHistory(username) {
        const currentUser = await this.getUser(username)
        if (currentUser.type === 'customer') return this.getPurchaseHistory(username)
        else return this.getSaleHistory(username)
    }

    async getPurchaseHistory(currentUser) {
        try {
            return {
                purchases: await prisma.purchase.findMany({
                    where: {
                        customerUN: currentUser
                    },
                    include: {
                        item: {
                            include: {
                                seller: true
                            }
                        }
                    },
                    orderBy: {
                        date: 'desc'
                    }
                })
            }
        }
        catch (error) {
            return { error: error.message }
        }
    }

    async getSaleHistory(seller) {
        try {
            return {
                sales: await prisma.purchase.findMany({
                    where: {
                        item: {
                            sellerUN: seller
                        }
                    },
                    include: {
                        item: true,
                        customer: true
                    },
                    orderBy: {
                        date: 'desc'
                    }
                })
            }
        }
        catch (error) {
            return { error: error.message }
        }
    }

    async addItem(item) {
        try {
            return prisma.item.create({
                data: item
            })
        } catch (error) {
            return { error: error.message }
        }
    }

    async getItem(itemId) {
        try {
            return await prisma.item.findUnique({
                where: { itemId },

                include: {
                    seller: true
                }
            })
        } catch (error) {
            return { error: error.message }
        }
    }

    async updateItem(itemId, item) {
        try {
            return await prisma.item.update({
                where: { itemId },
                data: item
            })
        } catch (error) {
            return { error: error.message }
        } 
    }

    // add purchase
    async addPurchase(purchase){
        try {
            return prisma.purchase.create({
                data: purchase
            })
        } catch (error) {
            return { error: error.message }
        }
    }

    async updateCustomer(username, customer) {
        try {
            return await prisma.customer.update({
                where: { username },
                data: customer
            })
        } catch (error) {
            return { error: error.message }
        } 
    }

//FOR STATISTICS:---------------------------------------------------
async getUnpurchasedProducts() {
    try {
        return await prisma.item.findMany({
                where: {
                  purchases: {
                    none: {}
                  }
                }
              })
        
    } catch (error) {
        return { error: error.message }
    }
}

async getTotalNumberOfCustomers() {
    try {
        return await prisma.customer.count()
    } catch (error) {
        return { error: error.message }
    }
}

async getTotalNumberOfSellers() {
    try {
        return await prisma.seller.count()
    } catch (error) {
        return { error: error.message }
    }
}

// async getTotalNumberOfPurchases() {
//     try {
//         return await prisma.purchase.count()
//     } catch (error) {
//         return { error: error.message }
//     }
// }
  async getTotalNumberOfProducts() {
    try {
        return await prisma.item.count();
          
    } catch (error) {
        return { error: error.message }
    }

    
  }


  async  getTotalNumberOfCategories() {
    try {
      const groupedCategories = await prisma.item.groupBy({
        by: ['category']
      })
      //length of array is no of categorires 
      return groupedCategories.length;
    } catch (error) {
        return { error: error.message }
    }
  }
  
 
  async  getTopThreeMostBoughtProducts() {
    const before6month = new Date();
    before6month.setMonth(before6month.getMonth() - 6);
    try {
      //group with item id and add all quantities
      return await prisma.purchase.groupBy({
        by: ['itemId'], _sum: {quantity: true},
        where: {
          date: {gte: before6month},
        },
        orderBy: { 
            _sum: {quantity: 'desc'},
        },
        take: 3  //top3
        //will do another function to get the data of top 3 we found here 
      })
    } catch (error) {
      return { error: error.message };
    }
  }


  async getitemsDetails(itemIds) {
    try {
      const itemsDetails = [];
      for (const item of itemIds) {
        const itemDetails = await prisma.item.findUnique({
          where: { itemId: item.itemId }
        })
        itemsDetails.push({
            ...itemDetails, totalQuantitySold: item._sum.quantity
          })
      }
      return itemsDetails;
    } catch (error) {
      return { error: error.message };
    }
  }
  

  
  

}


    