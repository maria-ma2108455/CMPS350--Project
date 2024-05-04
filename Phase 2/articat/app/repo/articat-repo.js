import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default class articatRepo{
    async getAllUsers(){
        return await prisma.user.findMany()
    }
    async getUser(username){

        return await prisma.user.findUnique({
            where: {
                username: username
            }
        })
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
            if (category === 'all')
                return prisma.item.findMany()

            return prisma.item.findMany({
                where: { category }
            })

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
                    name: {contains: search
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
                where: { itemId }
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
            
    }