import instance from "@/api/axios";

export const subscribeUser = async (data: any) => {
    try{
        const response = await instance.post('/subscribe', data)
        return response.data
    }catch(error: any){
        throw error.response?.data || {message: 'something went wrong'}
    }
}