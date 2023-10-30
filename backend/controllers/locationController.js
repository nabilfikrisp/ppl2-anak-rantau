const Location = require('../models/location');

const getAll = async (request, response) => {
  const { type, page, pageSize, search } = request.query;

  try {
    let query = type ? Location.find({ type }) : Location.find({});

    if (search) {
      query = query.or([
        { name: { $regex: new RegExp(search, 'i') } },
        { address: { $regex: new RegExp(search, 'i') } },
      ]);
    }

    if (page !== undefined && pageSize !== undefined) {
      const skipAmount = (Number(page) - 1) * Number(pageSize);

      query = query.skip(skipAmount).limit(Number(pageSize));
    }

    if (pageSize) {
      query = query.skip(0).limit(Number(pageSize));
    }

    const locations = await query.exec();
    return response.json(locations);
  } catch (error) {
    return response.status(500).json({ error: 'Internal Server Error' });
  }
};

const detail = async (request, response) => {
  const { id } = request.params;
  const location = await Location.findById(id);
  return response.json(location);
};

module.exports = { getAll, detail };
