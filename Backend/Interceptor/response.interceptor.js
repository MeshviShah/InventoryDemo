const response = async (res, returnResponse) => {
    let { statusCode, message, data, count, error } = returnResponse;
    return res
      .status(statusCode)
      .json({ status:statusCode, message, data, count, error });
  };
  
export { response };