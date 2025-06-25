
const buildQueryOptions = ({
  page = 1,
  limit = 10,
  sort = 'createdAt',
  order = 'desc',
  filters = {},
  search = '',
  searchFields = []
}) => {
  const parsedPage = Math.max(1, parseInt(page, 10)) || 1;
  const parsedLimit = Math.max(1, parseInt(limit, 10)) || 10;
  const parsedOrder = ['asc', 'desc'].includes(order.toLowerCase()) ? order.toLowerCase() : 'desc';

  const skip = (parsedPage - 1) * parsedLimit;

  const query = {};

  // 1. Handle filters
  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        query[key] = { $in: value };
      } else {
        query[key] = value;
      }
    }
  }

  // 2. Handle search
  if (search && searchFields.length > 0) {
    query.$or = searchFields.map((field) => ({
      [field]: { $regex: search.trim(), $options: 'i' }
    }));
  }

  // 3. Sort
  const sortBy = { [sort]: parsedOrder === 'asc' ? 1 : -1 };

  return {
    query, 
    options: {
      limit: parsedLimit,
      skip,
      sort: sortBy
    },
    page: parsedPage,
    limit: parsedLimit
  };
};

export {buildQueryOptions};