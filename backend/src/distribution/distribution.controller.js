const Distribution = require('./distribution.model');

// Create a new distribution
exports.createDistribution = async (req, res) => {
  try {
    const distributionData = req.body;
    const newDistribution = await Distribution.create(distributionData);
    res.status(201).json(newDistribution);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create distribution' });
  }
};

exports.getAllDistributions = async (req, res) => {
    try {
      // Pagination options
      const page = parseInt(req.query.page) || 1; // Current page, default to 1
      const limit = parseInt(req.query.limit) || 10; // Number of items per page, default to 10
  
      // Filtering options
      const filterOptions = {};
      // Add filtering conditions based on query parameters, if needed
      // Example: filter by status - http://localhost:3000/distributions?page=1&limit=10&status=served
      if (req.query.status) {
        filterOptions.status = req.query.status;
      }
  
      // Fetch distributions based on pagination and filtering options
      const distributions = await Distribution.find(filterOptions)
        .skip((page - 1) * limit)
        .limit(limit);
  
      // Count the total number of distributions to calculate the total pages
      const totalDistributions = await Distribution.countDocuments(filterOptions);
  
      res.status(200).json({
        totalDistributions,
        totalPages: Math.ceil(totalDistributions / limit),
        currentPage: page,
        distributions,
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch distributions' });
    }
  };
  

// Get a single distribution by ID
exports.getDistributionById = async (req, res) => {
  try {
    const distribution = await Distribution.findById(req.params.id);
    if (!distribution) {
      return res.status(404).json({ error: 'Distribution not found' });
    }
    res.status(200).json(distribution);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch distribution' });
  }
};

// Update a distribution by ID
exports.updateDistributionById = async (req, res) => {
  try {
    const distributionData = req.body;
    const updatedDistribution = await Distribution.findByIdAndUpdate(
      req.params.id,
      distributionData,
      { new: true }
    );
    if (!updatedDistribution) {
      return res.status(404).json({ error: 'Distribution not found' });
    }
    res.status(200).json(updatedDistribution);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update distribution' });
  }
};

// Delete a distribution by ID
exports.deleteDistributionById = async (req, res) => {
  try {
    const deletedDistribution = await Distribution.findByIdAndDelete(
      req.params.id
    );
    if (!deletedDistribution) {
      return res.status(404).json({ error: 'Distribution not found' });
    }
    res.status(200).json({ message: 'Distribution deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete distribution' });
  }
};
