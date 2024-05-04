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
        return await prisma.customer.findUnique({
            where: {
                username: username},
            include: {
                user: true }
        })}
    async getAllItems(){
        return await prisma.item.findMany()
    }
    async getItems(category){

    }
    async getFeatured(){

    }
    async getSearchItems(searchValue){
        const search = searchValue.toLowerCase()
        return await prisma.item.findMany({
            where: {
                quantity: {gt:0}, 
                name: {contains: search, mode: 'insensitive' //not casesensitive
                }}})
        // javacode:
        // filteredItems = items.filter( i => i.quantity > 0 && i.name.toLowerCase().includes(search.toLowerCase()) 
        // || i.seller.companyName.toLowerCase().includes(search.toLowerCase()))
    }
    async getPurchaseHistory(currentUser){
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
        }