// const prisma = new PrismaClient()

class articatRepo{
    async getAllUsers(){
        return await prisma.user.findMany()
    }
    async getCustomer(username) {
    return await prisma.customer.findUnique({
        where: {
            username: username},
        include: {
            user: true }
    })}
   
    async getSeller(username) {
        try {
            return await prisma.customer.findUnique({
                where: {
                    username: username},
                include: {
                    user: true }
            })
        } catch (error) {
            return { error: error.message }
        }
    }
        
    async getAllItems(){
        try {
            return await prisma.item.findMany()
        } catch (error) {
            return { error: error.message }
        }
    }
    async getItems(category){
        try {
            return await prisma.item.findMany()
        } catch (error) {
            return { error: error.message }
        }
    }
    async getFeatured(){
        try {
            return await prisma.item.findMany({
                where: {
                    featured:true
                }
            })
        } catch (error) {
            return { error: error.message }
        }
       
    }
    async getSearchItems(searchValue){
        const search = searchValue.toLowerCase()
        try {
           
            return await prisma.item.findMany({
                where: { 
                    quantity: {gt:0}, 
                    name: {contains: search, mode: 'insensitive' //not casesensitive
                    }}})
        } catch (error) {
            return { error: error.message }
        }
      
        // javacode:
        // filteredItems = items.filter( i => i.quantity > 0 && i.name.toLowerCase().includes(search.toLowerCase()) 
        // || i.seller.companyName.toLowerCase().includes(search.toLowerCase()))
    }
    async getPurchaseHistory(currentUser){
        try {
            return await prisma.purchase.findMany({
                where: {
                    customerUN: currentUser
                },
                include: {
                    item:{
                        include: {
                        seller: true 
                    }}},
                orderBy: {
                    date: 'desc'}})
                }
         catch (error) {
            return { error: error.message }
        }
        }



        
    }