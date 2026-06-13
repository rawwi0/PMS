export const ApiSuccessResponse =(data, message)=>{
    return {
        data: data,
        issuccess:true,
        message: message ,
        errorMessages: null ,
      }
}