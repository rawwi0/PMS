export const ApiErrorResponse =(errorMessages)=>{
    return {
        data: null,
        issuccess: false,
        message: null ,
        errorMessages: errorMessages ,
      }
}